import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { useRef } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Page } from "../../components/Page";
import { ListenButton } from "../../components/ListenButton";
import { findTrack } from "../../data/catalog";
import { useFavorites } from "../../hooks/FavoritesContext";
import { pagePadding, useThemeColors } from "../../theme";

export default function SongScreen() {
  const colors = useThemeColors();
  const styles = createStyles(colors);
  const { songId, quoteStart, quoteCount } = useLocalSearchParams<{ songId: string; quoteStart?: string; quoteCount?: string }>();
  const track = findTrack(Array.isArray(songId) ? songId[0] : songId);
  const { isFavorite, toggleFavorite } = useFavorites();
  const [lyricFontSize, setLyricFontSize] = useState(17);
  const lyricsScroll = useRef<ScrollView>(null);
  const quoteScrolled = useRef(false);

  if (!track)
    return (
      <Page>
        <Text style={styles.missing}>Song not found.</Text>
      </Page>
    );
  const favorite = isFavorite(track.id);
  const lyricLines = track.lyrics
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  const requestedStart = Number.parseInt(Array.isArray(quoteStart) ? quoteStart[0] : quoteStart ?? '', 10);
  const requestedCount = Number.parseInt(Array.isArray(quoteCount) ? quoteCount[0] : quoteCount ?? '', 10);
  const hasQuote = Number.isInteger(requestedStart) && requestedStart >= 0 && Number.isInteger(requestedCount) && requestedCount > 0;
  const quoteEnd = hasQuote ? Math.min(requestedStart + requestedCount, lyricLines.length) : -1;

  return (
    <Page>
      <View style={styles.toolbar}>
          <View style={styles.toolbarLeft}>
            <Pressable
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              style={styles.backButton}
            >
              <FontAwesome name="arrow-left" size={21} color={colors.gold} />
            </Pressable>
            <View style={styles.fontControls}>
              <Pressable
                onPress={() =>
                  setLyricFontSize((size) => Math.max(13, size - 2))
                }
                accessibilityRole="button"
                accessibilityLabel="Decrease lyrics font size"
                style={styles.fontAdjustButton}
              >
                <FontAwesome name="minus" size={12} color={colors.gold} />
              </Pressable>
              <FontAwesome
                name="text-height"
                size={14}
                color={colors.text}
                accessibilityLabel="Text size"
              />
              <Pressable
                onPress={() =>
                  setLyricFontSize((size) => Math.min(27, size + 2))
                }
                accessibilityRole="button"
                accessibilityLabel="Increase lyrics font size"
                style={styles.fontAdjustButton}
              >
                <FontAwesome name="plus" size={12} color={colors.gold} />
              </Pressable>
            </View>
          </View>
          <View style={styles.toolbarActions}>
            <Pressable
              onPress={() => toggleFavorite(track.id)}
              accessibilityRole="button"
              accessibilityLabel={
                favorite ? "Remove from favourites" : "Add to favourites"
              }
              style={styles.actionButton}
            >
              <FontAwesome
                name={favorite ? "heart" : "heart-o"}
                size={20}
                color={favorite ? colors.orange : colors.muted}
              />
            </Pressable>
            <Pressable
              onPress={() =>
                void Share.share({
                  title: track.title,
                  message: `${track.title} — ${track.albumTitle}\n\n${track.lyrics}`,
                })
              }
              accessibilityRole="button"
              accessibilityLabel="Share lyrics"
              style={styles.actionButton}
            >
              <FontAwesome name="share" size={20} color={colors.muted} />
            </Pressable>
          </View>
      </View>

      <View style={styles.titleBlock}>
        <Text style={styles.title}>{track.title.toLocaleUpperCase()}</Text>
        <View style={styles.listenDivider}>
          <View style={styles.dividerLine} />
          <ListenButton track={track} variant="inline" />
          <View style={styles.dividerLine} />
        </View>
      </View>

      <ScrollView
        ref={lyricsScroll}
        style={styles.lyricsScroll}
        contentContainerStyle={styles.lyricsContent}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {lyricLines.map((line, index) => {
            const isQuoted = hasQuote && index >= requestedStart && index < quoteEnd;
            return (
              <View
                key={`${index}-${line}`}
                onLayout={isQuoted && index === requestedStart && !quoteScrolled.current ? (event) => {
                  quoteScrolled.current = true;
                  lyricsScroll.current?.scrollTo({ y: Math.max(0, event.nativeEvent.layout.y - 48), animated: true });
                } : undefined}
                style={isQuoted ? styles.quotedLine : undefined}
              >
                <Text
                  selectable
                  style={[
                    styles.lyrics,
                    {
                      fontSize: lyricFontSize,
                      lineHeight: Math.round(lyricFontSize * 1.5) + 3,
                    },
                    isQuoted && styles.quotedText,
                  ]}
                >
                  {line}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </Page>
  );
}

const createStyles = (colors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
  lyricsScroll: { flex: 1 },
  lyricsContent: { paddingHorizontal: pagePadding, paddingBottom: 48 },
  toolbar: {
    minHeight: 50,
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toolbarLeft: { flexDirection: "row", alignItems: "center", gap: 3 },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  fontControls: {
    height: 34,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 11,
    paddingHorizontal: 2,
  },
  fontAdjustButton: {
    width: 28,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  toolbarActions: { flexDirection: "row", alignItems: "center", gap: 0 },
  actionButton: {
    width: 40,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  titleBlock: { alignItems: "center", marginTop: 26, marginBottom: 8 },
  title: {
    color: colors.gold,
    fontSize: 18,
    lineHeight: 18,
    fontWeight: "900",
    letterSpacing: 1.8,
    textAlign: "center",
  },
  listenDivider: { width: '100%', flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 13 },
  dividerLine: { flex: 1, height: 1, borderRadius: 1, backgroundColor: colors.orange, opacity: 0.8 },
  lyrics: {
    color: colors.text,
    fontFamily: "Georgia",
    fontSize: 17,
    lineHeight: 29,
    textAlign: "left",
    paddingHorizontal: 4,
  },
  quotedLine: { backgroundColor: colors.quoteBackground, borderLeftWidth: 3, borderLeftColor: colors.orange, borderRadius: 5, marginVertical: 1 },
  quotedText: { color: colors.gold },
  missing: { color: colors.text, padding: 24 },
});
