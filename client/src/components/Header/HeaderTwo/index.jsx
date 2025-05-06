import { useNavigate, Link } from 'react-router-dom';
import Auth from '../../../utils/auth.js';

import {Bell, MessageCircle, Search, Sparkles, UserRound} from "lucide-react";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx"


const Index = ({userId}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Auth.logout();
        navigate('/');
    };

        return (
            <header className="bg-white border-b border-pink-100 sticky top-0 z-50">
                <div className="container mx-auto py-3 px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-pink-500" />
                            <Link to="/dashboard">
                                <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent cursor-pointer">
                                YouSpace
                            </span>
                            </Link>
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
                                className="text-gray-600 hover:text-pink-500 hover:bg-pink-50 cursor-pointer"
                            >
                                <Bell className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-600 hover:text-pink-500 hover:bg-pink-50 cursor-pointer"
                            >
                                <MessageCircle className="h-5 w-5" />
                            </Button>

                            <DropdownMenu className="">
                                <DropdownMenuTrigger>
                                    <Avatar className="h-8 w-8 border-2 border-pink-200 cursor-pointer">
                                        <AvatarImage
                                            src="/placeholder.svg?height=32&width=32"
                                            alt="@username"
                                        />
                                        <AvatarFallback className="bg-pink-100 text-pink-500">
                                            <UserRound />
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white">
                                    <DropdownMenuSeparator />
                                    <Link to={`/profile/${userId}`}>
                                        <DropdownMenuItem className="cursor-pointer">
                                            Profile
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link to="/profile/edit">
                                        <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </div>
                    </div>
                </div>
            </header>

        );

}

export default Index;