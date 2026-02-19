"use client";
import { useState, useEffect } from "react";
import SummaryOptions from "./SummaryOptions";
import { useDispatch, useSelector } from "react-redux";
import PDFLoader from "./PDFLoader";
import DisplaySummary from "./DisplaySummary";
import toast from "react-hot-toast";
import { clearError } from "@/Libraries/ReduxToolkit/Slices/PDFSlice";
const SummaryPDF = () => {
  let dispatch = useDispatch();
  let { Loading, success, errorMessage, Summary } = useSelector(
    //PDFSlice is come froma  store
    (state) => state.PDFSlice,
  );

  let [PdfFile, SetPdfFile] = useState(null);
  //show other options
  let [ShowOptions, SetShowOptions] = useState(false);
  let HandlePdfFile = (field) => {
    SetPdfFile(field.target.files[0]);
    SetShowOptions(true);
  };
  //find file size
  const FileSize = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearError());
    }
    return () => {
      dispatch(clearError());
    };
  }, [errorMessage, dispatch]);

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
              {PdfFile ? "Change PDF File" : "Choose PDF File"}
            </span>
          </label>
          {PdfFile && (
            <p className="mt-5 text-gray-600 font-medium  text-[12px] sm:text-lg lg:text-xl text-center">
              {FileSize(PdfFile.size)}
            </p>
          )}
        </div>
      </div>
      {/* //show summary options */}
      {ShowOptions && PdfFile && <SummaryOptions PdfFile={PdfFile} />}
      {/* //sho loader */}
      {Loading && <PDFLoader />}
      {success && PdfFile && Summary && <DisplaySummary />}
    </div>
  );
};

export default SummaryPDF;
