import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
const TopCategoryList = ({categoryList}) => {
  return (
    <div className="flex gap-5 pt-5 overflow-auto mx-7 md:mx-20 justify-center ">
    {categoryList.map((category, index) => (
      <Link href={"/product-category/"+category.attributes.name}>
      <div className="flex flex-col items-center bg-green-50 gap-2 p-4 rounded-lg group cursor-pointer hover:bg-green-600 w-[150px] min-w-[100px]">
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
      </div></Link>
    ))}
  </div>
  )
}

export default TopCategoryList