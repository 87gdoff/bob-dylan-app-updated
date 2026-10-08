import { router, useLocalSearchParams } from 'expo-router';
import React, { useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SongRow } from '../../components/SongRow';
import { findAlbum, tracks } from '../../data/catalog';
import { getCover } from '../../data/covers';
import { useFavorites } from '../../hooks/FavoritesContext';
import { pagePadding, useThemeColors } from '../../theme';
import { Page } from '../../components/Page';

export default function AlbumScreen() {
  const colors = useThemeColors();
  const styles = createStyles(colors);
  const { albumId } = useLocalSearchParams<{ albumId: string }>();
  const album = findAlbum(Array.isArray(albumId) ? albumId[0] : albumId);
  const { isFavorite, toggleFavorite } = useFavorites();
  const scrollY = useRef(new Animated.Value(0)).current;
  const compactTitleOpacity = scrollY.interpolate({
    inputRange: [105, 145],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  if (!album) return <Page><Text style={styles.missing}>Album not found.</Text></Page>;
  const cover = getCover(album.cover);
  const albumTracks = tracks.filter((track) => track.albumId === album.id);

  return (
    <Page>
      <View style={styles.fixedCover}>
        <Pressable onPress={() => router.back()} accessibilityRole="button" style={styles.back}>
          <Text style={styles.backText}>‹  All albums</Text>
        </Pressable>
        <View style={styles.albumHero}>
          {cover ? <Image source={cover} style={styles.cover} resizeMode="contain" /> : <View style={[styles.cover, styles.coverEmpty]}><Text style={styles.initial}>{album.title[0]}</Text></View>}
        </View>
      </View>
      <View style={styles.trackScroll}>
        <Animated.View pointerEvents="none" style={[styles.compactTitle, { opacity: compactTitleOpacity }]}>
          <Text numberOfLines={1} style={styles.compactTitleText}>{album.title}</Text>
        </Animated.View>
        <Animated.ScrollView
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
          scrollEventThrottle={16}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
        <View style={styles.albumCopy}>
          <Text style={styles.kicker}>ALBUM</Text>
          <Text style={styles.albumTitle}>{album.title}</Text>
          {album.releaseDate ? <Text style={styles.release}>Released {album.releaseDate}</Text> : null}
          <Text style={styles.songCount}>{album.tracks.length} songs</Text>
        </View>
        <View style={styles.trackHeading}>
          <Text style={styles.trackHeadingTitle}>TRACKLIST</Text>
          <Text style={styles.trackHeadingNote}>Tap a song to read</Text>
        </View>
        {albumTracks.map((track, index) => (
          <View key={track.id} style={styles.trackRow}>
            <Text style={styles.trackNumber}>{String(index + 1).padStart(2, '0')}</Text>
            <View style={styles.trackContent}>
              <SongRow
                track={track}
                onPress={() => router.push({ pathname: '/song/[songId]', params: { songId: track.id } })}
                favorite={isFavorite(track.id)}
                onToggleFavorite={() => toggleFavorite(track.id)}
                showAlbum={false}
              />
            </View>
          </View>
        ))}
        </Animated.ScrollView>
      </View>
    </Page>
  );
}

const createStyles = (colors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
  fixedCover: { paddingHorizontal: pagePadding },
  trackScroll: { flex: 1, position: 'relative' },
  compactTitle: { position: 'absolute', top: 0, left: 0, right: 0, height: 48, zIndex: 2, justifyContent: 'center', paddingHorizontal: pagePadding, backgroundColor: colors.background, borderBottomWidth: 1, borderBottomColor: colors.border },
  compactTitleText: { color: colors.text, fontSize: 16, fontWeight: '900' },
  content: { paddingHorizontal: pagePadding, paddingBottom: 36 },
  back: { alignSelf: 'flex-start', paddingVertical: 12, paddingRight: 12 },
  backText: { color: colors.gold, fontSize: 14, fontWeight: '800' },
  albumHero: { alignItems: 'center', marginTop: 2, marginBottom: 10 },
  cover: { width: 214, height: 214, borderRadius: 15, backgroundColor: colors.coverBackground },
  coverEmpty: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.purple },
  initial: { color: colors.text, fontSize: 80, fontWeight: '900' },
  albumCopy: { alignItems: 'center', marginTop: 10, marginBottom: 16, maxWidth: '100%' },
  kicker: { color: colors.gold, fontSize: 10, fontWeight: '900', letterSpacing: 2.4, marginBottom: 7 },
  albumTitle: { color: colors.text, fontSize: 26, fontWeight: '900', textAlign: 'center' },
  release: { color: colors.muted, fontSize: 12, marginTop: 7 },
  songCount: { color: colors.muted, fontSize: 12, marginTop: 6 },
  trackHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 },
  trackHeadingTitle: { color: colors.text, fontSize: 12, fontWeight: '900', letterSpacing: 1.7 },
  trackHeadingNote: { color: colors.muted, fontSize: 11 },
  trackRow: { flexDirection: 'row', alignItems: 'center' },
  trackNumber: { width: 27, color: colors.muted, fontSize: 10, fontWeight: '800' },
  trackContent: { flex: 1 },
  missing: { color: colors.text, padding: 24 },
});
