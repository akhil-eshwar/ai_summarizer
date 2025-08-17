# AI Meeting Summarizer & Mailer

A full-stack web application that transforms meeting transcripts into structured summaries using AI and sends them via email.

## Features

- **Upload or Paste Transcripts**: Support for file upload (.txt) or direct text input
- **Custom Instructions**: Preset options or custom summarization instructions
- **AI-Powered Summarization**: Uses Groq's Llama-3.1-8b-instant model
- **Editable Summaries**: Review and edit AI-generated summaries before sending
- **Email Distribution**: Send summaries to multiple recipients with custom subjects
- **Modern UI**: Built with React, Vite, and Tailwind CSS
- **Secure**: Environment variables for API keys and credentials

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Groq SDK** - AI summarization
- **Nodemailer** - Email sending
- **CORS** - Cross-origin resource sharing

## Project Structure

```
AI-Meeting-Summarizer-Mailer/
├── client/                     # Frontend (React + Vite + Tailwind)
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── UploadTranscript.jsx
│   │   │   ├── InstructionInput.jsx
│   │   │   ├── SummaryEditor.jsx
│   │   │   └── EmailSender.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── server/                     # Backend (Node.js + Express)
│   ├── controllers/
│   │   ├── summarizeController.js
│   │   └── emailController.js
│   ├── routes/
│   │   ├── summarize.js
│   │   └── email.js
│   ├── utils/
│   │   └── groqClient.js
│   ├── package.json
│   └── server.js
├── .env.example
├── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm
- Groq API key
- Gmail account with app password

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Environment Configuration

1. Copy `.env.example` to `.env` in the root directory
2. Fill in your credentials:

```env
# Groq AI API Configuration
GROQ_API_KEY=your_groq_api_key_here

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here

# Server Configuration
PORT=5000
```

### 3. Gmail Setup

For email functionality:
1. Enable 2-factor authentication on your Gmail account
2. Generate an app password (not your regular password)
3. Use the app password in `EMAIL_PASS`

### 4. Get Groq API Key

1. Visit [Groq Console](https://console.groq.com/)
2. Create an account and generate an API key
3. Add the key to your `.env` file

## Running the Application

### Development Mode

**Backend** (Terminal 1):
```bash
cd server
node server.js
```

**Frontend** (Terminal 2):
```bash
cd client
vite
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Production Build

**Frontend**:
```bash
cd client
npm run build
```

## API Endpoints

### POST /api/summarize
Generates AI summary from transcript and instruction.

**Request Body:**
```json
{
  "transcript": "Meeting transcript text...",
  "instruction": "Summarize in bullet points for executives"
}
```

**Response:**
```json
{
  "success": true,
  "summary": "Generated summary...",
  "originalTranscript": "...",
  "instruction": "..."
}
```

### POST /api/email
Sends summary via email to recipients.

**Request Body:**
```json
{
  "recipients": ["email1@example.com", "email2@example.com"],
  "subject": "Meeting Summary",
  "summary": "Summary content..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "...",
  "recipients": ["..."]
}
```

## Deployment

### Backend Deployment (Render/Railway)

1. Connect your repository to Render or Railway
2. Set environment variables in the platform dashboard
3. Deploy with build command: `npm install`
4. Start command: `node server.js`

### Frontend Deployment (Netlify/Vercel)

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to Netlify or Vercel
3. Configure environment variables if needed
4. Set up redirects for SPA routing

## Usage

1. **Upload Transcript**: Either upload a .txt file or paste your meeting transcript
2. **Set Instructions**: Choose a preset or enter custom summarization instructions
3. **Generate Summary**: Click "Generate Summary" to create an AI-powered summary
4. **Edit Summary**: Review and edit the generated summary as needed
5. **Send Email**: Add recipients, customize the subject, and send the summary

## Security Notes

- Never commit `.env` files to version control
- Use app passwords for Gmail, not regular passwords
- Keep API keys secure and rotate them regularly
- Validate all inputs on both client and server sides

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the Vite proxy is configured correctly
2. **Email Sending Fails**: Check Gmail app password and 2FA settings
3. **Groq API Errors**: Verify API key and check rate limits
4. **Build Errors**: Ensure all dependencies are installed

### Support

For issues or questions:
1. Check the console for error messages
2. Verify environment variables are set correctly
3. Ensure all services (Groq, Gmail) are properly configured

## License

MIT License - feel free to use this project for personal or commercial purposes.
