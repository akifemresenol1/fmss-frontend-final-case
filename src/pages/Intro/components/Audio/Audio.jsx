import React, { useRef, useState, useEffect } from "react";
import volumeOn from "../../../../assets/volumeOn.png";
import volumeOff from "../../../../assets/volumeOff.png";

import "./Audio.css";

const Audio = ({ src, controls, autoplay }) => {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef();

  const handleToggleMute = () => {
    if (audioRef.current.paused && isMuted) {
      audioRef.current.play();
    } else if (!isMuted) {
    }
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (autoplay) {
      audioRef.current.play();
    }
  }, []);

  return (
    <div>
      <audio
        src={src}
        controls={controls}
        ref={audioRef}
        muted={isMuted}
        className="audio"
      >
        Your browser does not support the audio element.
      </audio>
      <img
        src={isMuted ? volumeOff : volumeOn}
        alt={isMuted ? "Ses kapalı" : "Ses açık"}
        onClick={handleToggleMute}
        className="speaker"
      />
    </div>
  );
};

export default Audio;
