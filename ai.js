const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const TOGETHER_API_KEY = "1baefae241724cdcf7169a3a05d2a52e0d9eaca21788c580b71bff45082d83bf";  

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        const response = await axios.post(
            "https://api.together.ai/v1/chat/completions",
            {
                model: "mistralai/Mistral-7B-Instruct",
                messages: [{ role: "user", content: message }],
                max_tokens: 250,
            },
            { headers: { Authorization: `Bearer ${TOGETHER_API_KEY}` } }
        );

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));


