'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea"


export function LogoGenerator({ id }: { id: string }) {

    const [color, setColor] = useState('#000000')
    const [style, setStyle] = useState('')
    const [description, setDescription] = useState('')

    const [imageUrl, setImageUrl] = useState("");
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    const generateLogo = async () => {
        setLoading(true);

        const response = await fetch('/api/openai/image', {
            method: 'POST',
            body: JSON.stringify({ color, style, description }),
        });

        if (response.ok) {
            const data = await response.json();
            const res = await fetch('/api/project/update-image', {
                method: 'POST',
                body: JSON.stringify({ images: data.data[0].url, id: id }),
            }
            )
            setImageUrl(data.data[0].url);
            setLoading(false);
        }

        setLoading(false);
    }

    return (
        <Dialog onOpenChange={() => router.refresh()}>
            <DialogTrigger>
                <Card className="hover:bg-primary/50 hover:border-primary hover:cursor-pointer  ">
                    <CardHeader>
                        <h1 className="text-xl flex items-center gap-2"> <Sparkle /> Logo Creator</h1>
                        <h2 className="text-muted-foreground">Generate a logo for your project</h2>
                    </CardHeader>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Logo Generator</DialogTitle>
                    <DialogDescription>
                        Create a logo for your project using the OpenAI API
                    </DialogDescription>


                    <div className="space-y-4 flex gap-4">
                        <div className="flex gap-4 flex-col">
                            <div>
                                <Label htmlFor="color">Color</Label>
                                <Input
                                    id="color"
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="h-10 w-20"
                                />
                            </div>
                            <div>
                                <Label htmlFor="style">Style</Label>
                                <Select value={style} onValueChange={setStyle}>
                                    <SelectTrigger id="style">
                                        <SelectValue placeholder="Select a style" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2d">2D</SelectItem>
                                        <SelectItem value="3d">3D</SelectItem>
                                        <SelectItem value="flat">Flat</SelectItem>
                                        <SelectItem value="vector">Vector</SelectItem>
                                        <SelectItem value="minimalist">Minimalist</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter a short description of your logo"
                                />
                            </div>
                            <Button disabled={isLoading} onClick={generateLogo}>
                                {isLoading ? "Generating..." : "Generate Logo"}
                            </Button>

                            <div>



                                {imageUrl && (
                                    <img src={imageUrl} alt="Generated Logo" className="mt-4" />
                                )}
                            </div>
                        </div>
                    </div>

                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export function SloganGenerator({ id, description }: { id: string, description: string }) {
    const [keywords, setKeywords] = useState('');
    const [slogan, setSlogan] = useState('');
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    const generateSlogan = async () => {
        setLoading(true);

        const response = await fetch('/api/openai/slogan', {
            method: 'POST',
            body: JSON.stringify({ id, keywords, description }),
        });

        if (response.ok) {
            const data = await response.json();
            setSlogan(data);
        }

        setLoading(false);
    };

    return (
        <Dialog onOpenChange={() => router.refresh()}>
            <DialogTrigger>
                <Card className="hover:bg-pink-500/50 hover:border-pink-500 hover:cursor-pointer">
                    <CardHeader>
                        <h1 className="text-xl flex items-center gap-2"><Sparkle /> Slogan Creator</h1>
                        <h2 className="text-muted-foreground">Generate a slogan for your project</h2>
                    </CardHeader>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Slogan Generator</DialogTitle>
                    <DialogDescription>
                        Create a slogan for your project using the OpenAI API
                    </DialogDescription>
                    <div className="space-y-4 flex gap-4">
                        <div className="flex gap-4 flex-col">
                            <div>
                                <Label htmlFor="keywords">Keywords</Label>
                                <Input
                                    className=""
                                    id="keywords"
                                    value={keywords}
                                    onChange={(e) => setKeywords(e.target.value)}
                                    placeholder="Epic, Fire, Swag"
                                />
                            </div>
                            <Button disabled={isLoading} onClick={generateSlogan}>
                                {isLoading ? "Generating..." : "Generate Slogan"}
                            </Button>
                            <div>
                                {slogan && (
                                    <p className="mt-4">{slogan}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}


export function GoalGenerator({ id }: { id: string }) {
    const [keywords, setKeywords] = useState('');
    const [goal, setGoal] = useState('');
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    const generateGoal = async () => {
        setLoading(true);

        const response = await fetch('/api/openai/goal', {
            method: 'POST',
            body: JSON.stringify({ id, keywords }),
        });

        if (response.ok) {
            const data = await response.json();
            setGoal(data);
        }

        setLoading(false);
    };

    return (
        <Dialog onOpenChange={() => router.refresh()}>
            <DialogTrigger>
                <Card className="hover:bg-orange-500/50 hover:border-orange-500 hover:cursor-pointer">
                    <CardHeader>
                        <h1 className="text-xl flex items-center gap-2"><Sparkle /> Goal Creator</h1>
                        <h2 className="text-muted-foreground">Generate goals for your project</h2>
                    </CardHeader>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Goal Generator</DialogTitle>
                    <DialogDescription>
                        Create goals for your project using the OpenAI API
                    </DialogDescription>
                    <div className="space-y-4 flex gap-4">
                        <div className="flex gap-4 flex-col w-full">
                            <div>
                                <Label htmlFor="keywords">Goals</Label>
                                <Textarea
                                    className="w-full"
                                    id="keywords"
                                    value={keywords}
                                    onChange={(e) => setKeywords(e.target.value)}
                                    placeholder="Enter a 100-150 word description of your projects goals and outlines here"
                                />
                            </div>
                            <Button disabled={isLoading} onClick={generateGoal}>
                                {isLoading ? "Generating..." : "Generate Goals"}
                            </Button>

                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}