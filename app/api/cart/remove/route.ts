import { NextRequest, NextResponse } from 'next/server';
import type { WCCartRemoveRequest, WCCartRemoveResponse, WCApiError } from '@/types/woocommerce-cart';

const WC_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

/**
 * POST /api/cart/remove
 * Removes a product from the active session cart on WooCommerce.
 * Requires the cart item key returned from the cart state.
 * Threads Cart-Token for session continuity.
 */
export async function POST(req: NextRequest): Promise<NextResponse<WCCartRemoveResponse | WCApiError>> {
  try {
    if (!WC_URL || !WC_KEY || !WC_SECRET) {
      return NextResponse.json(
        { error: 'Missing WooCommerce environment variables', status: 500 },
        { status: 500 }
      );
    }

    const body: WCCartRemoveRequest = await req.json();

    if (!body.key) {
      return NextResponse.json(
        { error: 'Missing required field: key', status: 400 },
        { status: 400 }
      );
    }

    const incomingToken = req.headers.get('x-cart-token');
    const auth = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64');
    const removeUrl = `${WC_URL}/wp-json/wc/store/v1/cart/remove-item`;

    const wcHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
    };
    if (incomingToken) {
      wcHeaders['Cart-Token'] = incomingToken;
    }

    const response = await fetch(removeUrl, {
      method: 'POST',
      headers: wcHeaders,
      body: JSON.stringify({ key: body.key }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'WooCommerce API error', status: response.status },
        { status: response.status }
      );
    }

    const outgoingToken = response.headers.get('Cart-Token') ?? incomingToken ?? null;
    return NextResponse.json({
      removed: true,
      cartToken: outgoingToken,
    });
  } catch (error) {
    console.error('[POST /api/cart/remove] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', status: 500 },
      { status: 500 }
    );
  }
}
