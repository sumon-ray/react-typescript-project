import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import Title from "../../reuseComponents/Title";
const Testimonial = () => {
  const data = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s",
      name: "John Doe",
      occupation: "Web Developer",
      description:
        "John's experience with this service was amazing! It helped me improve my web development skills and grow my career. Highly recommended!",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5H6VJoq2WSrMmhsZdkktksAU5ExMMSwOinA&s",
      name: "Jane Smith",
      occupation: "UI/UX Designer",
      description:
        "I was able to enhance my design skills significantly. The support was outstanding, and the tools provided were extremely useful.",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZkM9oXTJgOTzoJHzvC0wj6ZKJ5RI4EaHbOQfYHo9R5Ad7haKw_dNVxf6kpmkq1tAZyls&usqp=CAU",
      name: "Sam Brown",
      occupation: "Project Manager",
      description:
        "This platform helped me streamline project management tasks and improve team collaboration. It’s a great tool for any project manager.",
    },
  ];

  return (
    <div className="my-[100px]">
      <Title title="Testimonial" description="This is client review" />
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow]}
        className="mySwiper"
      >
        {data &&
          data.map((item) => (
            <SwiperSlide key={item.name}>
              <div className="w-[100%] lg:w-[60%] mx-auto">
                <div className="flex items-center gap-[30px] mb-[20px]">
                  <div>
                    <img
                      className="w-[50px] h-[50px] rounded-full object-cover border-2 border-[#1ABC9C]"
                      src={item.image}
                      alt=""
                    />
                  </div>
                  <div>
                    <h5>{item.name}</h5>
                    <p className="text-[#1ABC9C]">{item.occupation}</p>
                  </div>
                </div>
                <div>
                  <p>{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
