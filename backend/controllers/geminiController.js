const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.generateContent = async (req, res) => {
  const { product, audience, tone, type } = req.body;

  if (!product || !audience || !tone || !type) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const templates = {
    tweet: `Write a catchy tweet about "${product}" for ${audience} in a ${tone} tone.`,
    instagram: `Create an Instagram caption promoting "${product}" to ${audience}. Use a ${tone} tone, include emojis and hashtags.`,
    slogan: `Generate a short and impactful slogan for "${product}" targeting ${audience}, with a ${tone} tone.`,
    blog: `Outline a blog post about "${product}" aimed at ${audience} in a ${tone} tone.`
  };

  const prompt = templates[type];

  try {
    const result = await model.generateContent(prompt); // just pass string

    // Try to get text from different possible response structures
    let text = "";
    if (result && result.response) {
      if (typeof result.response.text === "function") {
        text = result.response.text();
      } else if (
        result.response.candidates &&
        result.response.candidates[0] &&
        result.response.candidates[0].content &&
        result.response.candidates[0].content.parts &&
        result.response.candidates[0].content.parts[0] &&
        result.response.candidates[0].content.parts[0].text
      ) {
        text = result.response.candidates[0].content.parts[0].text;
      } else {
        text = JSON.stringify(result.response);
      }
    } else {
      text = "No response from Gemini API";
    }
    res.json({ result: text });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ error: "Failed to generate content", details: err.message });
  }
};
