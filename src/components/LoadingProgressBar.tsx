import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react"; 

const LoadingProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      <div className="flex items-center gap-2">
        <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
        <span className="text-lg font-medium text-gray-700">{progress}%</span>
      </div>

      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden max-w-md">
        <div
          className="h-full bg-blue-600 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default LoadingProgressBar;
