import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button.jsx";
import { useQuery } from '@apollo/client';
import { GET_JOURNAL_PROMPT } from '../../utils/queries';

const PromptComponent = () => {
    const { loading, error, data } = useQuery(GET_JOURNAL_PROMPT);
    const [prompt, setPrompt] = useState("");

    useEffect(() => {
        if (data?.getJournalPrompt?.prompt) {
            setPrompt(data.getJournalPrompt.prompt);
        }
    }, [data]);

    return (
        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <h3 className="font-medium text-purple-700 mb-2">
                Today&apos;s Prompt
            </h3>
            <p className="text-sm text-gray-600 mb-3">
                {loading ? (
                    "Loading prompt..."
                ) : error ? (
                    `Error: ${error.message}`
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