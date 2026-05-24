import { NextRequest, NextResponse } from 'next/server';
import type { WCCheckoutSession, WCApiError } from '@/types/woocommerce-cart';

const WC_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

interface CheckoutRequest {
  items: Array<{
    product_id: number;
    quantity: number;
  }>;
}

/**
 * POST /api/cart/checkout
 * Initiates a checkout session on WooCommerce and returns the checkout URL.
 * Frontend redirects to this URL for the hosted checkout experience.
 * Threads Cart-Token for session continuity with the built cart.
 */
export async function POST(req: NextRequest): Promise<NextResponse<WCCheckoutSession | WCApiError>> {
  try {
    if (!WC_URL || !WC_KEY || !WC_SECRET) {
      return NextResponse.json(
        { error: 'Missing WooCommerce environment variables', status: 500 },
        { status: 500 }
      );
    }

    const body: CheckoutRequest = await req.json();

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty', status: 400 },
        { status: 400 }
      );
    }

    const incomingToken = req.headers.get('x-cart-token');
    const auth = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64');
    const checkoutUrl = `${WC_URL}/wp-json/wc/store/v1/checkout`;

    const wcHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
    };
    if (incomingToken) {
      wcHeaders['Cart-Token'] = incomingToken;
    }

    const response = await fetch(checkoutUrl, {
      method: 'POST',
      headers: wcHeaders,
      body: JSON.stringify({
        items: body.items,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'WooCommerce API error', status: response.status },
        { status: response.status }
      );
    }

    const data = await response.json();
    const outgoingToken = response.headers.get('Cart-Token') ?? incomingToken ?? null;
    return NextResponse.json({
      checkout_url: data.checkout_url || data.redirect_url,
      session_token: data.session_token || data.token || '',
      expires_at: data.expires_at || Math.floor(Date.now() / 1000) + 3600,
      cartToken: outgoingToken,
    });
  } catch (error) {
    console.error('[POST /api/cart/checkout] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', status: 500 },
      { status: 500 }
    );
  }
}
