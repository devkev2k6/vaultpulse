import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Return authenticated user token payload
    const user = {
      id: `usr_${Math.floor(Math.random() * 90000 + 10000)}`,
      email,
      name,
      role: "Pro",
      demoPreset: "Balanced Wealth",
      token: `jwt_token_${Date.now()}`,
    };

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process registration" },
      { status: 500 }
    );
  }
}
