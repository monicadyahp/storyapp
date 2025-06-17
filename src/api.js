const BASE_URL = 'https://story-api.dicoding.dev/v1';

const getToken = () => localStorage.getItem('token');

const getStories = async () => {
    try {
        const token = getToken();
        const headers = { 'Content-Type': 'application/json' };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${BASE_URL}/stories`, { headers });
        const data = await response.json();

        if (data.error) throw new Error(data.message);
        return data.listStory;
    } catch (error) {
        console.error('Error fetching stories:', error);
        return [];
    }
};

const getStoryDetail = async (id) => {
    try {
        const token = getToken();
        const headers = { 'Content-Type': 'application/json' };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${BASE_URL}/stories/${id}`, { headers });
        const data = await response.json();

        if (data.error) throw new Error(data.message);
        return data.story;
    } catch (error) {
        console.error('Error fetching story detail:', error);
        return null;
    }
};

export { BASE_URL, getStories, getStoryDetail };
