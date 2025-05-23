import type { InputHTMLAttributes } from "react";
import { Input, Label, Textarea } from "~/common/components";

export default function InputPair({
  label,
  required,
  description,
  textArea = false,
  ...rest
}: {
    label: string;
    required?: boolean;
    description: string;
    textArea?: boolean;
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) {
    return (
        <div className="space-y-2 flex flex-col">
            <Label htmlFor={rest.id} className="flex flex-col gap-1">
                {label}
                <small className="text-muted-foreground">{description}</small>
            </Label>
            {textArea ? <Textarea rows={8} className="resize-none" {...rest} /> : <Input {...rest} />}
        </div>
    );
}