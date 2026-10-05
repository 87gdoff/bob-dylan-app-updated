import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { colors } from '../../theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: '#17171C', borderTopColor: colors.border, height: 62, paddingTop: 7, paddingBottom: 6 },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '700' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Albums', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 19 }}>▦</Text> }} />
      <Tabs.Screen name="favorites" options={{ title: 'Favourites', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 19 }}>♥</Text> }} />
      <Tabs.Screen name="about" options={{ title: 'About', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 19 }}>ⓘ</Text> }} />
    </Tabs>
  );
}
