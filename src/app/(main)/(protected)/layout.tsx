'use client';

import { ReactNode } from 'react';
import { AuthGate } from '@/features/auth/guard';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <AuthGate mode="auth-only">{children}</AuthGate>;
}
