'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PaymentElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { API_BASE_URL } from '@/lib/config';
import Image from 'next/image';
import toast from 'react-hot-toast';

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

interface CheckoutFormProps {
  email: string;
  clientSecret: string;
  onSuccess: () => void;
}

function CheckoutForm({ email, clientSecret, onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { getTotalPrice, clearCart } = useCart();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error('Payment form is not ready yet');
      return;
    }

    setLoading(true);
    setError(null);
    toast.loading('Processing payment...', { id: 'payment' });

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || 'An error occurred');
      toast.error(submitError.message || 'An error occurred', { id: 'payment' });
      setLoading(false);
      return;
    }

    const { error: paymentError, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
        receipt_email: email || undefined,
      },
      redirect: 'if_required',
    });

    if (paymentError) {
      setError(paymentError.message || 'Payment failed');
      toast.error(paymentError.message || 'Payment failed', { id: 'payment' });
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      toast.success('Payment successful! Redirecting...', { id: 'payment' });
      clearCart();
      setTimeout(() => {
        router.push('/checkout/success');
        onSuccess();
      }, 1000);
    } else {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-t border-gray-200 pt-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Information</h3>
          <p className="text-sm text-gray-600">Enter your card details below</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl">
          <PaymentElement />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-bold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none text-lg"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          `Pay $${getTotalPrice().toFixed(2)}`
        )}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCart();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processingEmail, setProcessingEmail] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      router.push('/cart');
      return;
    }
  }, [items, router]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter a valid email address');
      return;
    }

    setProcessingEmail(true);
    setError(null);
    toast.loading('Processing...', { id: 'email-processing' });

    try {
      const orderResponse = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
          customerEmail: email,
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        setError(errorData.message || errorData.error || 'Failed to create order');
        toast.error(errorData.message || errorData.error || 'Failed to create order', { id: 'email-processing' });
        setProcessingEmail(false);
        return;
      }

      const orderResponseData = await orderResponse.json();
      const order = orderResponseData.data || orderResponseData;

      const paymentResponse = await fetch(`${API_BASE_URL}/orders/${order.id}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json();
        setError(errorData.message || errorData.error || 'Failed to create payment intent');
        toast.error(errorData.message || errorData.error || 'Failed to create payment intent', { id: 'email-processing' });
        setProcessingEmail(false);
        return;
      }

      const paymentResponseData = await paymentResponse.json();
      const paymentData = paymentResponseData.data || paymentResponseData;
      setClientSecret(paymentData.clientSecret);
      toast.success('Payment form ready!', { id: 'email-processing' });
      setProcessingEmail(false);
    } catch (err) {
      setError('Failed to initialize payment');
      toast.error('Failed to initialize payment', { id: 'email-processing' });
      setProcessingEmail(false);
      console.error(err);
    }
  };

  if (items.length === 0) {
    return null;
  }

  if (!stripePromise) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="text-center py-20">
          <p className="text-red-600 text-lg font-semibold">Stripe is not configured. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
      <div className="mb-8">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-4 group"
        >
          <svg
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="font-medium">Back to Cart</span>
        </Link>
        <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Checkout
        </h1>
        <p className="text-gray-600">Complete your purchase securely</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 order-2 lg:order-1">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Payment Details
          </h2>

          <div className="space-y-6">
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setClientSecret(null);
                      setError(null);
                    }}
                    required
                    disabled={processingEmail || !!clientSecret}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="your@email.com"
                  />
                  <button
                    type="submit"
                    disabled={processingEmail || !!clientSecret || !email.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
                  >
                    {processingEmail ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : clientSecret ? (
                      '✓ Ready'
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">We'll send your receipt here</p>
              </div>
            </form>

            {error && !clientSecret && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            {processingEmail ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
                <p className="text-gray-600 font-medium">Processing your order...</p>
                <p className="text-sm text-gray-500 mt-2">Please wait while we prepare your payment</p>
              </div>
            ) : clientSecret ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: 'stripe',
                  },
                }}
              >
                <CheckoutForm email={email} clientSecret={clientSecret} onSuccess={() => {}} />
              </Elements>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Enter your email and click Submit to continue with payment</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg border border-blue-100 p-8 order-1 lg:order-2 h-fit sticky top-24">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Order Summary
          </h2>
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200">
                  {item.product.imageUrl ? (
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{item.product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t-2 border-gray-300 pt-6 space-y-3">
            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Subtotal</span>
              <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Shipping</span>
              <span className="font-semibold text-green-600">Free</span>
            </div>
            <div className="pt-3 border-t border-gray-300">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
