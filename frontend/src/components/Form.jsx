import { useState } from "react";

const Form = ({ onGenerate }) => {
  const [formData, setFormData] = useState({
    product: "",
    audience: "",
    tone: "friendly",
    type: "tweet"
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await onGenerate(formData);
    setIsLoading(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        name="product"
        placeholder="Product"
        className="w-full p-2 border rounded text-white dark:bg-gray-700"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="audience"
        placeholder="Target Audience"
        className="w-full p-2 border rounded text-white dark:bg-gray-700"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="tone"
        placeholder="Tone (e.g. friendly, professional)"
        className="w-full p-2 border rounded text-white dark:bg-gray-700"
        onChange={handleChange}
        required
      />

      <select name="type" 
        className="w-full p-2 border rounded text-white dark:bg-gray-700 dark:text-white" 
        onChange={handleChange}>
        <option value="tweet">Tweet</option>
        <option value="instagram">Instagram Caption</option>
        <option value="slogan">Slogan</option>
        <option value="blog">Blog Outline</option>
      </select>

      <button className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Generate
      </button>
      {isLoading && (
        <p className="text-center text-blue-500 mt-4">
          Generating copy, please wait...
        </p>
      )}
    </form>
  );
};

export default Form;
