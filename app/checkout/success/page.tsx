import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-2xl p-12 text-center border border-green-100">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg transform animate-scale-in">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Payment Successful! 🎉
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Thank you for your purchase!
          </p>
          <p className="text-gray-500">
            Your order has been processed successfully. A confirmation email has been sent to your inbox.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Continue Shopping
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all font-semibold border-2 border-blue-600 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
