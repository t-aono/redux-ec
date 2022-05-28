import { Typography } from "@mui/material";
import { push } from "connected-react-router";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { GreyButton } from "../components/UIkit";

const FavoriteList = () => {
  const dispatch = useDispatch();

  const backToHome = useCallback(() => {
    dispatch(push('/'));
  }, []);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">ご購入完了</h2>
      <div className="module-spacer--medium"></div>
      <Typography color="textSecondary" component="p">
        ご購入ありがとうございました。
      </Typography>
      <div className="module-spacer--medium"></div>
      <GreyButton label="ショッピングを続ける" onClick={backToHome} />
    </section>
  );
};


export default FavoriteList;