import { AppBar, styled, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import logo from '../../assets/img/src/logo.png';
import { getIsSignedIn } from "../../reducks/users/selectors";
import HeaderMenus from "./HeaderMenus";
import { CloseableDrawer } from "./index";
import { useCallback, useState } from "react";

const Root = styled('div')({
  flexGrow: 1
});

const CustomAppBar = styled(AppBar)({
  backgroundColor: "#fff",
  color: '#444'
});

const CustomToolbar = styled(Toolbar)({
  margin: '0 auto',
  maxWidth: 1024,
  width: '100%',
});

const IconButtons = styled('div')({
  margin: '0 0 0 auto'
});

const Header = () => {
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback((event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(!open);
  }, [setOpen, open]);

  return (
    <Root>
      <CustomAppBar position='fixed'>
        <CustomToolbar>
          <img src={logo} alt="logo" width="128px" onClick={() => dispatch(push('/'))} />
          {isSignedIn && (
            <IconButtons>
              <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
            </IconButtons>
          )}
        </CustomToolbar>
      </CustomAppBar>
      <CloseableDrawer open={open} onClose={handleDrawerToggle} />
    </Root>
  );
};

export default Header;