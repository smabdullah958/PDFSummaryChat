import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Spinner */}
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

      {/* Text */}
      <span className="text-white font-medium tracking-wide">
        Extracting...
      </span>
    </div>
  );
};

export default Loader;
