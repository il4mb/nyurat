"use client"
import { getKeyPair, KeyPairProps } from '@/app/encryption';
import { UserProps } from '@internal/types';
import React, { createContext, useContext, useEffect, useState } from 'react'

interface AppContextProps {
    keyPair?: KeyPairProps,
    session: UserProps | null;
}

const AppContext = createContext<AppContextProps>({
    session: null
});
export const useApp = () => useContext(AppContext);
type Props = {
    children: React.ReactNode;
    session: UserProps | null;
}

export default function AppProvider({ children, session }: Props) {
    const [keyPair, setKeyPair] = useState<KeyPairProps | undefined>();
    useEffect(() => {
        getKeyPair()
            .then(k => setKeyPair(k))
            .catch(err => {
                console.log(err)
            })
    }, []);
    return (
        <AppContext.Provider value={{ keyPair, session }}>
            {children}
        </AppContext.Provider>
    )
}