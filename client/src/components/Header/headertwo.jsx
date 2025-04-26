import React, {Component} from 'react';
import {Bell, MessageCircle, Search, Sparkles} from "lucide-react";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Link} from "react-router-dom";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";

class Headertwo extends Component {
    render() {
        return (
            <header className="bg-white border-b border-pink-100 sticky top-0 z-50">
                <div className="container mx-auto py-3 px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-pink-500" />
                            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                YouSpace
              </span>
                        </div>

                        <div className="hidden md:flex items-center gap-1 flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search for inspiration..."
                                    className="pl-10 bg-gray-50 border-gray-200 focus-visible:ring-pink-500"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-600 hover:text-pink-500 hover:bg-pink-50"
                            >
                                <Bell className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-600 hover:text-pink-500 hover:bg-pink-50"
                            >
                                <MessageCircle className="h-5 w-5" />
                            </Button>
                            <Link href="/profile">
                                <Avatar className="h-8 w-8 border-2 border-pink-200">
                                    <AvatarImage
                                        src="/placeholder.svg?height=32&width=32"
                                        alt="@username"
                                    />
                                    <AvatarFallback className="bg-pink-100 text-pink-500">
                                        US
                                    </AvatarFallback>
                                </Avatar>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

        );
    }
}

export default Headertwo;