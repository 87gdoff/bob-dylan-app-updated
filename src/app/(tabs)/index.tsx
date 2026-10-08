import { router } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AlbumCard } from '../../components/AlbumCard';
import { BrandHeader } from '../../components/BrandHeader';
import { SongRow } from '../../components/SongRow';
import { RandomLyricQuote } from '../../components/RandomLyricQuote';
import { albums, tracks, type Album, type CatalogTrack } from '../../data/catalog';
import { useFavorites } from '../../hooks/FavoritesContext';
import { pagePadding, useThemeColors } from '../../theme';
import { Page } from '../../components/Page';
import { QuickGuide } from '../../components/QuickGuide';

const GUIDE_SEEN_KEY = 'quick-guide-seen-v1';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [albumSort, setAlbumSort] = useState<'title' | 'releaseDate'>('title');
  const [guideVisible, setGuideVisible] = useState(false);
  const { width: screenWidth } = useWindowDimensions();
  const { isFavorite, toggleFavorite } = useFavorites();
  const colors = useThemeColors();
  const styles = createStyles(colors);
  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(GUIDE_SEEN_KEY)
      .then((seen) => { if (mounted && seen !== 'true') setGuideVisible(true); })
      .catch(() => { if (mounted) setGuideVisible(true); });
    return () => { mounted = false; };
  }, []);
  const columns = screenWidth >= 760 ? 4 : screenWidth >= 520 ? 3 : 2;
  const albumCardWidth = (screenWidth - pagePadding * 2 - 12 * (columns - 1)) / columns;
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const matchingAlbums = useMemo(
    () => normalizedQuery ? albums.filter((album) => album.title.toLocaleLowerCase().includes(normalizedQuery)) : albums,
    [normalizedQuery],
  );
  const matchingTracks = useMemo(
    () => normalizedQuery
      ? tracks.filter((track) => `${track.title} ${track.albumTitle}`.toLocaleLowerCase().includes(normalizedQuery))
      : [],
    [normalizedQuery],
  );
  const sortedAlbums = useMemo(() => sortAlbums(matchingAlbums, albumSort), [matchingAlbums, albumSort]);
  const albumRows = useMemo(() => chunkAlbums(sortedAlbums, columns), [sortedAlbums, columns]);
  const feedRows = useMemo<FeedRow[]>(() => {
    const rows: FeedRow[] = albumRows.map((row, index) => ({
      type: 'albums',
      key: `albums-${index}`,
      albums: row,
    }));

    if (normalizedQuery && matchingTracks.length > 0) {
      rows.push({ type: 'section', key: 'songs-heading', title: 'SONGS', count: matchingTracks.length });
      rows.push(...matchingTracks.map((track) => ({ type: 'song' as const, key: `song-${track.id}`, track })));
    }

    return rows;
  }, [albumRows, matchingTracks, normalizedQuery]);

  const openAlbum = (albumId: string) => router.push({ pathname: '/album/[albumId]', params: { albumId } });
  const openTrack = (songId: string) => router.push({ pathname: '/song/[songId]', params: { songId } });

  return (
    <Page>
      <View style={styles.stickyHeader}>
        <BrandHeader />
        <View style={styles.searchBox}>
          <Text style={styles.searchGlyph}>⌕</Text>
          <TextInput
            accessibilityLabel="Search songs and albums"
            value={query}
            onChangeText={setQuery}
            placeholder="Search songs or albums"
            placeholderTextColor={colors.muted}
            returnKeyType="search"
            clearButtonMode="while-editing"
            style={styles.searchInput}
          />
          {query.length > 0 ? <Pressable onPress={() => setQuery('')}><Text style={styles.clear}>Clear</Text></Pressable> : null}
        </View>
      </View>

      <QuickGuide
        visible={guideVisible}
        onClose={() => {
          setGuideVisible(false);
          void AsyncStorage.setItem(GUIDE_SEEN_KEY, 'true').catch(() => undefined);
        }}
      />

      <FlatList
        style={styles.resultsScroll}
        contentContainerStyle={styles.content}
        data={feedRows}
        keyExtractor={(row) => row.key}
        renderItem={({ item }) => {
          if (item.type === 'section') return <SectionTitle title={item.title} count={item.count} />;
          if (item.type === 'song') {
            return <SongRow track={item.track} onPress={() => openTrack(item.track.id)} favorite={isFavorite(item.track.id)} onToggleFavorite={() => toggleFavorite(item.track.id)} />;
          }
          return (
            <View style={styles.grid}>
              {item.albums.map((album) => (
                <View key={album.id} style={[styles.gridItem, { width: albumCardWidth }]}> 
                  <AlbumCard album={album} onPress={() => openAlbum(album.id)} />
                </View>
              ))}
            </View>
          );
        }}
        ListHeaderComponent={(
          <>
            <RandomLyricQuote />
            {normalizedQuery ? (
              matchingAlbums.length > 0 ? (
                <>
                  <SectionTitle title="ALBUMS" count={matchingAlbums.length} />
                  <AlbumSortControl value={albumSort} onChange={setAlbumSort} />
                </>
              ) : matchingTracks.length === 0 ? (
                <Text style={styles.emptySearch}>No songs or albums found for “{query}”.</Text>
              ) : null
            ) : (
              <>
                <View style={styles.sectionTop}>
                  <Text style={styles.sectionTitle}>THE ALBUMS</Text>
                  <Text style={styles.sectionNote}>Browse the collection</Text>
                </View>
                <AlbumSortControl value={albumSort} onChange={setAlbumSort} />
              </>
            )}
          </>
        )}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={40}
        windowSize={5}
      />
    </Page>
  );
}

