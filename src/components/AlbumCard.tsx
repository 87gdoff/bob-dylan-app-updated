import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import type { Album } from "../data/catalog";
import { getCover } from "../data/covers";
import { colors } from "../theme";

export function AlbumCard({
  album,
  onPress,
}: {
  album: Album;
  onPress: () => void;
}) {
  const source = getCover(album.cover);
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.coverFrame}>
        {source ? (
          <Image source={source} style={styles.cover} resizeMode="contain" />
        ) : (
          <View style={styles.coverFallback}>
            <Text style={styles.fallbackText}>{album.title.slice(0, 1)}</Text>
          </View>
        )}
      </View>
      <Text numberOfLines={2} style={styles.title}>
        {album.title}
      </Text>
      <Text style={styles.count}>{album.tracks.length} songs</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    minWidth: 0,
    padding: 8,
    marginBottom: 12,
    backgroundColor: colors.surface,
  },
  pressed: { opacity: 0.78, transform: [{ scale: 0.985 }] },
  coverFrame: {
    width: "100%",
    aspectRatio: 1,
    overflow: "hidden",
    backgroundColor: "#121116",
  },
  cover: { width: "100%", height: "100%" },
  coverFallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.purple,
  },
  fallbackText: { color: colors.text, fontSize: 54, fontWeight: "900" },
  title: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "800",
    marginTop: 9,
    minHeight: 36,
  },
  count: { color: colors.muted, fontSize: 11, marginTop: 1 },
});
