import { FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import { IconButton, styled, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";

const SizeTable = (props) => {
  const sizes = props.sizes;

  const IconCell = styled(TableCell)({
    padding: 0,
    height: 48,
    width: 48
  });

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {sizes.length > 0 && (
            sizes.map((size) => (
              <TableRow key={size.size}>
                <TableCell component="th" scope="row">
                  {size.size}
                </TableCell>
                <TableCell>
                  残り{size.quantity}点
                </TableCell>
                <IconCell>
                  {size.quantity > 0 ? (
                    <IconButton>
                      <ShoppingCart />
                    </IconButton>
                  ) : (
                    <div>売り切れ</div>
                  )}
                </IconCell>
                <IconCell>
                  <FavoriteBorder />
                </IconCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SizeTable;