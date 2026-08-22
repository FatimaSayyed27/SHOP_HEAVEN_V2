import { Link, useLocation } from "react-router-dom";

function OrderSuccessPage() {
  const location = useLocation();

  const order = location.state?.order;

  // =====================================================
  // ORDER NOT FOUND
  // =====================================================

  if (!order) {
    return (
      <div className="min-h-screen bg-[#fbfaf7] flex items-center justify-center px-6 py-16">
        <div className="text-center max-w-md">
          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
            Shop Haven
          </p>

          <h1 className="font-serif text-3xl sm:text-4xl mt-4 text-[#1c1a18]">
            Order Information Not Found
          </h1>

          <p className="text-sm leading-6 text-[#756e65] mt-4">
            Please check your orders to view your latest order.
          </p>

          <Link
            to="/orders"
            className="inline-block mt-7 bg-[#1b1917] text-white px-7 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-black transition"
          >
            My Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f0ea] flex items-center justify-center px-5 sm:px-8 py-14 sm:py-20">
      <div className="max-w-2xl w-full text-center">
        {/* =================================================
            SUCCESS MARK
        ================================================= */}

        <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-[#cdbf9f] bg-[#f8f5ef] flex items-center justify-center">
          <span className="text-3xl sm:text-4xl text-[#79856f]">✓</span>
        </div>

        {/* =================================================
            BRAND
        ================================================= */}

        <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666] mt-8">
          Shop Haven
        </p>

        {/* =================================================
            TITLE
        ================================================= */}

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight mt-4 text-[#1c1a18]">
          Order Placed <span className="italic font-light">Successfully</span>
        </h1>
        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <p className="text-sm sm:text-base leading-7 text-[#746d64] mt-5 max-w-lg mx-auto">
          Thank you for choosing Shop Haven. Your order has been placed
          successfully and is now being prepared for you.
        </p>

        {/* =================================================
            ORDER CARD
        ================================================= */}

        <div className="bg-white border border-[#e5dfd6] rounded-2xl p-6 sm:p-8 mt-9 text-left">
          {/* Order number */}
          <div className="flex justify-between items-start gap-5">
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#9a8e81]">
              Order Number
            </span>

            <span className="font-serif text-lg text-[#1c1a18]">
              #{order.id}
            </span>
          </div>

          {/* Payment */}
          <div className="flex justify-between items-start gap-5 mt-5">
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#9a8e81]">
              Payment
            </span>

            <span className="text-sm font-medium text-[#3f3a35]">
              {order.payment_method}
            </span>
          </div>

          {/* Total */}
          <div className="flex justify-between items-start gap-5 mt-5">
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#9a8e81]">
              Total
            </span>

            <span className="font-serif text-xl text-[#1c1a18]">
              ₹{Number(order.total_price).toLocaleString("en-IN")}
            </span>
          </div>

          {/* Address */}
          <div className="mt-7 border-t border-[#e7e1d9] pt-7">
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#9a8e81]">
              Shipping Address
            </p>

            <p className="text-sm leading-6 text-[#6f675d] mt-3">
              {order.shipping_address}
            </p>
          </div>
        </div>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8">
          <Link
            to={`/orders/${order.id}`}
            className="bg-[#1b1917] text-white px-7 py-3.5 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-black transition"
          >
            View Order
          </Link>

          <Link
            to="/products"
            className="border border-[#cfc7bc] bg-white px-7 py-3.5 rounded-full text-[10px] uppercase tracking-[0.2em] text-[#5f574f] hover:border-black hover:text-black transition"
          >
            Continue Shopping
          </Link>
        </div>

        {/* =================================================
            FOOTNOTE
        ================================================= */}

        <div className="mt-9">
          <p className="text-[9px] uppercase tracking-[0.25em] text-[#9c9185]">
            Thank you for shopping with us
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessPage;
