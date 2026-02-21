import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      {/* Spinner */}
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin "></div>
    </div>
  );
};

export default Loader;
