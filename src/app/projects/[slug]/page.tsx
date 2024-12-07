
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
                <CardContent>
                    <div className="flex items-start flex-col gap-2">
                        <h1>Generators</h1>
                        <div className="flex items-center gap-2">
                            <LogoGenerator />
                            <SloganGenerator />
                            <GoalGenerator />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}