<h1 align="center">📄 PDF Summary Generator With PDF Chat</h1>
<h3 align="center">AI Powered PDF Summarizer + Chat System</h3>

---

## 🚀 Project Overview
PDF Summary Generator is an AI-powered web application that allows users to upload PDF files, generate intelligent summaries, and chat with PDFs using a Large Language Model (LLM). The system focuses on speed, simplicity, and smart document understanding with multi-language support.

---

## ✨ Features
- 📤 Upload PDF files  
- 🤖 AI-powered PDF summarization  
- 💬 Chat with PDF documents  
- 🧠 Context-aware AI responses  
- 📝 Summary formats:
  - Paragraph format  
  - Bullet points  
- 🌐 Multi-language support:
  - English  
  - Urdu  
  - Pashto  
- ⚡ Fast and responsive UI  

---

## 🧰 Tech Stack

Frontend:
- Next.js  
- Tailwind CSS  

Backend:
- Node.js  
- Express.js  
- PDF parsing libraries  
- LLM API (Gemini)  
- MongoDB  
- ChromaDB (Vector Database)  

---

## ⚙️ Environment Variables

### Backend (.env)
Connection=YOUR_MONGO_URI  
SecretKey=YOUR_JWT_SECRET  
Port=5000  

CHROMA_API_KEY=YOUR_CHROMA_API_KEY  
CHROMA_HOST=YOUR_CHROMA_HOST  
CHROMA_TENANT=YOUR_CHROMA_TENANT  
CHROMA_DATABASE=YOUR_CHROMA_DATABASE  

---

### Frontend (.env)
NEXT_PUBLIC_BackendURL=YOUR_BACKEND_URL  

---

## 🚀 Setup Instructions

### 1️⃣ Clone Repository
git clone https://github.com/smabdullah958/PDFSummaryChat.git  

---

### 2️⃣ Backend Setup
cd backend  
npm install  
npm run dev  

Create a `.env` file in backend and paste backend variables.

---

### 3️⃣ Frontend Setup
cd frontend  
npm install  
npm run dev  

Create a `.env` file in frontend:
NEXT_PUBLIC_BackendURL=http://localhost:5000  

---

## 🧠 System Architecture
User → Frontend (Next.js) → Backend (Node.js + Express) → LLM API + MongoDB + ChromaDB  

---

## 👨‍💻 Author
Created by **smabdullah958**

---

⭐ If you like this project, don’t forget to star the repository!
