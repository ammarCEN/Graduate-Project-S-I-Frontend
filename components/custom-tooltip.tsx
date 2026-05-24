import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

type CustomTooltipProps = {
    children: React.ReactNode;
    content: React.ReactNode;
    asChild?: boolean;
}

const CustomTooltip = ({ children, content, asChild }: CustomTooltipProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild={asChild}>
                {children}
            </TooltipTrigger>
            <TooltipContent>
                {content}
            </TooltipContent>
        </Tooltip>
    )
}

export default CustomTooltip