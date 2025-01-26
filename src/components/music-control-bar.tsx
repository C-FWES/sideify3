import { useState, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import path from "path"

export default function MusicControlBar({selectedSongPath = ""}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const duration = 180 // Total duration in seconds (3 minutes for this example)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime >= duration) {
            setIsPlaying(false)
            return duration
          }
          return prevTime + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSkipBack = () => {
    setCurrentTime(Math.max(0, currentTime - 10))
  }

  const handleSkipForward = () => {
    setCurrentTime(Math.min(duration, currentTime + 10))
  }

  const handleSliderChange = (value: number[]) => {
    setCurrentTime(value[0])
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white text-black p-4 shadow-lg border-t-2">
      <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-center"><p>{path.basename(selectedSongPath, path.extname(selectedSongPath))}</p></div>
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
          <span className="text-xs text-gray-600 w-10 text-right">{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            min={0}
            max={duration}
            step={1}
            onValueChange={handleSliderChange}
            className="flex-grow"
          />
          <span className="text-xs text-gray-600 w-10">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  )
}

