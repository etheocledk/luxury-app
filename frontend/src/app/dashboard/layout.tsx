"use client";
import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useHttpClient from "@/app/api/httpClient";
import endpoints from "@/app/api/endpoints";
import useToast from "@/app/api/toast";
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";

interface DashboardLayout {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayout) {
    const pathname = usePathname(); 
    const router = useRouter();
    const { del, get } = useHttpClient();
    const showToast = useToast();

    const handleLogout = async () => {

        const response = await del(endpoints.logout());
        if (response) {
            localStorage.removeItem("token");
            showToast("Déconnexion effectuée avec succès !", "success");
            router.push("/login");
        }
    };

    const confirmLogout = () => {
        showToast(
            <div>
                <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
                <div className="flex justify-end mt-2">
                    <button
                        className="mr-2 px-4 py-2 bg-red-600 text-white rounded"
                        onClick={handleLogout}
                    >
                        Oui
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-black rounded"
                        onClick={() => toast.dismiss()}
                    >
                        Non
                    </button>
                </div>
            </div>,
            "info",
            { autoClose: false }
        );
    };

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
                <button onClick={confirmLogout} className="hover:underline mt-[380px]">Logout</button>
            </div>
            <div className="w-full h-screen overflow-y-scroll" style={{ width: 'calc(100% - 13rem)' }}>{children}</div>
            <ToastContainer />
        </div>
    );
}
