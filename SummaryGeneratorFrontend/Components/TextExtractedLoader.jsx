const TextExtractedLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-3xl shadow-2xl px-10 py-8 flex flex-col items-center space-y-6 animate-fadeIn">
        {/* Animated Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800">Extracting Text</h2>

        {/* Animated Dots */}
        <p className="text-gray-500 flex items-center gap-1 text-sm">
          Please wait
          <span className="animate-bounce">.</span>
          <span className="animate-bounce delay-150">.</span>
          <span className="animate-bounce delay-300">.</span>
        </p>
      </div>
    </div>
  );
};

export default TextExtractedLoader;
