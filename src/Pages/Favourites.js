import { useSelector, useDispatch } from "react-redux";
import { RemoveFavourite } from "../eCommerceStore";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Favourites = () => {
  const { favourites } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const RemoveFromfav = (item) => {
    dispatch(RemoveFavourite(item.id));
  };

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mt: "2rem", padding: "2rem" }}>
        <Button onClick={handleNavigate} variant="contained">
          Go to Main page
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
        <h2>See Your Favourite Items</h2>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2rem",
          padding: "2rem",
        }}
      >
        {favourites?.map((item) => (
          <Box item key={`Favourite-item-${item.id}`}>
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
                className="picture"
                style={{ height: "200px", width: "200px" }}
                src={item.image}
                alt={item.title}
              />
              <p>₹ {item.price}</p>
              <Button onClick={() => RemoveFromfav(item)}>
                Remove from Favourite
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Favourites;
