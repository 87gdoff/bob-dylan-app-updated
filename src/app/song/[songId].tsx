import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { Page } from '../../components/Page';
import { findTrack } from '../../data/catalog';
import { useFavorites } from '../../hooks/FavoritesContext';
import { colors, pagePadding } from '../../theme';

export default function SongScreen() {
  const { songId } = useLocalSearchParams<{ songId: string }>();
  const track = findTrack(Array.isArray(songId) ? songId[0] : songId);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!track) return <Page><Text style={styles.missing}>Song not found.</Text></Page>;
  const favorite = isFavorite(track.id);

  return (
    <Page>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.toolbar}>
          <Pressable onPress={() => router.back()} accessibilityRole="button" style={styles.backButton}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>
          <Text style={styles.toolbarLabel}>LYRICS</Text>
          <View style={styles.toolbarActions}>
            <Pressable onPress={() => toggleFavorite(track.id)} accessibilityRole="button" accessibilityLabel={favorite ? 'Remove from favourites' : 'Add to favourites'} style={styles.actionButton}>
              <Text style={[styles.heart, favorite && styles.heartActive]}>{favorite ? '♥' : '♡'}</Text>
            </Pressable>
            <Pressable
              onPress={() => void Share.share({ title: track.title, message: `${track.title} — ${track.albumTitle}\n\n${track.lyrics}` })}
              accessibilityRole="button"
              accessibilityLabel="Share lyrics"
              style={styles.actionButton}
            >
              <Text style={styles.share}>↗</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.album}>{track.albumTitle.toLocaleUpperCase()}</Text>
          <Text style={styles.title}>{track.title}</Text>
          <View style={styles.divider} />
        </View>
        <Text selectable style={styles.lyrics}>{track.lyrics}</Text>
        <View style={styles.endMark}><View style={styles.endLine} /><Text style={styles.endText}>BOB DYLAN</Text><View style={styles.endLine} /></View>
      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: pagePadding, paddingBottom: 48 },
  toolbar: { minHeight: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backButton: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface },
  backText: { color: colors.gold, fontSize: 31, lineHeight: 34 },
  toolbarLabel: { color: colors.gold, fontSize: 10, fontWeight: '900', letterSpacing: 2.5 },
  toolbarActions: { flexDirection: 'row' },
  actionButton: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center' },
  heart: { color: colors.muted, fontSize: 25 },
  heartActive: { color: colors.orange },
  share: { color: colors.muted, fontSize: 22 },
  titleBlock: { alignItems: 'center', marginTop: 26, marginBottom: 22 },
  album: { color: colors.gold, fontSize: 10, fontWeight: '900', letterSpacing: 1.8, textAlign: 'center' },
  title: { color: colors.text, fontFamily: 'Georgia', fontSize: 27, lineHeight: 35, fontWeight: '700', textAlign: 'center', marginTop: 9 },
  divider: { width: 44, height: 2, backgroundColor: colors.orange, marginTop: 18, borderRadius: 2 },
  lyrics: { color: colors.text, fontFamily: 'Georgia', fontSize: 17, lineHeight: 31, textAlign: 'center', paddingHorizontal: 6 },
  endMark: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 32 },
  endLine: { width: 30, height: 1, backgroundColor: colors.border },
  endText: { color: colors.muted, fontSize: 9, fontWeight: '800', letterSpacing: 2 },
  missing: { color: colors.text, padding: 24 },
});
