import React, { useCallback } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { IconButton } from "@mui/material";
import { styled } from "@mui/system";
import {
  deleteImageFile,
  downloadImageUrl,
  getImageRef,
  uploadFile,
} from "../../firebase";
import ImagePreview from "./ImagePreview";

const CustomIconButton = styled(IconButton)({
  height: 48,
  wight: 48,
});

const ImageArea = (props) => {
  const uploadImage = useCallback((event) => {
    const file = event.target.files;
    let blob = new Blob(file, { type: "image/jpeg" });

    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const N = 16;
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
      .map((n) => S[n % S.length])
      .join("");

    const uploadRef = getImageRef(fileName);
    uploadFile(uploadRef, blob).then(() => {
      downloadImageUrl(fileName).then((downloadURL) => {
        const newImage = { id: fileName, path: downloadURL };
        props.setImages((prevState) => [...prevState, newImage]);
      });
    });
  });

  const deleteImage = useCallback(
    async (id) => {
      const ret = window.confirm("この画像を削除しますか？");
      if (!ret) {
        return false;
      } else {
        const newImages = props.images.filter((image) => image.id !== id);
        props.setImages(newImages);
        deleteImageFile(id);
      }
    },
    [props.images]
  );

  return (
    <div>
      <div className="p-grid__list-images">
        {props.images.length > 0 &&
          props.images.map((image) => (
            <ImagePreview
              delete={deleteImage}
              id={image.id}
              path={image.path}
              key={image.id}
            />
          ))}
      </div>
      <div className="u-text-right">
        <span>商品画像を登録する</span>
        <CustomIconButton>
          <label>
            <AddPhotoAlternateIcon />
            <input
              className="u-display-none"
              type="file"
              id="image"
              onChange={(event) => uploadImage(event)}
            />
          </label>
        </CustomIconButton>
      </div>
    </div>
  );
};

export default ImageArea;
