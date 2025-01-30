"use client";

import Link from "next/link";
import { useState } from 'react';

export default function EditListing() {
    const [image, setImage] = useState<string | null>(null);

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="py-8">
            <div className="flex justify-between items-center mb-1 px-8">
                <h2 className="font-bold text-xl">Edit Listing</h2>
                <Link href="/dashboard/listings" className="px-2 py-1 border border-gray rounded-[5px] hover:bg-black hover:text-white">Back</Link>
            </div>
            <hr className="my-3" />
            <div className="px-8 mt-8">
                <form action="">
                    <div className="mb-5">
                        <label htmlFor="region" className="block text-sm font-semibold">
                            LOCATION
                        </label>
                        <select
                            aria-placeholder="Please select..."
                            className="w-[60%] mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            id="region"
                            name="region"
                            required
                        >
                            <option value="">Please select...</option>
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
                            placeholder="Enter the title"
                            required
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
                            placeholder="Enter the description"
                            required
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
                            className="px-2 py-1 border border-gray  rounded-[5px] hover:bg-black hover:text-white">
                            Save Listing
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
