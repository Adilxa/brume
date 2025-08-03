import Image from 'next/image';
import Image_1 from ".././public/images/cofee_icons/image_1.svg"
import Image_2 from ".././public/images/cofee_icons/image_2.svg"
import Image_3 from ".././public/images/cofee_icons/image_3.svg"
import Image_4 from ".././public/images/cofee_icons/image_4.svg"
import Image_5 from ".././public/images/cofee_icons/image_5.svg"
import Image_6 from ".././public/images/cofee_icons/image_6.png"

interface LoyaltyCardProps {
    userData: {
        cupCount: number;
        maxCups: number;
    };
}

export function LoyaltyCard({ userData }: LoyaltyCardProps) {
    const cupImages = [
        Image_1,
        Image_2,
        Image_3,
        Image_4,
        Image_5,
        Image_6,
    ];

    return (
        <div
            className="rounded-3xl p-8 mb-6"
            style={{ backgroundColor: '#012248' }}
        >
            <div className="grid grid-cols-3 gap-6 mb-8 justify-items-center">
                {Array.from({ length: 6 }, (_, index) => (
                    <div
                        key={index}
                        className="rounded-full flex items-center justify-center overflow-hidden relative"
                        style={{
                            backgroundColor: "#F3F3F3",
                            width: "78px",
                            height: "78px"
                        }}
                    >
                        {index < userData.cupCount && (
                            <Image
                                src={cupImages[index]}
                                alt={`Cup ${index + 1}`}
                                width={78}
                                height={78}
                                className="object-cover"
                            />
                        )}
                    </div>
                ))}
            </div>

            <p
                className="text-white text-center text-base"
                style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400,
                    lineHeight: '1.2'
                }}
            >
                Получите 6-ой кофе в подарок
            </p>
        </div>
    );
}