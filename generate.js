export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { input, type } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a Canadian legal assistant. Add disclaimer: This is not legal advice."
        },
        {
          role: "user",
          content: `Create a ${type}: ${input}`
        }
      ]
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