function SectionTitle({ title, count }: { title: string; count: number }) {
  const colors = useThemeColors();
  const styles = createStyles(colors);
  return (
    <View style={styles.resultTitleRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionNote}>{count}</Text>
    </View>
  );
}

function AlbumSortControl({
  value,
  onChange,
}: {
  value: 'title' | 'releaseDate';
  onChange: (value: 'title' | 'releaseDate') => void;
}) {
  const colors = useThemeColors();
  const styles = createStyles(colors);
  return (
    <View style={styles.sortRow} accessibilityRole="radiogroup" accessibilityLabel="Sort albums">
      <Text style={styles.sortLabel}>Sort</Text>
      <View style={styles.sortOptions}>
        <Pressable
          accessibilityRole="radio"
          accessibilityState={{ checked: value === 'title' }}
          accessibilityLabel="Sort albums alphabetically"
          onPress={() => onChange('title')}
          style={[styles.sortOption, value === 'title' && styles.sortOptionActive]}
        >
          <Text style={[styles.sortOptionText, value === 'title' && styles.sortOptionTextActive]}>A–Z</Text>
        </Pressable>
        <Pressable
          accessibilityRole="radio"
          accessibilityState={{ checked: value === 'releaseDate' }}
          accessibilityLabel="Sort albums by release date"
          onPress={() => onChange('releaseDate')}
          style={[styles.sortOption, value === 'releaseDate' && styles.sortOptionActive]}
        >
          <Text style={[styles.sortOptionText, value === 'releaseDate' && styles.sortOptionTextActive]}>Release date</Text>
        </Pressable>
      </View>
    </View>
  );
}

type FeedRow =
  | { type: 'albums'; key: string; albums: Album[] }
  | { type: 'song'; key: string; track: CatalogTrack }
  | { type: 'section'; key: string; title: string; count: number };

function chunkAlbums(items: Album[], size: number) {
  const rows: Album[][] = [];
  for (let index = 0; index < items.length; index += size) rows.push(items.slice(index, index + size));
  return rows;
}

function sortAlbums<T extends (typeof albums)[number]>(items: T[], sort: 'title' | 'releaseDate') {
  return [...items].sort((first, second) => {
    if (sort === 'title') return first.title.localeCompare(second.title);
    const firstDate = parseReleaseDate(first.releaseDate);
    const secondDate = parseReleaseDate(second.releaseDate);
    if (firstDate !== secondDate) return firstDate - secondDate;
    return first.title.localeCompare(second.title);
  });
}

function parseReleaseDate(value?: string) {
  if (!value) return Number.POSITIVE_INFINITY;
  const [dayPart, monthPart, yearPart] = value.split('/');
  const day = Number.parseInt(dayPart, 10);
  const month = Number.parseInt(monthPart, 10);
  const year = Number.parseInt(yearPart, 10);
  if (!day || !month || !year || month > 12 || day > 31) return Number.POSITIVE_INFINITY;
  return Date.UTC(year, month - 1, day);
}

const createStyles = (colors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
  content: { paddingHorizontal: pagePadding, paddingBottom: 34 },
  stickyHeader: { paddingHorizontal: pagePadding, backgroundColor: colors.background },
  resultsScroll: { flex: 1 },
  searchBox: { minHeight: 44, borderRadius: 13, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, marginBottom: 14 },
  searchGlyph: { color: colors.gold, fontSize: 24, lineHeight: 26, marginRight: 8 },
  searchInput: { flex: 1, color: colors.text, fontSize: 14, paddingVertical: 6 },
  clear: { color: colors.gold, fontSize: 12, paddingLeft: 8, fontWeight: '700' },
  sectionTop: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 11 },
  sectionTitle: { color: colors.text, fontSize: 13, fontWeight: '900', letterSpacing: 1.4 },
  sectionNote: { color: colors.muted, fontSize: 12 },
  sortRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  sortLabel: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  sortOptions: { flexDirection: 'row', padding: 3, borderRadius: 11, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  sortOption: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8 },
  sortOptionActive: { backgroundColor: colors.surfaceRaised },
  sortOptionText: { color: colors.muted, fontSize: 11, fontWeight: '700' },
  sortOptionTextActive: { color: colors.gold },
  resultTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 3, marginBottom: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', columnGap: 12 },
  gridItem: { minWidth: 0 },
  emptySearch: { color: colors.muted, textAlign: 'center', paddingVertical: 40, lineHeight: 22 },
});
