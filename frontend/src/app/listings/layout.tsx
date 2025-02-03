"use client";
import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface DashboardLayout {
    children: ReactNode;
}

export default function ListingsLayout({ children }: DashboardLayout) {

    return (
        <div>
        <div className="container mx-auto py-6 px-4 md:px-36 flex justify-between items-center">
          <div>
            <Image
              src="/images/logo.png"
              alt="Logo"
              className="cursor-pointer w-48"
              width={500}
              height={500}
            />
          </div>
          {/* <button onClick={confirmLogout} className="bg-red-500 px-5 py-2 rounded-[5px] text-white hover:bg-red-600">Logout</button> */}
        </div>
        <hr />
        {children}
      </div>
    );
}
