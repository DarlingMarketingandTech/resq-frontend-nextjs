import { NextRequest, NextResponse } from 'next/server';
import type { WCCart, WCApiError } from '@/types/woocommerce-cart';

const WC_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

/**
 * GET /api/cart
 * Retrieves the active session cart state from WooCommerce.
 * Uses HTTP Basic Auth with server-side credentials.
 * Threads Cart-Token for session continuity.
 */
export async function GET(req: NextRequest): Promise<NextResponse<WCCart | WCApiError>> {
  try {
    if (!WC_URL || !WC_KEY || !WC_SECRET) {
      return NextResponse.json(
        { error: 'Missing WooCommerce environment variables', status: 500 },
        { status: 500 }
      );
    }

    const incomingToken = req.headers.get('x-cart-token');
    const auth = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64');
    const cartUrl = `${WC_URL}/wp-json/wc/store/v1/cart`;

    const wcHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
    };
    if (incomingToken) {
      wcHeaders['Cart-Token'] = incomingToken;
    }

    const response = await fetch(cartUrl, {
      method: 'GET',
      headers: wcHeaders,
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'WooCommerce API error', status: response.status },
        { status: response.status }
      );
    }

    const cartData: WCCart = await response.json();
    const outgoingToken = response.headers.get('Cart-Token') ?? incomingToken ?? null;
    return NextResponse.json({ ...cartData, cartToken: outgoingToken });
  } catch (error) {
    console.error('[GET /api/cart] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', status: 500 },
      { status: 500 }
    );
  }
}
