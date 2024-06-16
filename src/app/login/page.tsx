"use client";

import React from 'react';
import { NextPage } from 'next';
import { Link, useToast } from '@chakra-ui/react';
import { supabase } from '@/supabaseClient';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import { useUser } from '@/context/userProvider';


const LoginPage: NextPage = () => {
    const toast = useToast();
    const { checkUser } = useUser();
    const router = useRouter();

    const handleLogin = async (data: { email: string; password: string }) => {
        const { email, password } = data;
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (!error) {
            toast({
                title: "Login successful. Please wait.",
                status: "success",
                duration: 2500,
                isClosable: true,
            });

            setTimeout(() => {
                checkUser();
                router.push('/');
            }, 3000);
        } else {
            toast({
                title: "Login failed.",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return(
        <main className="flex min-h-screen flex-col px-12 pt-6">
            <div className="min-h-screen items-center justify-center">
                <AuthForm isSignup={false} onSubmit={handleLogin} />
                <p className='text-center text-md pt-2'>Don&apos;t have a user? <Link href={`/signup`}><span className='text-blue-600 font-bold'>Click here</span></Link> to create one</p>
            </div>
        </main>
    )
}

export default LoginPage;