'use client';

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {

  const { user, isSignedIn } = useUser();

  return (
    <div className="flex items-center justify-center">
      <div className="text-center mt-40">
        <h1 className="text-6xl font-bold mb-4">Welcome to Entre-planner</h1>
        <p className="text-lg mb-8">Your ultimate tool for planning and managing your entrepreneurial journey.</p>
        {isSignedIn ?
          <Link href="/projects">
            <Button size="lg">View Projects</Button>
          </Link> :
          <div className="flex space-x-4 justify-center">
            <SignInButton>
              <Button size={'lg'} variant={'secondary'}>
                Sign-in
              </Button>
            </SignInButton>

          </div>
        }
      </div>
    </div>
  );
}