

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
import { auth, currentUser } from '@clerk/nextjs/server'
import { getUserProjects } from "../../../prisma/project"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default async function Page() {

    const { userId } = await auth()
    const user = await currentUser()

    if (!userId) {
        return <div>Not logged in</div>
    }

    const projects = await getUserProjects(userId);

    return (
        <div className="flex flex-col gap-20  py-20 px-40 ">

            <div className="text-2xl flex gap-2 flex-col">
                <h1>{user?.username}'s Projects</h1>
                <Link href="/projects/new">
                    <Button> <PlusIcon /> New project</Button>
                </Link>
            </div>

            {projects.length === 0 && (
                <div>
                    <p className="text-3xl">You don't have any projects yet!</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">

                {projects.map((project) => (
                    <Card key={project.id} className="max-w-sm relative h-full">
                        <CardHeader className="">
                            <div className="flex justify-between">
                                <div>
                                    <CardTitle>{project.name}</CardTitle>
                                    <CardDescription>Created {project.createdAt.toLocaleDateString()}</CardDescription>
                                </div>
                                <Avatar className="">
                                    <AvatarFallback>
                                        {project.name[0]}{project.name[project.name.length - 1]}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="line-clamp-3">{project.description}</p>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Link href={`/projects/${project.id}`}>
                                <Button variant={'secondary'}>View Project</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}