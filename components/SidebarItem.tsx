import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
    children: React.ReactNode;
    className?: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
    children,
    className
}) => {
    return (
        <a href="#" className={twMerge(`
            border 
            h-14 
            flex 
            items-center 
            m-4 
            hover:scale-105 
            transition-all 
            rounded
        `, className)}>
            <div className="
                ml-4 
                flex 
                items-center 
                font-semibold 
                text-lg
            ">
                {children}
            </div>
        </a>
    )
};