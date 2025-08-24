// app/page.tsx (Server Component)
import { SliderSection } from '@/components/slider-section';
import { FormSection } from '@/components/form-section';

// Типы данных
export interface SlideData {
  id: number;
  title: string;
  image: any;
}

// Данные слайдов (можно получать из API/БД)
const slidesData: SlideData[] = [
  {
    id: 1,
    title: "Соберите 5 печатей и получите 6-ой кофе в подарок",
    image: "/images/image_1.png",
  },
  {
    id: 2,
    title: "Авторские напитки - разнообразие каждый день",
    image: "/images/image_3.png",
  },
  {
    id: 3,
    title: "Собирайте печати прямо в приложении",
    image: "/images/image_2.png",
  }
];

export default function CoffeePage() {
  return (
    <div className="min-h-screen bg-white text-white flex flex-col">
      {/* Верхняя часть - слайдер 70% */}
      <div className="h-[65vh]">
        <SliderSection slides={slidesData} />
      </div>

      {/* Нижняя часть - форма 30% */}
      <div className="h-[35vh]">
        <FormSection />
      </div>
    </div>
  );
}