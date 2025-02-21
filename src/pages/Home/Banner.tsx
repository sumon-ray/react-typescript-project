import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "../../assets/images/cycle1.png";
import img2 from "../../assets/images/cycle2.png";
import img3 from "../../assets/images/cycle3.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./slider.css";
const Banner = () => {
  const slideData = [
    {
      title: "Mountain Explorer 500",
      description:
        "A durable mountain bike with 21-speed Shimano gears, front suspension, and all-terrain tires. Perfect for off-road adventures.",
      image: img1,
    },
    {
      title: "City Cruiser Pro",
      description:
        "A lightweight city bike designed for urban commuting with a comfortable seat, basket, and a stylish frame.",
      image: img2,
    },
    {
      title: "Speedster Racer X",
      description:
        "A high-performance racing bike with aerodynamic design, carbon fiber frame, and advanced gear system for speed enthusiasts.",
      image: img3,
    },
  ];

  return (
    <div className="mt-[20px]">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        spaceBetween={50}
        slidesPerView={1}
      >
        {slideData.map((item) => {
          return (
            <SwiperSlide key={item.title}>
              <div className={`sliderBg lg:p-[30px] p-[10px]`}>
                <div className="lg:flex justify-between items-center gap-[25px]">
                  <div className="lg:w-[50%] space-y-8">
                    <h2 className="lg:text-[40px] text-[25px] text-white">
                      {item.title}
                    </h2>
                    <p className="lg:text-[18px] text-[12px] text-white">
                      {item.description}
                    </p>
                    <button className="border border-[#1ABC9C] py-[8px] px-[30px] cursor-pointer hover:bg-[#1ABC9C] text-[#fff]">
                      Bye Now
                    </button>
                  </div>
                  <div className="lg:w-[50%] flex justify-center items-center">
                    <img
                      className="lg:h-[400px] w-full object-contain"
                      src={item.image}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Banner;
