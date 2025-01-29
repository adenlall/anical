import { AniListProvider } from '@/components/providers/AniListProvider';
import './globals.css'
import NavBar from '@/components/main/NavBar';
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