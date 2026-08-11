import { NextResponse } from "next/server";
import { generateDisputeDraft, DisputeTone } from "../../../lib/utils";
import { Subscription } from "../../../lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subscription, tone }: { subscription: Subscription; tone: DisputeTone } = body;

    if (!subscription) {
      return NextResponse.json(
        { error: "Subscription object is required" },
        { status: 400 }
      );
    }

    const draft = generateDisputeDraft(subscription, tone || "Firm");
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      tone: tone || "Firm",
      draft,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate AI dispute draft" },
      { status: 500 }
    );
  }
}
