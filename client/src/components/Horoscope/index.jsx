import { useState, useEffect } from 'react';

const Index = () => {
    const [horoscopeData, setHoroscopeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseURL = 'https://api.aistrology.beandev.xyz/v1';
    const defaultSign = 'aries';
    const defaultDay = 'today';

    useEffect(() => {
        const fetchHoroscope = async (sign = defaultSign, day = defaultDay, date = null) => {
            setLoading(true);
            setError(null);

            const queryParams = new URLSearchParams();
            queryParams.append('sign', sign);
            queryParams.append('day', day);
            if (date) {
                queryParams.append('date', date);
            }

            const apiUrl = `${baseURL}?${queryParams.toString()}`;

            const config = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            };

            try {
                const response = await fetch(apiUrl, config);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
                }
                const data = await response.json();
                // Filter the array to find the horoscope for the default sign
                const ariesHoroscope = data.find(item => item.sign === defaultSign);
                setHoroscopeData(ariesHoroscope);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching horoscope:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHoroscope();
    }, [baseURL, defaultSign, defaultDay]);

    if (loading) {
        return <p>Loading horoscope for {defaultSign.charAt(0).toUpperCase() + defaultSign.slice(1)}...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (horoscopeData) {
        return (
            <div className="mt-6 mb-4 p-4 bg-white rounded-lg">
                <h3 className="font-medium text-purple-700 mb-2">
                    Today&apos;s Horoscope for <span>{horoscopeData.sign.charAt(0).toUpperCase() + horoscopeData.sign.slice(1)}</span>
                </h3>
                {/*<p className="text-sm text-gray-600 mb-1">Date: {horoscopeData.current_date}</p>*/}
                <p className="text-sm text-gray-600 mb-1"><span className="font-bold text-pink-700">Description:</span> {horoscopeData.description}</p>
                {/*<p className="text-sm text-gray-600 mb-1"><span className="font-bold text-pink-700">Compatibility:</span>  {horoscopeData.compatibility}</p>*/}
                <p className="text-sm text-gray-600 mb-1"><span className=" font-bold text-pink-700">Mood:</span>  {horoscopeData.mood}</p>
                <p className="text-sm text-gray-600 mb-1"><span className=" font-bold text-pink-700">Color:</span>  {horoscopeData.color}</p>
                <p className="text-sm text-gray-600 mb-1"><span className=" font-bold text-pink-700">Lucky Number:</span>  {horoscopeData.lucky_number}</p>
                {/*<p className="text-sm text-gray-600 mb-1"><span className="font-bold text-pink-700">Lucky Time:</span>  {horoscopeData.lucky_time}</p>*/}
                {/*<p className="text-sm text-gray-600 mb-1"><span className="font-bold text-pink-700">Date Range:</span>  {horoscopeData.date_range}</p>*/}
            </div>
        );
    }

    return null;
};

export default Index;