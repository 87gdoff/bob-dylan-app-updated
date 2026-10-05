import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FavoritesProvider } from '../hooks/FavoritesContext';
import { colors } from '../theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="album/[albumId]" />
          <Stack.Screen name="song/[songId]" />
        </Stack>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
