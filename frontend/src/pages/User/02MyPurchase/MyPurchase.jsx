import { PackageCheck, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import AccountSidebar from "../AccountSidebar";

const purchases = [
  { id: "GV-98421074", product: "GearVerse Pro Gaming Gear Set", date: "14 Jan 2025", total: "$355.95", status: "In Transit" },
  { id: "GV-240801", product: "Nebula Pro Wireless Controller", date: "18 Aug 2026", total: "฿2,490", status: "Delivered" },
  { id: "GV-240744", product: "Aurora RGB Mechanical Keyboard", date: "12 Aug 2026", total: "฿3,290", status: "Shipping" },
  { id: "GV-240615", product: "Phantom 7.1 Gaming Headset", date: "30 Jul 2026", total: "฿1,890", status: "Processing" },
];

export default function MyPurchase() {
  return (
    <main className="min-h-screen bg-[#090813] px-4 py-12 font-sans text-[#DDD6FE] sm:px-8 lg:px-14 lg:py-[72px]">
      <div className="mx-auto grid max-w-[920px] gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-[60px]">
        <AccountSidebar active="/my-purchases" />
        <section aria-labelledby="purchases-heading">
          <h1 id="purchases-heading" className="mb-5 text-base font-bold">My Purchase</h1>
          <div className="space-y-4">
            {purchases.map((purchase) => (
              <article key={purchase.id} className="rounded-xl border border-[#2A2A45] bg-[#1A1A2E] p-5 transition-colors hover:border-[#3A3A65]">
                <div className="flex items-start gap-4">
                  <PackageCheck className="mt-1 size-6 shrink-0 text-[#A78BFA]" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-[#8B86A5]">Order #{purchase.id}</p>
                        <h2 className="mt-1 font-bold text-white">{purchase.product}</h2>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-[#312E56] px-3 py-1 text-xs font-semibold text-[#A5F3FC]">
                          {purchase.status}
                        </span>
                        <Link
                          to={`/my-purchases/${purchase.id}`}
                          className="flex items-center gap-1 text-xs font-semibold text-[#22D3EE] hover:text-[#A5F3FC] transition-colors"
                        >
                          View Status
                          <ChevronRight className="size-4" />
                        </Link>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap justify-between gap-2 border-t border-[#2A2A45] pt-3 text-xs">
                      <span>{purchase.date}</span>
                      <strong className="text-[#F9A8D4]">{purchase.total}</strong>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
