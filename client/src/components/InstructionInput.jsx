import React from 'react'

const InstructionInput = ({ instruction, onInstructionChange }) => {
  const presetInstructions = [
    "Summarize in bullet points for executives",
    "Create action items with assigned owners and deadlines",
    "Extract key decisions and next steps",
    "Provide a detailed technical summary",
    "Generate a brief overview for stakeholders"
  ]

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Summarization Instructions</h2>
      
      {/* Preset Instructions */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quick presets:
        </label>
        <div className="flex flex-wrap gap-2">
          {presetInstructions.map((preset, index) => (
            <button
              key={index}
              onClick={() => onInstructionChange(preset)}
              className="btn-secondary text-sm"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Instruction Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom instruction:
        </label>
        <textarea
          value={instruction}
          onChange={(e) => onInstructionChange(e.target.value)}
          placeholder="Enter your custom summarization instruction..."
          className="input-field h-24 resize-none"
          rows={4}
        />
        <p className="text-xs text-gray-500 mt-1">
          Be specific about the format and content you want in the summary
        </p>
      </div>
    </div>
  )
}

export default InstructionInput
