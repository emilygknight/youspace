"use client"

import { useState } from "react"
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    ArrowLeft,
    Camera,
    Check,
    Grid3X3,
    ImageIcon,
    Layout,
    Loader2,
    Music,
    Palette,
    Save,
    Upload,
    UserRound,
    X
} from "lucide-react"

export default function ProfileEditPage() {
    const [saving, setSaving] = useState(false)
    const [selectedLayout, setSelectedLayout] = useState("grid")
    const [selectedTheme, setSelectedTheme] = useState("dreamy")
    const [previewMode, setPreviewMode] = useState(false)

    const handleSave = () => {
        setSaving(true)
        // Simulate API call
        setTimeout(() => {
            setSaving(false)
        }, 1500)
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
                            <span className="text-xl font-bold">Edit Profile</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                className="border-pink-200 text-pink-500 hover:bg-pink-50"
                                onClick={() => setPreviewMode(!previewMode)}
                            >
                                {previewMode ? "Edit Mode" : "Preview"}
                            </Button>
                            <Button
                                onClick={handleSave}
                                disabled={saving}
                                className="text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving
                                    </>
                                ) : (
                                    <>
                                        <Save className=" mr-2 h-4 w-4" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-6">
                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList className="bg-white mx-auto w-fit">
                        <TabsTrigger value="profile">Profile Info</TabsTrigger>
                        <TabsTrigger value="appearance">Appearance</TabsTrigger>
                        <TabsTrigger value="board">Vision Board</TabsTrigger>
                        <TabsTrigger value="music">Music</TabsTrigger>
                    </TabsList>

                    {/* Profile Info Tab */}
                    <TabsContent value="profile">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <Card>
                                    <CardContent className="p-6 space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">
                                                Profile Information
                                            </h3>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="first-name">First name</Label>
                                                    <Input
                                                        id="first-name"
                                                        defaultValue="Stella"
                                                        className="border-gray-200 focus-visible:ring-pink-500"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="last-name">Last name</Label>
                                                    <Input
                                                        id="last-name"
                                                        defaultValue="Dreams"
                                                        className="border-gray-200 focus-visible:ring-pink-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="username">Username</Label>
                                                <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm">
                            @
                          </span>
                                                    <Input
                                                        id="username"
                                                        defaultValue="stelladreams"
                                                        className="rounded-l-none border-gray-200 focus-visible:ring-pink-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="bio">Bio</Label>
                                                <Textarea
                                                    id="bio"
                                                    defaultValue="✨ Dreamer, creator, inspiration seeker ✨ Sharing my aesthetic journey and collecting beautiful moments."
                                                    className="min-h-[100px] border-gray-200 focus-visible:ring-pink-500"
                                                />
                                                <p className="text-xs text-gray-500">
                                                    Maximum 160 characters
                                                </p>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    defaultValue="stella@example.com"
                                                    className="border-gray-200 focus-visible:ring-pink-500"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Profile Visibility</Label>
                                                <RadioGroup
                                                    defaultValue="public"
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="public" id="public" />
                                                        <Label htmlFor="public" className="font-normal">
                                                            Public - Anyone can view your profile
                                                        </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="friends" id="friends" />
                                                        <Label htmlFor="friends" className="font-normal">
                                                            Friends Only - Only people you follow can view
                                                            your profile
                                                        </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="private" id="private" />
                                                        <Label htmlFor="private" className="font-normal">
                                                            Private - Only you can view your profile
                                                        </Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="md:col-span-1">
                                <Card>
                                    <CardContent className="p-6 space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Profile Picture</h3>
                                            <div className="flex flex-col items-center">
                                                <div className="relative group">
                                                    <Avatar className="h-32 w-32 border-4 border-white bg-white">
                                                        <AvatarImage
                                                            src="/placeholder.svg?height=128&width=128"
                                                            alt="@stelladreams"
                                                        />
                                                        <AvatarFallback className="text-2xl bg-pink-100 text-pink-500">
                                                            <UserRound size={64} />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-white h-10 w-10"
                                                        >
                                                            <Camera className="h-5 w-5" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="mt-4 space-y-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full border-gray-200"
                                                    >
                                                        <Upload className="h-4 w-4 mr-2" />
                                                        Upload New
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full border-gray-200 text-red-500"
                                                    >
                                                        <X className="h-4 w-4 mr-2" />
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-gray-100">
                                                <h3 className="text-lg font-medium mb-4">
                                                    Banner Image
                                                </h3>
                                                <div className="relative group rounded-lg overflow-hidden">
                                                    <div className="h-32 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300"></div>
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-white h-10 w-10"
                                                        >
                                                            <Camera className="h-5 w-5" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="mt-4 space-y-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full border-gray-200"
                                                    >
                                                        <Upload className="h-4 w-4 mr-2" />
                                                        Upload New
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full border-gray-200"
                                                    >
                                                        <Palette className="h-4 w-4 mr-2" />
                                                        Use Gradient
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Appearance Tab */}
                    <TabsContent value="appearance">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <Card>
                                    <CardContent className="p-6 space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Theme</h3>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                <div
                                                    className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                                                        selectedTheme === "dreamy"
                                                            ? "border-pink-500"
                                                            : "border-transparent"
                                                    }`}
                                                    onClick={() => setSelectedTheme("dreamy")}
                                                >
                                                    <div className="h-24 bg-gradient-to-r from-pink-300 to-purple-300"></div>
                                                    <div className="p-2 bg-white">
                                                        <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">
                                Dreamy Pastels
                              </span>
                                                            {selectedTheme === "dreamy" && (
                                                                <Check className="h-4 w-4 text-pink-500" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                                                        selectedTheme === "ocean"
                                                            ? "border-blue-500"
                                                            : "border-transparent"
                                                    }`}
                                                    onClick={() => setSelectedTheme("ocean")}
                                                >
                                                    <div className="h-24 bg-gradient-to-r from-blue-300 to-cyan-300"></div>
                                                    <div className="p-2 bg-white">
                                                        <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">
                                Ocean Vibes
                              </span>
                                                            {selectedTheme === "ocean" && (
                                                                <Check className="h-4 w-4 text-blue-500" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                                                        selectedTheme === "sunset"
                                                            ? "border-orange-500"
                                                            : "border-transparent"
                                                    }`}
                                                    onClick={() => setSelectedTheme("sunset")}
                                                >
                                                    <div className="h-24 bg-gradient-to-r from-orange-300 to-pink-300"></div>
                                                    <div className="p-2 bg-white">
                                                        <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">
                                Sunset Dreams
                              </span>
                                                            {selectedTheme === "sunset" && (
                                                                <Check className="h-4 w-4 text-orange-500" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                                                        selectedTheme === "nature"
                                                            ? "border-green-500"
                                                            : "border-transparent"
                                                    }`}
                                                    onClick={() => setSelectedTheme("nature")}
                                                >
                                                    <div className="h-24 bg-gradient-to-r from-green-300 to-emerald-300"></div>
                                                    <div className="p-2 bg-white">
                                                        <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">
                                Nature Inspired
                              </span>
                                                            {selectedTheme === "nature" && (
                                                                <Check className="h-4 w-4 text-green-500" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-6 border-t border-gray-100">
                                                <h3 className="text-lg font-medium mb-4">Typography</h3>
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label>Font Style</Label>
                                                        <RadioGroup
                                                            defaultValue="rounded"
                                                            className="flex space-x-4"
                                                        >
                                                            <div className="flex flex-col items-center space-y-1">
                                                                <div className="border border-gray-200 rounded-md p-3 flex items-center justify-center w-24 h-16">
                                                                    <span className="font-sans">Aa</span>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value="rounded"
                                                                        id="rounded"
                                                                    />
                                                                    <Label
                                                                        htmlFor="rounded"
                                                                        className="font-normal text-sm"
                                                                    >
                                                                        Rounded
                                                                    </Label>
                                                                </div>
                                                            </div>

                                                            <div className="flex flex-col items-center space-y-1">
                                                                <div className="border border-gray-200 rounded-md p-3 flex items-center justify-center w-24 h-16">
                                                                    <span className="font-serif">Aa</span>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="serif" id="serif" />
                                                                    <Label
                                                                        htmlFor="serif"
                                                                        className="font-normal text-sm"
                                                                    >
                                                                        Serif
                                                                    </Label>
                                                                </div>
                                                            </div>

                                                            <div className="flex flex-col items-center space-y-1">
                                                                <div className="border border-gray-200 rounded-md p-3 flex items-center justify-center w-24 h-16">
                                                                    <span className="font-mono">Aa</span>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="mono" id="mono" />
                                                                    <Label
                                                                        htmlFor="mono"
                                                                        className="font-normal text-sm"
                                                                    >
                                                                        Mono
                                                                    </Label>
                                                                </div>
                                                            </div>
                                                        </RadioGroup>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <Label>Font Size</Label>
                                                            <span className="text-sm text-gray-500">
                                Medium
                              </span>
                                                        </div>
                                                        <Slider
                                                            defaultValue={[50]}
                                                            max={100}
                                                            step={1}
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-6 border-t border-gray-100">
                                                <h3 className="text-lg font-medium mb-4">
                                                    Accessibility
                                                </h3>
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-0.5">
                                                            <Label htmlFor="reduced-motion">
                                                                Reduced Motion
                                                            </Label>
                                                            <p className="text-sm text-gray-500">
                                                                Minimize animations
                                                            </p>
                                                        </div>
                                                        <Switch id="reduced-motion" />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-0.5">
                                                            <Label htmlFor="high-contrast">
                                                                High Contrast
                                                            </Label>
                                                            <p className="text-sm text-gray-500">
                                                                Increase color contrast
                                                            </p>
                                                        </div>
                                                        <Switch id="high-contrast" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="md:col-span-1">
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-medium mb-4">Theme Preview</h3>
                                        <div className="rounded-lg overflow-hidden border border-gray-200">
                                            <div className="h-24 bg-gradient-to-r from-pink-300 to-purple-300"></div>
                                            <div className="bg-white p-4">
                                                <div className="flex items-center gap-3 -mt-8 mb-4">
                                                    <Avatar className="h-16 w-16 border-4 border-white">
                                                        <AvatarImage
                                                            src="/placeholder.svg?height=64&width=64"
                                                            alt="@username"
                                                        />
                                                        <AvatarFallback className="text-lg bg-pink-100 text-pink-500">
                                                            SD
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </div>
                                                <h4 className="font-bold">Stella Dreams</h4>
                                                <p className="text-gray-500 text-xs">@stelladreams</p>
                                                <p className="text-xs mt-2">
                                                    ✨ Dreamer, creator, inspiration seeker ✨
                                                </p>
                                                <div className="mt-3 flex gap-1">
                                                    <div className="h-2 w-12 rounded-full bg-pink-200"></div>
                                                    <div className="h-2 w-8 rounded-full bg-purple-200"></div>
                                                    <div className="h-2 w-6 rounded-full bg-blue-200"></div>
                                                </div>
                                                <div className="mt-3 grid grid-cols-3 gap-1">
                                                    <div className="aspect-square rounded bg-gray-100"></div>
                                                    <div className="aspect-square rounded bg-gray-100"></div>
                                                    <div className="aspect-square rounded bg-gray-100"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Vision Board Tab */}
                    <TabsContent value="board">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <Card>
                                    <CardContent className="p-6 space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">
                                                Vision Board Layout
                                            </h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div
                                                    className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                                                        selectedLayout === "grid"
                                                            ? "border-pink-500"
                                                            : "border-transparent"
                                                    }`}
                                                    onClick={() => setSelectedLayout("grid")}
                                                >
                                                    <div className="p-4 bg-gray-50 flex items-center justify-center h-32">
                                                        <Grid3X3 className="h-12 w-12 text-gray-400" />
                                                    </div>
                                                    <div className="p-2 bg-white">
                                                        <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">
                                Grid Layout
                              </span>
                                                            {selectedLayout === "grid" && (
                                                                <Check className="h-4 w-4 text-pink-500" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                                                        selectedLayout === "masonry"
                                                            ? "border-pink-500"
                                                            : "border-transparent"
                                                    }`}
                                                    onClick={() => setSelectedLayout("masonry")}
                                                >
                                                    <div className="p-4 bg-gray-50 flex items-center justify-center h-32">
                                                        <Layout className="h-12 w-12 text-gray-400" />
                                                    </div>
                                                    <div className="p-2 bg-white">
                                                        <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">
                                Masonry Layout
                              </span>
                                                            {selectedLayout === "masonry" && (
                                                                <Check className="h-4 w-4 text-pink-500" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-6 border-t border-gray-100">
                                                <h3 className="text-lg font-medium mb-4">
                                                    Board Content
                                                </h3>
                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-4 gap-2">
                                                        {Array.from({ length: 8 }).map((_, i) => (
                                                            <div key={i} className="relative group">
                                                                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                                                    {i < 7 ? (
                                                                        <img
                                                                            src={`/placeholder.svg?height=100&width=100&text=${i +
                                                                            1}`}
                                                                            alt={`Vision board item ${i + 1}`}
                                                                            width={100}
                                                                            height={100}
                                                                            className="w-full h-full object-cover rounded-lg"
                                                                        />
                                                                    ) : (
                                                                        <div className="text-center">
                                                                            <ImageIcon className="h-6 w-6 mx-auto mb-1 text-gray-400" />
                                                                            <span className="text-xs text-gray-500">
                                        Add New
                                      </span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {i < 7 && (
                                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="text-white h-8 w-8"
                                                                        >
                                                                            <X className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <Button
                                                        variant="outline"
                                                        className="w-full border-gray-200"
                                                    >
                                                        <Upload className="h-4 w-4 mr-2" />
                                                        Upload New Images
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="pt-6 border-t border-gray-100">
                                                <h3 className="text-lg font-medium mb-4">
                                                    Board Settings
                                                </h3>
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-0.5">
                                                            <Label>Show Image Captions</Label>
                                                            <p className="text-sm text-gray-500">
                                                                Display text descriptions on hover
                                                            </p>
                                                        </div>
                                                        <Switch defaultChecked />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-0.5">
                                                            <Label>Allow Reactions</Label>
                                                            <p className="text-sm text-gray-500">
                                                                Let visitors react to your board items
                                                            </p>
                                                        </div>
                                                        <Switch defaultChecked />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="md:col-span-1">
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-medium mb-4">Layout Preview</h3>
                                        <div className="rounded-lg overflow-hidden border border-gray-200 p-3 bg-white">
                                            {selectedLayout === "grid" ? (
                                                <div className="grid grid-cols-3 gap-1">
                                                    <div className="aspect-square bg-gray-100 rounded"></div>
                                                    <div className="aspect-square bg-gray-100 rounded"></div>
                                                    <div className="aspect-square bg-gray-100 rounded"></div>
                                                    <div className="aspect-square bg-gray-100 rounded"></div>
                                                    <div className="aspect-square bg-gray-100 rounded"></div>
                                                    <div className="aspect-square bg-gray-100 rounded"></div>
                                                    <div className="aspect-square bg-gray-100 rounded"></div>
                                                    <div className="aspect-square bg-gray-100 rounded"></div>
                                                    <div className="aspect-square bg-gray-100 rounded"></div>
                                                </div>
                                            ) : (
                                                <div className="space-y-1">
                                                    <div className="grid grid-cols-2 gap-1">
                                                        <div className="aspect-square bg-gray-100 rounded"></div>
                                                        <div className="aspect-square bg-gray-100 rounded"></div>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-1">
                                                        <div className="aspect-square bg-gray-100 rounded"></div>
                                                        <div className="aspect-square bg-gray-100 rounded"></div>
                                                        <div className="aspect-square bg-gray-100 rounded"></div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-1">
                                                        <div className="aspect-square bg-gray-100 rounded"></div>
                                                        <div className="aspect-square bg-gray-100 rounded"></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-6">
                                            <h3 className="text-lg font-medium mb-4">Tips</h3>
                                            <ul className="space-y-2 text-sm text-gray-600">
                                                <li className="flex items-start gap-2">
                                                    <div className="rounded-full bg-pink-100 p-1 mt-0.5">
                                                        <Check className="h-3 w-3 text-pink-500" />
                                                    </div>
                                                    <span>
                            Use high-quality images for the best appearance
                          </span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="rounded-full bg-pink-100 p-1 mt-0.5">
                                                        <Check className="h-3 w-3 text-pink-500" />
                                                    </div>
                                                    <span>
                            Create a cohesive color palette for your board
                          </span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="rounded-full bg-pink-100 p-1 mt-0.5">
                                                        <Check className="h-3 w-3 text-pink-500" />
                                                    </div>
                                                    <span>
                            Mix different sized images for visual interest
                          </span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="rounded-full bg-pink-100 p-1 mt-0.5">
                                                        <Check className="h-3 w-3 text-pink-500" />
                                                    </div>
                                                    <span>
                            Add captions to explain the significance of each
                            image
                          </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Music Tab */}
                    <TabsContent value="music">
                        <Card>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Profile Music</h3>
                                    <p className="text-gray-600">
                                        Add music to your profile to set the mood for visitors. The
                                        song will play when someone views your profile.
                                    </p>

                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <div className="flex items-center gap-4">
                                            <div className="h-16 w-16 rounded-md bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white">
                                                <Music className="h-8 w-8" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium">Currently Selected</h4>
                                                <p className="text-sm">
                                                    Dreamy Lo-fi Beats - Chill Vibes
                                                </p>
                                                <div className="mt-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                                                    <div className="h-full w-1/3 bg-pink-500"></div>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="border-gray-200"
                                            >
                                                Change
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-100">
                                        <h3 className="text-lg font-medium mb-4">Music Library</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                                                <div className="h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center text-purple-500">
                                                    <Music className="h-5 w-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-sm">
                                                        Lofi Study Beats
                                                    </h4>
                                                    <p className="text-xs text-gray-500">
                                                        ChillHop Music
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <span className="sr-only">Play</span>
                                                    ▶️
                                                </Button>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                                                <div className="h-10 w-10 rounded-md bg-pink-100 flex items-center justify-center text-pink-500">
                                                    <Music className="h-5 w-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-sm">Dreamy Pop</h4>
                                                    <p className="text-xs text-gray-500">
                                                        Aesthetic Vibes
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <span className="sr-only">Play</span>
                                                    ▶️
                                                </Button>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                                                <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-500">
                                                    <Music className="h-5 w-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-sm">
                                                        Ambient Nature
                                                    </h4>
                                                    <p className="text-xs text-gray-500">
                                                        Relaxing Sounds
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <span className="sr-only">Play</span>
                                                    ▶️
                                                </Button>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                                                <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center text-green-500">
                                                    <Music className="h-5 w-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-sm">
                                                        Indie Acoustic
                                                    </h4>
                                                    <p className="text-xs text-gray-500">Cozy Playlist</p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <span className="sr-only">Play</span>
                                                    ▶️
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-100">
                                        <h3 className="text-lg font-medium mb-4">
                                            Upload Your Own Music
                                        </h3>
                                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                                            <Music className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                                            <p className="text-sm text-gray-500 mb-2">
                                                Upload your own music file (MP3 format)
                                            </p>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="border-gray-200"
                                            >
                                                <Upload className="h-4 w-4 mr-2" />
                                                Upload Music
                                            </Button>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Note: Please ensure you have the rights to use any music
                                            you upload.
                                        </p>
                                    </div>

                                    <div className="pt-6 border-t border-gray-100">
                                        <h3 className="text-lg font-medium mb-4">Music Settings</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label>Autoplay Music</Label>
                                                    <p className="text-sm text-gray-500">
                                                        Play music automatically when someone visits your
                                                        profile
                                                    </p>
                                                </div>
                                                <Switch defaultChecked />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <Label>Music Volume</Label>
                                                    <span className="text-sm text-gray-500">70%</span>
                                                </div>
                                                <Slider
                                                    defaultValue={[70]}
                                                    max={100}
                                                    step={1}
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
