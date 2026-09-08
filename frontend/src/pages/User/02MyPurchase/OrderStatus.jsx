import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Truck,
  ShieldCheck,
  Headphones,
  MapPin,
  CreditCard,
  Package,
} from "lucide-react";
import AccountSidebar from "../AccountSidebar";

// Sample assets imports from existing codebase
import keyboardImg from "../../../assets/custom_keyboard_lol_pink.png";
import keyboardVctImg from "../../../assets/custom_keyboard_vct.png";
import mousepadImg from "../../../assets/custom_mousepad_teemo_collab.png";

const mockOrders = {
  "GV-98421074": {
    orderId: "GV-98421074",
    statusLabel: "In Transit",
    placedAt: "Jan 14, 2025 • 10:45 AM",
    estimatedDelivery: "Jan 17, 2025 (In 2 Days)",
    currentStepIndex: 2, // 0: Order Placed, 1: Confirmed, 2: In Transit, 3: Out for Delivery, 4: Delivered
    steps: [
      { title: "Order Placed", date: "Jan 14, 2025", time: "10:45 AM" },
      { title: "Confirmed", date: "Jan 14, 2025", time: "11:15 AM" },
      { title: "In Transit", date: "Jan 15, 2025", time: "09:30 AM" },
      { title: "Out for Delivery", date: "Expected Jan 17", time: "" },
      { title: "Delivered", date: "Expected Jan 17", time: "" },
    ],
    items: [
      {
        id: "item-1",
        name: "GearVerse Pro Headset",
        variant: "RGB • 7.1 Surround • Pink",
        quantity: 1,
        price: "$89.99",
        image: keyboardImg,
      },
      {
        id: "item-2",
        name: "GearVerse Mechanical Keyboard",
        variant: "Cherry MX Red • TKL Layout • Matte Black",
        quantity: 1,
        price: "$149.99",
        image: keyboardVctImg,
      },
      {
        id: "item-3",
        name: "GearVerse Gaming Mouse",
        variant: "Wireless • 25K DPI • Black",
        quantity: 2,
        price: "$69.99",
        image: mousepadImg,
      },
    ],
    shipping: {
      name: "KIM WINTER",
      addressLine1: "742 Cyberpunk Plaza, Suite 404",
      addressLine2: "Neo-Tokyo District, CA 94016",
      countryPhone: "United States • +1 (555) 304-4021",
    },
    payment: {
      subtotal: "$379.96",
      promoCode: "GEAR30",
      promoDiscount: "-$30.00",
      shippingFee: "$5.99",
      totalPaid: "$355.95",
      methodNotice: "PAID VIA: Visa ending in 4042 • SECURE TRANSACTION",
    },
  },

  "GV-240801": {
    orderId: "GV-240801",
    statusLabel: "Delivered",
    placedAt: "18 Aug 2026 • 09:00 AM",
    estimatedDelivery: "Delivered on 18 Aug 2026",
    currentStepIndex: 4, // Fully delivered
    steps: [
      { title: "Order Placed", date: "15 Aug 2026", time: "09:00 AM" },
      { title: "Confirmed", date: "15 Aug 2026", time: "09:30 AM" },
      { title: "In Transit", date: "16 Aug 2026", time: "14:00 PM" },
      { title: "Out for Delivery", date: "18 Aug 2026", time: "08:30 AM" },
      { title: "Delivered", date: "18 Aug 2026", time: "11:45 AM" },
    ],
    items: [
      {
        id: "item-240801-1",
        name: "Nebula Pro Wireless Controller",
        variant: "Haptic Feedback • Dual Wireless • Violet/Pink",
        quantity: 1,
        price: "฿2,490",
        image: keyboardImg,
      },
    ],
    shipping: {
      name: "John Doe",
      addressLine1: "123 Sukhumvit Road, Khlong Toei",
      addressLine2: "Bangkok 10110",
      countryPhone: "Thailand • +66 81 234 5678",
    },
    payment: {
      subtotal: "฿2,490",
      promoCode: null,
      promoDiscount: null,
      shippingFee: "Free",
      totalPaid: "฿2,490",
      methodNotice: "PAID VIA: PromptPay QR Code • SECURE TRANSACTION",
    },
  },

  "GV-240744": {
    orderId: "GV-240744",
    statusLabel: "Out for Delivery",
    placedAt: "12 Aug 2026 • 10:00 AM",
    estimatedDelivery: "Arriving Today (12 Aug 2026)",
    currentStepIndex: 3, // Out for Delivery
    steps: [
      { title: "Order Placed", date: "10 Aug 2026", time: "10:00 AM" },
      { title: "Confirmed", date: "10 Aug 2026", time: "10:30 AM" },
      { title: "In Transit", date: "11 Aug 2026", time: "16:20 PM" },
      { title: "Out for Delivery", date: "12 Aug 2026", time: "07:15 AM" },
      { title: "Delivered", date: "Expected Today", time: "" },
    ],
    items: [
      {
        id: "item-240744-1",
        name: "Aurora RGB Mechanical Keyboard",
        variant: "Hot-swappable • Gateron Yellow • RGB Backlit",
        quantity: 1,
        price: "฿3,290",
        image: keyboardVctImg,
      },
    ],
    shipping: {
      name: "John Doe",
      addressLine1: "123 Sukhumvit Road, Khlong Toei",
      addressLine2: "Bangkok 10110",
      countryPhone: "Thailand • +66 81 234 5678",
    },
    payment: {
      subtotal: "฿3,290",
      promoCode: null,
      promoDiscount: null,
      shippingFee: "Free",
      totalPaid: "฿3,290",
      methodNotice: "PAID VIA: Credit Card ending in 8819 • SECURE TRANSACTION",
    },
  },

  "GV-240615": {
    orderId: "GV-240615",
    statusLabel: "Processing",
    placedAt: "30 Jul 2026 • 15:20 PM",
    estimatedDelivery: "Expected Aug 02, 2026",
    currentStepIndex: 1, // Confirmed / Processing
    steps: [
      { title: "Order Placed", date: "30 Jul 2026", time: "15:20 PM" },
      { title: "Confirmed", date: "30 Jul 2026", time: "15:50 PM" },
      { title: "In Transit", date: "Expected Jul 31", time: "" },
      { title: "Out for Delivery", date: "Expected Aug 02", time: "" },
      { title: "Delivered", date: "Expected Aug 02", time: "" },
    ],
    items: [
      {
        id: "item-240615-1",
        name: "Phantom 7.1 Gaming Headset",
        variant: "Noise Cancelling • Spatial Audio • Black",
        quantity: 1,
        price: "฿1,890",
        image: mousepadImg,
      },
    ],
    shipping: {
      name: "John Doe",
      addressLine1: "123 Sukhumvit Road, Khlong Toei",
      addressLine2: "Bangkok 10110",
      countryPhone: "Thailand • +66 81 234 5678",
    },
    payment: {
      subtotal: "฿1,890",
      promoCode: null,
      promoDiscount: null,
      shippingFee: "Free",
      totalPaid: "฿1,890",
      methodNotice: "PAID VIA: TrueMoney Wallet • SECURE TRANSACTION",
    },
  },
};

