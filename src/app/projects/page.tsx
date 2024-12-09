

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {projects.map((project) => (
                    <Card key={project.id} className="max-w-sm relative">
                        <CardHeader>
                            <CardTitle>{project.name}</CardTitle>
                            <CardDescription>Created {project.createdAt.toLocaleDateString()}</CardDescription>
                            <img
                                src={`${project.images[0]}`}
                                alt="Project Thumbnail"
                                className="absolute top-0 right-0 w-16 h-16 object-cover rounded-full m-2"
                            />
                        </CardHeader>
                        <CardContent>
                            <p>{project.description}</p>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Link href={`/projects/${project.id}`}>
                                <Button>View Project</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}