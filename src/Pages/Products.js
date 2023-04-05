import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ProductApi from "../services/apiCall";
import {
  AddToCart,
  IncrementProduct,
  AddToFavourite,
  RemoveFavourite,
} from "../eCommerceStore";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CartPage from "./CartPage";

const Products = () => {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const { cartProducts } = useSelector((state) => state.cart);
  const { favourites } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    ProductApi.get("/products")
      .then((res) => {
        console.log("data", res.data);
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const PushtoCart = (productItem) => {
    const isContain = cartProducts.some((prod) => {
      return prod.id == productItem.id;
    });
    if (isContain) {
      dispatch(IncrementProduct(productItem.id));
    } else {
      dispatch(AddToCart(productItem));
    }
  };

  const AddToFav = (item) => {
    dispatch(AddToFavourite(item));
    console.log("fav", favourites);
  };
  const hanldeNavigate = () => {
    navigate("/AddtoFavourites");
  };

  const RemoveFromfavourite = (item) => {
    dispatch(RemoveFavourite(item));
  };

  return (
    <div className="productBlock" style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className="Productname">Welcome to Online Shopping</h1>
        <Box sx={{ display: "flex", gap: "2rem" }}>
          <Button onClick={hanldeNavigate} variant="contained" style={{textDecoration: "capitalize !important"}}>
            Go to Favourites page
          </Button>
          <Button onClick={handleClickOpen} variant="contained">
          Move to Cart
          </Button>
        </Box>
      </Box>

      <br />
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2rem",
          padding: "5rem",
        }}
      >
        {list.map((item, index) => {
          return (
            <>
              <Card
                sx={{ display: "grid", gridTemplateColumns: "1fr min-content" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <CardContent sx={{ flex: "1 0 auto", paddingBottom: "10px" }}>
                    <Typography component="div" variant="h5">
                      {item.product}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      {item.description}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      ₹{item.price}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => PushtoCart(item)}
                    >
                      Add to cart
                    </Button>
                    {favourites.some((element) => element.id === item.id) ? (
                      <Button
                        variant="outlined"
                        onClick={() => RemoveFromfavourite(item.id)}
                      >
                        Remove from Favourite
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        onClick={() => AddToFav(item)}
                      >
                        Add to Favourite
                      </Button>
                    )}
                    
                  </Box>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ height: "100%", width: "151px" }}
                  image={item.image}
                  alt="Live from space album cover"
                />
              </Card>
            </>
          );
        })}
      </section>
      {open && <CartPage open={open} close={handleClose} />}
    </div>
  );
};

export default Products;
