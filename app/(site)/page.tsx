"use client"
import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SubjectPreview } from '@/components/SubjectPreview';

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
}

const generateData = (month: number, year: number) => {
  const daysInMonth = getDaysInMonth(month + 1, year);
  return Array.from({ length: daysInMonth }, (_, index) => ({
    day: index + 1,
    "Средний балл": (Math.random() * 10).toFixed(1), // Генерируем значение от 0.0 до 10.0 с одним десятичным знаком
  })).map(item => ({
    ...item,
    "Средний балл": parseFloat(item["Средний балл"]) // Преобразуем строку обратно в число
  }));
}

const getColor = (value: number) => {
  if (value === 0) return 'red'; // Красный для 0
  if (value === 10) return 'green'; // Зеленый для 10
  const green = Math.floor((value / 10) * 255);
  const red = 255 - green;
  return `rgb(${red}, ${green}, 0)`; // Градиент от красного к зеленому
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    console.log(payload)
    return (
      <div className="bg-black border border-gray-500 p-2 rounded">
        <p>{`День: ${payload[0].payload.day}`}</p>
        <p>{`Средний балл: ${payload[0].value.toFixed(1)}`}</p>
      </div>
    );
  }

  return null;
}

export default function Home() {
  const [date, setDate] = useState(new Date());

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  }

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  }

  const data = generateData(date.getMonth(), date.getFullYear());

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-2 font-bold">
        Средний балл:
      </div>
      <div className="flex items-center justify-center w-full mb-2">
        <button 
          onClick={handlePrevMonth} 
          aria-label="Предыдущий месяц" 
          className="border-none bg-transparent cursor-pointer"
        >
          <FaChevronLeft size={20} />
        </button>
        <span className="mx-2 font-bold">
          {date.toLocaleString('ru-RU', { month: 'long' })} {date.getFullYear()}
        </span>
        <button 
          onClick={handleNextMonth} 
          aria-label="Следующий месяц" 
          className="border-none bg-transparent cursor-pointer"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
      <div className="w-full h-72">
        <ResponsiveContainer width="98%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="colorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                {data.map((item, index) => (
                  <stop
                    key={index}
                    offset={`${(index / (data.length - 1)) * 100}%`}
                    stopColor={getColor(item["Средний балл"])}
                  />
                ))}
              </linearGradient>
            </defs>
            <XAxis dataKey="day" />
            <YAxis domain={[0, 10]} /> {/* Set the Y-axis domain */}
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="Средний балл" 
              stroke="url(#colorGradient)" 
              strokeWidth={2} 
              dot={false} // Убираем точки, если не нужны
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mb-2 font-bold">
        Лучшие предметы:
      </div>
      <div className='grid grid-cols-3 gap-4'>
      <SubjectPreview subject_title='math' gpa={10}/>
      <SubjectPreview subject_title='math' gpa={1}/>
      <SubjectPreview subject_title='math' gpa={5}/>
      <SubjectPreview subject_title='math' gpa={4}/>
      <SubjectPreview subject_title='math' gpa={7}/>
      <SubjectPreview subject_title='math' gpa={8}/>

      </div>
    </div>
  );
}
