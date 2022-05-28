import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from '@mui/material/Pagination';
import { fetchProducts, pageChange } from "../reducks/products/operations";
import { getCurrentPage, getProducts } from "../reducks/products/selectors";
import ProductCard from "./ProductCard";
import { Stack } from "@mui/material";

const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);
  const currentPage = getCurrentPage(selector);
  const countPerPage = 2;
  const [maxPage, setMaxPage] = useState(0);

  const query = selector.router.location.search;
  const gender = /^\?gender=/.test(query) ? Number(query.split('?gender=')[1]) : '';
  const category = /^\?category=/.test(query) ? query.split('?category=')[1] : '';

  useEffect(() => {
    dispatch(fetchProducts(gender, category));
  }, [query]);

  useEffect(() => {
    setMaxPage(Math.ceil((products.length / countPerPage)));
  }, [products, countPerPage]);

  const handlePageChange = useCallback((event, value) => {
    dispatch(pageChange(value));
  }, []);

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {products.length > 0 && (
          products.map(product => (
            <ProductCard key={product.id} id={product.id} images={product.images} name={product.name} price={product.price} />
          ))
        )}
      </div>
      <Stack direction="column" spacing={3} alignItems="center" mt={5}>
        <Pagination count={maxPage} page={currentPage} onChange={handlePageChange} />
      </Stack>
    </section>
  );
};

export default ProductList;