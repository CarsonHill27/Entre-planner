
import { getOneProject } from "../../../../prisma/project"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkle, TrashIcon } from "lucide-react";
import { GoalGenerator, LogoGenerator, SloganGenerator } from "@/components/generators";

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
                <CardContent className="flex gap-4 flex-col">
                    <div className="flex items-start flex-col gap-2">
                        <h1>Generators</h1>
                        <div className="flex items-center gap-2">
                            <LogoGenerator id={slug} />
                            <SloganGenerator id={slug} />
                            <GoalGenerator id={slug} />
                        </div>
                        <hr className="border-t border-border my-4 border-1 w-full" />
                    </div>
                    <div className="flex items-start flex-col gap-2">
                        <h1>Content</h1>
                        <div>
                            <div className="flex gap-2">
                                {project.images.map((image, idx) => (
                                    <img
                                        key={idx}
                                        src={image}
                                        alt="Project Image"
                                        className="w-64 h-64 object-cover rounded-lg "
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}