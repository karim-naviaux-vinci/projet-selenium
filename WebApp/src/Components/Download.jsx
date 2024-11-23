// eslint-disable-next-line no-unused-vars
import React from 'react';
import Sound from '../assets/sound.wav';
const DownloadButton = () => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = Sound;
        link.download = Sound;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button id="dl" onClick={handleDownload}>Download</button>
    );
};

export default DownloadButton;
