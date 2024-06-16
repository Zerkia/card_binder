'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/supabaseClient';

interface UserContextType {
    isLoggedIn: boolean;
    checkUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setIsLoggedIn(!!session);
    };

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <UserContext.Provider value={{ isLoggedIn, checkUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
