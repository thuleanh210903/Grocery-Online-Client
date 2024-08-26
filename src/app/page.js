import Image from "next/image";
import Header from "./_components/Header";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";

export default async function Home() {
  const categoryList = await GlobalApi.getCategoryList()
  const productList = await GlobalApi.getProductList()
  return (
    <div className="pl-20">
      <Header />
      <CategoryList categoryList={categoryList}/>
      <ProductList productList = {productList} />
    </div>
  );
}
