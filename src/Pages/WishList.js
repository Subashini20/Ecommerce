import { useSelector, useDispatch } from "react-redux";
import { wishListRemoved } from "../eCommerceStore";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const WishList = () => {
  const { wishList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromWishList = (item) => {
    dispatch(wishListRemoved(item.id));
  };

  const handleNavigate = () => {
    navigate("/products");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mt: "2rem", padding: "2rem" }}>
        <Button onClick={handleNavigate} variant="contained">
          Product Page
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <h2>WishList Products</h2>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2rem",
          padding: "2rem",
        }}
      >
        {wishList?.map((item) => (
          <Box item key={`wishlist-item-${item.id}`}>
            <Box
              sx={{
                border: "1px solid #cdcdcd",
                textAlign: "center",
                padding: 2,
              }}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <img
                className="productImage"
                style={{ height: "200px", width: "200px" }}
                src={item.image}
                alt={item.title}
              />
              <p>₹ {item.price}</p>
              <Button onClick={() => handleRemoveFromWishList(item)}>
                Remove from Wishlist
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WishList;
