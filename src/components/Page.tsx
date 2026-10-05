import React from 'react';
import { ScrollView, StyleSheet, View, type ScrollViewProps, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, pagePadding } from '../theme';

type PageProps = ViewProps;
type ScrollPageProps = ScrollViewProps;

export function Page({ children, style, ...props }: PageProps) {
  return (
    <SafeAreaView edges={['top']} style={styles.page}>
      <View {...props} style={[styles.content, style]}>{children}</View>
    </SafeAreaView>
  );
}

export function ScrollPage({ children, contentContainerStyle, ...props }: ScrollPageProps) {
  return (
    <SafeAreaView edges={['top']} style={styles.page}>
      <ScrollView
        {...props}
        contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1 },
  scrollContent: { paddingHorizontal: pagePadding, paddingBottom: 32 },
});
