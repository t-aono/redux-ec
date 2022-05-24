import { Favorite, MoreVert, ShoppingCart } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";

const HeaderMenus = () => {
  return (
    <>
      <IconButton>
        <Badge badgeContent={3} color="secondary">
          <ShoppingCart />
        </Badge>
      </IconButton>
      <IconButton>
        <Favorite />
      </IconButton>
      <IconButton>
        <MoreVert />
      </IconButton>
    </>
  );
};

export default HeaderMenus;