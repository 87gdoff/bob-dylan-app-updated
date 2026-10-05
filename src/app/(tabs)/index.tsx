import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { AlbumCard } from '../../components/AlbumCard';
import { BrandHeader } from '../../components/BrandHeader';
import { SongRow } from '../../components/SongRow';
import { albums, tracks } from '../../data/catalog';
import { useFavorites } from '../../hooks/FavoritesContext';
import { colors, pagePadding } from '../../theme';
import { Page } from '../../components/Page';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const { isFavorite, toggleFavorite } = useFavorites();
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

  const openAlbum = (albumId: string) => router.push({ pathname: '/album/[albumId]', params: { albumId } });
  const openTrack = (songId: string) => router.push({ pathname: '/song/[songId]', params: { songId } });

  return (
    <Page>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <BrandHeader />
        <View style={styles.intro}>
          <Text style={styles.kicker}>A BOOK OF POETRY, WITH MUSIC</Text>
          <Text style={styles.heading}>Find the song.{ '\n' }Stay with the words.</Text>
          <Text style={styles.subheading}>{albums.length} albums · {tracks.length} songs · all available offline</Text>
        </View>

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

        {normalizedQuery ? (
          <>
            {matchingAlbums.length > 0 ? (
              <>
                <SectionTitle title="ALBUMS" count={matchingAlbums.length} />
                <View style={styles.grid}>
                  {matchingAlbums.map((album) => (
                    <View key={album.id} style={styles.gridItem}>
                      <AlbumCard album={album} onPress={() => openAlbum(album.id)} />
                    </View>
                  ))}
                </View>
              </>
            ) : null}
            {matchingTracks.length > 0 ? (
              <>
                <SectionTitle title="SONGS" count={matchingTracks.length} />
                {matchingTracks.map((track) => (
                  <SongRow key={track.id} track={track} onPress={() => openTrack(track.id)} favorite={isFavorite(track.id)} onToggleFavorite={() => toggleFavorite(track.id)} />
                ))}
              </>
            ) : null}
            {matchingAlbums.length === 0 && matchingTracks.length === 0 ? (
              <Text style={styles.emptySearch}>No songs or albums found for “{query}”.</Text>
            ) : null}
          </>
        ) : (
          <>
            <View style={styles.sectionTop}>
              <Text style={styles.sectionTitle}>THE ALBUMS</Text>
              <Text style={styles.sectionNote}>Browse the collection</Text>
            </View>
            <View style={styles.grid}>
              {albums.map((album) => (
                <View key={album.id} style={styles.gridItem}>
                  <AlbumCard album={album} onPress={() => openAlbum(album.id)} />
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </Page>
  );
}

function SectionTitle({ title, count }: { title: string; count: number }) {
  return (
    <View style={styles.resultTitleRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionNote}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: pagePadding, paddingBottom: 34 },
  intro: { marginBottom: 20 },
  kicker: { color: colors.gold, fontSize: 10, fontWeight: '900', letterSpacing: 2.2, marginBottom: 9 },
  heading: { color: colors.text, fontSize: 31, lineHeight: 37, fontWeight: '900', letterSpacing: -0.7 },
  subheading: { color: colors.muted, fontSize: 12, marginTop: 9 },
  searchBox: { minHeight: 52, borderRadius: 15, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, marginBottom: 25 },
  searchGlyph: { color: colors.gold, fontSize: 28, lineHeight: 30, marginRight: 9 },
  searchInput: { flex: 1, color: colors.text, fontSize: 15, paddingVertical: 10 },
  clear: { color: colors.gold, fontSize: 12, paddingLeft: 8, fontWeight: '700' },
  sectionTop: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 11 },
  sectionTitle: { color: colors.text, fontSize: 13, fontWeight: '900', letterSpacing: 1.4 },
  sectionNote: { color: colors.muted, fontSize: 12 },
  resultTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 3, marginBottom: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { width: '48.3%' },
  emptySearch: { color: colors.muted, textAlign: 'center', paddingVertical: 40, lineHeight: 22 },
});
