import { Button } from './ui/button'
import { MoveUp, MoveDown, MoveLeft, MoveRight, Siren } from "lucide-react";


const NavigationButtons = () => {
    const buttonSize = "";
    return (
        <div className="flex flex-col items-center justify-center gap-4">

            {/* زر التحرك للأعلى */}
            <Button className={buttonSize}>
                <MoveUp />
            </Button>

            {/* صف أزرار اليسار واليمين + زر الطوارئ في الوسط */}
            <div className="flex items-center gap-4">
                <Button className={buttonSize}>
                    <MoveLeft />
                </Button>

                {/* زر الطوارئ في الوسط */}
                <Button className="bg-red-600 hover:bg-red-700 text-white h-full">
                    Emergency Stop <Siren />
                </Button>

                <Button className={buttonSize}>
                    <MoveRight />
                </Button>
            </div>

            {/* زر التحرك للأسفل */}
            <Button className={buttonSize}>
                <MoveDown />
            </Button>

        </div>

    )
}

export default NavigationButtons