"use client";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import SummaryThunck from "@/Libraries/ReduxToolkit/AsyncThunck/SummaryThunck";
import Loader from "@/Components/ButtonLoader";
import toast from "react-hot-toast";
const SummaryOptions = ({ PdfFile }) => {
  let dispatch = useDispatch();
  //for other opton
  let [options, SetOptions] = useState({
    Language: "English",
    Format: "Paragraph",
    Length: "Short",
  });

  //PDFSlice is come foram a store bro
  let { Loading } = useSelector((state) => state.SummarySlice);

  //handle dropdown
  let HandleDropDown = (values) => {
    SetOptions((previous) => ({
      ...previous,
      [values.target.name]: values.target.value,
    }));
  };

  let handleForm = (data) => {
    data.preventDefault();
    const formdata = new FormData();

    //alert for file size
    if (PdfFile.size >= 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit.");
      return;
    }

    formdata.append("pdf", PdfFile); // Matches your middleware body('pdf')
    formdata.append("Language", options.Language);
    formdata.append("Format", options.Format);
    formdata.append("Length", options.Length);
    // 3. Dispatch the Thunk
    dispatch(SummaryThunck(formdata));
  };

  return (
    <div
      className="mt-10 2xl:mt-20 w-72 sm:w-96 xl:w-[40vw] 2xl:w-[30vw] bg-gray-100 py-10  md:p-10  
   rounded-3xl text-black opacity-100 border-2 border-gray-300 border-dotted px-10 mb-10"
    >
      <h1 className="font-bold text-xl mb-5">Summary options </h1>
      Language{" "}
      <select
        onChange={HandleDropDown}
        value={options.Language}
        name="Language"
        className="border-2 border-solid broder-black mb-5 mt-2 p-3 rounded-xl bg-gray-100 w-full "
      >
        <option value="English">English</option>
        <option value="Urdu">Urdu</option>
        <option value="Hindi">Hindi</option>
        <option value="Balochi">Balochi</option>
        <option value="Pashto">Pashto</option>
      </select>
      Format{" "}
      <select
        onChange={HandleDropDown}
        value={options.Format}
        name="Format"
        className="border-2 border-solid broder-black mt-2 mb-5 p-3 rounded-xl bg-gray-100 w-full "
      >
        <option value="Paragraph">Paragraph</option>
        <option value="Bullet Points">Bullet Points</option>
      </select>
      Length{" "}
      <select
        onChange={HandleDropDown}
        value={options.Length}
        name="Length"
        className="border-2 border-solid broder-black mt-2 p-3 rounded-xl bg-gray-100 w-full "
      >
        <option value="Short">Short</option>
        <option value="Detail">Detail</option>
      </select>
      <button
        onClick={handleForm}
        className={` mt-10 p-4 rounded-xl   w-full font-bold 
        ${Loading ? "opacity-30 bg-[#7eb6f1]" : "opacity-100 bg-[#7eb6f1] hover:bg-[#8abff9]  duration-300 transition"}
        `}
      >
        {Loading ? <Loader /> : "Generate Summary"}
      </button>
    </div>
  );
};

export default SummaryOptions;
