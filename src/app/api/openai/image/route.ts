import { NextRequest } from 'next/server';
import { OpenAI } from 'openai';

type ImageBody = {
    color: string;
    style: string;
    description: string;
}

export async function POST(req: NextRequest) {

    if (!process.env.OPENAI_API_KEY) {
        return new Response('OpenAI API key not set', {
            status: 500,
        });
    }

    const { color, style, description } = await req.json() as ImageBody;

    console.log(color);

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: `Create a logo for a new project. The logo should be a simple design and make use of the hex color ${color} for either background or foreground elements. The style of the logo should be ${style}. The logo should represent ${description} and incorporate the hex color ${color} into the design.`,
        n: 1,
        size: '1024x1024',
    });

    return new Response(JSON.stringify(response), {
        headers: {
            'content-type': 'application/json',
        },
    });
}