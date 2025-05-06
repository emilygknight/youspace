import {useState, useEffect} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import {Button} from "@/components/ui/button.jsx";
import {UserRound} from "lucide-react";

import {useQuery} from "@apollo/client";
import { QUERY_USERS } from '@/utils/queries';

const UserSuggestion = () => {
    const { loading, error, data } = useQuery(QUERY_USERS);
    const [users, setUsers] = useState([]);
    const [displayCount, setDisplayCount] = useState(3);
    const [hasSeenMore, setHasSeenMore] = useState(false);

    useEffect(() => {
        if (data?.getUsers) {
            setUsers(data.getUsers);
            console.log(data)
        }
    }, [data]);

    // Fallback styles for avatar
    const avatarStyles = [
        { color: "#2b7fff", bg: "bg-blue-100" },
        { color: "#00c950", bg: "bg-green-100" },
        { color: "#ad46ff", bg: "bg-purple-100" },
        { color: "#fb2c36", bg: "bg-red-100" },
    ];


    // Handle "See More" button click
    const handleSeeMore = () => {
        setDisplayCount((prev) => prev + 5);
        setHasSeenMore(true);
    };

    const userListClasses = `space-y-4 ${hasSeenMore ? 'max-h-48 overflow-y-auto' : ''}`;

    return (
        <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-medium text-gray-900 mb-4">Suggested for You</h3>

            {loading && <p>Loading users...</p>}
            {error && <p>Error fetching users: {error.message}</p>}
            {!loading && !error && users.length === 0 && <p>No users found.</p>}

            <div className={userListClasses}>
                {users.slice(0, displayCount).map((user, index) => {
                    const avatarStyle = avatarStyles[index % avatarStyles.length]; // Cycle through avatar styles
                    return (
                        <div key={user._id} className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage
                                    src="/placeholder.svg?height=40&width=40"
                                    alt={`@${user.username}`}
                                />
                                <AvatarFallback className={avatarStyle.bg}>
                                    <UserRound color={avatarStyle.color} />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-medium text-sm">{user.username}</p>
                                <p className="text-xs text-gray-500">
                                    {user.email.split("@")[0]} {/* Fallback description */}
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 border-pink-200 text-pink-500 hover:bg-pink-50"
                            >
                                Follow
                            </Button>
                        </div>
                    );
                })}
            </div>

            {displayCount < users.length && (
                <div className="mt-4 text-center">
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-pink-500 border-pink-200 hover:bg-pink-50"
                        onClick={handleSeeMore}
                    >
                        See More
                    </Button>
                </div>
            )}

            <div className="mt-6">
                <h3 className="font-medium text-gray-900 mb-4">Trending Tags</h3>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full border-pink-100 bg-pink-50 text-pink-500 hover:bg-pink-100"
                    >
                        #SummerVibes
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full border-purple-100 bg-purple-50 text-purple-500 hover:bg-purple-100"
                    >
                        #AestheticGoals
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full border-blue-100 bg-blue-50 text-blue-500 hover:bg-blue-100"
                    >
                        #DreamBoards
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full border-pink-100 bg-pink-50 text-pink-500 hover:bg-pink-100"
                    >
                        #SelfCare
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full border-purple-100 bg-purple-50 text-purple-500 hover:bg-purple-100"
                    >
                        #Inspiration
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserSuggestion;