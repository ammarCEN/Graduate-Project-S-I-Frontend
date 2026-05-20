'use client';

import useConnection from "@/app/providers/api-provider";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";


const LiveLogger = () => {
    const { logs } = useConnection();

    if (logs.length === 0)
        return <p>No logs!</p>

    return (
        <ScrollArea className="w-full max-h-[50vh] border rounded-lg font-mono">
            {logs.map((line, idx) => (
                <p
                    key={idx}
                    className={cn(
                        "flex w-full",
                        "even:bg-gray-100 odd:bg-white",
                        "dark:even:bg-gray-800 dark:odd:bg-transparent"
                    )}
                >
                    <span className="w-8 shrink-0 text-right pr-2 text-gray-500">
                        {idx + 1}.
                    </span>

                    <span className="min-w-0 break-all whitespace-pre-wrap">
                        {line}
                    </span>
                </p>
            ))}
        </ScrollArea>
    )
}

export default LiveLogger