'use client';

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { Toaster } from 'sonner';
import { SessionProvider } from './session-provider';

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <SessionProvider session={session}>{children}</SessionProvider>

      <Toaster />
    </NextUIProvider>
  );
}
