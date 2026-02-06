import { NextResponse } from "next/server";
import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SHOES_API = "https://69733ee0b5f46f8b58269eb8.mockapi.io/Shoes";

export async function POST(req) {
  try {
    if (!GEMINI_API_KEY) {
      console.error("❌ GEMINI_API_KEY is not set");
      return NextResponse.json([]);
    }

    const { userNeed } = await req.json();

    if (!userNeed || !userNeed.trim()) {
      return NextResponse.json([]);
    }

    // 1️⃣ Fetch shoes with axios
    let shoes = [];
    try {
      const shoesRes = await axios.get(SHOES_API);
      shoes = shoesRes.data;
    } catch (err) {
      console.error("❌ Failed to fetch shoes:", err.message);
      return NextResponse.json([]);
    }

    console.log("📦 Total shoes available:", shoes.length);

    if (!Array.isArray(shoes) || shoes.length === 0) {
      return NextResponse.json([]);
    }

    // 2️⃣ Build strict JSON prompt
    const shoesString = shoes
      .map(
        (shoe) =>
          `{"id":"${shoe.id}","name":"${shoe.name}","category":"${shoe.category}","price":${shoe.price},"sexe":"${shoe.sexe}","size":${JSON.stringify(
            shoe.size
          )},"description":"${shoe.description.replace(/"/g, '\\"')}","image":"${shoe.image}"}`
      )
      .join("\n");

    const prompt = `
You are a JSON filtering assistant. Your ONLY job is to return valid JSON.

USER SEARCH:
"${userNeed}"

AVAILABLE SHOES (one per line):
${shoesString}

RULES:
- Return ONLY a JSON array
- No markdown
- No explanation
- If no match, return []

JSON FORMAT:
[
  {
    "id": "",
    "name": "",
    "category": "",
    "price": 0,
    "sexe": "",
    "size": [],
    "description": "",
    "image": ""
  }
]
`;

    console.log("🚀 Calling Gemini with:", userNeed);

    // 3️⃣ Call Gemini with axios
    let geminiData;
    try {
      const geminiRes = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          params: { key: GEMINI_API_KEY },
          headers: { "Content-Type": "application/json" },
        }
      );

      geminiData = geminiRes.data;
    } catch (err) {
      console.error("❌ Gemini API failed:", err.response?.data || err.message);
      return NextResponse.json([]);
    }

    let text =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    console.log("📝 Raw Gemini response:", text.slice(0, 300));

    // 4️⃣ Hard clean (Gemini likes to talk)
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/^[^[]*/, "")
      .replace(/[^\]]*$/, "")
      .trim();

    console.log("🧹 Cleaned response:", text.slice(0, 300));

    // 5️⃣ Parse JSON safely
    let result = [];
    try {
      result = JSON.parse(text);
      if (!Array.isArray(result)) result = [];
    } catch (err) {
      console.error("❌ JSON parse failed:", err.message);

      // fallback extraction
      const match = text.match(/\[[\s\S]*\]/);
      if (match) {
        try {
          result = JSON.parse(match[0]);
        } catch {
          result = [];
        }
      }
    }

    console.log("✅ Returning", result.length, "shoes");
    return NextResponse.json(result);

  } catch (error) {
    console.error("💥 Server error:", error.message);
    return NextResponse.json([]);
  }
}
