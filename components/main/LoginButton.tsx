'use client';

import { useAniList } from '../providers/AniListProvider';

export default function LoginButton() {
  const { token, login, logout } = useAniList();

  return (
    <button
      onClick={token ? logout : login}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      {token ? 'Logout' : 'Login with AniList'}
    </button>
  );
}