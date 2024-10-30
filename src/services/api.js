// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Backend URL

export const fetchRandomWord = (level) => {
    return axios.get(`${API_BASE_URL}/v1/random_word_dict`, { params: { level } });
};

export const fetchAudio = (word, level, language) => {
    return axios.get(`${API_BASE_URL}/v1/generate_audio_dict`, {
        params: { word, level, language },
        responseType: 'blob' // For audio streaming
    });
};
