import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, name, email, address, city, state, zipCode, employer, occupation, isRecurring, complianceConfirmed } = body;

    // Validation
    if (!amount || amount < 1 || amount > 1000) {
      return NextResponse.json({ error: 'Invalid donation amount. Must be between $1 and $1,000.' }, { status: 400 });
    }
    if (!name || !email || !address || !city || !state || !zipCode) {
      return NextResponse.json({ error: 'All donor information fields are required.' }, { status: 400 });
    }
    if (!complianceConfirmed) {
      return NextResponse.json({ error: 'Compliance confirmation is required.' }, { status: 400 });
    }
    if (amount > 100 && (!employer || !occupation)) {
      return NextResponse.json({ error: 'Employer and occupation are required for contributions over $100.' }, { status: 400 });
    }

    // TODO: Create Stripe Payment Intent when Stripe is configured
    // For now, log to webhook
    const webhookUrl = process.env.WEBHOOK_DONATE;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount, name, email, address, city, state, zipCode,
          employer, occupation,
          isRecurring: isRecurring || false,
          source: 'website',
          timestamp: new Date().toISOString(),
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
