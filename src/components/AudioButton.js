// src/components/AudioButton.js
import React from 'react';
import { fetchAudio } from '../services/api';
import { FaVolumeUp } from 'react-icons/fa'; // Install react-icons if you haven't: npm install react-icons

const AudioButton = ({ word, level, language }) => {
    const handleAudioPlay = async () => {
        try {
            const response = await fetchAudio(word, level, language);
            const audioUrl = window.URL.createObjectURL(new Blob([response.data], { type: 'audio/mpeg' }));
            const audio = new Audio(audioUrl);
            audio.play();
        } catch (error) {
            console.error(`Error fetching audio in ${language}:`, error);
        }
    };

    return (
        <button onClick={handleAudioPlay} style={{ margin: '0 10px', cursor: 'pointer', padding: '5px', border: 'none', background: 'none' }}>
            <FaVolumeUp size={24} title={`Play ${language} audio`} />
        </button>
    );
};

export default AudioButton;
