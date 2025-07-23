import { useState } from "react";
import Form from "./components/Form";
import Output from "./components/Output";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleGenerate = async (formData) => {
    setIsLoading(true);
    setResult("");

    try {
      const res = await fetch(`${BACKEND_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      setResult(data.result || "No content generated.");
    } catch (err) {
      alert("Something went wrong while generating content.");
    }

    setIsLoading(false);
  };


  return (
    <div className={`min-h-screen px-4 py-8 ${darkMode
      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
      : "bg-gradient-to-br from-blue-100 via-white to-gray-100 text-black"}`}>
      <div className="max-w-xl w-full mx-auto p-4 sm:p-6">
        
        {/* Navbar */}
        <div className={`bg-white dark:bg-gray-800 shadow p-4 rounded-xl mb-6 flex justify-between items-center`}>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Brandify.AI Logo" className="h-10 w-10" />
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Brandify<span className="text-blue-500">.AI</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-300 hidden sm:block">
              AI Marketing Copy Generator
            </span>
            <div
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 flex items-center rounded-full px-1 cursor-pointer transition-colors duration-300
                ${darkMode ? "bg-gray-700" : "bg-yellow-300"}`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300
                  ${darkMode ? "translate-x-6" : "translate-x-0"}`}
              ></div>
              <div className="absolute ml-[2px] text-[10px]">
                {darkMode ? "🌙" : "☀️"}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <Form onGenerate={handleGenerate} />
        </div>
        <Output result={result} />

      </div>
    </div>
  );

}

export default App;
