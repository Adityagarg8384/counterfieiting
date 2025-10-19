import React from "react";
import ProductCard from "./productcard";
// import { useAppContext } from "@/context/AppContext";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const HomeProducts = () => {
  const products = useSelector((state) => state.products.products);
  // const { products, router } = useAppContext()
  const router = useRouter();

  return (
    <div className="flex flex-col items-center pt-14">
      <p className="text-2xl font-medium text-left w-full text-white">Popular products</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {products.map((product, index) => <ProductCard key={index} product={product} />)}
      </div>
      <button onClick={() => { router.push('/all-products') }} className="px-12 py-2.5 border text-white rounded text-gray-500/70 hover:bg-slate-50/90 transition">
        See more
      </button>
    </div>
  );
};

export default HomeProducts;