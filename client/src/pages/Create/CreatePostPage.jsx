"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
    ArrowLeft,
    AtSign,
    Camera,
    ChevronDown,
    GiftIcon as Gif,
    Globe,
    ImageIcon,
    Loader2,
    Lock,
    MapPin,
    Smile,
    Sparkles, UserRound,
    Users,
    X
} from "lucide-react"

export default function CreatePostPage() {
    const [postType, setPostType] = useState("thought")
    const [postText, setPostText] = useState("")
    const [selectedImages, setSelectedImages] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [tags, setTags] = useState([])
    const [tagInput, setTagInput] = useState("")
    const [privacy, setPrivacy] = useState("public")

    // Handle image selection
    const handleImageSelect = e => {
        if (e.target.files) {
            const newImages = Array.from(e.target.files).map(file =>
                URL.createObjectURL(file)
            )

            if (postType === "photo") {
                // For single photo, replace any existing
                setSelectedImages([newImages[0]])
            } else {
                // For multiple photos, add to existing (up to 4)
                setSelectedImages(prev => {
                    const combined = [...prev, ...newImages]
                    return combined.slice(0, 4) // Limit to 4 images
                })
            }
        }
    }

    // Remove an image
    const removeImage = index => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index))
    }

    // Handle tag input
    const handleTagInput = e => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault()
            if (
                tagInput.trim() &&
                !tags.includes(tagInput.trim()) &&
                tags.length < 5
            ) {
                setTags([...tags, tagInput.trim()])
                setTagInput("")
            }
        }
    }

    // Remove a tag
    const removeTag = tag => {
        setTags(prev => prev.filter(t => t !== tag))
    }

    // Handle form submission
    const handleSubmit = e => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            // Reset form or redirect
            // For demo purposes, we'll just reset the form
            setPostText("")
            setSelectedImages([])
            setTags([])
            setTagInput("")
            setPostType("thought")
            // In a real app, you would redirect to the new post or feed
        }, 1500)
    }

    // Privacy icon mapping
    const privacyIcons = {
        public: <Globe className="h-4 w-4" />,
        friends: <Users className="h-4 w-4" />,
        private: <Lock className="h-4 w-4" />
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
            {/* Header */}
            <header className="bg-white border-b border-pink-100 sticky top-0 z-50">
                <div className="container mx-auto py-3 px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Link to="/dashboard">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full h-8 w-8"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <span className="text-xl font-bold">Create Post</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                onClick={handleSubmit}
                                disabled={
                                    isSubmitting || (!postText && selectedImages.length === 0)
                                }
                                className="text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Posting...
                                    </>
                                ) : (
                                    "Post"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-6">
                <div className="max-w-2xl mx-auto">
                    <Card className="bg-white shadow-sm">
                        <CardHeader className="pb-0">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage
                                        src="/placeholder.svg?height=40&width=40"
                                        alt="@username"
                                    />
                                    <AvatarFallback className="bg-pink-100 text-pink-500">
                                        <UserRound />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="font-medium">Your Name</span>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-6 px-2 text-xs text-gray-500"
                                            >
                                                {privacyIcons[privacy]}
                                                <span className="ml-1 capitalize">{privacy}</span>
                                                <ChevronDown className="ml-1 h-3 w-3" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start">
                                            <DropdownMenuItem onClick={() => setPrivacy("public")}>
                                                <Globe className="mr-2 h-4 w-4" />
                                                <span>Public</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setPrivacy("friends")}>
                                                <Users className="mr-2 h-4 w-4" />
                                                <span>Friends Only</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setPrivacy("private")}>
                                                <Lock className="mr-2 h-4 w-4" />
                                                <span>Private</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="pt-4">
                            <form onSubmit={handleSubmit}>
                                <Tabs
                                    defaultValue="thought"
                                    value={postType}
                                    onValueChange={value => setPostType(value)}
                                    className="mb-4"
                                >
                                    {/*className="text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg data-[state=active]:text-pink-700 data-[state=active]:bg-pink-100 data-[state=active]:font-semibold data-[state=active]:shadow-sm"*/}
                                    <TabsList className="grid grid-cols-3">
                                        <TabsTrigger className="text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg data-[state=active]:text-pink-700 data-[state=active]:bg-pink-100 data-[state=active]:font-semibold data-[state=active]:shadow-sm" value="thought">Thought</TabsTrigger>
                                        <TabsTrigger className="text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg data-[state=active]:text-pink-700 data-[state=active]:bg-pink-100 data-[state=active]:font-semibold data-[state=active]:shadow-sm" value="photo">Photo</TabsTrigger>
                                        <TabsTrigger className="text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg data-[state=active]:text-pink-700 data-[state=active]:bg-pink-100 data-[state=active]:font-semibold data-[state=active]:shadow-sm" value="multiple">Multiple</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="thought" className="space-y-4">
                                        <Textarea
                                            placeholder="What's on your mind?"
                                            className="min-h-[120px] border-gray-200 focus-visible:ring-pink-500"
                                            value={postText}
                                            onChange={e => setPostText(e.target.value)}
                                        />
                                    </TabsContent>

                                    <TabsContent value="photo" className="space-y-4">
                                        <Textarea
                                            placeholder="Add a caption to your photo..."
                                            className="min-h-[80px] border-gray-200 focus-visible:ring-pink-500"
                                            value={postText}
                                            onChange={e => setPostText(e.target.value)}
                                        />

                                        {selectedImages.length === 0 ? (
                                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                                                <ImageIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                                                <p className="text-sm text-gray-500 mb-2">
                                                    Drag and drop a photo here, or click to browse
                                                </p>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-gray-200"
                                                    onClick={() =>
                                                        document.getElementById("photo-upload")?.click()
                                                    }
                                                >
                                                    Upload Photo
                                                </Button>
                                                <input
                                                    id="photo-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleImageSelect}
                                                />
                                            </div>
                                        ) : (
                                            <div className="relative rounded-lg overflow-hidden">
                                                <img
                                                    src={selectedImages[0] || "/placeholder.svg"}
                                                    alt="Selected photo"
                                                    width={600}
                                                    height={400}
                                                    className="w-full object-cover rounded-lg"
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
                                                    onClick={() => removeImage(0)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="multiple" className="space-y-4">
                                        <Textarea
                                            placeholder="Share multiple photos..."
                                            className="min-h-[80px] border-gray-200 focus-visible:ring-pink-500"
                                            value={postText}
                                            onChange={e => setPostText(e.target.value)}
                                        />

                                        <div className="grid grid-cols-2 gap-2">
                                            {Array.from({ length: 4 }).map((_, index) => (
                                                <div key={index} className="aspect-square">
                                                    {index < selectedImages.length ? (
                                                        <div className="relative h-full">
                                                            <img
                                                                src={
                                                                    selectedImages[index] || "/placeholder.svg"
                                                                }
                                                                alt={`Selected photo ${index + 1}`}
                                                                width={300}
                                                                height={300}
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="absolute top-2 right-2 h-6 w-6 rounded-full bg-black/50 text-white hover:bg-black/70"
                                                                onClick={() => removeImage(index)}
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="h-full border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                                                            onClick={() =>
                                                                document
                                                                    .getElementById("multiple-upload")
                                                                    ?.click()
                                                            }
                                                        >
                                                            {index === selectedImages.length ? (
                                                                <>
                                                                    <ImageIcon className="h-6 w-6 text-gray-400 mb-1" />
                                                                    <span className="text-xs text-gray-500">
                                    Add Photo
                                  </span>
                                                                </>
                                                            ) : null}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            <input
                                                id="multiple-upload"
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                className="hidden"
                                                onChange={handleImageSelect}
                                            />
                                        </div>
                                    </TabsContent>
                                </Tabs>

                                <div className="space-y-4 mt-6">
                                    <div>
                                        <Label htmlFor="tags" className="text-sm font-medium">
                                            Add Tags (up to 5)
                                        </Label>
                                        <div className="flex flex-wrap gap-2 mt-2 mb-2">
                                            {tags.map(tag => (
                                                <Badge
                                                    key={tag}
                                                    variant="outline"
                                                    className="bg-pink-50 text-pink-500 hover:bg-pink-100 border-pink-100 flex items-center gap-1 cursor-pointer"
                                                >
                                                    #{tag}
                                                    <X
                                                        className="h-3 w-3 cursor-pointer"
                                                        onClick={() => removeTag(tag)}
                                                    />
                                                </Badge>
                                            ))}
                                        </div>
                                        <Input
                                            id="tags"
                                            placeholder="Type a tag and press Enter (e.g. aesthetic)"
                                            className="border-gray-200 focus-visible:ring-pink-500"
                                            value={tagInput}
                                            onChange={e => setTagInput(e.target.value)}
                                            onKeyDown={handleTagInput}
                                            disabled={tags.length >= 5}
                                        />
                                        {tags.length >= 5 && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                Youve reached the maximum number of tags (5)
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="comments">Allow Comments</Label>
                                            <p className="text-xs text-gray-500">
                                                Let others comment on your post
                                            </p>
                                        </div>
                                        <Switch id="comments" defaultChecked />
                                    </div>
                                </div>
                            </form>
                        </CardContent>

                        <CardFooter className="border-t border-gray-100 flex justify-between">
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full h-9 w-9 text-gray-500 hover:text-pink-500 hover:bg-pink-50"
                                    onClick={() =>
                                        document
                                            .getElementById(
                                                postType === "photo"
                                                    ? "photo-upload"
                                                    : "multiple-upload"
                                            )
                                            ?.click()
                                    }
                                >
                                    <Camera className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full h-9 w-9 text-gray-500 hover:text-pink-500 hover:bg-pink-50"
                                >
                                    <Gif className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full h-9 w-9 text-gray-500 hover:text-pink-500 hover:bg-pink-50"
                                >
                                    <Smile className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full h-9 w-9 text-gray-500 hover:text-pink-500 hover:bg-pink-50"
                                >
                                    <MapPin className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full h-9 w-9 text-gray-500 hover:text-pink-500 hover:bg-pink-50"
                                >
                                    <AtSign className="h-5 w-5" />
                                </Button>
                            </div>
                            <div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-pink-200 text-pink-500 hover:bg-pink-50"
                                >
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Add to Vision Board
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>

                    {/* Post Preview */}
                    {(postText || selectedImages.length > 0) && (
                        <div className="mt-6">
                            <h3 className="text-lg font-medium mb-3">Preview</h3>
                            <Card className="bg-white shadow-sm">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage
                                                src="/placeholder.svg?height=40&width=40"
                                                alt="@username"
                                            />
                                            <AvatarFallback className="bg-pink-100 text-pink-500">
                                                US
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <span className="font-medium">Your Name</span>
                                            <p className="text-xs text-gray-500">Just now</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    {postText && <p className="mb-4">{postText}</p>}

                                    {selectedImages.length > 0 && (
                                        <div
                                            className={`${
                                                selectedImages.length === 1
                                                    ? ""
                                                    : "grid grid-cols-2 gap-2"
                                            }`}
                                        >
                                            {selectedImages.map((img, index) => (
                                                <div
                                                    key={index}
                                                    className={`${
                                                        selectedImages.length === 1
                                                            ? "rounded-xl overflow-hidden"
                                                            : "rounded-lg overflow-hidden"
                                                    }`}
                                                >
                                                    <img
                                                        src={img || "/placeholder.svg"}
                                                        alt={`Preview ${index + 1}`}
                                                        width={600}
                                                        height={400}
                                                        className="w-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-3">
                                            {tags.map(tag => (
                                                <Badge
                                                    key={tag}
                                                    variant="outline"
                                                    className="text-xs bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-100"
                                                >
                                                    #{tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
