import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ENDPOINTS } from '../config/api'

const ConnectionStatus = () => {
  const [status, setStatus] = useState('checking') // checking, connected, disconnected
  const [lastCheck, setLastCheck] = useState(null)

  const checkConnection = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.health, { timeout: 5000 })
      if (response.status === 200) {
        setStatus('connected')
      } else {
        setStatus('disconnected')
      }
    } catch (error) {
      setStatus('disconnected')
    }
    setLastCheck(new Date())
  }

  useEffect(() => {
    checkConnection()
    const interval = setInterval(checkConnection, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = () => {
    switch (status) {
      case 'connected': return 'bg-green-400'
      case 'disconnected': return 'bg-red-400'
      default: return 'bg-yellow-400'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'connected': return 'Backend Connected'
      case 'disconnected': return 'Backend Unavailable'
      default: return 'Checking Connection...'
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
      <span className="text-sm text-gray-600">{getStatusText()}</span>
      {status === 'disconnected' && (
        <button
          onClick={checkConnection}
          className="text-xs text-blue-600 hover:text-blue-800 underline ml-2"
        >
          Retry
        </button>
      )}
    </div>
  )
}

export default ConnectionStatus
