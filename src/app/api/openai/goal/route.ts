import { NextRequest } from 'next/server';
import { OpenAI } from 'openai';
import { updateProjectGoals, updateProjectSlogan } from '../../../../../prisma/project';


export async function POST(req: NextRequest) {

    if (!process.env.OPENAI_API_KEY) {
        return new Response('OpenAI API key not set', {
            status: 500,
        });
    }

    const { id, keywords } = await req.json();

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        prompt: `PLEASE USE HTML TAGS FOR FORMATTING PLEASEEE!! Generate a detailed outline for the following project goals:\n\n${keywords}\n\n 
        Use html tags to format the text. For example, <h1> for headers, <p> for paragraphs, and <ul> for lists.`,
        max_tokens: 500,
        n: 1,
    });

    const goals = response.choices[0].text;

    console.log(goals);

    await updateProjectGoals(id, goals);

    return new Response(JSON.stringify(goals), {
        headers: {
            'content-type': 'application/json',
        },
    });
}