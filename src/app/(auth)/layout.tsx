'use client';

import { ReactNode } from 'react';
import { AuthGate } from '@/features/auth/guard';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <AuthGate mode="guest-only">{children}</AuthGate>;
}
