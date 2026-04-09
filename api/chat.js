export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // This is where you would normally call an AI API like Gemini or OpenAI.
    // For this example, we'll return a helpful mock response based on the input.
    
    let reply = "";
    const input = message.toLowerCase();

    if (input.includes('hello') || input.includes('chào')) {
      reply = "Xin chào! Có điều gì tôi có thể hỗ trợ bạn hôm nay không? 😊";
    } else if (input.includes('giá') || input.includes('price')) {
      reply = "Dạ, hiện tại chúng tôi đang có nhiều chương trình ưu đãi hấp dẫn. Bạn quan tâm đến gói dịch vụ nào ạ?";
    } else if (input.includes('tên') || input.includes('name')) {
      reply = "Tôi là trợ lý ảo được xây dựng để hỗ trợ bạn. Tôi không có tên riêng đâu ạ!";
    } else if (input.includes('vite') || input.includes('react')) {
      reply = "Đúng vậy! Ứng dụng này được xây dựng bằng Vite và React để đảm bảo tốc độ và trải nghiệm người dùng tốt nhất.";
    } else {
      reply = `Cảm ơn bạn đã nhắn tin: "${message}". Tôi là trợ lý AI và đây là phản hồi tự động. Bạn có thể thay thế logic này bằng một AI API thực thụ như Gemini hoặc GPT-4!`;
    }

    // Simulate a small delay for "thinking"
    await new Promise(resolve => setTimeout(resolve, 800));

    return res.status(200).json({ content: reply });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
