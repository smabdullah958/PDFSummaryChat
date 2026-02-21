"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "./ButtonLoader";
import ReactMarkdown from "react-markdown";

let URL = process.env.NEXT_PUBLIC_BackendURL;

const ChatOption = () => {
  const [Question, SetQuestion] = useState("");
  const [Answere, SetAnswere] = useState([]);
  const [loading, setLoading] = useState(false);
  let [Error, ErrorMessage] = useState("");

  const { ChatID } = useSelector((state) => state.ChatSlice);

  const CallAPI = async () => {
    if (!Question.trim()) return;

    const userMessage = { type: "question", text: Question };

    SetAnswere((prev) => [...prev, userMessage]);
    SetQuestion("");
    setLoading(true);
    let response;
    try {
      response = await axios.post(
        `${URL}/PDFChat/ask`,
        { Question, ChatID },
        { withCredentials: true },
      );

      const BotAnswere = {
        text: response.data.answere, //ansere is come from  a backend
      };

      SetAnswere((prev) => [...prev, BotAnswere]);
    } catch (error) {
      SetAnswere((prev) => [...prev, { text: "Something went wrong..." }]);
      ErrorMessage(response.data.errorMessage);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (Error) {
      toast.error(ErrorMessage);
    }
  }, [ErrorMessage]);

  return (
    <div className="w-full max-w-5xl mx-auto h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* ===== Header ===== */}
      <div className="bg-[#92c7f2] px-8 py-5 flex items-center gap-4">
        <div className="w-12 h-12 bg-white text-[#7eb6f1] font-bold rounded-full flex items-center justify-center shadow-md text-lg">
          AI
        </div>
        <div>
          <h2 className="text-white font-semibold text-xl">PDF Assistant</h2>
          <p className="text-blue-100 text-sm">
            Ask anything about your document
          </p>
        </div>
      </div>

      {/* ===== Chat Area ===== */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-6 space-y-6">
        {Answere.map((ans, index) => (
          <div
            key={index}
            className={`flex ${
              ans.type === "question" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-md px-5 py-3 rounded-2xl shadow-md ${
                ans.type === "question"
                  ? "bg-[#62aaf2] text-white rounded-br-md"
                  : "bg-white border rounded-bl-md"
              }`}
            >
              <ReactMarkdown>{ans.text}</ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 px-5 py-3 rounded-2xl rounded-bl-md shadow-md border">
              <Loader />
            </div>
          </div>
        )}
      </div>

      {/* ===== Input Area ===== */}
      <div className="bg-white border-t px-6 py-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={Question}
            onChange={(e) => SetQuestion(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 px-5 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onKeyDown={(e) => e.key === "Enter" && CallAPI()}
          />

          <button
            onClick={CallAPI}
            className="px-6 py-3 bg-[#92c7f2] text-white rounded-full font-medium shadow-md transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatOption;
