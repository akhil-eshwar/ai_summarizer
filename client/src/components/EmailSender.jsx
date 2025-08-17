import React, { useState } from 'react'
import axios from 'axios'

const EmailSender = ({ summary }) => {
  const [recipients, setRecipients] = useState([''])
  const [subject, setSubject] = useState('Meeting Summary')
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const addRecipient = () => {
    setRecipients([...recipients, ''])
  }

  const removeRecipient = (index) => {
    if (recipients.length > 1) {
      setRecipients(recipients.filter((_, i) => i !== index))
    }
  }

  const updateRecipient = (index, value) => {
    const newRecipients = [...recipients]
    newRecipients[index] = value
    setRecipients(newRecipients)
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const sendEmail = async () => {
    // Validation
    const validRecipients = recipients.filter(email => email.trim() && validateEmail(email.trim()))
    
    if (validRecipients.length === 0) {
      setError('Please provide at least one valid email address')
      return
    }

    if (!subject.trim()) {
      setError('Please provide a subject')
      return
    }

    if (!summary.trim()) {
      setError('Please generate a summary first')
      return
    }

    setSending(true)
    setError('')
    setSuccess('')

    try {
      const response = await axios.post('/api/email', {
        recipients: validRecipients,
        subject: subject.trim(),
        summary: summary.trim()
      })

      if (response.data.success) {
        setSuccess(`Email sent successfully to ${validRecipients.length} recipient(s)`)
        // Reset form
        setRecipients([''])
        setSubject('Meeting Summary')
      } else {
        setError('Failed to send email')
      }
    } catch (err) {
      console.error('Error sending email:', err)
      setError(err.response?.data?.error || 'Failed to send email')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Send Summary via Email</h2>

      {/* Recipients */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Recipients:
        </label>
        {recipients.map((recipient, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="email"
              value={recipient}
              onChange={(e) => updateRecipient(index, e.target.value)}
              placeholder="Enter email address"
              className="input-field flex-1"
            />
            {recipients.length > 1 && (
              <button
                onClick={() => removeRecipient(index)}
                className="px-3 py-2 text-red-600 hover:text-red-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addRecipient}
          className="btn-secondary text-sm"
        >
          + Add Recipient
        </button>
      </div>

      {/* Subject */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subject:
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter email subject"
          className="input-field"
        />
      </div>

      {/* Summary Preview */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Summary Preview:
        </label>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-32 overflow-y-auto">
          {summary ? (
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{summary}</p>
          ) : (
            <p className="text-sm text-gray-500 italic">No summary available</p>
          )}
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
          {success}
        </div>
      )}

      {/* Send Button */}
      <button
        onClick={sendEmail}
        disabled={sending || !summary.trim()}
        className="btn-primary w-full"
      >
        {sending ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending Email...
          </div>
        ) : (
          'Send Email'
        )}
      </button>

      {!summary.trim() && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          Generate a summary first to enable email sending
        </p>
      )}
    </div>
  )
}

export default EmailSender
