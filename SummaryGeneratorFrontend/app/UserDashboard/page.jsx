import SummaryPDF from "@/Components/SummaryPDF.jsx";
const HomePage = () => {
  return (
    <div className="overflow-x-hidden flex flex-col justify-center items-center mt-10 2xl:mt-20 text-justify">
      <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold">Dashboard</h1>
      <p className="mt-5 text-justify px-5 text-sm md:text-lg xl:text-xl 2xl:text-2xl">
        Upload a document to start summarizing with AI
      </p>
      <SummaryPDF />
    </div>
  );
};

export default HomePage;