export default function OrderStatus() {
  const { orderId } = useParams();
  
  // Use orderId parameter or fallback to default GV-98421074
  const order = mockOrders[orderId] || mockOrders["GV-98421074"];

  return (
    <main className="min-h-screen bg-[#080711] px-4 py-8 font-sans text-[#DDD6FE] sm:px-6 lg:px-12 lg:py-12">
      <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
        {/* Account Sidebar */}
        <AccountSidebar active="/my-purchases" />

        {/* Main Content Area */}
        <section className="space-y-6">
          {/* Header with Back Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                to="/my-purchases"
                className="flex items-center gap-1.5 rounded-lg border border-[#2A2A45] bg-[#16162A] px-3 py-1.5 text-xs font-semibold text-[#A78BFA] transition-colors hover:bg-[#22223A] hover:text-white"
              >
                <ArrowLeft className="size-4" />
                Back to My Purchases
              </Link>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Order Status
              </h1>
            </div>
          </div>

          {/* Top Progress Tracker Card */}
          <div className="rounded-2xl border border-[#2A2A45] bg-[#121225] p-6 shadow-xl sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#2A2A45]/80 pb-6">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8B86A5]">
                    ORDER ID:
                  </span>
                  <span className="font-mono text-sm font-bold text-[#00F2FE] drop-shadow-[0_0_8px_rgba(0,242,254,0.4)]">
                    {order.orderId}
                  </span>
                  <span className="rounded-full bg-[#312E56] px-3 py-0.5 text-xs font-semibold text-[#A5F3FC]">
                    {order.statusLabel}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#8B86A5]">
                  Placed on {order.placedAt}
                </p>
              </div>

              <div className="text-right">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#8B86A5]">
                  ESTIMATED DELIVERY
                </span>
                <span className="mt-0.5 inline-block text-sm font-bold text-[#00FF87] drop-shadow-[0_0_8px_rgba(0,255,135,0.4)]">
                  {order.estimatedDelivery}
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="mt-8 px-2">
              <div className="relative flex flex-col justify-between sm:flex-row">
                {order.steps.map((step, index) => {
                  const isLastStep = index === order.steps.length - 1;
                  const isCompleted =
                    index < order.currentStepIndex ||
                    (index === order.currentStepIndex && isLastStep);
                  const isActive =
                    index === order.currentStepIndex && !isLastStep;
                  const isPending = index > order.currentStepIndex;

                  return (
                    <div
                      key={step.title}
                      className="relative z-10 flex flex-1 flex-col items-center text-center max-sm:mb-6 max-sm:flex-row max-sm:text-left"
                    >
                      {/* Step Indicator Circle */}
                      <div className="relative flex items-center justify-center">
                        {isCompleted && (
                          <div className="flex size-9 items-center justify-center rounded-full bg-[#00FF87]/15 ring-2 ring-[#00FF87] shadow-[0_0_12px_rgba(0,255,135,0.5)]">
                            <Check className="size-5 text-[#00FF87]" strokeWidth={3} />
                          </div>
                        )}
                        {isActive && (
                          <div className="relative flex size-9 items-center justify-center rounded-full bg-[#00F2FE]/20 ring-2 ring-[#00F2FE] shadow-[0_0_16px_rgba(0,242,254,0.6)]">
                            <div className="size-3 rounded-full bg-[#00F2FE] animate-pulse" />
                          </div>
                        )}
                        {isPending && (
                          <div className="size-9 rounded-full border border-[#3A3A5E] bg-[#16162A]" />
                        )}
                      </div>

                      {/* Step Text Info */}
                      <div className="mt-3 max-sm:ml-4 max-sm:mt-0">
                        <p
                          className={`text-xs font-bold ${
                            isCompleted
                              ? "text-white"
                              : isActive
                              ? "text-[#00F2FE]"
                              : "text-[#6B6B8D]"
                          }`}
                        >
                          {step.title}
                        </p>
                        <p
                          className={`mt-0.5 text-[11px] ${
                            isActive
                              ? "text-[#00F2FE]/80 font-medium"
                              : isCompleted
                              ? "text-[#A78BFA]"
                              : "text-[#7A7A9E]"
                          }`}
                        >
                          {step.date}
                        </p>
                        {step.time && (
                          <p className="text-[10px] text-[#5A5A7E]">{step.time}</p>
                        )}
                      </div>

                      {/* Connecting Line (Desktop) */}
                      {index < order.steps.length - 1 && (
                        <div className="hidden sm:block absolute left-[calc(50%+18px)] right-[calc(-50%+18px)] top-4 -z-10 h-[3px]">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              index < order.currentStepIndex
                                ? "bg-[#00FF87] shadow-[0_0_8px_rgba(0,255,135,0.4)]"
                                : index === order.currentStepIndex
                                ? "bg-gradient-to-r from-[#00F2FE] via-[#3A3A6E] to-[#2A2A45]"
                                : "bg-[#2A2A45]"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Two Column Section */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Column: Ordered Items */}
            <div className="space-y-4 lg:col-span-7">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Ordered Gaming Gear
              </h2>

              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 rounded-xl border border-[#2A2A45] bg-[#121225] p-4 transition-colors hover:border-[#3A3A65] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Product Thumbnail Container */}
                      <div className="flex size-16 shrink-0 items-center justify-center rounded-lg border border-[#2A2A45] bg-[#181832] p-1.5 overflow-hidden">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="size-full object-contain"
                          />
                        ) : (
                          <Package className="size-8 text-[#A78BFA]" />
                        )}
                      </div>

                      {/* Title and Spec Badges */}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-white text-sm truncate">
                          {item.name}
                        </h3>
                        <span className="mt-1.5 inline-block rounded-md bg-[#232342] px-2.5 py-1 text-[11px] font-medium text-[#A78BFA] border border-[#32325A]">
                          {item.variant}
                        </span>
                      </div>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between gap-6 border-t border-[#2A2A45] pt-2 sm:border-t-0 sm:pt-0 sm:justify-end">
                      <div className="text-left sm:text-right">
                        <span className="block text-[10px] uppercase text-[#7A7A9E]">
                          Quantity
                        </span>
                        <span className="text-sm font-bold text-white">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] uppercase text-[#7A7A9E]">
                          Price
                        </span>
                        <span className="text-sm font-bold text-[#F9A8D4]">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Shipping & Payment Cards */}
            <div className="space-y-4 lg:col-span-5">
              {/* Shipping Destination */}
              <div className="rounded-xl border border-[#2A2A45] bg-[#121225] p-5 space-y-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <MapPin className="size-4 text-[#00F2FE]" />
                  Shipping Destination
                </h2>
                <div className="space-y-1 text-xs text-[#DDD6FE]/90">
                  <p className="font-bold text-white text-sm">{order.shipping.name}</p>
                  <p>{order.shipping.addressLine1}</p>
                  <p>{order.shipping.addressLine2}</p>
                  <p className="text-[#8B86A5] pt-1">{order.shipping.countryPhone}</p>
                </div>
              </div>

              {/* Payment Breakdown */}
              <div className="rounded-xl border border-[#2A2A45] bg-[#121225] p-5 space-y-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <CreditCard className="size-4 text-[#F9A8D4]" />
                  Payment Breakdown
                </h2>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-[#8B86A5]">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">{order.payment.subtotal}</span>
                  </div>

                  {order.payment.promoCode && (
                    <div className="flex justify-between text-[#00FF87]">
                      <span>Promo ({order.payment.promoCode})</span>
                      <span className="font-semibold">{order.payment.promoDiscount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#8B86A5]">
                    <span>Priority Shipping</span>
                    <span className="font-semibold text-white">{order.payment.shippingFee}</span>
                  </div>

                  <div className="border-t border-[#2A2A45] pt-3 flex justify-between items-baseline">
                    <span className="font-bold text-white text-sm">Total Paid</span>
                    <span className="text-lg font-extrabold text-[#F9A8D4]">
                      {order.payment.totalPaid}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#2A2A45]/60 pt-3 text-[10px] tracking-wide text-[#7A7A9E] font-mono">
                  {order.payment.methodNotice}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust & Feature Badges */}
          <div className="grid gap-4 sm:grid-cols-3 pt-2">
            <div className="flex items-center gap-3 rounded-xl border border-[#2A2A45] bg-[#121225] p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#2A1F45] text-[#A78BFA]">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Secure Payment</h4>
                <p className="text-[11px] text-[#7A7A9E]">SSL Encrypted checkouts</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-[#2A2A45] bg-[#121225] p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#1F2A45] text-[#00F2FE]">
                <Truck className="size-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Fast Delivery</h4>
                <p className="text-[11px] text-[#7A7A9E]">Same-day dispatch priority</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-[#2A2A45] bg-[#121225] p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#451F3A] text-[#F9A8D4]">
                <Headphones className="size-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">24/7 Support</h4>
                <p className="text-[11px] text-[#7A7A9E]">Elite crew on standby</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
