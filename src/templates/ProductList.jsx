import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from '@mui/material/Pagination';
import { fetchProducts, pageChange } from "../reducks/products/operations";
import { getCurrentPage, getMaxPage, getProducts } from "../reducks/products/selectors";
import ProductCard from "./ProductCard";
import { Stack } from "@mui/material";

const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);
  const currentPage = getCurrentPage(selector);
  const maxPage = getMaxPage(selector);
  const countPerPage = 6;
  const [currentProducts, setCurrentProducts] = useState([]);

  const query = selector.router.location.search;
  const gender = /^\?gender=/.test(query) ? Number(query.split('?gender=')[1]) : '';
  const category = /^\?category=/.test(query) ? query.split('?category=')[1] : '';

  useEffect(() => {
    dispatch(fetchProducts(gender, category, countPerPage));
  }, [query]);

  useEffect(() => {
    const list = products.slice(0, products.length);
    setCurrentProducts(list.splice((currentPage - 1) * countPerPage, countPerPage));
  }, [products, currentPage]);

  const handlePageChange = useCallback((event, value) => {
    dispatch(pageChange(value));
  }, []);

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {currentProducts.length > 0 && (
          currentProducts.map(product => (
            <ProductCard key={product.id} id={product.id} images={product.images} name={product.name} price={product.price} />
          ))
        )}
      </div>
      {maxPage > 1 && (
        <Stack direction="column" spacing={3} alignItems="center" mt={5}>
          <Pagination count={maxPage} page={currentPage} onChange={handlePageChange} />
        </Stack>
      )}
    </section>
  );
};

export default ProductList;