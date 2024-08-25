import React from "react";
import Image from "next/image";

const CategoryList = ({ categoryList }) => {
  console.log(categoryList);
  return (
    <div className="mt-5">
      <h2 className="text-green-600 font-bold text-2xl">Shop by category</h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5">
        {categoryList.map((category, index) => (
          <div className="flex flex-col items-center bg-green-50 gap-2 p-4 rounded-lg group cursor-pointer hover:bg-green-100">
            {category?.attributes?.icon?.data?.map((icon, iconIndex) => {
              const iconUrl = icon?.attributes?.url;
              const fullIconUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${iconUrl}`;
              return (
                <Image
                  key={iconIndex}
                  src={fullIconUrl}
                  alt={`icon-${iconIndex}`}
                  width={50}
                  height={50}
                  unoptimized={true}
                  className="hover:scale-125 transition-all ease-in-out"
                />
              );
            })}
            <h2 className="text-green-800">{category?.attributes?.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
