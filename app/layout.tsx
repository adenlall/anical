import { AniListProvider } from '@/components/providers/AniListProvider';
import './globals.css'
import { currentTheme } from '@/utils/themes';
import { cookies } from 'next/headers';
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  const theme = (await cookies()).get(currentTheme)?.value;
  return (
    <html data-theme={theme} lang="en">
      <body>
        <AniListProvider>{children}</AniListProvider>
      </body>
    </html>
  );
}