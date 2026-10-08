import { useColorScheme } from 'react-native';

export type AppColors = {
  background: string;
  surface: string;
  surfaceRaised: string;
  text: string;
  muted: string;
  gold: string;
  orange: string;
  purple: string;
  border: string;
  danger: string;
  coverBackground: string;
  quoteBackground: string;
  quoteBorder: string;
  tabBackground: string;
  brandAccent: string;
  scrim: string;
};

const palettes: Record<'light' | 'dark', AppColors> = {
  dark: {
    background: '#101014', surface: '#1A1A20', surfaceRaised: '#24232B',
    text: '#F7F1E7', muted: '#AAA5A0', gold: '#F0B64D', orange: '#E87936',
    purple: '#613D78', border: '#37343A', danger: '#F07A75',
    coverBackground: '#121116', quoteBackground: '#2C2231', quoteBorder: '#4B3653',
    tabBackground: '#17171C', brandAccent: '#F28B82', scrim: 'rgba(0,0,0,0.62)',
  },
  light: {
    background: '#F7F3EC', surface: '#FFFCF7', surfaceRaised: '#FFFFFF',
    text: '#2E2924', muted: '#766D63', gold: '#89590F', orange: '#C65D27',
    purple: '#735981', border: '#DED6CA', danger: '#B8423D',
    coverBackground: '#E9E2D8', quoteBackground: '#F0E9F1', quoteBorder: '#D8CBDC',
    tabBackground: '#FFFCF7', brandAccent: '#C75155', scrim: 'rgba(32,25,20,0.42)',
  },
};

export function useThemeColors(): AppColors {
  const scheme = useColorScheme();
  return palettes[scheme === 'dark' ? 'dark' : 'light'];
}

export const pagePadding = 20;
