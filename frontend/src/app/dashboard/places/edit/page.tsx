
import Link from "next/link";
export default function EditPlace() {
    return (
        <div className="pt-8">
            <div className="flex justify-between items-center mb-1 px-8">
                <h2 className="font-bold text-xl">Edit Place</h2>
                <Link href="/dashboard/places" className="px-2 py-1 border border-gray rounded-[5px] hover:bg-black hover:text-white">Back</Link>
            </div>
            <hr className="my-3" />
            <div className="px-8 mt-8">
                <form action="">
                    <div className="mb-5">
                        <label htmlFor="region" className="block text-sm font-semibold">
                            REGION
                        </label>
                        <select
                            aria-placeholder="Please select..."
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            id="region"
                            name="region"
                            required
                        >
                            <option value="">Please select...</option>
                            <option value="region1">Region 1</option>
                            <option value="region2">Region 2</option>
                            <option value="region3">Region 3</option>
                        </select>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="placeType" className="block text-sm font-semibold">
                            PLACE TYPE
                        </label>
                        <select
                            aria-placeholder="Please select..."
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            id="placeType"
                            name="placeType"
                            required
                        >
                            <option value="">Please select...</option>
                            <option value="place1">Place Type 1</option>
                            <option value="place2">Place Type 2</option>
                            <option value="place3">Place Type 3</option>
                        </select>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="title" className="block text-sm font-semibold">
                            TITLE
                        </label>
                        <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
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
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            id="description"
                            name="description"
                            placeholder="Enter the description"
                            required
                        />
                    </div>

                    <div className="flex justify-start">
                        <button
                            type="submit"
                            className="px-2 py-1 border border-gray  rounded-[5px] hover:bg-black hover:text-white">
                            Save Place
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
