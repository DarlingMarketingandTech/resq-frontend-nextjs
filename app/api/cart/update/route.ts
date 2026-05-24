import { NextRequest, NextResponse } from 'next/server';
import type { WCCartUpdateRequest, WCCartUpdateResponse, WCApiError } from '@/types/woocommerce-cart';

const WC_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

/**
 * POST /api/cart/update
 * Updates the quantity of a product in the active session cart on WooCommerce.
 * Uses the cart item key to identify which item to update.
 * Threads Cart-Token for session continuity.
 */
export async function POST(req: NextRequest): Promise<NextResponse<WCCartUpdateResponse | WCApiError>> {
  try {
    if (!WC_URL || !WC_KEY || !WC_SECRET) {
      return NextResponse.json(
        { error: 'Missing WooCommerce environment variables', status: 500 },
        { status: 500 }
      );
    }

    const body: WCCartUpdateRequest = await req.json();

    if (!body.key || body.quantity === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: key, quantity', status: 400 },
        { status: 400 }
      );
    }

    if (body.quantity < 1) {
      return NextResponse.json(
        { error: 'Quantity must be at least 1', status: 400 },
        { status: 400 }
      );
    }

    const incomingToken = req.headers.get('x-cart-token');
    const auth = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64');
    const updateUrl = `${WC_URL}/wp-json/wc/store/v1/cart/update-item`;

    const wcHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
    };
    if (incomingToken) {
      wcHeaders['Cart-Token'] = incomingToken;
    }

    const response = await fetch(updateUrl, {
      method: 'POST',
      headers: wcHeaders,
      body: JSON.stringify({
        key: body.key,
        quantity: body.quantity,
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
      key: data.key,
      quantity: data.quantity,
      updated: true,
      cartToken: outgoingToken,
    });
  } catch (error) {
    console.error('[POST /api/cart/update] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', status: 500 },
      { status: 500 }
    );
  }
}
