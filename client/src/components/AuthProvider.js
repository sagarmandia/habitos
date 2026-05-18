'use client';

import React, { useEffect } from 'react';
import useAuthStore from '@/store/useAuthStore';

/**
 * Root Provider responsible for checking user auth status on app start.
 */
export default function AuthProvider({ children }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    // Run authentication verify routine once
    checkAuth();
  }, [checkAuth]);

  return <>{children}</>;
}
