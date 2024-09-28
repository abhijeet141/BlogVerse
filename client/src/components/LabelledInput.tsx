import { Input } from "@/components/ui/input"
import { ChangeEvent } from "react"

interface LabelledInputType {
    type: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function LabelledInput({type,placeholder,onChange}: LabelledInputType){
    return (
        <Input type={type} placeholder={placeholder} onChange={onChange} />
    )
}