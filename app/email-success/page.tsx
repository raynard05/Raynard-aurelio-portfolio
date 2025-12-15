"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/component/Navbar";

export default function EmailSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Auto redirect to home after 5 seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-yellow-400 text-6xl mb-4">✓</div>
          <h1 className="text-white text-4xl font-bold mb-4">Email Sent Successfully!</h1>
          <p className="text-gray-300 text-lg mb-8">
            Thank you for your message. I'll get back to you soon.
          </p>
          <p className="text-gray-500 text-sm">
            Redirecting to home page in 5 seconds...
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition"
          >
            Go Home Now
          </button>
        </div>
      </div>
    </>
  );
}