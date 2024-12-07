
'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import Link from "next/link"
import { PlusIcon } from "lucide-react"
import { useUser } from "@clerk/clerk-react"

export default function Page() {

    const { isSignedIn, user, isLoaded } = useUser()

    return (
        <div className="flex flex-col gap-20  py-20 px-40 ">

            <div className="text-2xl flex gap-2 flex-col">
                <h1>{user?.username}'s Projects</h1>
                <Link href="/projects/new">
                    <Button> <PlusIcon /> New project</Button>
                </Link>
            </div>

            <Card className="max-w-sm relative">
                <CardHeader>
                    <CardTitle>Project 1</CardTitle>
                    <CardDescription>Created October 20th, 2024 </CardDescription>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkq-tJFjSCXGV6pAamnW8U7VIK_R4vHmafQA&s"
                        alt="Project Thumbnail"
                        className="absolute top-0 right-0 w-16 h-16 object-cover rounded-full m-2"
                    />
                </CardHeader>
                <CardContent>
                    <p>An application for making goldfish swim?</p>
                </CardContent>
                <CardFooter className="justify-end">
                    <p>View Project</p>
                </CardFooter>
            </Card>



        </div>
    )
}