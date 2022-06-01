import React, { useCallback, useEffect, useState } from "react";
import { Add, ExitToApp, History, Person, Search } from "@mui/icons-material";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../../assets/theme";
import { TextInput } from "../UIkit/index";
import { signOut } from "../../reducks/users/operations";
import { getCollection, getQuery } from "../../firebase";
import {
  fetchProducts,
  searchProduct,
} from "../../reducks/products/operations";
import { getPerPage } from "../../reducks/products/selectors";
import { ProductsState } from "../../reducks/products/types";
import { OnMenuClose, MenuEvent } from "./types";

const CustomNav = styled("nav")({
  [theme.breakpoints.up("sm")]: {
    flexShrink: 0,
    width: 256,
  },
});

const DrawerPaper = styled(Drawer)({
  width: 256,
});

const SearchField = styled("div")({
  alignItems: "center",
  display: "flex",
  marginLeft: 32,
});

const CloseableDrawer = (props: { open: boolean; onClose: OnMenuClose }) => {
  const dispatch: any = useDispatch();

  const [keyword, setKeyword] = useState("");

  const inputKeyword = useCallback(
    (event: MenuEvent) => {
      setKeyword((event.target as HTMLInputElement).value);
    },
    [setKeyword]
  );

  const selectMenu = (event: MenuEvent, path: string) => {
    dispatch(push(path));
    props.onClose(event);
  };

  const [filters, setFilters] = useState([
    { func: selectMenu, label: "すべて", id: "all", value: "/" },
    { func: selectMenu, label: "メンズ", id: "male", value: "/?gender=2" },
    {
      func: selectMenu,
      label: "レディース",
      id: "female",
      value: "/?gender=3",
    },
  ]);

  const menus = [
    {
      func: selectMenu,
      label: "商品登録",
      icon: <Add />,
      id: "register",
      value: "/product/edit",
    },
    {
      func: selectMenu,
      label: "注文履歴",
      icon: <History />,
      id: "history",
      value: "/order/history",
    },
    // { func: selectMenu, label: 'プロフィール', icon: <Person />, id: 'profile', value: '/user/mypage' },
  ];

  const selector = useSelector((state: ProductsState) => state);
  const perPage = getPerPage(selector);

  const onClickSearch = useCallback((keyword: string) => {
    if (keyword) {
      dispatch(searchProduct(keyword));
    } else {
      dispatch(fetchProducts("", "", perPage));
    }
  }, []);

  useEffect(() => {
    const query = getQuery("categories", [], "order", "asc");
    const list: {
      func: (event: MenuEvent, path: string) => void;
      label: string;
      id: string;
      value: string;
    }[] = [];
    getCollection(query).then((snapshots) => {
      snapshots.forEach((snapshot) => {
        const category = snapshot.data() as { id: string; name: string };
        list.push({
          func: selectMenu,
          label: category.name,
          id: category.id,
          value: `/?category=${category.id}`,
        });
      });
      setFilters((prevState) => [...prevState, ...list]);
    });
  }, []);

  return (
    <CustomNav>
      <DrawerPaper
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={(e: MenuEvent) => props.onClose(e)}
        ModalProps={{ keepMounted: true }}
      >
        <SearchField>
          <TextInput
            fullWidth={false}
            label="キーワードを入力"
            multiline={false}
            onChange={inputKeyword}
            required={false}
            rows={1}
            value={keyword}
            type="text"
          />
          <IconButton onClick={() => onClickSearch(keyword)}>
            <Search />
          </IconButton>
        </SearchField>
        <Divider />
        <div onKeyDown={(e) => props.onClose(e)}>
          <List>
            {menus.map((menu) => (
              <ListItem
                button
                key={menu.id}
                onClick={(e: MenuEvent) => menu.func(e, menu.value)}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem button key="logout" onClick={() => dispatch(signOut())}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
          <Divider />
          <List>
            {filters.map((filter) => (
              <ListItem
                button
                key={filter.id}
                onClick={(e: MenuEvent) => filter.func(e, filter.value)}
              >
                <ListItemText primary={filter.label}></ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
      </DrawerPaper>
    </CustomNav>
  );
};

export default CloseableDrawer;
