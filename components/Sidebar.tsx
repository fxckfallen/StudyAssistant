import { twMerge } from "tailwind-merge";

interface SidebarProps {
    children: React.ReactNode;
    className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
    children,
    className
}) => {
    return (
        <div className={twMerge(`h-dvh w-2/5 border`, className)}>
            {children}
        </div>
    )
};