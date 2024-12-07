import { NextResponse } from "next/server";
import { createProject } from "../../../../prisma/project";

type ProjectBody = {
    name: string;
    description: string;
    userId: string;
    audience: string;
}

export async function POST(req: Request) {
    const { name, description, userId, audience } = await req.json() as ProjectBody;
    const project = await createProject({ name, description, userId, audience });

    if (project.id) {
        return NextResponse.json({
            status: 201,
            id: project.id
        });
    }

    return NextResponse.json({
        status: 400,
        body: 'Project could not be created'
    });
}