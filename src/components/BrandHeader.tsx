import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function BrandHeader({ eyebrow = 'THE SONGBOOK' }: { eyebrow?: string }) {
  return (
    <View style={styles.row}>
      <Image source={require('../../assets/icon.png')} style={styles.icon} />
      <View>
        <Text style={styles.title}>Bob Dylan Lyrics</Text>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8, marginBottom: 24 },
  icon: { width: 48, height: 48, borderRadius: 12 },
  title: { color: colors.text, fontSize: 19, fontWeight: '800', letterSpacing: 0.2 },
  eyebrow: { color: colors.gold, fontSize: 10, fontWeight: '800', letterSpacing: 2.4, marginTop: 3 },
});
