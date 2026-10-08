import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Linking from 'expo-linking';
import type { CatalogTrack } from '../data/catalog';
import { useThemeColors } from '../theme';

export function ListenButton({ track, variant = 'icon' }: { track: CatalogTrack; variant?: 'icon' | 'label' | 'inline' }) {
  const colors = useThemeColors();
  const styles = createStyles(colors);
  const [servicePickerVisible, setServicePickerVisible] = useState(false);
  const searchQuery = `${track.title} Bob Dylan ${track.albumTitle}`;
  const services = [
    { name: 'Spotify', icon: '≋', background: '#1DB954', foreground: '#102016', url: `https://open.spotify.com/search/${encodeURIComponent(searchQuery)}` },
    { name: 'YouTube', icon: '▶', background: '#FF0033', foreground: '#FFFFFF', url: `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}` },
    { name: 'Amazon Music', icon: 'a', background: '#25C4D8', foreground: '#102016', url: `https://music.amazon.com/search/${encodeURIComponent(searchQuery)}` },
    { name: 'Apple Music', icon: '♫', background: '#D95285', foreground: '#FFFFFF', url: `https://music.apple.com/us/search?term=${encodeURIComponent(searchQuery)}` },
  ];

  const openService = async (url: string) => {
    setServicePickerVisible(false);
    try {
      await Linking.openURL(url);
    } catch {
      // Keep the lyrics screen open if the service link cannot be opened.
    }
  };

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Choose a music service to search for ${track.title}`}
        onPress={(event) => {
          event.stopPropagation();
          setServicePickerVisible(true);
        }}
        hitSlop={6}
        style={({ pressed }) => [variant === 'icon' ? styles.iconButton : variant === 'label' ? styles.labelButton : styles.inlineButton, pressed && styles.buttonPressed]}
      >
        <FontAwesome name="music" size={variant === 'inline' ? 16 : 17} color={colors.gold} />
        {variant === 'label' ? <Text style={styles.listenLabel}>Listen</Text> : null}
      </Pressable>

      <Modal visible={servicePickerVisible} transparent animationType="fade" onRequestClose={() => setServicePickerVisible(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setServicePickerVisible(false)}>
          <Pressable style={styles.serviceSheet} onPress={() => {}}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Listen to</Text>
            <Text style={styles.sheetSong} numberOfLines={1}>{track.title}</Text>
            <Text style={styles.sheetAlbum} numberOfLines={1}>Bob Dylan · {track.albumTitle}</Text>
            <View style={styles.serviceList}>
              {services.map((service) => (
                <Pressable
                  key={service.name}
                  accessibilityRole="button"
                  onPress={() => void openService(service.url)}
                  style={({ pressed }) => [styles.serviceOption, pressed && styles.optionPressed]}
                >
                  <View style={[styles.serviceIcon, { backgroundColor: service.background }]}>
                    <Text style={[styles.serviceIconText, { color: service.foreground }]}>{service.icon}</Text>
                  </View>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.optionArrow}>↗</Text>
                </Pressable>
              ))}
            </View>
            <Text style={styles.sheetNote}>Opens a song search in your chosen music service.</Text>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const createStyles = (colors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
  iconButton: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.surfaceRaised, marginRight: 12, borderWidth: 1, borderColor: colors.border },
  labelButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: 10, height: 36 },
  inlineButton: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceRaised, borderWidth: 1, borderColor: colors.orange, shadowColor: colors.gold, shadowOpacity: 0.18, shadowRadius: 5, shadowOffset: { width: 0, height: 1 }, elevation: 3 },
  buttonPressed: { backgroundColor: colors.purple, opacity: 0.8 },
  listenLabel: { color: colors.text, fontSize: 13, fontWeight: '700' },
  modalBackdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: colors.scrim },
  serviceSheet: { backgroundColor: colors.surface, paddingHorizontal: 22, paddingTop: 12, paddingBottom: 28, borderTopLeftRadius: 26, borderTopRightRadius: 26, borderWidth: 1, borderColor: colors.border },
  sheetHandle: { width: 38, height: 4, borderRadius: 2, backgroundColor: colors.muted, opacity: 0.55, alignSelf: 'center', marginBottom: 22 },
  sheetTitle: { color: colors.text, fontSize: 20, fontWeight: '800' },
  sheetSong: { color: colors.text, fontSize: 15, fontWeight: '700', marginTop: 10 },
  sheetAlbum: { color: colors.muted, fontSize: 12, marginTop: 4 },
  serviceList: { marginTop: 18 },
  serviceOption: { minHeight: 58, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: colors.border },
  optionPressed: { opacity: 0.65 },
  serviceIcon: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 13 },
  serviceIconText: { fontSize: 19, fontWeight: '900' },
  serviceName: { flex: 1, color: colors.text, fontSize: 15, fontWeight: '600' },
  optionArrow: { color: colors.muted, fontSize: 18 },
  sheetNote: { color: colors.muted, fontSize: 11, marginTop: 12 },
});
