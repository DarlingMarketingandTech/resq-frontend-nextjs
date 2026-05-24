import { NextRequest, NextResponse } from 'next/server';
import type { WCCartAddRequest, WCCartAddResponse, WCApiError } from '@/types/woocommerce-cart';

const WC_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

/**
 * POST /api/cart/add
 * Adds a product to the active session cart on WooCommerce.
 * Proxies the request server-to-server with HTTP Basic Auth.
 * Threads Cart-Token for session continuity.
 */
export async function POST(req: NextRequest): Promise<NextResponse<WCCartAddResponse | WCApiError>> {
  try {
    if (!WC_URL || !WC_KEY || !WC_SECRET) {
      return NextResponse.json(
        { error: 'Missing WooCommerce environment variables', status: 500 },
        { status: 500 }
      );
    }

    const body: WCCartAddRequest = await req.json();

    if (!body.id || !body.quantity) {
      return NextResponse.json(
        { error: 'Missing required fields: id, quantity', status: 400 },
        { status: 400 }
      );
    }

    const incomingToken = req.headers.get('x-cart-token');
    const auth = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64');
    const addUrl = `${WC_URL}/wp-json/wc/store/v1/cart/add-item`;

    const wcHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
    };
    if (incomingToken) {
      wcHeaders['Cart-Token'] = incomingToken;
    }

    const response = await fetch(addUrl, {
      method: 'POST',
      headers: wcHeaders,
      body: JSON.stringify({
        id: body.id,
        quantity: body.quantity,
        variation_id: body.variation_id || 0,
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
      product_id: data.product_id,
      quantity: data.quantity,
      added: true,
      cartToken: outgoingToken,
    });
  } catch (error) {
    console.error('[POST /api/cart/add] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', status: 500 },
      { status: 500 }
    );
  }
}
