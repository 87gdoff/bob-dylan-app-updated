import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FavoritesProvider } from '../hooks/FavoritesContext';
import { useThemeColors } from '../theme';

export default function RootLayout() {
  const colors = useThemeColors();
  const colorScheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="album/[albumId]" />
          <Stack.Screen name="song/[songId]" />
        </Stack>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
