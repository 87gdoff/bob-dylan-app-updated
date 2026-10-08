import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ListenButton } from './ListenButton';
import type { CatalogTrack } from '../data/catalog';
import { useThemeColors } from '../theme';

export function SongRow({
  track,
  onPress,
  favorite = false,
  onToggleFavorite,
  showAlbum = true,
}: {
  track: CatalogTrack;
  onPress: () => void;
  favorite?: boolean;
  onToggleFavorite?: () => void;
  showAlbum?: boolean;
}) {
  const colors = useThemeColors();
  const styles = createStyles(colors);
  return (
    <View style={styles.row}>
      <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.main, pressed && styles.pressed]}>
        <ListenButton track={track} />
        <View style={styles.copy}>
          <Text numberOfLines={1} style={styles.title}>{track.title}</Text>
          {showAlbum ? <Text numberOfLines={1} style={styles.album}>{track.albumTitle}</Text> : null}
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
          <FontAwesome name={favorite ? 'heart' : 'heart-o'} size={19} color={favorite ? colors.orange : colors.muted} />
        </Pressable>
      ) : null}
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
  row: { minHeight: 66, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.border },
  main: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  pressed: { opacity: 0.7 },
  copy: { flex: 1, minWidth: 0 },
  title: { color: colors.text, fontSize: 15, fontWeight: '700' },
  album: { color: colors.muted, fontSize: 12, marginTop: 4 },
  heartButton: { width: 42, height: 46, justifyContent: 'center', alignItems: 'center' },
});
