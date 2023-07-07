import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ProductList from "./ProductList";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlide";

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();
  // const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch])

  if (status.includes('pending')) return <LoadingComponent message="Loading products..." />

  return (
    <>
      <ProductList products={products} />
    </>
  )
}