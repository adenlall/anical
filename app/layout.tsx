import { AniListProvider } from '@/components/providers/AniListProvider';
import './globals.css'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AniListProvider>{children}</AniListProvider>
      </body>
    </html>
  );
}