"use client"
import React, { useEffect } from "react";
import { assets, BagIcon, CartIcon } from "../assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "@/redux/slice";
// import { UserButton } from "@clerk/nextjs";

const Navbar2 = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { isSeller, router } = useAppContext();
  const { openSignIn } = useClerk();
  
  // useUser hook from Clerk gives info about the signed-in user
  const { user: clerkUser, isSignedIn } = useUser();

  // Update Redux state when Clerk user changes
  useEffect(() => {
    if (isSignedIn && clerkUser) {
      dispatch(setUser(clerkUser.firstName || clerkUser.username));
    } else {
      dispatch(clearUser());
    }
  }, [clerkUser, isSignedIn, dispatch]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        // src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">Home</Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">Shop</Link>
        <Link href="/" className="hover:text-gray-900 transition">About Us</Link>
        <Link href="/" className="hover:text-gray-900 transition">Contact</Link>
        {isSeller && (
          <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">
            Seller Dashboard
          </button>
        )}
      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label= "Cart" labelIcon={<CartIcon/>} onClick={()=>router.push('/cart')} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label= "Orders" labelIcon={<BagIcon/>} onClick={()=>router.push('/order')} />
            </UserButton.MenuItems>
          </UserButton>
          // <span className="font-medium">{user}</span>
        ) : (
          <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">
            Seller Dashboard
          </button>
        )}
        <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>
      </div>
    </nav>
  );
};

export default Navbar2;
