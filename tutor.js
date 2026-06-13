export default async function handler(req, res) {
  // Pulls the hidden key safely from Vercel's secure environment vault
  const key = process.env.GEMINI_API_KEY; 
  
  if (!key) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY environment variable on server side." });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${key}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
