"use client";

import React from 'react';
import { NextPage } from 'next';
import AuthForm from '@/components/AuthForm';
import { useToast } from '@chakra-ui/react';
import { supabase } from '@/supabaseClient';
import { useRouter } from 'next/navigation';

const SignupPage: NextPage = () => {
  const toast = useToast();
  const router = useRouter();

  const handleSignup = async (data: { email: string; password: string }) => {
    const { email, password } = data;
  
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
  
      if (error) {
        throw error;
      }
  
      const user = data.user;
  
      if (!user) {
        throw new Error("User not created");
      }
  
      toast({
        title: "Signup successful.",
        description: "Please wait.",
        status: "success",
        duration: 2500,
        isClosable: true,
      });

      setTimeout(() => {
        router.push('/login');
      }, 2500);

    } catch (error: any) {
      toast({
        title: "Signup failed.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  

  return (
    <main className="flex min-h-screen flex-col px-12 pt-6">
      <div className="min-h-screen items-center justify-center">
        <AuthForm isSignup={true} onSubmit={handleSignup} />
      </div>
    </main>
  );
};

export default SignupPage;
