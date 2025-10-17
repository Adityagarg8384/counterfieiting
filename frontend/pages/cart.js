// components/CartPage.jsx
import React, { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Navbar2 from "@/components/navbar2";

const sampleItems = []; // start empty to match screenshot; add objects to see items

export default function CartPage() {
    const [items, setItems] = useState(sampleItems);
    const [promo, setPromo] = useState("");
    const [address, setAddress] = useState("");
    const [appliedPromo, setAppliedPromo] = useState(null);

    const subtotal = useMemo(
        () =>
            items.reduce((sum, it) => {
                return sum + it.price * it.qty;
            }, 0),
        [items]
    );

    const shipping = items.length > 0 ? 20 : 0; // example
    const tax = +(subtotal * 0.02).toFixed(2);
    const discount = appliedPromo === "SAVE10" ? +(subtotal * 0.1).toFixed(2) : 0;
    const total = +(subtotal + shipping + tax - discount).toFixed(2);

    function applyPromo() {
        if (promo.trim().toUpperCase() === "SAVE10" && items.length > 0) {
            setAppliedPromo("SAVE10");
        } else {
            setAppliedPromo(null);
            // optionally show toast
        }
    }

    return (
        <div>
            <Navbar2 />
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-semibold">
                        Your <span className="text-orange-600">Cart</span>
                    </h1>
                    <div className="text-gray-500">{items.length} Items</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left: Cart Items */}
                    <div className="md:col-span-2">
                        <div className="bg-white border border-gray-200 rounded-md shadow-sm">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                <div className="hidden md:flex md:gap-8 text-gray-500 w-full">
                                    <div className="w-2/5">Product Details</div>
                                    <div className="w-1/6">Price</div>
                                    <div className="w-1/6">Quantity</div>
                                    <div className="w-1/6 text-right">Subtotal</div>
                                </div>
                                <div className="md:hidden text-gray-700">Items</div>
                            </div>

                            <div className="p-6 min-h-[220px]">
                                {items.length === 0 ? (
                                    <div className="text-gray-500">
                                        <div className="py-12 text-center">
                                            <p className="mb-6 text-lg">Your cart is empty</p>
                                            <Link href="/" className="inline-flex items-center text-orange-600 hover:underline">
                                                ← Continue Shopping
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {items.map((it) => (
                                            <div
                                                key={it.id}
                                                className="flex items-center gap-4 border-b pb-4 last:border-b-0"
                                            >
                                                <div className="w-2/5 flex items-center gap-4">
                                                    <div className="w-20 h-20 bg-gray-100 rounded-md flex-shrink-0" />
                                                    <div>
                                                        <div className="font-medium">{it.name}</div>
                                                        <div className="text-sm text-gray-500">{it.desc}</div>
                                                    </div>
                                                </div>
                                                <div className="w-1/6 text-gray-700">${it.price}</div>
                                                <div className="w-1/6">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={it.qty}
                                                        onChange={(e) => {
                                                            const q = Math.max(1, Number(e.target.value));
                                                            setItems((prev) =>
                                                                prev.map((p) => (p.id === it.id ? { ...p, qty: q } : p))
                                                            );
                                                        }}
                                                        className="w-20 px-2 py-1 border rounded text-sm"
                                                    />
                                                </div>
                                                <div className="w-1/6 text-right font-medium">${(it.price * it.qty).toFixed(2)}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* optionally show recommendations or coupon CTA */}
                    </div>

                    {/* Right: Order Summary */}
                    <aside className="bg-gray-50 p-6 rounded-md border border-gray-200 h-fit">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                        {/* Select Address */}
                        <div className="mb-5">
                            <label className="block text-xs font-semibold text-gray-500 mb-2">SELECT ADDRESS</label>
                            <button
                                onClick={() => {
                                    // example address picker
                                    setAddress("Home - 221B Baker St.");
                                }}
                                className="w-full text-left px-4 py-3 bg-white border rounded flex items-center justify-between"
                            >
                                <span className="text-gray-600">{address || "Select Address"}</span>
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Promo Code */}
                        <div className="mb-6">
                            <label className="block text-xs font-semibold text-gray-500 mb-2">PROMO CODE</label>
                            <div className="flex gap-3">
                                <input
                                    value={promo}
                                    onChange={(e) => setPromo(e.target.value)}
                                    className="flex-1 px-3 py-2 border rounded bg-white"
                                    placeholder="Enter promo code"
                                />
                                <button
                                    onClick={applyPromo}
                                    className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                                >
                                    Apply
                                </button>
                            </div>
                            {appliedPromo && (
                                <div className="mt-2 text-sm text-green-600">Applied: {appliedPromo} — discount applied</div>
                            )}
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                            <div className="flex justify-between text-gray-700 mb-2">
                                <div>ITEMS {items.length}</div>
                                <div>${subtotal.toFixed(2)}</div>
                            </div>
                            <div className="flex justify-between text-gray-600 mb-2">
                                <div>Shipping Fee</div>
                                <div>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</div>
                            </div>
                            <div className="flex justify-between text-gray-600 mb-4">
                                <div>Tax (2%)</div>
                                <div>${tax.toFixed(2)}</div>
                            </div>

                            {discount > 0 && (
                                <div className="flex justify-between text-gray-600 mb-2">
                                    <div>Discount</div>
                                    <div className="text-green-600">-${discount.toFixed(2)}</div>
                                </div>
                            )}

                            <div className="flex justify-between items-center mt-4 pt-4 border-t">
                                <div className="text-lg font-semibold">Total</div>
                                <div className="text-lg font-semibold">${total.toFixed(2)}</div>
                            </div>

                            <button
                                disabled={items.length === 0}
                                className={`w-full mt-5 py-3 rounded text-white font-medium ${items.length === 0 ? "bg-orange-200 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"
                                    }`}
                            >
                                Place Order
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
