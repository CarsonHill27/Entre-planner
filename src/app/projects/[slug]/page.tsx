import GenerationOptions from "@/components/generation-options";
import { getOneProject } from "../../../../prisma/project"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkle, TrashIcon } from "lucide-react";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {

    const slug = (await params).slug
    const project = await getOneProject(slug);

    if (!project) {
        return <div>Project not found</div>
    }

    return (
        <div className="flex flex-col py-20 px-40 ">
            <Card className="">
                <CardHeader className="">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="text-4xl">{project.name}</h1>
                            <p className="text-muted-foreground">{project.description}</p>
                        </div>

                        <Button variant={'destructive'}> <TrashIcon /> Delete Project</Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="flex items-start flex-col gap-2">
                        <h1>Generators</h1>
                        <div className="flex items-center justify-evenly w-full gap-2">
                            <Card className="hover:bg-primary/50 hover:border-primary hover:cursor-pointer w-1/2">
                                <CardHeader>
                                    <h1 className="text-xl flex items-center gap-2"> <Sparkle /> Logo Creator</h1>
                                    <h2 className="text-muted-foreground">Generate a logo for your project</h2>
                                </CardHeader>
                            </Card>
                            <Card className="hover:bg-primary/50 hover:border-primary hover:cursor-pointer w-1/2">
                                <CardHeader>
                                    <h1 className="text-xl flex items-center gap-2"> <Sparkle /> Slogan Creator</h1>
                                    <h2 className="text-muted-foreground">Generate a slogan for your project</h2>
                                </CardHeader>
                            </Card>
                            <Card className="hover:bg-primary/50 hover:border-primary hover:cursor-pointer w-1/2">
                                <CardHeader>
                                    <h1 className="text-xl flex items-center gap-2"> <Sparkle /> Idea/Goals Creator</h1>
                                    <h2 className="text-muted-foreground">Generate a logo for your project</h2>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}