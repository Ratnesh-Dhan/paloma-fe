'use client'

import { useState, useEffect } from 'react'
import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import axios from 'axios'

interface FileItem {
  name: string
  type: 'file' | 'folder'
  children?: FileItem[]
}

export default function FilesPage() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Simulating fetching files from an API
    const fetchFiles = async () => {
      // Fetch files from API
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/files`);
      const files = response.data;
      // console.log(files);
      setFiles(files);
    }

    fetchFiles()
  }, [])

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev)
      if (newSet.has(folderName)) {
        newSet.delete(folderName)
      } else {
        newSet.add(folderName)
      }
      return newSet
    })
  }

  const renderFileTree = (files: FileItem[], path: string = '') => {
    return (
      <ul className="space-y-2">
        {files.map((file, index) => {
          const fullPath = `${path}/${file.name}`
          return (
            <li key={index} className="ml-4">
              {file.type === 'folder' ? (
                <div>
                  <Button
                    variant="ghost"
                    className="p-1 h-auto"
                    onClick={() => toggleFolder(fullPath)}
                  >
                    {expandedFolders.has(fullPath) ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
                    <Folder className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="font-medium">{file.name}</span>
                  </Button>
                  {expandedFolders.has(fullPath) && file.children && (
                    <div className="mt-2">
                      {renderFileTree(file.children, fullPath)}
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant="ghost"
                  className="p-1 h-auto"
                  onClick={() => alert(`Downloading ${file.name}`)}
                >
                  <File className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-normal">{file.name}</span>
                </Button>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <h1 className="text-2xl font-bold mb-6">File Explorer</h1>
        {renderFileTree(files)}
      </CardContent>
    </Card>
  )
}
