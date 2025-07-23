const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: "https://brandify-ai-azure.vercel.app"
}));
app.use(express.json());

// Routes
app.use("/generate", require("./routes/generate"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
