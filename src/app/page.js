import Image from "next/image";
import Header from "./_components/Header";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";

export default async function Home() {
  const categoryList = await GlobalApi.getCategoryList()
  return (
    <div>
      <Header />
      <CategoryList categoryList={categoryList}/>
    </div>
  );
}
