// 'use client'

// import React from 'react';
// import { NextPage } from 'next';
// import AuthForm from '@/components/AuthForm';
// import { useToast } from '@chakra-ui/react';
// import { supabase } from '@/supabaseClient';

// import Footer from "@/components/Footer";
// import Header from "@/components/Header";

// const SignupPage: NextPage = () => {

//     const toast = useToast();

//     const handleSignup = async (data: { username: string; password: string }) => {
//         const { username, password } = data;

//         const { data: signUpData, error } = await supabase.auth.signUp({ email: username, password });
//         const user = signUpData?.user;

//         if (error) {
//             toast({
//                 title: "Signup failed.",
//                 description: error.message,
//                 status: "error",
//                 duration: 9000,
//                 isClosable: true,
//             });
//             return;
//         }

//         const { error: dbError } = await supabase
//         .from('users')
//         .insert([{ id: user?.id, email: username }]);

//         if (dbError) {
//             toast({
//                 title: "Failed to insert user data.",
//                 description: dbError.message,
//                 status: "error",
//                 duration: 9000,
//                 isClosable: true,
//             });
//             return;
//         }

//         toast({
//             title: "Signup successful.",
//             status: "success",
//             duration: 9000,
//             isClosable: true,
//         });
//     };

//     return(
//         <main className="flex min-h-screen flex-col px-12 pt-6">
//             <Header></Header>
//             <div className="min-h-screen flex items-center justify-center">
//                 <AuthForm isSignup={true} onSubmit={handleSignup} />
//             </div>
//             <Footer></Footer>
//         </main>
//     )
// }

// export default SignupPage;