import { ModeToggle } from "@/components/toggle-theme";

const Header = () => {
    return (
        <span className="flex justify-between item-center items-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wide">Connect to Your Home robot</h1>
            <ModeToggle />
        </span>
    )
}

export default Header