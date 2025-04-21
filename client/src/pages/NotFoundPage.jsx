import {Link} from "react-router-dom";

import lostInSpaceImage from "../assets/lost-in-space.svg";

import { Button } from "@/components/ui/button.jsx"
import { Home } from "lucide-react"

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex flex-col">

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center">
                    <div className="relative mb-4 mx-auto w-64 h-64">
                        <div className="absolute top-0 left-0 w-full h-full bg-pink-200 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
                        <div className="absolute bottom-0 right-0 w-full h-full bg-purple-200 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                        <div className="mt-2">
                            <img
                                src={lostInSpaceImage}
                                alt="Lost in space illustration"
                                width={300}
                                height={200}
                                className="mx-auto"
                            />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-8xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                                404
                            </div>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold mb-4">Oops! Page not found</h1>
                    <p className="text-gray-600 mb-8">
                        We couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or never existed.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/client/public">
                            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
                                <Home className="mr-2 h-4 w-4 " />
                                Back to Home
                            </Button>
                        </Link>

                    </div>


                </div>
            </main>
        </div>
    )
}
