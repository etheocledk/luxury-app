import { ReactNode } from 'react';
import Image from "next/image";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="bg-[#f9f9f9] min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                {/* <h2 className="text-2xl font-bold mb-6 text-center">Login</h2> */}
                <div className='flex justify-center mb-5'>
                    <Image src="/images/logo.png" alt="Logo" className="cursor-pointer w-48" width={500} height={500}/>
                </div>
                {children}
            </div>
        </div>
    );
}
