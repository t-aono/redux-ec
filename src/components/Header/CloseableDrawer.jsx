import { Add, ExitToApp, History, Person, Search } from "@mui/icons-material";
import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { styled } from "@mui/system";
import { push } from "connected-react-router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { theme } from '../../assets/theme';
import { TextInput } from '../UIkit/index';
import { signOut } from '../../reducks/users/operations';
import { getCollection, getQuery } from "../../firebase";

const CustomNav = styled('nav')({
  [theme.breakpoints.up('sm')]: {
    flexShrink: 0,
    width: 256
  }
});

const DrawerPaper = styled(Drawer)({
  width: 256
});

const SearchField = styled('div')({
  alignItems: 'center',
  display: 'flex',
  marginLeft: 32
});

const CloseableDrawer = (props) => {
  const { container } = props;
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState('');

  const inputKeyword = useCallback((event) => {
    setKeyword(event.target.value);
  }, [setKeyword]);

  const selectMenu = (event, path) => {
    dispatch(push(path));
    props.onClose(event);
  };

  const [filters, setFilters] = useState([
    { func: selectMenu, label: "すべて", id: "all", value: '/' },
    { func: selectMenu, label: "メンズ", id: "male", value: '/?gender=2' },
    { func: selectMenu, label: "レディース", id: "female", value: '/?gender=3' },
  ]);

  const menus = [
    { func: selectMenu, label: '商品登録', icon: <Add />, id: 'register', value: '/product/edit' },
    { func: selectMenu, label: '注文履歴', icon: <History />, id: 'history', value: '/order/history' },
    { func: selectMenu, label: 'プロフィール', icon: <Person />, id: 'profile', value: '/user/mypage' },
  ];

  useEffect(() => {
    const query = getQuery(['categories'], 'order', 'asc');
    const list = [];
    getCollection(query).then(snapshots => {
      snapshots.forEach(snapshot => {
        const category = snapshot.data();
        list.push({ func: selectMenu, label: category.name, id: category.id, value: `/?category=${category.id}` });
      });
      setFilters(prevState => [...prevState, ...list]);
    });
  }, []);

  return (
    <CustomNav>
      <DrawerPaper
        container={container}
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={(e) => props.onClose(e)}
        ModalProps={{ keepMounted: true }}
      >
        <div
          onClose={(e) => props.onClose(e)}
          onKeyDown={(e) => props.onClose(e)}
        >
          <SearchField>
            <TextInput
              fullWidtH={false} label="キーワードを入力" multiline={false} onChange={inputKeyword} required={false} rows={1} value={keyword} type="text" />
            <IconButton>
              <Search />
            </IconButton>
          </SearchField>
          <Divider />
          <List>
            {menus.map(menu => (
              <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)} >
                <ListItemIcon>
                  {menu.icon}
                </ListItemIcon>
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
            {filters.map(filter => (
              <ListItem
                button
                key={filter.id}
                onClick={(e) => filter.func(e, filter.value)}
              >
                <ListItemText primary={filter.label}></ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
      </DrawerPaper >
    </CustomNav>
  );

};

export default CloseableDrawer;