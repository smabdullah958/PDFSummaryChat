"use client";
import TextExtractedLoader from "./TextExtractedLoader";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ChatThunck from "@/Libraries/ReduxToolkit/AsyncThunck/ChatPDFthunk";
import ChatOption from "./ChatOption";
import {
  ClearError,
  ClearState,
} from "@/Libraries/ReduxToolkit/Slices/ChatPDFSlice";
const ChatPDF = () => {
  let dispatch = useDispatch();

  let [PdfFile, SetPdfFile] = useState(null);
  let { Loading, ChatID, ShowChat, ErrorMessage } = useSelector(
    (state) => state.ChatSlice, //ChatSlice is come froma store
  );

  useEffect(() => {
    if (ErrorMessage) {
      toast.error(ErrorMessage, { id: "chat-error" });
      dispatch(ClearError());
    }
  }, [ErrorMessage, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(ClearState()); // 🔥 reset when leaving route
    };
  }, [dispatch]);

  //show and hide chat
  let HandlePdfFile = (field) => {
    const selectedFile = field.target.files[0]; // 1. Grab the file directly
    if (!selectedFile) return;

    SetPdfFile(selectedFile); // 2. Update pdf state
    const formdata = new FormData();
    formdata.append("pdf", selectedFile); // Matches your middleware body('pdf')
    // 3. Dispatch the Thunk
    dispatch(ChatThunck(formdata));
  };
  //find file size
  const FileSize = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="my-10  border-dotted border-2 border-gray-200 sm:px-10 rounded-2xl mt-20 bg-gray-50">
        <div className=" mt-10 2xl:mt-20 w-80 sm:w-96 xl:w-[40vw] 2xl:w-[30vw]  p-10 rounded-3xl ">
          <p className="mb-4 text-gray-400 text-sm sm:text-lg lg:text-xl text-center">
            Supports PDF up to 5MB
          </p>

          {PdfFile && (
            <p className="text-gray-700 my-2 text-sm max-w-[90vw] text-center">
              {PdfFile.name}
            </p>
          )}

          <input
            type="file"
            name="pdf"
            accept="application/pdf"
            onChange={HandlePdfFile}
            className="hidden"
            id="pdf-upload"
          />
          <label
            htmlFor="pdf-upload"
            className="flex items-center justify-center w-full px-6 py-4 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer bg-blue-300 hover:bg-blue-300 hover:border-blue-400 transition-all duration-200 h-14 sm:h-20"
          >
            <span className="text-sm font-semibold sm:text-lg lg:text-xl text-gray-700">
              {Loading ? (
                <TextExtractedLoader />
              ) : PdfFile ? (
                "Change PDF File"
              ) : (
                "Choose PDF File"
              )}
            </span>
          </label>
          {PdfFile && (
            <p className="mt-5 text-gray-600 font-medium  text-[12px] sm:text-lg lg:text-xl text-center">
              {FileSize(PdfFile.size)}
            </p>
          )}
        </div>
      </div>
      {/* show ChatOption */}
      {ShowChat && PdfFile && <ChatOption ChatID={ChatID} />}
    </div>
  );
};

export default ChatPDF;
