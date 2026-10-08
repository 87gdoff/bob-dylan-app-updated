import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { tracks } from '../data/catalog';
import { useThemeColors } from '../theme';

function pickLyricExcerpt() {
  // Avoid sorting and splitting the full lyric catalog during the home screen's
  // initial render. A handful of random candidates is enough to find an excerpt.
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const track = tracks[Math.floor(Math.random() * tracks.length)];
    const lines = track.lyrics.split(/\n+/).map((line) => line.trim()).filter(Boolean);
    const start = Math.floor(Math.random() * lines.length);
    const lineCount = 2 + Math.floor(Math.random() * 2);
    const excerptLines = lines.slice(start, start + lineCount);
    const excerpt = excerptLines.join(' ');
    if (excerpt.length >= 18 && excerpt.length <= 240) {
      return { text: excerpt, song: track.title, trackId: track.id, lineStart: start, lineCount: excerptLines.length };
    }
  }

  return { text: 'Explore the songbook and discover a line that stays with you.', song: 'Bob Dylan Lyrics', trackId: '', lineStart: 0, lineCount: 0 };
}

export function RandomLyricQuote() {
  const excerpt = useMemo(pickLyricExcerpt, []);
  const colors = useThemeColors();
  const styles = createStyles(colors);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${excerpt.song} at the quoted lyrics`}
      disabled={!excerpt.trackId}
      onPress={() => router.push({
        pathname: '/song/[songId]',
        params: { songId: excerpt.trackId, quoteStart: String(excerpt.lineStart), quoteCount: String(excerpt.lineCount) },
      })}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Text style={styles.quote}>{excerpt.text}</Text>
      <Text style={styles.attribution}>— {excerpt.song} —</Text>
    </Pressable>
  );
}

const createStyles = (colors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
  card: { borderRadius: 18, backgroundColor: colors.quoteBackground, borderWidth: 1, borderColor: colors.quoteBorder, padding: 20, marginBottom: 18 },
  pressed: { opacity: 0.78 },
  quote: { color: colors.text, fontFamily: 'Georgia', fontSize: 17, lineHeight: 25, fontStyle: 'italic' },
  attribution: { color: colors.gold, fontSize: 12, fontWeight: '800', textAlign: 'center', marginTop: 12 },
});
