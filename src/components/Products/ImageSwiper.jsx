import Swiper from "react-id-swiper";
import NoImage from '../../assets/img/src/no_image.png';
import 'swiper/css/swiper.css';
import { useState } from "react";

const ImageSwiper = (props) => {
  const [params] = useState({
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    loop: true
  });

  const images = props.images;

  return (
    <Swiper {...params}>
      {images.length === 0 ? (
        <div className="p-media__thumb">
          <img src={NoImage} alt="" />
        </div>
      ) : (
        images.map(image => (
          <div key={image.path}>
            <img src={image.path} alt
              ="商品画像" />
          </div>

        ))
      )}
    </Swiper>
  );
};

export default ImageSwiper;