"use client";

import Link from "next/link"; 
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useHttpClient from "@/app/api/httpClient";
import endpoints from "@/app/api/endpoints";
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";

export default function Listings() {
    const router = useRouter();
    const { get } = useHttpClient();
    interface Listing {
        id: string;
        title: string;
        description: string;
        default_image_url: string;
        place: {
            description: string;
        };
    }

    const [listings, setListings] = useState<Listing[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }

        getListings();
    }, [router]);

    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        }
        return text;
    };

    const getListings = async () => {
        const { data }: { data: Listing[] | null } = await get(endpoints.listings());
        if (data && Array.isArray(data)) {
            if (Array.isArray(data)) {
                setListings(data);
            } 
        }
    };

    return (
        <div className="pt-8">
            <div className="flex justify-between items-center mb-1 px-8">
                <h2 className="font-bold text-xl">Listings</h2>
                <Link href="/dashboard/listings/add" className="px-2 py-1 border border-gray rounded-[5px] hover:bg-black hover:text-white">New listing</Link>
            </div>
            <hr className="my-3" />
            <div className="px-8 mt-8">
                {listings.map((listing) => (
                    <div key={listing.id}>
                        <div className="flex justify-between items-center">
                            <div className="flex space-x-2">
                                <div>
                                    <Image
                                        src={listing.default_image_url || "https://dummyimage.com/300x300"}
                                        alt={listing.title}
                                        width={300}
                                        height={300}
                                        className="h-10 w-10 rounded-[5px] object-cover"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-md font-semibold">{listing.title}</h2>
                                    <p className="text-sm text-gray-500">{truncateText(listing.description, 80)}</p>
                                </div>
                            </div>
                            <div>
                            <Link href={`/dashboard/listings/edit/${listing.id}`} className="px-2 py-1 border border-gray rounded-[5px] hover:bg-black hover:text-white">Edit</Link>
                            </div>
                        </div>
                        <hr className="my-2" />
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
}