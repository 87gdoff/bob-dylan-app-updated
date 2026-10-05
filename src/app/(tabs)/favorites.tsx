import { router } from 'expo-router';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BrandHeader } from '../../components/BrandHeader';
import { ScrollPage } from '../../components/Page';
import { SongRow } from '../../components/SongRow';
import { tracks } from '../../data/catalog';
import { useFavorites } from '../../hooks/FavoritesContext';
import { colors } from '../../theme';

export default function FavoritesScreen() {
  const { favoriteIds, favoritesReady, isFavorite, toggleFavorite } = useFavorites();
  const favoriteTracks = useMemo(() => tracks.filter((track) => favoriteIds.includes(track.id)), [favoriteIds]);
  const openTrack = (songId: string) => router.push({ pathname: '/song/[songId]', params: { songId } });

  return (
    <ScrollPage>
      <BrandHeader eyebrow="SAVED ON THIS PHONE" />
      <Text style={styles.title}>Your favourites</Text>
      <Text style={styles.subtitle}>Keep the songs you want close.</Text>
      {!favoritesReady ? (
        <Text style={styles.empty}>Loading your saved songs…</Text>
      ) : favoriteTracks.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyHeart}>♡</Text>
          <Text style={styles.emptyTitle}>No favourites yet</Text>
          <Text style={styles.empty}>Tap the heart beside a song to save it here. Your list stays on this device.</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {favoriteTracks.map((track) => (
            <SongRow key={track.id} track={track} onPress={() => openTrack(track.id)} favorite={isFavorite(track.id)} onToggleFavorite={() => toggleFavorite(track.id)} />
          ))}
        </View>
      )}
    </ScrollPage>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 30, fontWeight: '900', marginTop: 3 },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 5, marginBottom: 25 },
  list: { marginTop: 8 },
  emptyCard: { alignItems: 'center', backgroundColor: colors.surface, borderRadius: 18, padding: 25, marginTop: 18 },
  emptyHeart: { fontSize: 50, color: colors.gold, marginBottom: 8 },
  emptyTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginBottom: 8 },
  empty: { color: colors.muted, textAlign: 'center', lineHeight: 21, paddingVertical: 20 },
});
