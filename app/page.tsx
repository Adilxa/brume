// app/page.tsx (Server Component)
import { SliderSection } from '@/components/slider-section';
import { FormSection } from '@/components/form-section';
import Image_1 from ".././public/images/image_1.png";
import Image_2 from ".././public/images/image_2.png"

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
    image: Image_1,
  },
  {
    id: 2,
    title: "Собирайте печати прямо в приложении",
    image: Image_2,
  },
  {
    id: 3,
    title: "Скидка 20% на все напитки по выходным",
    image: Image_2,
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