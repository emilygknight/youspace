"use client"

import { useState } from "react"
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Bell,
    Bookmark,
    Filter,
    Heart,
    Home,
    MessageCircle,
    Search,
    Sparkles,
    TrendingUp,
    User, UserRound,
    Users
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import HeaderTwo from "@/components/Header/HeaderTwo/index.jsx";

// Sample data for the explore page
const trendingBoards = [
    {
        id: 1,
        title: "Summer Aesthetic 2023",
        username: "emma_designs",
        userAvatar: "/placeholder.svg?height=40&width=40",
        userInitials: "ED",
        likes: 1243,
        comments: 89,
        image: "https://youspace-app.s3.us-west-1.amazonaws.com/Clouds.jpg",
        tags: ["summer", "aesthetic", "fashion"]
    },
    {
        id: 2,
        title: "Pastel Dreams",
        username: "pastel_lover",
        userAvatar: "/placeholder.svg?height=40&width=40",
        userInitials: "PL",
        likes: 982,
        comments: 56,
        image: "https://youspace-app.s3.us-west-1.amazonaws.com/icecream.jpg",
        tags: ["pastel", "soft", "aesthetic"]
    },
    {
        id: 3,
        title: "Study Motivation",
        username: "study_with_me",
        userAvatar: "/placeholder.svg?height=40&width=40",
        userInitials: "SM",
        likes: 756,
        comments: 42,
        image: "https://youspace-app.s3.us-west-1.amazonaws.com/parrot.jpg",
        tags: ["study", "motivation", "productivity"]
    },
    {
        id: 4,
        title: "Plant Lover's Paradise",
        username: "plant_girl",
        userAvatar: "/placeholder.svg?height=40&width=40",
        userInitials: "PG",
        likes: 645,
        comments: 37,
        image: "https://youspace-app.s3.us-west-1.amazonaws.com/PinkLeafs.jpg",
        tags: ["plants", "nature", "green"]
    }
]

const featuredCreators = [
    {
        id: 1,
        name: "Sophie Chen",
        username: "sophie_creates",
        avatar: "/placeholder.svg?height=64&width=64",
        initials: "SC",
        bio: "Digital artist & aesthetic curator ✨",
        followers: 12500
    },
    {
        id: 2,
        name: "Alex Rivera",
        username: "alex_aesthetic",
        avatar: "/placeholder.svg?height=64&width=64",
        initials: "AR",
        bio: "Fashion enthusiast | Travel lover 🌈",
        followers: 9800
    },
    {
        id: 3,
        name: "Mia Johnson",
        username: "mia_dreams",
        avatar: "/placeholder.svg?height=64&width=64",
        initials: "MJ",
        bio: "Creating dreamy spaces & sharing inspiration 💭",
        followers: 8700
    }
]

const trendingTags = [
    { id: 1, name: "SummerVibes", count: 12453 },
    { id: 2, name: "AestheticGoals", count: 9876 },
    { id: 3, name: "DreamySpaces", count: 8765 },
    { id: 4, name: "SelfCare", count: 7654 },
    { id: 5, name: "PastelDreams", count: 6543 },
    { id: 6, name: "StudyMotivation", count: 5432 },
    { id: 7, name: "PlantLover", count: 4321 },
    { id: 8, name: "ArtisticVibes", count: 3210 }
]

