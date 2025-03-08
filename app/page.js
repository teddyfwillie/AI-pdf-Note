"use client";

import { Button } from "../components/ui/button";
import { api } from "../convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useEffect } from "react";

import { BrainCircuitIcon } from "lucide-react";
import { RocketIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import LandingPage from "../components/LandingPage";

export default function Home() {
  const { user, isSignedIn } = useUser(); // Use isSignedIn to check if the user is logged in
  const CreateUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (user) {
      console.log("User detected:", user); // Debugging
      CheckUser();
    }
  }, [user]);

  const CheckUser = async () => {
    console.log("Checking user:", user); // Debugging

    try {
      const result = await CreateUser({
        email: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        imageUrl: user?.imageUrl,
        upgrade: false,
      });

      console.log("Mutation result:", result);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-50">
        <div className="flex gap-8 items-center">
          <BrainCircuitIcon className="h-7 w-7 text-indigo-600 hover:rotate-45 transition-transform duration-300" />
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600 ">
            <span className="hover:text-indigo-600 cursor-pointer transition-colors duration-200">
              Home
            </span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors duration-200">
              Features
            </span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors duration-200">
              Pricing
            </span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors duration-200">
              FAQ
            </span>
          </div>
        </div>

        {/* Conditional Rendering */}
        {isSignedIn ? (
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-full text-white transition-all duration-300 hover:scale-105">
                Dashboard
              </Button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <Button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-full text-white transition-all duration-300 hover:scale-105">
            <RocketIcon className="mr-2 h-4 w-4" />
            <Link href="/dashboard">Get Started</Link>
          </Button>
        )}
      </nav>

      <LandingPage />
    </div>
  );
}
