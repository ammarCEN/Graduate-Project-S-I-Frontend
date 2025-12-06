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
import StatusIndicator from "./status-indicator";
import useConnection from "@/app/providers/api-provider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card } from "./ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

function SearchIP() {
    const { setApiBase, setConnected, connected } = useConnection();

    const [isSearching, setIsSearching] = useState(false);

    const [protocol, setProtocol] = useState("http");
    const [ip, setIp] = useState("");
    const [port, setPort] = useState("8000");

    const handleConnect = async () => {
        setIsSearching(true);

        if (!ip.trim() || !port.trim()) {
            toast.error("Please enter valid IP and Port");
            setIsSearching(false);
            return;
        }

        const base = `${protocol}://${ip}:${port}`;

        try {
            const res = await fetch(`${base}/`);

            if (!res.ok) throw new Error("Bad response");

            setApiBase(base);
            setConnected(true);
            toast.success("Robot now is connected");
        } catch {
            toast.error("Failed to connect");
            // setConnected(false);
        }

        setIsSearching(false);
    };

    return (
        <Card>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleConnect();
                }}
            >
                <div className="flex flex-wrap items-center w-full gap-2 px-4 lg:px-6">
                    {/* PROTOCOL SELECT */}
                    <Select value={protocol} onValueChange={setProtocol}>
                        <SelectTrigger className="w-full md:flex-1">
                            <SelectValue placeholder="http" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="http">http</SelectItem>
                            <SelectItem value="https">https</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* IP */}
                    <InputGroup className="w-full md:flex-4">
                        <InputGroupInput
                            placeholder="192.168.8.183"
                            disabled={isSearching}
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                        />
                    </InputGroup>

                    {/* PORT */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <InputGroup className="w-full md:flex-1">
                                <InputGroupInput
                                    placeholder="Port NO."
                                    disabled={isSearching}
                                    value={port}
                                    onChange={(e) => setPort(e.target.value)}
                                />
                            </InputGroup>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Port Number</p>
                        </TooltipContent>
                    </Tooltip>

                    {/* Connect Button */}
                    {!isSearching && (
                        <Button>
                            Connect
                        </Button>
                    )}

                    {isSearching && (
                        <Button disabled>
                            <LoaderIcon className="animate-spin" />
                        </Button>
                    )}
                    <StatusIndicator className="border p-2 rounded-lg" connected={connected} />
                </div>
            </form>
        </Card>
    );
}

export default SearchIP
