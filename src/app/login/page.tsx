// 'use client'

// import React from 'react';
// import { NextPage } from 'next';
// import AuthForm from '@/components/AuthForm';
// import { useToast } from '@chakra-ui/react';
// import { supabase } from '@/supabaseClient';
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";

// const LoginPage: NextPage = () => {
//     const toast = useToast();

//     const handleLogin = async (data: { username: string; password: string }) => {
//         const { username, password } = data;
//         const { error } = await supabase.auth.signInWithPassword({ email: username, password });

//         if (error) {
//             toast({
//                 title: "Login failed.",
//                 description: error.message,
//                 status: "error",
//                 duration: 9000,
//                 isClosable: true,
//             });
//         } else {
//             toast({
//                 title: "Login successful.",
//                 status: "success",
//                 duration: 9000,
//                 isClosable: true,
//             });
//         }
//     };

//     return(
//         <main className="flex min-h-screen flex-col px-12 pt-6">
//             <Header />
//             <div className="min-h-screen flex items-center justify-center">
//                 <AuthForm isSignup={false} onSubmit={handleLogin} />
//             </div>
//             <Footer />
//         </main>
//     )
// }

// export default LoginPage;