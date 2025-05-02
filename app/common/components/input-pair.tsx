import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export function InputPair({
    label,
    description,
    textArea = false,
    ...rest }: {
        label: string;
        description: string;
        textArea? : boolean;
    } &InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) {
    return (
        <div className="flex flex-col space-y-1">
            <Label className="flex flex-col items-start" htmlFor={rest.id}>
                {label}
                <small className="text-muted-foreground">
                    {description}
                </small>
            </Label>
            {textArea ? <Textarea rows={5} {...rest} /> : <Input {...rest} />}
        </div>
    )
}  