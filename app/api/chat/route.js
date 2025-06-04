import { NextResponse } from "next/server";

export const maxDuration = 60; // Set to 60 seconds; adjust as needed (up to Vercel plan limits)

export async function POST(request) {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.3-8b-instruct:free",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant specialized in task management.",
            },
            { role: "user", content: question },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: "Failed to get response from OpenRouter" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({ answer: data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
