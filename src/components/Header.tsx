"use client";

import Link from "next/link";
import ContentLoader from 'react-content-loader';
import { useUser } from '@/context/UserProvider';
import Image from "next/image";
import logo from "~/logo.svg";

export default function Header() {
    const { isLoggedIn } = useUser();
    
    return (
        <nav className="flex justify-between items-center pb-10 px-12 pt-6">
            <div className="w-1/3 flex justify-start items-center">
                {isLoggedIn && (
                    <Link href={`/userCollection`}>
                        <button 
                            type="button" 
                            className="text-white bg-blue-700 hover:bg-blue-600 rounded-lg text-sm py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20">
                            Collection
                        </button>
                    </Link>
                )}
            </div>
            <div className="w-1/3 flex justify-center items-center">
            <Link href={`/`}>
                <Image src={logo} alt="logo" height={80} width={80}/>
            </Link>
            </div>
            <div className="w-1/3 flex justify-end items-center">
                <Link href={isLoggedIn ? `/logout` : `/login`}>
                    <button 
                        type="button" 
                        className="text-white bg-blue-700 hover:bg-blue-600 rounded-lg text-sm py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20">
                        {isLoggedIn ? 'Logout' : 'Log In'}
                    </button>
                </Link>
            </div>
        </nav>
    );
}
