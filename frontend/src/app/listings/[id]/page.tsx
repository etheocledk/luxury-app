export default function ListingPage() {
    return (
        <div className="container mx-auto py-4 px-4 md:px-36 m-4">
            <div className="mb-4">
                <h1 className="font-bold text-2xl mb-1">Bunker House</h1>
                <p>This is a Next.js page.</p>
            </div>
            <div>
                <img src="https://picsum.photos/300/300" alt="Listing" className="h-[450px] w-full rounded-md object-cover" />
            </div>
            <div className="mt-10 flex justify-between">
                <div>
                    <h2 className="font-bold text-xl mb-2">About</h2>
                    <p className="text-gray-500 text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
                </div>
                <div>
                    <h2 className="font-bold text-xl mb-2">Gallery</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <img src="https://picsum.photos/300/300" alt="Listing" className="h-[150px] w-[150px] rounded-md object-cover" />
                        <img src="https://picsum.photos/300/300" alt="Listing" className="h-[150px] w-[150px] rounded-md object-cover" />
                        <img src="https://picsum.photos/300/300" alt="Listing" className="h-[150px] w-[150px] rounded-md object-cover" />
                        <img src="https://picsum.photos/300/300" alt="Listing" className="h-[150px] w-[150px] rounded-md object-cover" />
                    </div>
                </div>
            </div>
        </div>
    )
}