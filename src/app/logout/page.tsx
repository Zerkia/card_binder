
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabaseClient';
import { Center, Spinner, Text } from "@chakra-ui/react";

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        const logoutUser = async () => {
            await supabase.auth.signOut();
            router.push('/');
        };
        logoutUser();
    }, [router]);

    return (
        <Center height="100vh" flexDirection="column">
            <Spinner size="xl" />
            <Text mt={4}>Logging out...</Text>
        </Center>
    );
}