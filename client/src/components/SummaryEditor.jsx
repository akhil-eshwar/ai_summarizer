import React, { useState } from 'react'
import axios from 'axios'

const SummaryEditor = ({ transcript, instruction, onSummaryGenerated }) => {
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateSummary = async () => {
    if (!transcript.trim()) {
      setError('Please provide a transcript first')
      return
    }

    if (!instruction.trim()) {
      setError('Please provide an instruction first')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await axios.post('/api/summarize', {
        transcript: transcript.trim(),
        instruction: instruction.trim()
      })

      if (response.data.success) {
        setSummary(response.data.summary)
        onSummaryGenerated(response.data.summary)
      } else {
        setError('Failed to generate summary')
      }
    } catch (err) {
      console.error('Error generating summary:', err)
      setError(err.response?.data?.error || 'Failed to generate summary')
    } finally {
      setLoading(false)
    }
  }

  const handleSummaryChange = (e) => {
    const newSummary = e.target.value
    setSummary(newSummary)
    onSummaryGenerated(newSummary)
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">AI Generated Summary</h2>
        <button
          onClick={generateSummary}
          disabled={loading || !transcript.trim() || !instruction.trim()}
          className="btn-primary"
        >
          {loading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </div>
          ) : (
            'Generate Summary'
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Summary (editable):
        </label>
        <textarea
          value={summary}
          onChange={handleSummaryChange}
          placeholder="Your AI-generated summary will appear here. You can edit it before sending."
          className="input-field h-64 resize-none"
          rows={12}
        />
        <p className="text-xs text-gray-500 mt-1">
          {summary.length} characters • You can edit the summary before sending
        </p>
      </div>

      {summary && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Review and edit the summary above before sending it via email.
          </p>
        </div>
      )}
    </div>
  )
}

export default SummaryEditor
