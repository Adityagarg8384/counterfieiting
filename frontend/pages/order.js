// pages/my-orders.jsx
"use client";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Navbar2 from "@/components/navbar2";

const sampleOrders = [
    {
        id: "o1",
        productName: "Apple AirPods Pro",
        qty: 1,
        price: 406.99,
        vendorName: "GreatStack",
        addressLines: ["Main Road , 123 Street, G Block", "City, State"],
        phone: "0123456789",
        method: "COD",
        date: "2/4/2025",
        payment: "Pending",
        img: "/icons/box-placeholder.png", // replace or use external src
    },
    {
        id: "o2",
        productName: "Bose QuietComfort 45",
        qty: 1,
        price: 335.99,
        vendorName: "GreatStack",
        addressLines: ["Main Road , 123 Street, G Block", "City, State"],
        phone: "0123456789",
        method: "COD",
        date: "2/4/2025",
        payment: "Pending",
        img: "/icons/box-placeholder.png",
    },
    {
        id: "o3",
        productName: "Apple AirPods Pro",
        qty: 1,
        price: 406.99,
        vendorName: "GreatStack",
        addressLines: ["Main Road , 123 Street, G Block", "City, State"],
        phone: "0123456789",
        method: "COD",
        date: "2/4/2025",
        payment: "Pending",
        img: "/icons/box-placeholder.png",
    },
];

export default function MyOrdersPage() {
    const orders = sampleOrders; // replace with real data from API or Redux

    return (
        <div>
            <Navbar2 />
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold">
                        <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-sm mr-3 text-sm align-middle">My Orders</span>
                    </h1>
                </div>

                {/* Orders list */}
                <div className="space-y-6">
                    {orders.length === 0 ? (
                        <div className="text-gray-500 py-12 text-center">
                            <p className="text-lg">You have no orders yet.</p>
                            <Link href="/all-products" className="inline-block mt-4 text-orange-600 hover:underline">
                                ← Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        orders.map((o) => (
                            <div
                                key={o.id}
                                className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 py-6 border-t last:border-b"
                            >
                                {/* Left: thumbnail + title */}
                                <div className="flex items-center gap-4 md:w-1/4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                                        {/* Replace img src as required */}
                                        <img
                                            src={o.img}
                                            alt={o.productName}
                                            className="w-10 h-10 object-contain"
                                            onError={(e) => (e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23cbd5e1' font-size='10'%3EIMG%3C/text%3E%3C/svg%3E")}
                                        />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-800">{o.productName} x {o.qty}</div>
                                        <div className="text-sm text-gray-500">Items : {o.qty}</div>
                                    </div>
                                </div>

                                {/* Middle: vendor & address */}
                                <div className="md:w-1/2">
                                    <div className="text-gray-800 font-medium">{o.vendorName}</div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        {o.addressLines.map((line, idx) => (
                                            <div key={idx}>{line}</div>
                                        ))}
                                    </div>
                                    <div className="text-sm text-gray-500 mt-2">{o.phone}</div>
                                </div>

                                {/* Right: price and meta */}
                                <div className="md:w-1/4 flex flex-col items-start md:items-end text-sm text-gray-700">
                                    <div className="text-lg font-semibold mb-2">${o.price.toFixed(2)}</div>

                                    <div className="text-gray-500 text-right">
                                        <div><span className="font-medium">Method :</span> {o.method}</div>
                                        <div className="mt-1"><span className="font-medium">Date :</span> {o.date}</div>
                                        <div className="mt-1"><span className="font-medium">Payment :</span> {o.payment}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
