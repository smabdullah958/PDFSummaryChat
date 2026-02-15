// const ChatOption = () => {
//   return (
//     <div>
//       this is a ChatOption page of a Admin DashBoard
//       <h1>faldsj;lk</h1>
//     </div>
//   );
// };

// export default ChatOption;

const ChatOption = () => {
  return (
    <div className="w-full max-w-4xl mx-auto my-10 px-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">Chat</h2>
                <p className="text-blue-100 text-sm">Online</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[550px] overflow-y-auto bg-gray-50 p-6"></div>

        <div className="bg-white border-t px-6 py-4">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Type message..."
              className="flex-1 px-5 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg text-xl">
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatOption;
