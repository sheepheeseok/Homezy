import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const SwiperComponent = () => {
    const imgs = [
        "https://ifh.cc/g/PwPmH3.jpg", // 이미지 1
        "https://ifh.cc/g/shKlmr.jpg", // 이미지 2
    ];

    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]} // 추가: EffectFade 모듈
            autoplay={{ delay: 3000 }}
            pagination={{
                clickable: true,
                dynamicBullets: true,
                renderBullet: (index, className) => (
                    `<span class="${className}" style="background-color: black;"></span>`
                ),
            }}
            loop={true}
            spaceBetween={50}
            effect="fade" // Fade 전환 활성화
            fadeEffect={{ crossFade: true }} // crossFade 설정
            speed={1000} // 전환 속도
            className="swiper-fade" // 클래스 추가
        >
            {imgs.map((image, index) => (
                <SwiperSlide key={index}>
                    <div className="swiper-slide-content">
                        <img src={image} alt={`Slide ${index + 1}`} className="swiper-slide-image" />
                        <div className="overlay-content">
                            <h2 className="slide-title">New Arrivals Item</h2>
                            <div className="slide-box">More View</div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SwiperComponent;
