const OpenAI = require("openai");

require("dotenv").config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const generateCourse = async (course, duration) => {

    if (!course || course.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Business description is required."
        });
    }

    const year = new Date().getFullYear();

    try {
        const completion = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            temperature: 0.4,
            messages: [
                {
                    role: "system",
                    content: `
You are an AI curriculum designer specialized in micro-learning.

Respond ONLY in valid JSON.
No markdown.
No explanations.
No extra text.

Rules:
- Output must be a JSON array
- Each item represents one day
- Each day focuses on ONE concept only
- Content must fit a 3–5 minute learning session
- Descriptions must be clear, practical, and beginner-friendly
- Each description must be 40–70 words

Exact output format:
[
  {
    "title": "Lesson title",
    "content": "3-5 minute lesson content focusing on the day's concept."
  }
]
      `
                },
                {
                    role: "user",
                    content: `
Create a micro-learning course.

Course title: "${course}"
Number of days: ${duration}
Target level: beginner to intermediate

Generate exactly ${duration} lessons.
      `
                }
            ]
        });


        const messageContent = completion.choices[0].message.content;

        // Direct JSON parse (OpenAI respects system JSON instructions well)
        const finalJson = JSON.parse(messageContent);
        return finalJson

    } catch (error) {
        return []
    }
};


module.exports = { generateCourse };