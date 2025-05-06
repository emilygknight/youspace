"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Link } from "react-router-dom";
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    ArrowLeft,
    ArrowRight,
    CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Edit,
    Home,
    ImageIcon, UserRound
} from "lucide-react"

// Sample diary entries
const diaryEntries = [
    {
        id: 1,
        date: "2023-04-26",
        prompt: "What's one small thing that brought you joy today?",
        content:
            "I found a new coffee shop today with the cutest aesthetic! The walls were covered in pressed flowers and they had the most delicious lavender latte. I took some photos for inspiration for my room redecoration project. Sometimes it's the little discoveries that make a day special. ☕✨",
        mood: "happy",
        stickers: ["coffee", "flower", "sparkle"]
    },
    {
        id: 2,
        date: "2023-04-25",
        prompt: "Describe a color that represents how you feel today.",
        content:
            "Today feels like a soft periwinkle blue - calm but with a hint of creativity bubbling underneath. I spent the morning sketching and then had a long walk in the park. The sky was that perfect shade of blue with fluffy clouds. I feel peaceful but inspired. 💙",
        mood: "calm",
        stickers: ["cloud", "art", "nature"]
    },
    {
        id: 3,
        date: "2023-04-24",
        prompt: "What's something you're looking forward to this week?",
        content:
            "I'm so excited for the art exhibition this weekend! My friend has two pieces being displayed and I can't wait to support her. I'm also looking forward to trying that new recipe I found - strawberry matcha cookies sound interesting! Sometimes having things to look forward to makes the week go by faster. 🎨🍓",
        mood: "excited",
        stickers: ["art", "food", "star"]
    }
]

// Sticker data
const stickers = [
    { id: "heart", emoji: "❤️", name: "Heart" },
    { id: "star", emoji: "⭐", name: "Star" },
    { id: "flower", emoji: "🌸", name: "Flower" },
    { id: "sparkle", emoji: "✨", name: "Sparkle" },
    { id: "coffee", emoji: "☕", name: "Coffee" },
    { id: "book", emoji: "📚", name: "Book" },
    { id: "music", emoji: "🎵", name: "Music" },
    { id: "art", emoji: "🎨", name: "Art" },
    { id: "nature", emoji: "🌿", name: "Nature" },
    { id: "food", emoji: "🍓", name: "Food" },
    { id: "cloud", emoji: "☁️", name: "Cloud" },
    { id: "moon", emoji: "🌙", name: "Moon" }
]

// Mood options
const moods = [
    { id: "happy", emoji: "😊", name: "Happy" },
    { id: "calm", emoji: "😌", name: "Calm" },
    { id: "excited", emoji: "🤩", name: "Excited" },
    { id: "sad", emoji: "😔", name: "Sad" },
    { id: "tired", emoji: "😴", name: "Tired" },
    { id: "creative", emoji: "🎨", name: "Creative" },
    { id: "anxious", emoji: "😰", name: "Anxious" },
    { id: "grateful", emoji: "🙏", name: "Grateful" }
]

