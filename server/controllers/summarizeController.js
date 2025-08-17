const { generateSummary } = require('../utils/groqClient');

const summarizeTranscript = async (req, res) => {
  try {
    const { transcript, instruction } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: 'Transcript is required' });
    }

    if (!instruction) {
      return res.status(400).json({ error: 'Instruction is required' });
    }

    const summary = await generateSummary(transcript, instruction);

    res.json({ 
      success: true, 
      summary,
      originalTranscript: transcript,
      instruction 
    });
  } catch (error) {
    console.error('Error in summarizeTranscript:', error);
    res.status(500).json({ 
      error: 'Failed to generate summary',
      message: error.message 
    });
  }
};

module.exports = {
  summarizeTranscript
};
