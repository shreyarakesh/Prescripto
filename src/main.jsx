import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'

// Load Watson Assistant web chat with delay and safety checks
const loadWatsonAssistant = () => {
  window.watsonAssistantChatOptions = {
    integrationID: "9f720f27-f329-452a-9458-d8906d72be8d",
    region: "us-south",
    serviceInstanceID: "22b860ea-bbe8-41d7-802e-0ecf0f18d94e",
    onLoad: async (instance) => {
      if (instance && typeof instance.render === 'function') {
        await instance.render()
      } else {
        console.warn('Watson Assistant instance not available.')
      }
    }
  }

  setTimeout(() => {
    const t = document.createElement('script')
    t.src =
      "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
      (window.watsonAssistantChatOptions.clientVersion || 'latest') +
      "/WatsonAssistantChatEntry.js"
    document.head.appendChild(t)
  }, 1000) // 1 second delay before loading the script
}

loadWatsonAssistant()

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
)
