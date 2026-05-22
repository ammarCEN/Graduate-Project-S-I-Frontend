
import styles from '@/app/global.module.css';
import { IconType } from 'react-icons/lib';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';

type HeaderComponentProps = {
    title: string;
    description: string;
    icon: IconType;
}

const HeaderComponent = ({ title, description, icon: Icon }: HeaderComponentProps) => {
    return (
        <div className={cn(
            styles.headerTitle,
            "select-none",
            "flex flex-row items-center gap-4",
        )}>
            <Icon size={40} />
            <div className='flex flex-col items-start'>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
        // <div className={cn(
        //     styles.headerTitle,
        //     "select-none",
        //     "flex flex-col gap-1",
        // )}>
        //     <div className='flex gap-2 items-center'>
        //         <Icon size={20} />
        //         <h1>{title}</h1>
        //     </div>
        //     <p>
        //         {description}
        //     </p>
        // </div>
    )
}

export default HeaderComponent