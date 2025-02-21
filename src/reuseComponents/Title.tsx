import React from "react";
type TTile = {
  title: string;
  description: string;
};

const Title: React.FC<TTile> = ({ title, description }) => {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-[20px] md:text-[28px] lg:text-[40px]">{title}</h2>
        <p className="text-[14px] lg:text-[18px]">{description}</p>
        <hr className="w-[20%] border-2 border-[#1ABC9C] mx-auto my-[20px]" />
      </div>
    </div>
  );
};

export default Title;
