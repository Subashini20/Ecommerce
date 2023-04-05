import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IncrementProduct,
  DecrementProduct,
  RemoveProduct,
  ClearCart,
  IncreaseTotalCount,
  ClearTotalCount,
} from "./../eCommerceStore";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "../App.css"
import { useNavigate } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const CartPage = ({ open, close }) => {
  const dispatch = useDispatch();
  const [localData, setLocalData] = useState([]);

  const { totalItems, data, totalCount } = useSelector((storeObj) => ({
    totalItems: storeObj.cart?.cartProducts?.length,
    data: storeObj.cart?.cartProducts,
    totalCount: storeObj.cart?.totalCount,
  }));

  const RemoveProduct = (count, itemIndex) => {
    dispatch(RemoveProduct({ count, itemIndex }));
  };

  const handleIncrement = (item) => {
    dispatch(IncrementProduct(item.id));
  };

  const handleDecrement = (item) => {
    dispatch(DecrementProduct(item.id));
  };

  const ClearFromCart = () => {
    dispatch(ClearCart());
    dispatch(ClearTotalCount());
  };

  const BuyNow = () => {
        alert("Thanks you for your Order. Visit again!!");
        dispatch(ClearCart());
        dispatch(ClearTotalCount());
      
  };

  const handleChange = (e, index) => {
    const count = parseInt(e.target.value);
    dispatch(IncreaseTotalCount({ count, index }));
  };

  return (
    <>
      <BootstrapDialog
        onClose={close}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen
      >
        {/* <BootstrapDialogTitle id="customized-dialog-title"  onClose={close}>
          Modal title
        </BootstrapDialogTitle> */}
        <DialogContent dividers>
          <TableContainer component={Paper}>
            <h1 style={{ textAlign: "center" }}>Cart Page</h1>
            <h2 style={{ textAlign: "center" }}>Total Items: {totalCount}</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Count</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((item, index) => (
                  <TableRow key={`item-${index}-${item.id}`}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img
                        src={item.image}
                        alt={item.title}
                        height={40}
                        width="50px"
                      />
                    </TableCell>
                    <TableCell>
                      <h4 style={{ width: "auto" }}>{item.product}</h4>
                    </TableCell>
                    <TableCell>
                      <p>₹ {item.price}</p>
                    </TableCell>
                    <TableCell>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          className="minusButton"
                          disabled={item.count == 1 ? "true" : false}
                          onClick={() => handleDecrement(item)}
                          style={{ padding: 4, fontSize: 20 }}
                        >
                          -
                        </Button>
                        <span>
                          <input
                            type="number"
                            onChange={(e) => handleChange(e, index)}
                            value={item.count || 1}
                            style={{
                              padding: 8,
                              width: 30,
                              borderRadius: "4px",
                              textAlign: "center",
                            }}
                          />
                        </span>
                        <Button
                          className="plusButton"
                          disabled={totalCount >= 100 ? "true" : false}
                          onClick={() => handleIncrement(item)}
                          style={{ padding: 4, fontSize: 20 }}
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => RemoveProduct(item.count, index)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
        {data.length > 0 ? (
          <Box sx={{ display: "flex",gap:"2rem" }}>
            <Button onClick={BuyNow} variant="contained">
              Buy now
            </Button>
            <Button
              onClick={ClearFromCart}
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Box>
        ) : null}
        </DialogActions>
       
      </BootstrapDialog>
    </>
  );
};

export default CartPage;
