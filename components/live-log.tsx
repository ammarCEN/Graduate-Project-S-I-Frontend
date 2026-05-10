'use client';

import useConnection from "@/app/providers/api-provider";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";


const LiveLogger = () => {
    const { logs, clearLogs } = useConnection();

    return (
        <Card className="px-6">
            <CardTitle className="font-mono">
                Live logger: {" "}
                <span onClick={clearLogs} className="text-sm text-blue-500 underline cursor-pointer">clear log</span>
            </CardTitle>

            <ScrollArea className="border font-mono h-64 overflow-auto rounded-lg ">
                {logs.map((line, i) => (
                    <div
                        key={i}
                        className="
                            flex
                            even:bg-gray-100 odd:bg-white
                            dark:even:bg-gray-800 dark:odd:bg-transparent"
                    >
                        <span className="w-8 text-right pr-2 text-gray-500">{i + 1}.</span>
                        <span>{line}</span>
                    </div>
                ))}
            </ScrollArea>

        </Card>
    )
}

export default LiveLogger