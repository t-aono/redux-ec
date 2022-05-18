import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const useStyles = makeStyles({
  icon: {
    height: 48,
    wight: 48
  }
});

const ImageArea = (props) => {
  const classes = useStyles();

  return (
    <div>
      <div className="u-text-right">
        <span>商品画像を登録する</span>
        <IconButton className={classes.icon}>
          <label>
            <AddPhotoAlternateIcon />
            <input className="u-display-none" type="file" id="image" />
          </label>
        </IconButton>
      </div>
    </div>
  );
};

export default ImageArea;