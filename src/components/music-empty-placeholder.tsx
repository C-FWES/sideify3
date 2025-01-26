import { Button } from "@/components/ui/button"
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { saveAs } from 'file-saver'

export function PodcastEmptyPlaceholder() {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleSave = () => {
      if (selectedFile) {
        // saveAs(selectedFile, `./src/unprocessed/${selectedFile.name}`); 
        saveAs(selectedFile, `unprocessed_${selectedFile.name}`)
      } else {
        alert('Please select a file first.');
      }
    };


  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-10 w-10 text-muted-foreground"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="11" r="1" />
          <path d="M11 17a1 1 0 0 1 2 0c0 .5-.34 3-.5 4.5a.5.5 0 0 1-1 0c-.16-1.5-.5-4-.5-4.5ZM8 14a5 5 0 1 1 8 0" />
          <path d="M17 18.5a9 9 0 1 0-10 0" />
        </svg>

        <h3 className="mt-4 text-lg font-semibold">Select a file to rotate</h3>
        <div className="py-2"></div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="relative">
              Select
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Select WAV File</DialogTitle>
              <DialogDescription>
                Choose a WAV file to use.
              </DialogDescription>
            </DialogHeader>
            {/* Here's where the change happens */}
            <input type="file" accept=".wav" onChange={handleFileChange}/>
             {/* Add an input element for file selection */}
            <DialogFooter>
              <Button onClick={handleSave}>Import</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}