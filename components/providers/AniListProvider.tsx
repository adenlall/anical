'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AniListContextType {
  token: string | null;
  login: () => void;
  logout: () => void;
}

const AniListContext = createContext<AniListContextType>({
  token: null,
  login: () => {},
  logout: () => {},
});

export function AniListProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for token in localStorage on mount
    const storedToken = localStorage.getItem('anilist_token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = () => {
    const clientId = process.env.NEXT_PUBLIC_ANILIST_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      `${window.location.origin}/api/auth/callback`
    );
    
    const authUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    
    window.location.href = authUrl;
  };

  const logout = () => {
    localStorage.removeItem('anilist_token');
    setToken(null);
  };

  return (
    <AniListContext.Provider value={{ token, login, logout }}>
      {children}
    </AniListContext.Provider>
  );
}

export const useAniList = () => useContext(AniListContext);