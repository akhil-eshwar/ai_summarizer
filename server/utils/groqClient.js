const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const generateSummary = async (transcript, instruction) => {
  try {
    const prompt = `
Meeting Transcript:
${transcript}

Instruction: ${instruction}

Please provide a structured summary based on the instruction above.
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 2048,
    });

    return chatCompletion.choices[0]?.message?.content || 'No summary generated';
  } catch (error) {
    console.error('Error generating summary with Groq:', error);
    throw new Error('Failed to generate summary');
  }
};

module.exports = {
  generateSummary
};
