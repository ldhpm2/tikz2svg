import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, type } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message or Prompt is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let systemPrompt = "";
    
    if (type === 'tikz-gen') {
      systemPrompt = `You are a specialized TikZ code generator. 
      Your task is to take a description and return ONLY the TikZ code block (starting with \\begin{tikzpicture} and ending with \\end{tikzpicture}).
      Do not include any other text, markdown formatting (like \`\`\`latex), or preamble. 
      Just the raw LaTeX TikZ code.
      Return clean, well-formatted code.`;
    } else {
      systemPrompt = "You are a helpful and professional AI assistant for the TikZ to SVG platform. Provide concise, friendly answers in Vietnamese.";
    }

    const prompt = `${systemPrompt}\n\nUser input: ${message}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean up if the model included markdown blocks despite instructions
    if (type === 'tikz-gen') {
      text = text.replace(/```latex|```tikz|```/g, '').trim();
    }

    return res.status(200).json({ content: text });
  } catch (error) {
    console.error('API Error:', error);
    // Fallback if API key is missing or error occurs
    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({ 
        content: type === 'tikz-gen' 
          ? "% Vui lòng cấu hình GEMINI_API_KEY để sử dụng tính năng này\n\\begin{tikzpicture}\n    \\draw (0,0) circle (1);\n\\end{tikzpicture}"
          : "Chào bạn! Tôi đang ở chế độ offline vì chưa có API Key. Hãy cấu hình GEMINI_API_KEY trong Vercel nhé!" 
      });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
