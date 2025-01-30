import Link from "next/link";

export default function Places() {
    return (
        <div className="pt-8">
            <div className="flex justify-between items-center mb-1 px-8">
                <h2 className="font-bold text-xl">Places</h2>
                <Link href="/dashboard/places/add" className="px-2 py-1 border border-gray rounded-[5px] hover:bg-black hover:text-white">New place</Link>
            </div>
            <hr className="my-3" />
            <div className="px-8 mt-8">
                <div>
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                            <div>
                                <img src="https://picsum.photos/200/300" alt="Place" className="h-10 w-10 rounded-[5px] object-cover"/>
                            </div>
                            <div>
                                <h2 className="text-md font-semibold">Place 1</h2>
                                <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div>
                            <Link href="/dashboard/places/edit" className="px-2 py-1 border border-gray rounded-[5px] hover:bg-black hover:text-white">Edit</Link>
                        </div>
                    </div>
                    <hr className="my-2" />
                </div>
                <div>
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                            <div>
                                <img src="https://picsum.photos/200/300" alt="Place" className="h-10 w-10 rounded-[5px] object-cover"/>
                            </div>
                            <div>
                                <h2 className="text-md font-semibold">Place 1</h2>
                                <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div>
                            <Link href="/dashboard/places/edit" className="px-2 py-1 border border-gray rounded-[5px] hover:bg-black hover:text-white">Edit</Link>
                        </div>
                    </div>
                    <hr className="my-2" />
                </div>
                <div>
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                            <div>
                                <img src="https://picsum.photos/200/300" alt="Place" className="h-10 w-10 rounded-[5px] object-cover"/>
                            </div>
                            <div>
                                <h2 className="text-md font-semibold">Place 1</h2>
                                <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div>
                            <Link href="/dashboard/places/edit" className="px-2 py-1 border border-gray rounded-[5px] hover:bg-black hover:text-white">Edit</Link>
                        </div>
                    </div>
                    <hr className="my-2" />
                </div>
            </div>
        </div>
    );
}