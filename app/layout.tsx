import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pastel Profile Studio',
  description: 'Generate pastel profile avatars with initials and gender-aware palettes.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
