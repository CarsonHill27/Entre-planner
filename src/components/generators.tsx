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


export function LogoGenerator({ id }: { id: string }) {

    const [color, setColor] = useState('#000000')
    const [style, setStyle] = useState('')
    const [description, setDescription] = useState('')

    const [imageUrl, setImageUrl] = useState("");
    const [isLoading, setLoading] = useState(false);

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
        <Dialog>
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

export function SloganGenerator({ id }: { id: string }) {
    return (
        <Dialog>
            <DialogTrigger>
                <Card className="hover:bg-pink-500/50 hover:border-pink-500 hover:cursor-pointer ">
                    <CardHeader>
                        <h1 className="text-xl flex items-center gap-2"> <Sparkle /> Slogan Creator</h1>
                        <h2 className="text-muted-foreground">Generate a slogan for your project</h2>
                    </CardHeader>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}


export function GoalGenerator({ id }: { id: string }) {
    return (
        <Dialog>
            <DialogTrigger>
                <Card className="hover:bg-orange-500/50 hover:border-orange-500 hover:cursor-pointer ">
                    <CardHeader>
                        <h1 className="text-xl flex items-center gap-2"> <Sparkle /> Goal Creator</h1>
                        <h2 className="text-muted-foreground">Generate goals for your project</h2>
                    </CardHeader>
                </Card>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
