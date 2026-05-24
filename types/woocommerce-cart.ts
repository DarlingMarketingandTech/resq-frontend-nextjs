/**
 * WooCommerce Cart Bridge Type Definitions
 * Shapes returned from the Headless WC REST API, proxied through /api/cart/*
 */

export interface WCCartItem {
  key: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  name: string;
  price: string;
  images: { src: string }[];
}

export interface WCCartTotals {
  total_items: string;
  total_shipping: string;
  total_tax: string;
  total_price: string;
  currency_code: string;
}

export interface WCCart {
  items: WCCartItem[];
  items_count: number;
  totals: WCCartTotals;
  coupons: WCCoupon[];
  cartToken?: string | null;
}

export interface WCCoupon {
  code: string;
  discount_type: string;
}

export interface WCCartAddRequest {
  id: number;
  quantity: number;
  variation_id?: number;
}

export interface WCCartRemoveRequest {
  key: string;
}

export interface WCCartUpdateRequest {
  key: string;
  quantity: number;
}

export interface WCCheckoutSession {
  checkout_url: string;
  session_token: string;
  expires_at: number;
  cartToken?: string | null;
}

export interface WCApiError {
  error: string;
  status: number;
}

export interface WCCartAddResponse {
  key: string;
  product_id: number;
  quantity: number;
  added: boolean;
  cartToken?: string | null;
}

export interface WCCartRemoveResponse {
  removed: boolean;
  cartToken?: string | null;
}

export interface WCCartUpdateResponse {
  key: string;
  quantity: number;
  updated: boolean;
  cartToken?: string | null;
}
