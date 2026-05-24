'use client';

import { ArrowDown, ChevronDownIcon, VolumeOffIcon } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ButtonGroup } from "./ui/button-group";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import SearchIP from "./searchIP";
import { SAQI } from "@/lib/saqi.index";
import SAQIConnectBtn from "./saqi-connect-btn";
import useConnection from "@/app/providers/api-provider";

const ConnectSystem = () => {
    const { isConnected, apiBase } = useConnection();
    return (
        <ButtonGroup>

            <SAQIConnectBtn />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="pl-2!">
                        <ChevronDownIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-min">
                    {isConnected && (
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>
                                Connected via {apiBase}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                        </DropdownMenuGroup>
                    )}


                    <DropdownMenuGroup>
                        <ConnectExternalIPDomainDialog />
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </ButtonGroup>
    )
}

const ConnectExternalIPDomainDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='ghost'>
                    <SAQI.Icons.System.ConnectOnline />
                    Connect Remotely
                </Button>
            </DialogTrigger>
            <DialogContent className="!max-w-[80%]">

                <DialogHeader>
                    <DialogTitle>
                        Connect Remotely
                    </DialogTitle>
                    <DialogDescription>
                        Enables remote interaction with SAQI from anywhere using the internet.
                    </DialogDescription>
                </DialogHeader>

                <SearchIP />

            </DialogContent>
        </Dialog>
    )
}

export default ConnectSystem