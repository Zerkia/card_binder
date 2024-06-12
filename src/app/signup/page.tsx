'use client'

import React from 'react';
import { NextPage } from 'next';
import AuthForm from '@/components/AuthForm';
import { useToast } from '@chakra-ui/react';
import { supabase } from '@/supabaseClient';

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const SignupPage: NextPage = () => {

    const toast = useToast();

    const handleSignup = async (data: { username: string; password: string }) => {
        const { username, password } = data;
    
        try {
            const response = await supabase.auth.signUp({ email: username, password });
    
            const error = response.error as Error | null;
    
            if (error) {
                throw error;
            }
    
            const user = response.data?.user;
    
            const { error: dbError } = await supabase
                .from('users')
                .insert([{ id: user?.id, email: username }]);
    
            if (dbError) {
                throw dbError;
            }
    
            toast({
                title: "Signup successful.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Signup failed:", (error as Error).message);
            toast({
                title: "Signup failed.",
                description: (error as Error).message,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };
    

    return(
        <main className="flex min-h-screen flex-col px-12 pt-6">
            <Header></Header>
            <div className="min-h-screen flex items-center justify-center">
                <AuthForm isSignup={true} onSubmit={handleSignup} />
            </div>
            <Footer></Footer>
        </main>
    )
}

export default SignupPage;