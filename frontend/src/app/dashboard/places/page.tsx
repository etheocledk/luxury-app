"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useHttpClient from "@/app/api/httpClient";
import endpoints from "@/app/api/endpoints";
import { ToastContainer } from "react-toastify";
import baseUrl from "@/app/api/baseUrl";

export default function Places() {
  const router = useRouter();
  const { get } = useHttpClient();
  interface Place {
    id: string;
    title: string;
    description: string;
    default_image_url: string;
  }

  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }

    getPlaces();
  }, [router]);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const getPlaces = async () => {
    const { data }: { data: Place[] | null } = await get(endpoints.places());
    if (data && Array.isArray(data)) {
      if (Array.isArray(data)) {
        setPlaces(data);
      }
    }
  };

  return (
    <div className="pt-8">
      <div className="flex justify-between items-center mb-1 px-8">
        <h2 className="font-bold text-xl">Places</h2>
        <Link
          href="/dashboard/places/add"
          className="px-2 py-1 border border-gray rounded-[5px] hover:bg-black hover:text-white"
        >
          New place
        </Link>
      </div>
      <hr className="my-3" />
      {places.length === 0 ? (
        <div className="flex justify-center items-center mt-24 flex-col">
          <Image
            src="/images/no_data.svg"
            alt="No data"
            width={300}
            height={300}
            className="w-full h-[200px]"
          />
          <p className="mt-2 text-lg">No places available</p>
        </div>
      ) : (
        <div className="px-8 mt-8">
          {places.map((place) => (
            <div key={place.id}>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <div>
                    <Image
                      src={place.default_image_url ? baseUrl + place.default_image_url : "https://dummyimage.com/300x300"}
                      alt={place.title}
                      width={300}
                      height={300}
                      className="h-10 w-10 rounded-[5px] object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-md font-semibold">{place.title}</h2>
                    <p className="text-sm text-gray-500">
                      {truncateText(place.description, 80)}
                    </p>
                  </div>
                </div>
                <div>
                  <Link
                    href={`/dashboard/places/edit/${place.id}`}
                    className="px-2 py-1 border border-gray rounded-[5px] hover:bg-black hover:text-white"
                  >
                    Edit
                  </Link>
                </div>
              </div>
              <hr className="my-2" />
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
