
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabaseClient';
import { Center, Spinner, Text } from "@chakra-ui/react";
import { useUser } from '@/context/UserProvider';

export default function Logout() {
    const { checkUser } = useUser();
    const router = useRouter();

    useEffect(() => {
        const logoutUser = async () => {
            await supabase.auth.signOut();
            router.push('/');
        };
        logoutUser();
        checkUser();
        
    }, [router]);

    return (
        <Center height="100vh" flexDirection="column">
            <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            />
            <Text mt={4}>Logging out...</Text>
        </Center>
    );
}
