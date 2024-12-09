
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
            <div className="flex">
                <Card className="overflow-x-auto max-h-[800px] flex-1">
                    <CardHeader className="">
                        <div className="flex justify-between ">
                            <div>
                                <h1 className="text-4xl font-bold"> {project.name}</h1>
                                <p className="text-muted-foreground">{project.createdAt.toLocaleDateString()}</p>
                                <p className="text-muted-foreground">{project.description}</p>
                                <p className="text-muted-foreground">{project.audience}</p>
                                <p className="text-muted-foreground">{project?.slogan}</p>
                            </div>
                            <Button variant={'destructive'}> <TrashIcon /> Delete Project</Button>
                        </div>
                    </CardHeader>
                    <CardContent className="flex gap-4 flex-col">
                        <div className="flex items-start flex-col gap-2">
                            <h1>Generators</h1>
                            <div className="flex items-center gap-2">
                                <LogoGenerator id={slug} />
                                <SloganGenerator id={slug} description={project.description} />
                                <GoalGenerator id={slug} />
                            </div>
                            <hr className="border-t border-border my-4 border-1 w-full" />
                        </div>
                        <div className="flex items-start flex-col gap-2">
                            <h1>A.I Generated Images</h1>
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
                <Card className="ml-8 max-w-[700px] max-h-[800px] h-full overflow-y-auto p-4">
                    <h2 className="text-2xl font-bold"></h2>
                    {project.goals &&
                        <div className="prose prose-sm " dangerouslySetInnerHTML={{ __html: project.goals }} />
                    }
                </Card>
            </div>
        </div >
    )
}