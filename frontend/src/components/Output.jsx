import { useState } from "react";
import ReactMarkdown from "react-markdown";

const Output = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!result) return null;

  return (
    <div className="mt-6 p-4 rounded-lg bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white shadow">
      <h2 className="text-lg font-bold mb-2">Generated Copy:</h2>
      <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
        <ReactMarkdown>{result}</ReactMarkdown>
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={handleCopy}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default Output;
