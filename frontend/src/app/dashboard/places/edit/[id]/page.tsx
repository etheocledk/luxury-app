"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useHttpClient from "@/app/api/httpClient";
import endpoints from "@/app/api/endpoints";
import useToast from "@/app/api/toast";
import { ToastContainer } from 'react-toastify';
import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditPlace() {
    const { id } = useParams();
    const { get, put } = useHttpClient();
    const showToast = useToast();
    const router = useRouter();
    const [image, setImage] = useState<string | null>(null);

    const [geo_region_id, setGeoRegion] = useState("");
    const [place_type_id, setPlaceType] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [geoRegions, setGeoRegions] = useState<TypeGeoRegionAndPlace[]>([]);
    const [placeTypes, setPlaceTypes] = useState<TypeGeoRegionAndPlace[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    interface TypeGeoRegionAndPlace {
        id: string;
        title: string;
        key: string;
    }

    interface Place {
        id: string;
        geo_region_id: string;
        place_type_id: string;
        title: string;
        description: string;
        default_image_url: string;
    }

    const getGeoRegions = async () => {
        const { data }: { data: TypeGeoRegionAndPlace[] | null } = await get(endpoints.geo_regions());
        if (data && Array.isArray(data)) {
            if (Array.isArray(data)) {
                setGeoRegions(data);
            }
        }
    };

    const getPlaceTypes = async () => {
        const { data }: { data: TypeGeoRegionAndPlace[] | null } = await get(endpoints.place_types());
        if (data && Array.isArray(data)) {
            if (Array.isArray(data)) {
                setPlaceTypes(data);
            }
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (!String(geo_region_id).trim() || !String(place_type_id).trim() || !title.trim() || !description.trim()) {
            showToast("Veuillez remplir tous les champs.", "error");
            setIsSubmitting(false);
            return;
        }
        const { data, error }: { data?: any, error?: any } = await put(endpoints.place(id), {
            geo_region_id,
            place_type_id,
            title,
            description
        });

        if (data) {
            setIsSubmitting(false);
            showToast("Place mise à jour avec succès !", "success");
        } else {
            setIsSubmitting(false);
            if (error) {
                showToast(error, "error");
            } else {
                showToast("Une erreur est survenue. Veuillez réessayer.", "error");
            }
        }
    }

    const getSinglePlace = async () => {
        const { data }: { data: Place | null } = await get(endpoints.place(id));
        if (data) {
            setGeoRegion(data.geo_region_id);
            setPlaceType(data.place_type_id);
            setTitle(data.title);
            setDescription(data.description);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }

        getGeoRegions();
        getPlaceTypes();
        getSinglePlace();
    }, [router]);


    return (
        <div className="py-8">
            <div className="flex justify-between items-center mb-1 px-8">
                <h2 className="font-bold text-xl">Edit Place</h2>
                <Link href="/dashboard/places" className="px-2 py-1 border border-gray rounded-[5px] hover:bg-black hover:text-white">Back</Link>
            </div>
            <hr className="my-3" />
            <div className="px-8 mt-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="region" className="block text-sm font-semibold">
                            REGION
                        </label>
                        <select
                            aria-placeholder="Please select..."
                            className="w-[60%] mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            id="region"
                            name="region"
                            value={geo_region_id}
                            onChange={(e) => setGeoRegion(e.target.value)}
                        >
                            <option value="">Please select...</option>
                            {geoRegions.map((region) => (
                                <option key={region.id} value={region.id}>
                                    {region.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="placeType" className="block text-sm font-semibold">
                            PLACE TYPE
                        </label>
                        <select
                            aria-placeholder="Please select..."
                            className="w-[60%] mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            id="placeType"
                            name="placeType"
                            value={place_type_id}
                            onChange={(e) => setPlaceType(e.target.value)}
                        >
                            <option value="">Please select...</option>
                            {placeTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="title" className="block text-sm font-semibold">
                            TITLE
                        </label>
                        <input
                            className="w-[60%] mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter the title"
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="description" className="block text-sm font-semibold">
                            DESCRIPTION
                        </label>
                        <textarea
                            className="w-[60%] mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter the description"
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="image-upload"
                            style={{
                                display: 'inline-block',
                                padding: '10px 20px',
                                border: '1px solid rgb(187, 185, 185)',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                                width: '60%',
                            }}
                        >
                            Upload File
                        </label>

                        <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />

                        {image && <img src={image} alt="Image prévisualisée" style={{ marginTop: 20, width: '100px', height: '100px', borderRadius: "10px" }} />}
                    </div>

                    <div className="flex justify-start">
                        <button
                            type="submit"
                            className={`px-2 py-1 border border-gray  rounded-[5px] ${isSubmitting
                                ? "bg-gray-400 cursor-not-allowed"
                                : " hover:bg-black hover:text-white"
                                }`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Save Place..." : "Save Place"}
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}
