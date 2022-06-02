import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import { fetchProducts, pageChange } from "../reducks/products/operations";
import {
  getCurrentPage,
  getMaxPage,
  getProducts,
} from "../reducks/products/selectors";
import ProductCard from "./ProductCard";
import { Stack } from "@mui/material";
import { getPerPage } from "../reducks/products/selectors";

const ProductList = () => {
  const dispatch: any = useDispatch();
  const selector = useSelector((state: any) => state);
  const products = getProducts(selector);
  const currentPage = getCurrentPage(selector);
  const maxPage = getMaxPage(selector);
  const perPage = getPerPage(selector);
  const [currentProducts, setCurrentProducts] = useState([]);

  const query = selector.router.location.search;
  const gender = /^\?gender=/.test(query)
    ? Number(query.split("?gender=")[1])
    : "";
  const category = /^\?category=/.test(query)
    ? query.split("?category=")[1]
    : "";

  useEffect(() => {
    dispatch(fetchProducts(gender, category, perPage));
  }, [query]);

  useEffect(() => {
    const list = products.slice(0, products.length);
    setCurrentProducts(list.splice((currentPage - 1) * perPage, perPage));
  }, [products, currentPage]);

  const handlePageChange = useCallback((event, value) => {
    dispatch(pageChange(value));
  }, []);

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {currentProducts.length > 0 &&
          currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              images={product.images}
              name={product.name}
              price={product.price}
            />
          ))}
      </div>
      {maxPage > 1 && (
        <Stack direction="column" spacing={3} alignItems="center" mt={5}>
          <Pagination
            count={maxPage}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      )}
    </section>
  );
};

export default ProductList;
