import {useState, useEffect} from 'react';
import {Button} from "@/components/ui/button.jsx";

const PromptComponent = () => {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrompt = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch("http://localhost:8080/api/v1/prompt");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPrompt(data.prompt);
            } catch (error) {
                console.error("Error fetching prompt:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPrompt();
    }, []);


    return (
        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <h3 className="font-medium text-purple-700 mb-2">
                Today&apos;s Prompt
            </h3>
            <p className="text-sm text-gray-600 mb-3">
                {loading ? (
                    "Loading prompt..."
                ) : error ? (
                    `Error: ${error}`
                ) : (
                    prompt
                )}
            </p>
            <Button
                variant="outline"
                size="sm"
                className="w-full border-purple-200 text-purple-600 hover:bg-purple-100"
            >
                Answer
            </Button>
        </div>
    );
};

export default PromptComponent;