const { default: axios } = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const YOUTUBE_GET_URL = "https://www.googleapis.com/youtube/v3";

const getVideo = async (query) => {
    const params = {
        part: "snippet",
        q: query,
        type: "video",
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
        maxResults: 1, // Changed to 1 since we're only using the first result
    };

    try {
        const response = await axios.get(`${YOUTUBE_GET_URL}/search`, { params: params });
        const items = response.data.items;

        if (items.length > 0) {
            return items[0].id.videoId; // Return only the videoId
        } else {
            console.warn('No video results found for the given query');
            return null;
        }
    } catch (error) {
        console.error('Error fetching video:', error.message);
        throw error;
    }
};

module.exports = { getVideo };
