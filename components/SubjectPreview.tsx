import { twMerge } from "tailwind-merge";

interface SubjectPreviewProps {
    subject_title: string;
    gpa: number;
    className?: string;
}

// Interpolating color between red, orange, and green
const getColor = (gpa: number) => {
    if (gpa <= 5) {
        const red = 255;
        const green = Math.floor((gpa / 5) * 165); // interpolate from 0 to 165
        return `rgb(${red}, ${green}, 0)`;
    } else {
        const red = Math.floor(((10 - gpa) / 5) * 255); // interpolate from 255 to 0
        const green = 165 + Math.floor(((gpa - 5) / 5) * 90); // interpolate from 165 to 255
        return `rgb(${red}, ${green}, 0)`;
    }
};

const getGlowColor = (gpa: number) => {
    if (gpa <= 5) {
        const red = 255;
        const green = Math.floor((gpa / 5) * 165);
        return `rgba(${red}, ${green}, 0, 0.5)`;
    } else {
        const red = Math.floor(((10 - gpa) / 5) * 255);
        const green = 165 + Math.floor(((gpa - 5) / 5) * 90);
        return `rgba(${red}, ${green}, 0, 0.5)`;
    }
};

export const SubjectPreview: React.FC<SubjectPreviewProps> = ({
    subject_title,
    gpa,
    className
}) => {
    const color = getColor(gpa);
    const glowColor = getGlowColor(gpa);

    return (
        <a href="#" className={twMerge(`
            border 
            h-14 
            flex 
            items-center 
            hover:scale-105 
            transition-all 
            rounded 
            min-w-96 
            p-2 
            relative
        `, className)}>
            <div className="flex items-center flex-grow">
                <div className="
                    ml-4 
                    flex 
                    items-center 
                    font-semibold 
                    text-lg
                ">
                    {subject_title}
                </div>
                <div className="flex-grow"></div>
                <div className={twMerge(`
                    w-10 
                    h-10 
                    rounded-full 
                    flex 
                    items-center 
                    justify-center
                `)} style={{ backgroundColor: color, boxShadow: `0 0 10px 5px ${glowColor}` }}>
                    <span className="font-bold text-white text-sm">{gpa.toFixed(1)}</span>
                </div>
            </div>
        </a>
    )
};
