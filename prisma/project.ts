import prisma from "@/lib/prisma";

export async function createProject({ userId, name, description, audience }: {
    userId: string;
    name: string;
    description: string;
    audience: string;
}) {
    return await prisma.project.create({
        data: {
            userId,
            name,
            description,
            audience,
        },
    });
};

export async function getUserProjects(userId: string) {
    return await prisma.project.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export async function getOneProject(id: string) {
    return await prisma.project.findUnique({
        where: {
            id
        }
    })
}

export async function updateProjectImages(id: string, images: string[]) {
    return await prisma.project.update({
        where: {
            id
        },
        data: {
            images: {
                push: images
            }
        }
    })
}