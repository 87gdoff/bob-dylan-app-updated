import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useThemeColors } from '../theme';

const guideItems = [
  { icon: 'format-quote-close', title: 'A line from the songbook', detail: 'The home screen quote is a short, randomly chosen lyric excerpt. Tap an album to explore the songs.', iconSet: 'material' },
  { icon: 'heart-outline', title: 'Keep favourites close', detail: 'Tap the heart beside a song to save it to Favourites on this device.', iconSet: 'material' },
  { icon: 'music', title: 'Listen your way', detail: 'Tap the music button beside a song to search for it in Spotify, YouTube, Amazon Music, or Apple Music.', iconSet: 'material' },
  { icon: 'share', title: 'Share a song', detail: 'On a lyrics page, tap the share icon to send the song details to another app.', iconSet: 'fontawesome' },
] as const;

export function QuickGuide({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const colors = useThemeColors();
  const styles = createStyles(colors);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.eyebrow}>A QUICK GUIDE</Text>
          <Text style={styles.heading}>Make yourself at home</Text>
          <Text style={styles.intro}>A few handy things to know about the songbook.</Text>
          <ScrollView style={styles.items} showsVerticalScrollIndicator={false}>
            {guideItems.map((item) => (
              <View key={item.title} style={styles.item}>
                <View style={styles.iconWrap}>
                  {item.iconSet === 'fontawesome' ? (
                    <FontAwesome name="share" size={19} color={colors.gold} />
                  ) : (
                    <MaterialCommunityIcons name={item.icon} size={21} color={colors.gold} />
                  )}
                </View>
                <View style={styles.itemCopy}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.detail}>{item.detail}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <Pressable accessibilityRole="button" onPress={onClose} style={({ pressed }) => [styles.doneButton, pressed && styles.pressed]}>
            <Text style={styles.doneText}>Got it</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (colors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: colors.scrim },
  sheet: { maxHeight: '88%', backgroundColor: colors.surface, borderRadius: 24, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 22, paddingTop: 12, paddingBottom: 20 },
  handle: { width: 38, height: 4, borderRadius: 2, backgroundColor: colors.muted, opacity: 0.55, alignSelf: 'center', marginBottom: 20 },
  eyebrow: { color: colors.gold, fontSize: 10, fontWeight: '900', letterSpacing: 2 },
  heading: { color: colors.text, fontSize: 23, fontWeight: '900', marginTop: 7 },
  intro: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 6 },
  items: { marginTop: 12, flexGrow: 0 },
  item: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 12, borderTopWidth: 1, borderTopColor: colors.border },
  iconWrap: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.surfaceRaised, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  itemCopy: { flex: 1, paddingTop: 1 },
  itemTitle: { color: colors.text, fontSize: 14, fontWeight: '800' },
  detail: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 4 },
  doneButton: { minHeight: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 14, backgroundColor: colors.gold, marginTop: 12 },
  doneText: { color: colors.background, fontSize: 15, fontWeight: '900' },
  pressed: { opacity: 0.8 },
});
