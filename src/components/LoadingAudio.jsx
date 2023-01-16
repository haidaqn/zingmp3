import React from "react";
import { Audio } from 'react-loader-spinner';

const LoadingAudio = () => {
    return (
        <Audio
            height="35"
            width="35"
            radius="9"
            color="white"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
        />
    )
}

export default LoadingAudio;