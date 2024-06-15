"use client";

import React from 'react';
import { NextPage } from 'next';
import { Link, useToast } from '@chakra-ui/react';
import { supabase } from '@/supabaseClient';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import Footer from "@/components/Footer";
import Header from "@/components/Header";


const LoginPage: NextPage = () => {
    const toast = useToast();
    const router = useRouter();

    const handleLogin = async (data: { email: string; password: string }) => {
        const { email, password } = data;
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (!error) {
            toast({
                title: "Login successful.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            setTimeout(() => {
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
            <Header />
            <div className="min-h-screen items-center justify-center">
                <AuthForm isSignup={false} onSubmit={handleLogin} />
                <p className='text-center text-md pt-2'>Don&apos;t have a user? <Link href={`/signup`}><span className='text-blue-600 font-bold'>Click here</span></Link> to create one</p>
            </div>
            <Footer />
        </main>
    )
}

export default LoginPage;