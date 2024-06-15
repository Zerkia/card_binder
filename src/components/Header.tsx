
import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import ContentLoader from 'react-content-loader';
import Link from "next/link";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsLoggedIn(!!session);
        };
        checkUser();
    }, []);
    
    return (
        <nav className="flex justify-between items-center pb-10">
            <div className="w-1/3 flex justify-start items-center">
                {isLoggedIn && (
                    <Link href={`/userCollection`}>
                        <button 
                            type="button" 
                            className="text-white bg-blue-700 hover:bg-blue-600 rounded-lg text-sm py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800
                            w-20">
                            Collection
                        </button>
                    </Link>
                )}
            </div>
            <div className="w-1/3 flex justify-center items-center">
            <Link href={`/`}>
                <ContentLoader 
                    speed={2}
                    width={80}
                    height={80}
                    viewBox="0 0 100 100"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    uniqueKey='logo'
                >
                    <rect x="0" y="0" rx="5" ry="5" width="100" height="100" />
                </ContentLoader>
            </Link>
            </div>
            
            <div className="w-1/3 flex justify-end items-center">
                <Link href={isLoggedIn ? `/logout` : `/login`}>
                    <button 
                    type="button" 
                    className="text-white bg-blue-700 hover:bg-blue-600 rounded-lg text-sm py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800
                    w-20">
                        {isLoggedIn ? 'Logout' : 'Log In'}
                    </button>
                </Link>
            </div>
        </nav>
    )
}