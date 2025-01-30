import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import gql from 'graphql-tag';
import { AuthApiQuery } from '@/lib/types/anilist';
import { Anilist } from '@/utils/anilist';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const age = 60 * 60 * 24 * 7 * 8;

  if (!code) {
    return new Response('No code provided', { status: 400 });
  }

  try {
    // console.log(" ==================> code ==> ", code);
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

    // console.log(" ==================> token ==> ", data);


    const cookieStore = await cookies();
    cookieStore.set('anilist_token', data.access_token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: age, // 8 week
    });

    const userData = await Anilist<AuthApiQuery>(
      gql`query AuthAPI{
        Viewer {
          id
          name
          avatar {
            large
          }
        }
      }`,
    );
    const viewer = userData.Viewer;
    cookieStore.set('user', JSON.stringify({ name: viewer?.name, id: viewer?.id, avatar: viewer?.avatar?.large }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: age, // 4 week
    });
    cookieStore.set('anilist_id', String(viewer?.id), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: age, // 4 week
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