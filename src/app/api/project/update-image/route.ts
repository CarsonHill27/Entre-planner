import { NextResponse } from "next/server";
import { updateProjectImages } from "../../../../../prisma/project";

export async function POST(req: Request) {
    const { id, images } = await req.json()

    console.log(images);

    await updateProjectImages(id, images);

    return NextResponse.json({
        status: 200,
        body: 'Images updated'
    });
}