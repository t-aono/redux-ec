import styled from "@emotion/styled";
import HTMLReactParser from "html-react-parser";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../assets/theme";
import { ImageSwiper, SizeTable } from "../components/Products";
import { FirebaseTimestamp, getSnapshot } from "../firebase";
import { addProductToCart } from "../reducks/users/operations";

const SliderBox = styled('div')({
  [theme.breakpoints.down('sm')]: {
    margin: '0 auto 24px auto',
    height: 320,
    width: 320
  },
  [theme.breakpoints.up('sm')]: {
    margin: '0 auto 16px auto',
    height: 400,
    width: 400
  }
});
const Detail = styled('div')({
  textAlign: 'left',
  [theme.breakpoints.down('sm')]: {
    margin: '0 auto 16px auto',
    height: "auto",
    width: 320
  },
  [theme.breakpoints.up('sm')]: {
    margin: '0 auto 16px auto',
    height: "auto",
    width: 400
  }
});
const Price = styled('p')({
  fontSize: 36
});

const ProductDetail = () => {
  const selector = useSelector((state) => state);
  const path = selector.router.location.pathname;
  const id = path.split('/product/')[1];
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    getSnapshot(['products', id]).then(snapshot => {
      const data = snapshot.data();
      setProduct(data);
    });
  }, []);

  const returnCodeToBar = (text) => {
    if (text === "") {
      return text;
    } else {
      return HTMLReactParser(text.replace(/\r?\n/g, '<br>'));
    }
  };

  const addProduct = useCallback((selectedSize) => {
    const timestamp = FirebaseTimestamp.now();
    dispatch(addProductToCart({
      added_at: timestamp,
      description: product.description,
      gender: product.gender,
      images: product.images,
      name: product.name,
      price: product.price,
      productId: product.id,
      quantity: 1,
      size: selectedSize
    }));
  }, [product]);

  return (
    <section className="c-section-wrapin">
      {product && (
        <div className="p-grid__row">
          <SliderBox>
            <ImageSwiper images={product.images} />
          </SliderBox>
          <Detail>
            <h2 className="u-text__headline">{product.name}</h2>
            <Price>{product.price.toLocaleString()}</Price>
            <div className="module-spacer--small"></div>
            <SizeTable addProduct={addProduct} sizes={product.sizes} />
            <div className="module-spacer--small"></div>
            <p>{returnCodeToBar(product.description)}</p>
          </Detail>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;