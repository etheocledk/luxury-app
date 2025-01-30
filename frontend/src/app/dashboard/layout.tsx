"use client";
import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 

interface DashboardLayout {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayout) {
    const pathname = usePathname(); 

    return (
        <div className="bg-white flex">
            <div className="w-[13rem] h-screen px-5 py-10 border-r border-gray-200">
                <div className="flex mb-12">
                    <Image src="/images/logo.png" alt="Logo" className="cursor-pointer w-48" width={500} height={500} />
                </div>
                <div className="flex flex-col space-y-5">
                    <Link href="/dashboard/places">
                        <span
                            className={pathname === '/dashboard/places' ? 'font-bold' : ''}
                        >
                            Places
                        </span>
                    </Link>
                    <Link href="/dashboard/listings">
                        <span
                            className={pathname === '/dashboard/listings' ? 'font-bold' : ''}
                        >
                            Listings
                        </span>
                    </Link>
                </div>
            </div>
            <div className="w-full h-screen overflow-y-scroll" style={{ width: 'calc(100% - 13rem)' }}>{children}</div>
        </div>
    );
}
