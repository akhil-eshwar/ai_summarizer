import React, { useState } from 'react'

const UploadTranscript = ({ onTranscriptChange, transcript }) => {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileUpload = (file) => {
    if (file.type === 'text/plain') {
      const reader = new FileReader()
      reader.onload = (e) => {
        onTranscriptChange(e.target.result)
      }
      reader.readAsText(file)
    } else {
      alert('Please upload a text file (.txt)')
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0])
    }
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload Meeting Transcript</h2>
      
      {/* File Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-primary-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-lg font-medium text-gray-700 mb-2">
            Drop your transcript file here
          </p>
          <p className="text-sm text-gray-500 mb-4">or</p>
          <label className="btn-primary cursor-pointer">
            Choose File
            <input
              type="file"
              className="hidden"
              accept=".txt"
              onChange={handleFileInput}
            />
          </label>
          <p className="text-xs text-gray-400 mt-2">Supports .txt files</p>
        </div>
      </div>

      {/* Text Area for Manual Input */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Or paste your transcript here:
        </label>
        <textarea
          value={transcript}
          onChange={(e) => onTranscriptChange(e.target.value)}
          placeholder="Paste your meeting transcript here..."
          className="input-field h-32 resize-none"
          rows={6}
        />
        <p className="text-xs text-gray-500 mt-1">
          {transcript.length} characters
        </p>
      </div>
    </div>
  )
}

export default UploadTranscript
