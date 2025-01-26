import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import path from "path";
import axios from 'axios';
import fs from 'vite-plugin-fs/browser';

export default function MusicControlBar({ selectedSongPath = "" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);
  const duration = 180; // Total duration in seconds (3 minutes for this example)

  const [processedAudioUrl, setProcessedAudioUrl] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("audio_file", selectedSongPath);
    formData.append("degrees", "1");
    console.log(selectedSongPath)

    try {
      const response = await axios.post('http://127.0.0.1:8000/process_audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

      console.log(response)

      // Create a temporary URL for the audio blob
      const objectURL = URL.createObjectURL(new Blob([response.data], { type: 'audio/wav' }));
      setProcessedAudioUrl(objectURL);

    } catch (error) {
      console.error('Error processing audio:', error.response.data);
    }
  };

  useEffect(() => {
    if (processedAudioUrl) {
      fetch(processedAudioUrl)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          audioContext.decodeAudioData(arrayBuffer, (buffer) => {
            setAudioBuffer(buffer);
            audioContextRef.current = audioContext;
          });
        });
    }
  }, [processedAudioUrl]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prevTime + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlayPause = () => {
    if (isPlaying) {
      sourceRef.current.stop();
      setIsPlaying(false);
    } else if (audioBuffer) {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      source.start(0, currentTime);
      sourceRef.current = source;
      setIsPlaying(true);
    }
  };

  const handleSkipBack = () => {
    setCurrentTime(Math.max(0, currentTime - 10));
  };

  const handleSkipForward = () => {
    setCurrentTime(Math.min(duration, currentTime + 10));
  };

  const handleSliderChange = (value) => {
    setCurrentTime(value[0]);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white text-black p-4 shadow-lg border-t-2">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center">
          <p>{path.basename(selectedSongPath, path.extname(selectedSongPath))}</p>
        </div>
        <div className="py-2"></div>
        <div className="flex items-center justify-center space-x-4 mb-2">
          <Button variant="ghost" size="icon" onClick={handleSkipBack} className="text-gray-600 hover:text-black">
            <SkipBack className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlayPause}
            className="text-black hover:bg-gray-100 transition"
          >
            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={handleSkipForward} className="text-gray-600 hover:text-black">
            <SkipForward className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          {/* <span className="text-xs text-gray-600 w-10 text-right">{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            min={0}
            max={duration}
            step={1}
            onValueChange={handleSliderChange}
            className="flex-grow"
          />
          <span className="text-xs text-gray-600 w-10">{formatTime(duration)}</span> */}
        </div>
        <div className="flex items-center justify-center mt-4">
          <Button onClick={handleSubmit} className="text-black hover:bg-gray-100 transition">
            Rotate Audio
          </Button>
        </div>
      </div>
    </div>
  );
}