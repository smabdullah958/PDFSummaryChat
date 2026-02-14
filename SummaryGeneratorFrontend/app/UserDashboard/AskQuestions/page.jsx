import ChatPDF from "@/Components/ChatPDF";
const Analytics = () => {
  return (
    <div className="overflow-x-hidden flex flex-col justify-center items-center mt-10 2xl:mt-20 text-justify">
      <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold">Dashboard</h1>
      <p className="mt-5 text-justify px-5 text-sm md:text-lg xl:text-xl 2xl:text-2xl">
        Upload a document to start Chatting with PDF
      </p>
      <ChatPDF />
    </div>
  );
};

export default Analytics;
