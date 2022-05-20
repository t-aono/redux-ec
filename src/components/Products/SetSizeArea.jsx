import { useCallback, useMemo, useState } from "react";
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import { styled } from "@mui/system";
import { Edit } from "@mui/icons-material";
import { TextInput } from "../UIkit";

const CustomIconButton = styled(IconButton)({
  float: "right",
  height: 48,
  width: 48
});


const SetSizeArea = (props) => {
  const [index, setIndex] = useState(0),
    [size, setSize] = useState(''),
    [quantity, setQuantity] = useState(0);

  const inputSize = useCallback((event) => {
    setSize(event.target.value);
  }, [setSize]);

  const inputQuantity = useCallback((event) => {
    setQuantity(event.target.value);
  }, [setQuantity]);

  const addSize = (index, size, quantity) => {
    if (size === '' || quantity === 0) {
      return false;
    } else {
      if (index === props.sizes.length) {
        props.setSizes(prevState => [...prevState, { size, quantity }]);
        setIndex(index + 1);
        setSize('');
        setQuantity(0);
      } else {
        const newSizes = props.sizes;
        newSizes[index] = { size, quantity };
        props.setSizes(newSizes);
        setIndex(newSizes.length);
        setSize('');
        setQuantity(0);
      }
    }
  };

  const editSize = (index, size, quantity) => {
    setIndex(index);
    setSize(size);
    setQuantity(quantity);
  };

  const deleteSize = (deleteIndex) => {
    const newSizes = props.sizes.filter((_, i) => i !== deleteIndex);
    props.setSizes(newSizes);
  };

  useMemo(() => {
    setIndex(props.sizes.length);
  }, [props.sizes.length]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell >サイズ</TableCell>
              <TableCell>数量</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sizes.length > 0 && (
              props.sizes.map((item, i) => (
                <TableRow key={item.size}>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => editSize(i, item.size, item.quantity)}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => deleteSize(i)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Box sx={{ display: 'flex' }}>
          <TextInput
            fullWidth={false} label={"サイズ"} multiline={false} required={true} rows={1} onChange={(event) => inputSize(event)} value={size} type={"text"}
          />
          <TextInput
            fullWidth={false} label={"数量"} multiline={false} required={true} rows={1} onChange={(event) => inputQuantity(event)} value={quantity} type={"number"}
          />
        </Box>
        <CustomIconButton onClick={() => addSize(index, size, quantity)}>
          <CheckCircle />
        </CustomIconButton>
      </TableContainer>
    </div>
  );
};

export default SetSizeArea;