'use client';

import { IconPhotoOff } from "@tabler/icons-react"
import { RefreshCcwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import useConnection from "@/app/providers/api-provider";

function NoCameraFeed({ onRefresh }: { onRefresh: () => void }) {
    const { isConnected } = useConnection();
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <IconPhotoOff />
                </EmptyMedia>
                <EmptyTitle>No Camera feed</EmptyTitle>
                <EmptyDescription>
                    You&apos;re not connected yet, or no coming feed. Try to refresh.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button disabled={!isConnected} variant="outline" size="sm" onClick={onRefresh}>
                    <RefreshCcwIcon />
                    Refresh
                </Button>
            </EmptyContent>
        </Empty>
    )
}

export default NoCameraFeed;
