import { NextRequest } from 'next/server';
import { OpenAI } from 'openai';
import { updateProjectSlogan } from '../../../../../prisma/project';


export async function POST(req: NextRequest) {

    if (!process.env.OPENAI_API_KEY) {
        return new Response('OpenAI API key not set', {
            status: 500,
        });
    }

    const { id, keywords, description } = await req.json();

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        prompt: `Generate a slogan for a new project. The project is about ${description}, and the slogan should be based off of the following keywords ${keywords}.`,
        max_tokens: 50,
        n: 1,
    });


    const slogan = response.choices[0].text;

    await updateProjectSlogan(id, slogan);

    return new Response(JSON.stringify(slogan), {
        headers: {
            'content-type': 'application/json',
        },
    });
}