export default function ExplorePage() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
            {/* Navigation */}
            <HeaderTwo />
            <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
                {/* Sidebar */}
                <aside className="w-full md:w-64 shrink-0">
                    <div className="bg-white rounded-xl shadow-sm p-4 sticky top-20">
                        <nav className="space-y-1">
                            <Link
                                to="/dashboard"
                                className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg"
                            >
                                <Home className="h-5 w-5" />
                                <span>Home</span>
                            </Link>
                            <Link
                                to="/explore"
                                className="flex items-center gap-3 px-3 py-2 text-pink-500 bg-pink-50 rounded-lg font-medium"
                            >
                                <Sparkles className="h-5 w-5" />
                                <span>Explore</span>
                            </Link>
                            <Link
                                to="/friends"
                                className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg"
                            >
                                <Users className="h-5 w-5" />
                                <span>Friends</span>
                            </Link>
                            <Link
                                to="/saved"
                                className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg"
                            >
                                <Bookmark className="h-5 w-5" />
                                <span>Saved</span>
                            </Link>
                            <Link
                                to="/profile"
                                className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg"
                            >
                                <User className="h-5 w-5" />
                                <span>Profile</span>
                            </Link>
                        </nav>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <h3 className="font-medium text-gray-900 mb-3">Trending Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {trendingTags.slice(0, 6).map(tag => (
                                    <Badge
                                        key={tag.id}
                                        variant="outline"
                                        className="bg-gradient-to-r from-pink-50 to-purple-50 text-pink-500 hover:bg-pink-100 border-pink-100"
                                    >
                                        #{tag.name}
                                    </Badge>
                                ))}
                            </div>
                            <Button
                                variant="link"
                                size="sm"
                                className="mt-2 text-pink-500 p-0"
                            >
                                See all tags
                            </Button>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                            <div className="space-y-1">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-left font-normal hover:bg-pink-50 hover:text-pink-500"
                                >
                                    Aesthetic
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-left font-normal hover:bg-pink-50 hover:text-pink-500"
                                >
                                    Fashion
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-left font-normal hover:bg-pink-50 hover:text-pink-500"
                                >
                                    Study
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-left font-normal hover:bg-pink-50 hover:text-pink-500"
                                >
                                    Travel
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-left font-normal hover:bg-pink-50 hover:text-pink-500"
                                >
                                    Art
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-left font-normal hover:bg-pink-50 hover:text-pink-500"
                                >
                                    Plants & Nature
                                </Button>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    {/* Mobile Search */}
                    <div className="md:hidden mb-4 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search for inspiration..."
                            className="pl-10 bg-white border-gray-200 focus-visible:ring-pink-500"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <h1 className="text-2xl font-bold">Explore</h1>
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="border-gray-200">
                                        <Filter className="h-4 w-4 mr-2" />
                                        Filter
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Most Recent</DropdownMenuItem>
                                    <DropdownMenuItem>Most Popular</DropdownMenuItem>
                                    <DropdownMenuItem>Most Liked</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel>Categories</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Aesthetic</DropdownMenuItem>
                                    <DropdownMenuItem>Fashion</DropdownMenuItem>
                                    <DropdownMenuItem>Study</DropdownMenuItem>
                                    <DropdownMenuItem>Travel</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <Tabs defaultValue="for-you" className="mb-6">
                        <TabsList className="bg-white">
                            <TabsTrigger className="text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg data-[state=active]:text-pink-700 data-[state=active]:bg-pink-100 data-[state=active]:font-semibold data-[state=active]:shadow-sm" value="for-you">For You</TabsTrigger>
                            <TabsTrigger className="text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg data-[state=active]:text-pink-700 data-[state=active]:bg-pink-100 data-[state=active]:font-semibold data-[state=active]:shadow-sm" value="trending">Trending</TabsTrigger>
                            <TabsTrigger className="text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg data-[state=active]:text-pink-700 data-[state=active]:bg-pink-100 data-[state=active]:font-semibold data-[state=active]:shadow-sm" value="new">New</TabsTrigger>
                            <TabsTrigger className="text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg data-[state=active]:text-pink-700 data-[state=active]:bg-pink-100 data-[state=active]:font-semibold data-[state=active]:shadow-sm" value="creators">Creators</TabsTrigger>
                        </TabsList>

                        {/* For You Tab */}
                        <TabsContent value="for-you" className="mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Featured Board */}
                                <Card className="col-span-full overflow-hidden">
                                    <div className="relative">
                                        <img
                                            src="https://youspace-app.s3.us-west-1.amazonaws.com/confetti.jpg"
                                            alt="Featured vision board"
                                            width={1200}
                                            height={400}
                                            className="w-full h-64 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Avatar className="h-8 w-8 border-2 border-white">
                                                    <AvatarImage
                                                        src="/placeholder.svg?height=32&width=32"
                                                        alt="@featured_creator"
                                                    />
                                                    <AvatarFallback className="bg-pink-100 text-pink-500">
                                                        <UserRound />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-white font-medium">
                          @featured_creator
                        </span>
                                            </div>
                                            <h2 className="text-2xl font-bold text-white mb-1">
                                                Featured: Dream Spaces Collection
                                            </h2>
                                            <p className="text-white/80">
                                                A curated collection of dreamy aesthetic spaces and
                                                places
                                            </p>
                                            <div className="flex gap-2 mt-3">
                                                <Badge className="bg-pink-500/80 hover:bg-pink-500 text-white border-none">
                                                    #DreamSpaces
                                                </Badge>
                                                <Badge className="bg-purple-500/80 hover:bg-purple-500 text-white border-none">
                                                    #Aesthetic
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                {/* Recommended Boards */}
                                {trendingBoards.map(board => (
                                    <Card key={board.id} className="overflow-hidden">
                                        <Link href={`/board/${board.id}`}>
                                            <div className="relative">
                                                <img
                                                    src={board.image || "/placeholder.svg"}
                                                    alt={board.title}
                                                    width={600}
                                                    height={400}
                                                    className="w-full h-48 object-cover"
                                                />
                                                <div className="absolute top-3 right-3">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
                                                    >
                                                        <Bookmark className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Link>
                                        <CardContent className="p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarImage
                                                        src={board.userAvatar || "/placeholder.svg"}
                                                        alt={`@${board.username}`}
                                                    />
                                                    <AvatarFallback className="bg-pink-100 text-pink-500 text-xs">
                                                        {board.userInitials}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm text-gray-600">
                          @{board.username}
                        </span>
                                            </div>
                                            <h3 className="font-medium mb-2">{board.title}</h3>
                                            <div className="flex flex-wrap gap-1">
                                                {board.tags.map(tag => (
                                                    <Badge
                                                        key={tag}
                                                        variant="outline"
                                                        className="text-xs bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-100"
                                                    >
                                                        #{tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-4 pt-0 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 text-pink-500 hover:bg-pink-50 hover:text-pink-600 p-0"
                                                >
                                                    <Heart className="h-4 w-4 mr-1" />
                                                    {board.likes}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 text-gray-500 hover:bg-gray-50 hover:text-gray-600 p-0"
                                                >
                                                    <MessageCircle className="h-4 w-4 mr-1" />
                                                    {board.comments}
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        {/* Trending Tab */}
                        <TabsContent value="trending" className="mt-6">
                            <div className="flex items-center gap-2 mb-6">
                                <TrendingUp className="h-5 w-5 text-pink-500" />
                                <h2 className="text-lg font-medium">What's hot right now</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {trendingBoards.map(board => (
                                    <Card key={board.id} className="overflow-hidden">
                                        <Link href={`/board/${board.id}`}>
                                            <div className="relative">
                                                <img
                                                    src={board.image || "/placeholder.svg"}
                                                    alt={board.title}
                                                    width={600}
                                                    height={400}
                                                    className="w-full h-48 object-cover"
                                                />
                                                <div className="absolute top-3 left-3">
                                                    <Badge className="bg-pink-500/80 hover:bg-pink-500 text-white border-none">
                                                        Trending
                                                    </Badge>
                                                </div>
                                                <div className="absolute top-3 right-3">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
                                                    >
                                                        <Bookmark className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Link>
                                        <CardContent className="p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarImage
                                                        src={board.userAvatar || "/placeholder.svg"}
                                                        alt={`@${board.username}`}
                                                    />
                                                    <AvatarFallback className="bg-pink-100 text-pink-500 text-xs">
                                                        {board.userInitials}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm text-gray-600">
                          @{board.username}
                        </span>
                                            </div>
                                            <h3 className="font-medium mb-2">{board.title}</h3>
                                            <div className="flex flex-wrap gap-1">
                                                {board.tags.map(tag => (
                                                    <Badge
                                                        key={tag}
                                                        variant="outline"
                                                        className="text-xs bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-100"
                                                    >
                                                        #{tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-4 pt-0 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 text-pink-500 hover:bg-pink-50 hover:text-pink-600 p-0"
                                                >
                                                    <Heart className="h-4 w-4 mr-1" />
                                                    {board.likes}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 text-gray-500 hover:bg-gray-50 hover:text-gray-600 p-0"
                                                >
                                                    <MessageCircle className="h-4 w-4 mr-1" />
                                                    {board.comments}
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        {/* New Tab */}
                        <TabsContent value="new" className="mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* New content would go here - using the same structure as trending but with different data */}
                                <Card className="col-span-full p-8 text-center">
                                    <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                    <h3 className="text-lg font-medium mb-2">
                                        Fresh content coming soon!
                                    </h3>
                                    <p className="max-w-md mx-auto text-gray-500">
                                        We're curating the newest vision boards and creative
                                        content. Check back soon to see what's new in the YouSpace
                                        community.
                                    </p>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Creators Tab */}
                        <TabsContent value="creators" className="mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featuredCreators.map(creator => (
                                    <Card key={creator.id} className="overflow-hidden">
                                        <div className="h-24 bg-gradient-to-r from-pink-300 to-purple-300"></div>
                                        <div className="px-6 pb-6">
                                            <div className="flex justify-center -mt-12 mb-4">
                                                <Avatar className="h-24 w-24 border-4 border-white">
                                                    <AvatarImage
                                                        src={creator.avatar || "/placeholder.svg"}
                                                        alt={`@${creator.username}`}
                                                    />
                                                    <AvatarFallback className="text-xl bg-pink-100 text-pink-500">
                                                        {creator.initials}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <div className="text-center mb-4">
                                                <h3 className="font-bold text-lg">{creator.name}</h3>
                                                <p className="text-gray-500 text-sm">
                                                    @{creator.username}
                                                </p>
                                                <p className="mt-2 text-sm">{creator.bio}</p>
                                            </div>
                                            <div className="flex justify-center gap-2 mb-4">
                        <span className="text-sm text-gray-600">
                          <strong>
                            {(creator.followers / 1000).toFixed(1)}k
                          </strong>{" "}
                            followers
                        </span>
                                            </div>
                                            <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                                                Follow
                                            </Button>
                                        </div>
                                    </Card>
                                ))}

                                {/* More Creators Card */}
                                <Card className="overflow-hidden">
                                    <div className="h-24 bg-gradient-to-r from-blue-300 to-purple-300"></div>
                                    <div className="px-6 pb-6">
                                        <div className="flex justify-center -mt-12 mb-4">
                                            <div className="h-24 w-24 rounded-full border-4 border-white bg-white flex items-center justify-center">
                                                <Users className="h-12 w-12 text-purple-300" />
                                            </div>
                                        </div>
                                        <div className="text-center mb-4">
                                            <h3 className="font-bold text-lg">
                                                Discover More Creators
                                            </h3>
                                            <p className="mt-2 text-sm">
                                                Find more amazing creators to follow and get inspired by
                                                their vision boards.
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="w-full border-purple-200 text-purple-500 hover:bg-purple-50"
                                        >
                                            See All Creators
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>

                    {/* Trending Tags Section */}
                    <div className="mt-12">
                        <h2 className="text-xl font-bold mb-6">Explore by Tag</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {trendingTags.map(tag => (
                                <Card key={tag.id} className="overflow-hidden">
                                    <Link href={`/tag/${tag.name}`}>
                                        <div className="h-24 bg-gradient-to-r from-pink-200 to-purple-200 flex items-center justify-center">
                                            <h3 className="text-lg font-bold text-gray-800">
                                                #{tag.name}
                                            </h3>
                                        </div>
                                        <CardContent className="p-3">
                                            <p className="text-sm text-gray-500">
                                                {tag.count.toLocaleString()} posts
                                            </p>
                                        </CardContent>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
