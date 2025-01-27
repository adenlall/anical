import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { fetchAniList } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return new Response('No code provided', { status: 400 });
  }

  try {
    const tokenResponse = await fetch('https://anilist.co/api/v2/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.ANILIST_CLIENT_ID,
        client_secret: process.env.ANILIST_CLIENT_SECRET,
        redirect_uri: process.env.ANILIST_REDIRECT_URI,
        code: code,
      }),
    });

    const data = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(data.error || 'Failed to get token');
    }

    // Set the cookie
    const cookieStore = await cookies();
    cookieStore.set('anilist_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 * 1, // 1 week
    });

    const userData = await fetchAniList<any>(
      `query {
        Viewer {
          id
          name
          avatar {
            large
          }
        }
      }`,
      {},
      data.access_token
    );
    const viewer = userData.data.Viewer;  
    cookieStore.set('user', JSON.stringify({name:viewer.name, id:viewer.id, avatar:viewer.avatar.large}), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 * 4, // 4 week
    });

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/profile',
      },
    });
  } catch (error) {
    console.error('Token exchange error:', error);
    return new Response('Authentication failed', { status: 500 });
  }
}