const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="relative">
        {/* Pulsating circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-blue-500/20 animate-ping"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-blue-500/40 animate-pulse"></div>
        </div>

        {/* Center logo or icon */}
        <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 shadow-lg">
          <span className="text-white font-bold text-xl">Z</span>
        </div>
      </div>
      <p className="mt-6 text-lg font-semibold animate-pulse">
        Loading Page...
      </p>
    </div>
  );
};

export default Loading;
