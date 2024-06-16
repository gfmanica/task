'use client';

import { createContext, ReactNode, useContext } from 'react';

interface FormProviderProps {
  children?: ReactNode;
  session: any;
}

const SessionContext = createContext(null);

export function SessionProvider({
  children,
  session,
}: FormProviderProps): JSX.Element {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSessionContext = (): any => useContext(SessionContext);
