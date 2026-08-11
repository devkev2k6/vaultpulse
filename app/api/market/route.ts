import { NextResponse } from "next/server";
import { MARKET_TICKERS } from "../../../lib/mock-data";

export async function GET() {
  // Add subtle realistic micro-fluctuations to simulate live market data
  const updatedTickers = MARKET_TICKERS.map((t) => {
    const deltaPercent = (Math.random() * 0.4 - 0.2);
    const newPrice = Math.round((t.price * (1 + deltaPercent / 100)) * 100) / 100;
    return {
      ...t,
      price: newPrice,
      changePercent: Math.round((t.changePercent + deltaPercent) * 100) / 100,
    };
  });

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    tickers: updatedTickers,
  });
}
