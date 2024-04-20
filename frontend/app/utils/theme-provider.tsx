import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import dynamic from 'next/dynamic';
import type { ThemeProviderProps } from 'next-themes/dist/types';

const NoSSRNextThemesProvider = dynamic(() => import('next-themes').then(mod => mod.ThemeProvider), {
  ssr: false,
});

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NoSSRNextThemesProvider {...props}>{children}</NoSSRNextThemesProvider>;
}
