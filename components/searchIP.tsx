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
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

function SearchIP() {
    const { setApiBase, setIsConnected, isConnected, addLog } = useConnection();

    const [isSearching, setIsSearching] = useState(false);
    const [isPorted, setIsPorted] = useState(false);

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

        let base;
        if (isPorted) {
            base = `${protocol}://${ip}:${port}`;
        }
        else {
            base = `${protocol}://${ip}`;
        }
        // toast.info(`Entered URL is: ${base}`);
        addLog({ "Trying to connect": base });

        try {
            const res = await fetch(`${base}/`);

            if (!res.ok) throw new Error("Bad response");

            setApiBase(base);
            setIsConnected(true);
            toast.success("Robot now is connected");
            addLog({ "Robot Connection Status": "Robot now is connected" });

        } catch {
            toast.error("Failed to connect");
            addLog({ "Robot Connection Status": "Failed to connect" });
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
                <div className="flex flex-wrap justify-between items-center w-full gap-2 px-4 lg:px-6">

                    {process.env.NEXT_PUBLIC_API_BASE && (
                        <>
                            <Label className="font-mono">
                                {process.env.NEXT_PUBLIC_API_BASE}
                            </Label>
                        </>
                    )}

                    {!process.env.NEXT_PUBLIC_API_BASE && (
                        <>
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
                                    placeholder={isPorted ? "192.168.8.183 or localhost" : "backend-service-example.com"}
                                    disabled={isSearching}
                                    value={ip}
                                    onChange={(e) => setIp(e.target.value)}
                                />
                            </InputGroup>

                            {/* PORT */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <InputGroup className="w-full md:flex-1 pr-4 min-w-50 items-center">
                                        <InputGroupInput
                                            placeholder="Port NO."
                                            disabled={isSearching || !isPorted}
                                            value={port}
                                            onChange={(e) => setPort(e.target.value)}
                                        />
                                        <div className="flex gap-2">
                                            <Checkbox
                                                id="ported"
                                                checked={isPorted}
                                                onCheckedChange={(val) => setIsPorted(Boolean(val))}
                                            />
                                            <label
                                                htmlFor="ported"
                                                className="text-sm font-medium leading-none cursor-pointer"
                                            >
                                                Enable Port
                                            </label>
                                        </div>
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
                        </>
                    )}

                    {/* Status Indicator */}
                    <StatusIndicator className="border p-2 rounded-lg" connected={isConnected} />
                </div>
            </form>
        </Card>
    );
}

function searchForURL() {
    return
}

export default SearchIP
