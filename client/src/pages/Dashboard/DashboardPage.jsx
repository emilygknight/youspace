import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bookmark,
  Calendar,
  Heart,
  Home,
  MessageCircle,
  Plus,
  Settings,
  Sparkles,
  User,
  Users,
  UserRound
} from "lucide-react"
import Index from "@/components/Header/HeaderTwo/index.jsx";
import Horoscope from "@/components/Horoscope/index.jsx";
import Prompt from "@/components/Diary/PromptComponent.jsx";

import getUserIdFromJWT from "@/utils/jwt.js"
import UserSuggestion from "@/components/Suggestions/UserSuggestion.jsx";

export default function DashboardPage() {

  const navigate = useNavigate();

  const [userId, setUserId] = useState();

  useEffect(() => {
    const token = localStorage.getItem("id_token");
    if (token) {
      const extractedUserId = getUserIdFromJWT(token);
      setUserId(extractedUserId);
      console.log("Extracted User ID:", extractedUserId);
    }
  }, []);

  // // if userId changes, log it
  // useEffect(() => {
  //   if (userId) {
  //     console.log("Updated User ID in DashboardPage:", userId);
  //   }
  // }, [userId]);

  return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
        {/* Navigation */}
        <Index userId={userId} />
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-20">
              <nav className="space-y-1">
                <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-3 py-2 text-pink-500 bg-pink-50 rounded-lg font-medium"
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <Link
                    to="/explore"
                    className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg"
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
                    to="/diary"
                    className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Daily Diary</span>
                </Link>
                <Link
                    to="/saved"
                    className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg"
                >
                  <Bookmark className="h-5 w-5" />
                  <span>Saved</span>
                </Link>
                <Link
                    to={`/profile/${userId}`}
                    className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg"
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <Link
                    to="/profile/edit"
                    className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </nav>

              <div className="mt-6">
                <Button onClick={() => navigate("/create/post")} className="w-full text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 cursor-pointer">
                <Plus className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
              </div>


              <Prompt/>

            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <Tabs defaultValue="for-you" className="mb-6">
              <TabsList className="bg-white">
                <TabsTrigger value="for-you"   className="text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg data-[state=active]:text-pink-700 data-[state=active]:bg-pink-100 data-[state=active]:font-semibold data-[state=active]:shadow-sm"
                > For You</TabsTrigger>
                <TabsTrigger value="friends"   className="text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg data-[state=active]:text-pink-700 data-[state=active]:bg-pink-100 data-[state=active]:font-semibold data-[state=active]:shadow-sm"
                > Friends</TabsTrigger>
                <TabsTrigger value="trending" className="text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg data-[state=active]:text-pink-700 data-[state=active]:bg-pink-100 data-[state=active]:font-semibold data-[state=active]:shadow-sm"
                > Trending</TabsTrigger>
              </TabsList>

              <TabsContent value="for-you" className="mt-4 space-y-6">
                {/* Post 1 */}
                <Card className="overflow-hidden bg-white">
                  <CardHeader className="p-4 pb-0">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                            src="/placeholder.svg?height=40&width=40"
                            alt="@username"
                        />
                        <AvatarFallback className="bg-pink-100 text-pink-500">
                          <UserRound/>
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">
                          Jessica Dawson
                        </CardTitle>
                        <CardDescription>2 hours ago</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="mb-4">
                      Just updated my summer vision board! ☀️ What do you think?
                    </p>
                    <div className="rounded-xl overflow-hidden">
                      <img
                          src="https://youspace-app.s3.us-west-1.amazonaws.com/cactus.jpg"
                          alt="Summer vision board"
                          width={600}
                          height={400}
                          className="w-full object-cover"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex items-center justify-between">
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
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:bg-gray-50 hover:text-gray-600"
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                {/* Post 2 */}
                <Card className="overflow-hidden bg-white">
                  <CardHeader className="p-4 pb-0">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                            src="/placeholder.svg?height=40&width=40"
                            alt="@username"
                        />
                        <AvatarFallback className="bg-purple-100 text-purple-500">
                          AL
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">Alex Lee</CardTitle>
                        <CardDescription>5 hours ago</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="mb-4">
                      My aesthetic for this month is cool summer nights, frank ocean, and pastels ✨
                    </p>
                    <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
                      <img
                          src="https://youspace-app.s3.us-west-1.amazonaws.com/car.jpg"
                          alt="Pastel aesthetic 1"
                          width={200}
                          height={200}
                          className="w-full object-cover rounded-lg"
                      />
                      <img
                          src="https://youspace-app.s3.us-west-1.amazonaws.com/Flowers.jpg"
                          alt="Pastel aesthetic 2"
                          width={200}
                          height={200}
                          className="w-full object-cover rounded-lg"
                      />
                      <img
                          src="https://youspace-app.s3.us-west-1.amazonaws.com/girl.jpg"
                          alt="Pastel aesthetic 3"
                          width={200}
                          height={200}
                          className="w-full object-cover rounded-lg"
                      />
                      <img
                          src="https://youspace-app.s3.us-west-1.amazonaws.com/moon.jpg"
                          alt="Pastel aesthetic 4"
                          width={200}
                          height={200}
                          className="w-full object-cover rounded-lg"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex items-center justify-between">
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
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:bg-gray-50 hover:text-gray-600"
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="friends">
                <div className="p-8 text-center text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">
                    Friend content will appear here
                  </h3>
                  <p className="max-w-md mx-auto mb-4">
                    Follow your friends to see their posts and vision boards in
                    this tab.
                  </p>
                  <Button
                      variant="outline"
                      className="border-pink-200 text-pink-500 hover:bg-pink-50"
                  >
                    Find Friends
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="trending">
                <div className="p-8 text-center text-gray-500">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">
                    Trending content will appear here
                  </h3>
                  <p className="max-w-md mx-auto">
                    Check back soon to see what&apos;s trending in the YouSpace
                    community.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </main>

          {/* Right Sidebar */}
          <aside className="w-full md:w-72 shrink-0">
            <div className="sticky top-20">
              <Horoscope />
              <UserSuggestion />
            </div>
          </aside>
        </div>
      </div>
  )
}
