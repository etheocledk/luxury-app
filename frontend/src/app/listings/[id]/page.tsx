"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useHttpClient from "@/app/api/httpClient";
import endpoints from "@/app/api/endpoints";
import useToast from "@/app/api/toast";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import baseUrl from "@/app/api/baseUrl";

export default function ListingPage() {
  const { id } = useParams();
  const { get } = useHttpClient();
  const showToast = useToast();
  const router = useRouter();
  const [listing, setListing] = useState<any>({});
  const [images, setImages] = useState<string[]>([]);

  interface Listing {
    place_id: string;
    title: string;
    description: string;
    images: string[];
  }

  const getSingleListing = async () => {
    const { data }: { data: Listing | null } = await get(endpoints.listing(id));
    if (data) {
      setListing(data);
      setImages(data.images);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }

    getSingleListing();
  }, [router]);

  return (
    <div className="container mx-auto py-4 px-4 md:px-36 m-4">
      <div className="mb-4">
        <h1 className="font-bold text-2xl mb-1">{listing.title}</h1>
        <p>Place: {listing.place?.title}</p>
      </div>
      <div>
        <img
          src={
            listing.default_image_url
              ? baseUrl + listing.default_image_url
              : "https://dummyimage.com/300x300"
          }
          alt="Listing"
          className="h-[450px] w-full rounded-md object-cover"
        />
      </div>
      <div className="mt-10 flex justify-between">
        <div>
          <h2 className="font-bold text-xl mb-2">About</h2>
          <p className="text-gray-500 text-md">{listing.description}</p>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-2">Gallery</h2>
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={baseUrl + image}
                alt={`Preview ${index}`}
                style={{
                  width: "115px",
                  height: "115px",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
