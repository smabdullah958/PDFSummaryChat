"use client";

import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
const DisplaySummary = () => {
  //PDFSlice is come foram a store bro
  let { Summary, success } = useSelector((state) => state.PDFSlice);

  // If there is an error, don't show the summary box at all
  if (!success || !Summary) return null;

  return (
    <div>
      {/* display summary */}
      {Summary && success && (
        <div className="mt-10 p-6 pr-2 bg-gray-100 rounded-2xl w-72 h-96 sm:w-96 xl:w-[40vw] border-2 border-dotted border-gray-300 mb-10">
          <h2 className="font-bold text-lg mb-3">Summary</h2>
          <div className="text-gray-800 whitespace-pre-wrap overflow-y-auto h-80 pr-5 pb-5 pl-2">
            <ReactMarkdown>{Summary}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplaySummary;
