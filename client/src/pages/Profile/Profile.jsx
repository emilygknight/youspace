import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    ArrowLeft,
    Calendar,
    Edit,
    Heart,
    ImageIcon,
    LinkIcon,
    MessageCircle,
    Music,
    Palette,
    Settings,
    Share,
    Type,
    Users,
    UserRound
} from "lucide-react"

import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "@/utils/queries.js";


export default function Profile({ userId }) {

    // Use the useQuery hook to fetch user data
    const { loading, data, error } = useQuery(QUERY_ME);

    const user = data?.me;

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
            {/* Header with back button */}
            <header className="container mx-auto py-4 px-4">
                <div className="flex items-center gap-4">
                    <Link to="/dashboard">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full h-8 w-8"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-lg font-medium">@{user?.username || "Loading..."}</h1>
                    <div className="ml-auto flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full h-8 w-8"
                        >
                            <Settings className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full h-8 w-8"
                        >
                            <Share className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* Profile Header */}
            <div className="relative">
                {/* Banner Image */}
                <div className="h-48 md:h-64 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 relative">
                    <Button
                        variant="outline"
                        size="sm"
                        className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm"
                    >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Banner
                    </Button>
                </div>

                {/* Profile Info */}
                <div className="container mx-auto px-4">
                    <div className="relative -mt-16 mb-4 flex justify-between items-end">
                        <Avatar className="h-32 w-32 border-4 border-white bg-white">
                            <AvatarImage
                                src={`${user?.profilePicture || null}`}
                                alt="@stelladreams"
                            />
                            <AvatarFallback className="text-2xl bg-pink-100 text-pink-500">
                                <UserRound size={64} />
                            </AvatarFallback>
                        </Avatar>
                        <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                            <Edit className="h-4 w-4 mr-2" />
                            Customize Profile
                        </Button>
                    </div>

                    <div className="mb-6">
                        <h1 className="text-2xl font-bold">{user?.username || "Loading..."}</h1>
                        <p className="text-gray-500">@{user?.username || "Loading..."}</p>
                        <p className="mt-2 text-gray-700">
                            {user?.bio || null}
                        </p>
                        <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>
                                  <strong>1.2k</strong> followers
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4" />
                                <span>
                                  <strong>4.5k</strong> likes
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>Joined June 2023</span>
                            </div>
                        </div>
                    </div>

                    {/* Music Player */}
                    <div className="mb-6 p-3 bg-white rounded-xl shadow-sm flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white">
                            <Music className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">Currently Playing</p>
                            <p className="text-xs text-gray-500">
                                Dreamy Lo-fi Beats - Chill Vibes
                            </p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Play/Pause</span>
                            ▶️
                        </Button>
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="container mx-auto px-4 pb-12">
                <Tabs defaultValue="board" className="mb-6">
                    <TabsList className="bg-white">
                        <TabsTrigger value="board">Vision Board</TabsTrigger>
                        <TabsTrigger value="posts">Posts</TabsTrigger>
                        <TabsTrigger value="likes">Likes</TabsTrigger>
                    </TabsList>

                    <TabsContent value="board" className="mt-6">
                        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-medium">My Aesthetic Vision</h2>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" className="h-8">
                                        <Palette className="h-4 w-4 mr-2" />
                                        Theme
                                    </Button>
                                    <Button variant="outline" size="sm" className="h-8">
                                        <Type className="h-4 w-4 mr-2" />
                                        Font
                                    </Button>
                                    <Button variant="outline" size="sm" className="h-8">
                                        <LinkIcon className="h-4 w-4 mr-2" />
                                        Add Link
                                    </Button>
                                </div>
                            </div>

                            {/* Vision Board Grid */}
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                                <div className="aspect-square rounded-lg overflow-hidden relative group col-span-2 row-span-2">
                                    <img
                                        src="/placeholder.svg?height=400&width=400"
                                        alt="Vision board item"
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                        <div className="text-white text-sm">Summer dreams ☀️</div>
                                    </div>
                                </div>

                                <div className="aspect-square rounded-lg overflow-hidden relative group">
                                    <img
                                        src={user?.profilePicture || null}
                                        alt="Vision board item"
                                        width={200}
                                        height={200}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                        <div className="text-white text-xs">Pastel vibes</div>
                                    </div>
                                </div>

                                <div className="aspect-square rounded-lg overflow-hidden relative group">
                                    <img
                                        src="/placeholder.svg?height=200&width=200"
                                        alt="Vision board item"
                                        width={200}
                                        height={200}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                        <div className="text-white text-xs">Cozy spaces</div>
                                    </div>
                                </div>

                                <div className="aspect-square rounded-lg overflow-hidden relative group">
                                    <img
                                        src="/placeholder.svg?height=200&width=200"
                                        alt="Vision board item"
                                        width={200}
                                        height={200}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                        <div className="text-white text-xs">Dream destinations</div>
                                    </div>
                                </div>

                                <div className="aspect-square rounded-lg overflow-hidden relative group">
                                    <img
                                        src="/placeholder.svg?height=200&width=200"
                                        alt="Vision board item"
                                        width={200}
                                        height={200}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                        <div className="text-white text-xs">Style inspo</div>
                                    </div>
                                </div>

                                <div className="aspect-square rounded-lg overflow-hidden relative group col-span-2">
                                    <img
                                        src="/placeholder.svg?height=200&width=400"
                                        alt="Vision board item"
                                        width={400}
                                        height={200}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                        <div className="text-white text-sm">
                                            Creative workspace goals
                                        </div>
                                    </div>
                                </div>

                                <div className="aspect-square rounded-lg overflow-hidden relative group">
                                    <img
                                        src="/placeholder.svg?height=200&width=200"
                                        alt="Vision board item"
                                        width={200}
                                        height={200}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                        <div className="text-white text-xs">Mood lighting</div>
                                    </div>
                                </div>

                                <div className="aspect-square rounded-lg overflow-hidden relative group">
                                    <div className="w-full h-full flex items-center justify-center bg-pink-100 text-pink-500">
                                        <div className="text-center">
                                            <ImageIcon className="h-6 w-6 mx-auto mb-1" />
                                            <span className="text-xs">Add New</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="posts" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                                <div className="p-4">
                                    <p className="mb-4">
                                        Just updated my summer vision board! ☀️ What do you think?
                                    </p>
                                    <div className="rounded-lg overflow-hidden">
                                        <img
                                            src="/placeholder.svg?height=300&width=500"
                                            alt="Summer vision board"
                                            width={500}
                                            height={300}
                                            className="w-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="p-4 pt-0 flex items-center justify-between border-t border-gray-100 mt-4">
                                    <div className="flex items-center gap-4">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-pink-500 hover:bg-pink-50 hover:text-pink-600"
                                        >
                                            <Heart className="h-4 w-4 mr-1" />
                                            124
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-500 hover:bg-gray-50 hover:text-gray-600"
                                        >
                                            <MessageCircle className="h-4 w-4 mr-1" />
                                            32
                                        </Button>
                                    </div>
                                    <span className="text-xs text-gray-500">2 days ago</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                                <div className="p-4">
                                    <p className="mb-4">
                                        Feeling inspired by these pastel colors today 💕
                                    </p>
                                    <div className="rounded-lg overflow-hidden">
                                        <img
                                            src="/placeholder.svg?height=300&width=500"
                                            alt="Pastel colors"
                                            width={500}
                                            height={300}
                                            className="w-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="p-4 pt-0 flex items-center justify-between border-t border-gray-100 mt-4">
                                    <div className="flex items-center gap-4">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-pink-500 hover:bg-pink-50 hover:text-pink-600"
                                        >
                                            <Heart className="h-4 w-4 mr-1" />
                                            87
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-500 hover:bg-gray-50 hover:text-gray-600"
                                        >
                                            <MessageCircle className="h-4 w-4 mr-1" />
                                            14
                                        </Button>
                                    </div>
                                    <span className="text-xs text-gray-500">1 week ago</span>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="likes" className="mt-6">
                        <div className="p-8 text-center text-gray-500">
                            <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <h3 className="text-lg font-medium mb-2">Posts you&apos;ve liked</h3>
                            <p className="max-w-md mx-auto">
                                When you like posts, they&apos;ll appear here for easy access.
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
