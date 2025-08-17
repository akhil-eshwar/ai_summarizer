import React, { useState } from 'react'
import UploadTranscript from '../components/UploadTranscript'
import InstructionInput from '../components/InstructionInput'
import SummaryEditor from '../components/SummaryEditor'
import EmailSender from '../components/EmailSender'
import ConnectionStatus from '../components/ConnectionStatus'

const Home = () => {
  const [transcript, setTranscript] = useState('')
  const [instruction, setInstruction] = useState('Summarize in bullet points for executives')
  const [summary, setSummary] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                AI Meeting Summarizer & Mailer
              </h1>
              <p className="text-gray-600 mt-1">
                Transform meeting transcripts into structured summaries and share them instantly
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Ready</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Step 1: Upload Transcript */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <UploadTranscript 
                transcript={transcript}
                onTranscriptChange={setTranscript}
              />
            </div>

            {/* Step 2: Set Instructions */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <InstructionInput
                instruction={instruction}
                onInstructionChange={setInstruction}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Step 3: Generate & Edit Summary */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <SummaryEditor
                transcript={transcript}
                instruction={instruction}
                onSummaryGenerated={setSummary}
              />
            </div>

            {/* Step 4: Send Email */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                4
              </div>
              <EmailSender summary={summary} />
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Progress</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${transcript.trim() ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span className="ml-2 text-sm text-gray-600">Transcript</span>
            </div>
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${instruction.trim() ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span className="ml-2 text-sm text-gray-600">Instructions</span>
            </div>
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${summary.trim() ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span className="ml-2 text-sm text-gray-600">Summary</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Powered by Groq AI • Built with React & Node.js
            </p>
            <p className="text-xs mt-2">
              Secure, fast, and reliable meeting summarization
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
