import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center mt-40">
        <h1 className="text-6xl font-bold mb-4">Welcome to Entre-planner</h1>
        <p className="text-lg mb-8">Your ultimate tool for planning and managing your entrepreneurial journey.</p>
        <div className="flex space-x-4 justify-center">
          <SignInButton />
          <SignUpButton />
        </div>
      </div>
    </div>
  );
}