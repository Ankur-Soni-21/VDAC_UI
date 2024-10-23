// DownloadUtil.js
import axios from 'axios';
import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

export const validateUrl = (url, platform) => {
    const regexMap = {
        youtube: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
        facebook: /^(https?:\/\/)?(www\.)?(facebook\.com|fb\.watch)\/.+$/,
        instagram: /^(https?:\/\/)?(www\.)?instagram\.com\/.+$/,
        twitter: /^(https?:\/\/)?(www\.)?twitter\.com\/.+$/,
    };

    return regexMap[platform].test(url);
};

const generateSignature = (url, timestamp) => {
    const data = `${url}${timestamp}${SECRET_KEY}`;
    return CryptoJS.SHA256(data).toString();
};

const generateJsonData = (url) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = generateSignature(url, timestamp);
    return {
        url: url,
        ts: timestamp,
        _s: signature,
    };
};

export const fetchData = async (url, platform) => {
    const baseUrl = import.meta.env.VITE_APP_API_URL;
    const endpoint = `${baseUrl}/${platform === 'youtube' ? 'yt' : platform === 'facebook' ? 'fb' : platform === 'youtube-ts' ? 'yt/ts' : platform}`;
    const jsonData = generateJsonData(url);

    try {
        const response = await axios.post(endpoint, jsonData);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'An error occurred while fetching data');
        } else if (error.request) {
            throw new Error('No response received from the server. Please try again later.');
        } else {
            throw new Error('An error occurred while setting up the request. Please try again.');
        }
    }
};