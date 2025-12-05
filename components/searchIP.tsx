'use client';
import { LoaderIcon } from "lucide-react"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"
import { toast } from "sonner";
import { Button } from "./ui/button";

function SearchIP() {
    const [isSreaching, setIsSearching] = useState(false);
    const handleIsSearching = () => {
        setIsSearching(true);
        toast.success("تم الاتصال بالروبوت");
        // setIsSearching(false);
    }
    return (
        <div className="grid w-full gap-4">
            <InputGroup data-disabled>
                <InputGroupInput placeholder="Add Robot IP..." disabled={isSreaching} />
                {isSreaching && (
                    <InputGroupAddon>
                        <LoaderIcon className="animate-spin" />
                    </InputGroupAddon>
                )}
                {isSreaching && (
                    <InputGroupAddon align="inline-end">
                        <InputGroupText className="text-muted-foreground">
                            Please wait...
                        </InputGroupText>
                    </InputGroupAddon>
                )}
                {!isSreaching && (
                    <Button onClick={handleIsSearching}>Search</Button>
                )}
            </InputGroup>
        </div>
    )
}

export default SearchIP