export default function DiaryPage() {
    const [date, setDate] = useState(new Date())
    const [selectedEntry, setSelectedEntry] = useState(diaryEntries[0])
    const [selectedMood, setSelectedMood] = useState(null)
    const [selectedStickers, setSelectedStickers] = useState([])

    // Function to handle sticker selection
    const toggleSticker = stickerId => {
        if (selectedStickers.includes(stickerId)) {
            setSelectedStickers(selectedStickers.filter(id => id !== stickerId))
        } else {
            setSelectedStickers([...selectedStickers, stickerId])
        }
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
                                    <Home className="h-4 w-4" />
                                </Button>
                            </Link>
                            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Daily Diary
              </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="border-pink-200 text-gray-600 hover:text-pink-500 hover:bg-pink-50"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "MMM d, yyyy") : "Select date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="end">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                        className="rounded-md border border-pink-100"
                                    />
                                </PopoverContent>
                            </Popover>

                            <Avatar className="h-8 w-8 border-2 border-pink-200">
                                <AvatarImage
                                    src="/placeholder.svg?height=32&width=32"
                                    alt="@username"
                                />
                                <AvatarFallback className="bg-pink-100 text-pink-500">
                                    <UserRound />
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Sidebar - Previous Entries */}
                    <div className="lg:col-span-1">
                        <Card className="bg-white shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle>Your Diary Entries</CardTitle>
                                <CardDescription>
                                    Browse through your previous entries
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {diaryEntries.map(entry => (
                                    <div
                                        key={entry.id}
                                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                            selectedEntry.id === entry.id
                                                ? "bg-pink-50 border border-pink-200"
                                                : "hover:bg-gray-50 border border-transparent"
                                        }`}
                                        onClick={() => setSelectedEntry(entry)}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm">
                        {format(new Date(entry.date), "MMM d, yyyy")}
                      </span>
                                            <div className="text-lg">
                                                {entry.mood === "happy" && "😊"}
                                                {entry.mood === "calm" && "😌"}
                                                {entry.mood === "excited" && "🤩"}
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 mb-1">
                                            Prompt: {entry.prompt}
                                        </p>
                                        <p className="text-sm line-clamp-2">
                                            {entry.content.substring(0, 100)}...
                                        </p>
                                        <div className="mt-2 flex gap-1">
                                            {entry.stickers.map(sticker => (
                                                <span key={sticker} className="text-sm">
                          {stickers.find(s => s.id === sticker)?.emoji}
                        </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                <div className="flex justify-between pt-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-gray-200"
                                    >
                                        <ChevronLeft className="h-4 w-4 mr-1" />
                                        Older
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-gray-200"
                                    >
                                        Newer
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content - Current Entry */}
                    <div className="lg:col-span-2">
                        <Tabs defaultValue="write">
                            <TabsList className="bg-white mb-4">
                                <TabsTrigger value="write">Write Today's Entry</TabsTrigger>
                                <TabsTrigger value="view">View Entry</TabsTrigger>
                            </TabsList>

                            {/* Write Tab */}
                            <TabsContent value="write">
                                <Card className="bg-white shadow-sm">
                                    <CardHeader>
                                        <CardTitle>Today's Diary</CardTitle>
                                        <CardDescription>
                                            {format(new Date(), "EEEE, MMMM d, yyyy")}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                                            <h3 className="font-medium text-purple-700 mb-2">
                                                Today's Prompt
                                            </h3>
                                            <p className="text-gray-700">
                                                What's one small thing that brought you joy today?
                                            </p>
                                            <div className="mt-3 flex justify-between">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-purple-200 text-purple-600 hover:bg-purple-100"
                                                >
                                                    Use This Prompt
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-gray-500"
                                                >
                                                    <ArrowRight className="h-4 w-4 mr-1" />
                                                    Different Prompt
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <Label htmlFor="custom-prompt">
                                                    Or write your own prompt:
                                                </Label>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-6 text-xs text-gray-500"
                                                >
                                                    Clear
                                                </Button>
                                            </div>
                                            <Input
                                                id="custom-prompt"
                                                placeholder="Enter your own prompt..."
                                                className="border-gray-200 focus-visible:ring-pink-500"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="diary-content">Your thoughts:</Label>
                                            <Textarea
                                                id="diary-content"
                                                placeholder="Write your diary entry here..."
                                                className="min-h-[200px] border-gray-200 focus-visible:ring-pink-500"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>How are you feeling today?</Label>
                                            <div className="flex flex-wrap gap-2">
                                                {moods.map(mood => (
                                                    <Button
                                                        key={mood.id}
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        className={`border-gray-200 ${
                                                            selectedMood === mood.id
                                                                ? "bg-pink-50 border-pink-300"
                                                                : "hover:bg-gray-50"
                                                        }`}
                                                        onClick={() => setSelectedMood(mood.id)}
                                                    >
                                                        <span className="mr-1">{mood.emoji}</span>
                                                        {mood.name}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <Label>Add stickers:</Label>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-6 text-xs text-gray-500"
                                                >
                                                    Clear All
                                                </Button>
                                            </div>
                                            <div className="grid grid-cols-6 gap-2">
                                                {stickers.map(sticker => (
                                                    <Button
                                                        key={sticker.id}
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        className={`border-gray-200 h-10 ${
                                                            selectedStickers.includes(sticker.id)
                                                                ? "bg-pink-50 border-pink-300"
                                                                : "hover:bg-gray-50"
                                                        }`}
                                                        onClick={() => toggleSticker(sticker.id)}
                                                    >
                                                        <span className="text-lg">{sticker.emoji}</span>
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Add photos:</Label>
                                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                                                <ImageIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                                                <p className="text-sm text-gray-500 mb-2">
                                                    Drag and drop photos here, or click to browse
                                                </p>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-gray-200"
                                                >
                                                    Upload Photos
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button variant="outline" className="border-gray-200">
                                            Save as Draft
                                        </Button>
                                        <Button className="text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                                            Save Entry
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            {/* View Tab */}
                            <TabsContent value="view">
                                <Card className="bg-white shadow-sm">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle>
                                                    {format(
                                                        new Date(selectedEntry.date),
                                                        "EEEE, MMMM d, yyyy"
                                                    )}
                                                </CardTitle>
                                                <CardDescription>
                                                    Prompt: {selectedEntry.prompt}
                                                </CardDescription>
                                            </div>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="bg-pink-100 text-pink-500 rounded-full p-1">
                                                {moods.find(m => m.id === selectedEntry.mood)?.emoji}
                                            </div>
                                            <span className="text-sm text-gray-500">
                        Feeling {selectedEntry.mood}
                      </span>
                                        </div>

                                        <div className="prose prose-pink max-w-none">
                                            <p>{selectedEntry.content}</p>
                                        </div>

                                        {selectedEntry.stickers.length > 0 && (
                                            <div className="flex flex-wrap gap-2 pt-4">
                                                {selectedEntry.stickers.map(sticker => (
                                                    <div
                                                        key={sticker}
                                                        className="text-2xl bg-gray-50 rounded-full w-10 h-10 flex items-center justify-center"
                                                    >
                                                        {stickers.find(s => s.id === sticker)?.emoji}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="grid grid-cols-3 gap-2 pt-2">
                                            <div className="aspect-square rounded-lg bg-gray-100"></div>
                                            <div className="aspect-square rounded-lg bg-gray-100"></div>
                                            <div className="aspect-square rounded-lg bg-gray-100"></div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button variant="outline" className="border-gray-200">
                                            <ArrowLeft className="h-4 w-4 mr-2" />
                                            Previous Day
                                        </Button>
                                        <Button variant="outline" className="border-gray-200">
                                            Next Day
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}
