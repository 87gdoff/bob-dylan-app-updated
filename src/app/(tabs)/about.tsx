import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { BrandHeader } from '../../components/BrandHeader';
import { ScrollPage } from '../../components/Page';
import { colors } from '../../theme';

export default function AboutScreen() {
  return (
    <ScrollPage>
      <BrandHeader eyebrow="ABOUT THIS APP" />
      <View style={styles.hero}>
        <Image source={require('../../../assets/icon.png')} style={styles.icon} />
        <Text style={styles.title}>A reader for the songs.</Text>
        <Text style={styles.body}>Browse Bob Dylan albums, search songs, and keep a personal list of favourites.</Text>
      </View>
      <View style={styles.quoteCard}>
        <Text style={styles.quote}>“I consider myself a poet first and a musician second.”</Text>
        <Text style={styles.attribution}>— Bob Dylan</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Made for offline reading</Text>
        <Text style={styles.body}>The album catalogue and lyrics are included in the app, so you can read them without an internet connection. Favourites are saved on this device.</Text>
      </View>
      <Text style={styles.footer}>Bob Dylan Lyrics · 2026</Text>
    </ScrollPage>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', backgroundColor: colors.surface, borderRadius: 20, padding: 24, marginTop: 8 },
  icon: { width: 100, height: 100, borderRadius: 24, marginBottom: 18 },
  title: { color: colors.text, fontSize: 23, lineHeight: 29, fontWeight: '900', textAlign: 'center' },
  body: { color: colors.muted, fontSize: 14, lineHeight: 22, textAlign: 'center', marginTop: 10 },
  quoteCard: { borderRadius: 18, backgroundColor: '#2C2231', borderWidth: 1, borderColor: '#4B3653', padding: 22, marginTop: 16 },
  quote: { color: colors.text, fontFamily: 'Georgia', fontSize: 19, lineHeight: 29, fontStyle: 'italic' },
  attribution: { color: colors.gold, fontSize: 12, fontWeight: '800', textAlign: 'right', marginTop: 12 },
  infoCard: { borderRadius: 18, backgroundColor: colors.surface, padding: 20, marginTop: 16 },
  cardTitle: { color: colors.text, fontSize: 16, fontWeight: '800' },
  footer: { color: colors.muted, textAlign: 'center', fontSize: 11, marginTop: 26, marginBottom: 8 },
});
