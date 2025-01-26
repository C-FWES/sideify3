import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Playlist } from "../data/playlists"
import { useState } from "react"
import { useEffect } from "react"
import fs from 'vite-plugin-fs/browser';

import path from "path"
import { get } from "http"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[]
}

export function Sidebar({ className, playlists, getActiveSong }) {

  const [unprocessedSongs, setUnprocessedSongs] = useState([])

  useEffect(() => {
    const fetchSongs = async () => {
      const dir = await fs.readdir('src/unprocessed');
      setUnprocessedSongs(dir)
    }
    fetchSongs()
  }, [])

  function playTransformedSong(song) {
    getActiveSong(`src/unprocessed/${song}`)
  }

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h1 className="mb-2 px-4 text-2xl font-semibold tracking-tight">
            Sideify
          </h1>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Library
          </h2>
          <div className="space-y-1">
          {unprocessedSongs.map((song) => (
                    <Button variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => playTransformedSong(song)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                    >
                        <circle cx="8" cy="18" r="4" />
                        <path d="M12 18V2l7 4" />
                    </svg>
                    {path.basename(song, path.extname(song))}
                    </Button>
                            ))}
          </div>
        </div>
        <div className="py-2">
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2">
    
            </div>
          </ScrollArea>
        </div>
        <div className="py-2">
          
        </div>
        <div className="py-2">
          
        </div>
        <div className="py-2">
          
        </div>
        <div className="py-2">
          
          </div>
          <div className="py">
          
          </div>
      </div>
    </div>
  )
}