import { router } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BrandHeader } from '../../components/BrandHeader';
import { Page } from '../../components/Page';
import { SongRow } from '../../components/SongRow';
import { tracks } from '../../data/catalog';
import { useFavorites } from '../../hooks/FavoritesContext';
import { pagePadding, useThemeColors } from '../../theme';

export default function FavoritesScreen() {
  const colors = useThemeColors();
  const styles = createStyles(colors);
  const { favoriteIds, favoritesReady, isFavorite, toggleFavorite } = useFavorites();
  const favoriteTracks = useMemo(() => tracks.filter((track) => favoriteIds.includes(track.id)), [favoriteIds]);
  const openTrack = (songId: string) => router.push({ pathname: '/song/[songId]', params: { songId } });

  return (
    <Page>
      <View style={styles.fixedHeader}>
        <BrandHeader eyebrow="SAVED ON THIS PHONE" />
      </View>
      <ScrollView style={styles.contentScroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Your favourites</Text>
      <Text style={styles.subtitle}>Keep the songs you want close.</Text>
      {!favoritesReady ? (
        <Text style={styles.empty}>Loading your saved songs…</Text>
      ) : favoriteTracks.length === 0 ? (
        <View style={styles.emptyCard}>
          <FontAwesome name="heart-o" size={42} color={colors.gold} style={styles.emptyHeart} />
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
      </ScrollView>
    </Page>
  );
}

const createStyles = (colors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
  fixedHeader: { paddingHorizontal: pagePadding },
  contentScroll: { flex: 1 },
  content: { paddingHorizontal: pagePadding, paddingBottom: 32 },
  title: { color: colors.text, fontSize: 30, fontWeight: '900', marginTop: 3 },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 5, marginBottom: 25 },
  list: { marginTop: 8 },
  emptyCard: { alignItems: 'center', backgroundColor: colors.surface, borderRadius: 18, padding: 25, marginTop: 18 },
  emptyHeart: { marginBottom: 12 },
  emptyTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginBottom: 8 },
  empty: { color: colors.muted, textAlign: 'center', lineHeight: 21, paddingVertical: 20 },
});
