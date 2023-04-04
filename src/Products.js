import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import apiCall from "./services/apiCall";
import { cartActions } from "./eCommerceStore";

const Products = () => {
  const [list, setList] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    apiCall.get('/products')
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const handleClick = (productItem) => {
    dispatch(cartActions.addToCart(productItem));
  }
  const Wishlist =(item)=> {
        let fav=[];
        fav.push(item);
        console.log(fav);
         const favOBj = {
          id: item.id,
          title: item.title,
          description: item.decription,
          price:item.price
        }
        fav.some(element => {
          if (element.id === item.id) 
        apiCall.post("/favourites", JSON.stringify(favOBj),{
          headers: {
            "Content-Type" : "application/json"
          }
        })
      })
       
  }

  return (
    <div>
      <h1>Products</h1>
      <section style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
      {
        list.map((item, index) => {
          return (
              <div key={item.id} style={{ border: '1px solid #cdcdcd', margin: 2, textAlign: 'center', padding: 10 }}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <img src={item.image} alt={item.title} />
                <p>₹ {item.price}</p>
                <button onClick={() => handleClick(item)}>Add to Cart</button>
                {item.fav == false ?<button onClick={()=> Wishlist(item)}>Add to Wishlist</button> :
                <button>Remove</button>}
              </div>
            )
        })
      }
      </section>
    </div>
  )
}

export default Products;