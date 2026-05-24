
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
            <Icon className='' size={40} />
            <div className={cn(
                'flex flex-col items-start',
                'shimmer shimmer-angle-15 shimmer-spread-150 shimmer-duration-3000 shimmer-repeat-delay-3000',
            )}>
                <h1 className=''>{title}</h1>
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