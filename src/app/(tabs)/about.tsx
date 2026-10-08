import React, { useState } from 'react';
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BrandHeader } from '../../components/BrandHeader';
import { Page } from '../../components/Page';
import { pagePadding, useThemeColors } from '../../theme';
import { QuickGuide } from '../../components/QuickGuide';

const WIKIPEDIA_URL = 'https://en.wikipedia.org/wiki/Bob_Dylan';
const PRIVACY_POLICY_URL = 'https://www.tingmoarts.in/project/69ba5333fe16a2de07d805dd/privacy-policy';

export default function AboutScreen() {
  const [guideVisible, setGuideVisible] = useState(false);
  const colors = useThemeColors();
  const styles = createStyles(colors);
  return (
    <Page>
      <View style={styles.fixedHeader}>
        <BrandHeader eyebrow="ABOUT" />
      </View>
      <ScrollView style={styles.contentScroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      <Text style={styles.title}>About Bob Dylan</Text>
      <Pressable accessibilityRole="button" onPress={() => setGuideVisible(true)} style={styles.guideLink}>
        <MaterialCommunityIcons name="help-circle-outline" size={19} color={colors.gold} />
        <Text style={styles.guideLinkText}>How to use this app</Text>
      </Pressable>
      <Text style={styles.bio}>Bob Dylan arrived in New York in the 1960s with a guitar, a harmonica, and a knack for singing songs that sounded as if he’d already lived through a few generations. His folk, blues, and rock writing helped redraw the boundaries of popular song. He describes himself as a “song and dance man.”</Text>
      <Text style={styles.bio}>The honors are almost a song list themselves: the Nobel Prize in Literature, an Oscar, 10 Grammy Awards plus the Recording Academy’s Lifetime Achievement Award, a Pulitzer Prize Special Citation, and the Presidential Medal of Freedom. Rolling Stone has ranked him No. 1 on its list of the greatest songwriters of all time.</Text>
      <Pressable accessibilityRole="link" onPress={() => Linking.openURL(WIKIPEDIA_URL)} style={styles.wikiLink}>
        <Text style={styles.wikiLinkText}>Read the full biography on Wikipedia</Text>
        <MaterialCommunityIcons name="open-in-new" size={16} color={colors.gold} />
      </Pressable>

      <View style={styles.aboutApp}>
        <Text style={styles.poweredBy}>Powered by</Text>
        <Image source={require('../../../assets/tingmoarts-logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.brandName}><Text style={styles.brandTingmo}>tingmo</Text><Text style={styles.brandArts}>Arts</Text></Text>
        <Text style={styles.body}>A personal passion project by TingmoArts, made as a songbook for Bob Dylan fans to browse and read the songs.</Text>
        <Text style={styles.body}>The songs and lyrics are Bob Dylan’s work and remain the property of their respective rights holders.</Text>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel="Read the privacy policy"
          onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}
          style={styles.privacyLink}
        >
          <Text style={styles.privacyLinkText}>Privacy Policy</Text>
          <MaterialCommunityIcons name="open-in-new" size={16} color={colors.gold} />
        </Pressable>
      </View>
      </ScrollView>
      <QuickGuide visible={guideVisible} onClose={() => setGuideVisible(false)} />
    </Page>
  );
}

const createStyles = (colors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
  fixedHeader: { paddingHorizontal: pagePadding },
  contentScroll: { flex: 1 },
  content: { paddingHorizontal: pagePadding, paddingBottom: 32 },
  title: { color: colors.text, fontSize: 22, fontWeight: '900', marginBottom: 12 },
  guideLink: { flexDirection: 'row', alignItems: 'center', gap: 7, alignSelf: 'flex-start', marginTop: -5, marginBottom: 12, paddingVertical: 4 },
  guideLinkText: { color: colors.gold, fontSize: 13, fontWeight: '800' },
  bio: { color: colors.muted, fontSize: 14, lineHeight: 23, marginBottom: 12 },
  albumTitle: { color: colors.text, fontStyle: 'italic', fontWeight: '700' },
  wikiLink: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 8, marginTop: 2, marginBottom: 8 },
  wikiLinkText: { color: colors.gold, fontSize: 13, fontWeight: '800' },
  aboutApp: { alignItems: 'center', marginTop: 24, paddingBottom: 8 },
  poweredBy: { color: colors.muted, fontSize: 12, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
  logo: { width: 124, height: 108 },
  brandName: { fontSize: 16, fontWeight: '900', letterSpacing: 1.2, marginTop: 2 },
  brandTingmo: { color: colors.text },
  brandArts: { color: colors.brandAccent },
  body: { color: colors.muted, fontSize: 14, lineHeight: 22, textAlign: 'center', marginTop: 10 },
  privacyLink: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 12, marginTop: 8 },
  privacyLinkText: { color: colors.gold, fontSize: 14, fontWeight: '800' },
});
