import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { CatalogTrack } from '../data/catalog';
import { colors } from '../theme';

export function SongRow({
  track,
  onPress,
  favorite = false,
  onToggleFavorite,
}: {
  track: CatalogTrack;
  onPress: () => void;
  favorite?: boolean;
  onToggleFavorite?: () => void;
}) {
  return (
    <View style={styles.row}>
      <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.main, pressed && styles.pressed]}>
        <View style={styles.number}><Text style={styles.numberText}>♪</Text></View>
        <View style={styles.copy}>
          <Text numberOfLines={1} style={styles.title}>{track.title}</Text>
          <Text numberOfLines={1} style={styles.album}>{track.albumTitle}</Text>
        </View>
      </Pressable>
      {onToggleFavorite ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={favorite ? `Remove ${track.title} from favourites` : `Add ${track.title} to favourites`}
          onPress={onToggleFavorite}
          hitSlop={10}
          style={styles.heartButton}
        >
          <Text style={[styles.heart, favorite && styles.heartActive]}>{favorite ? '♥' : '♡'}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 66, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.border },
  main: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  pressed: { opacity: 0.7 },
  number: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.surfaceRaised, marginRight: 12 },
  numberText: { color: colors.gold, fontSize: 18 },
  copy: { flex: 1, minWidth: 0 },
  title: { color: colors.text, fontSize: 15, fontWeight: '700' },
  album: { color: colors.muted, fontSize: 12, marginTop: 4 },
  heartButton: { width: 42, height: 46, justifyContent: 'center', alignItems: 'center' },
  heart: { color: colors.muted, fontSize: 25 },
  heartActive: { color: colors.orange },
});
