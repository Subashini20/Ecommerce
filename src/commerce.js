import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "./eCommerceStore";

const CartPage = () => {
  const dispatch = useDispatch();
  const { totalItems, data } = useSelector(storeObj => {
    return {
      totalItems: storeObj.cart?.length,
      data: storeObj.cart
    }
  })

  const handleRemove = (itemIndex) => {
    dispatch(cartActions.removeFromCart(itemIndex));
  }

  return (
    <div>
      <h1>Cart Page</h1>
      <h2>Total Items: {totalItems}</h2>
      <section style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', borderBottom: '1px solid #cdcdcd', textAlign: 'center', padding: 10 }}>
          <span>#</span>
          <span>Image</span>
          <span>Title</span>
          <span>Description</span>
          <span>Price</span>
          <span>Count</span>
          <span>Action</span>
        </div>
        {
          data?.map((item, index) => {
            return (
              <div key={`item-${index}-${item.id}`} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', borderBottom: '1px solid #cdcdcd', textAlign: 'center', padding: 10 }}>
                <span>{index+1}</span>
                <img src={item.image} alt={item.title} height={40} width='auto' />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>₹ {item.price}</p>
                <span styles={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                  <button style={{ padding: 4, fontSize: 20 }}>-</button>
                  <span>
                    <input value={item.count || 1} style={{ padding: 8, width: 50, textAlign: 'center' }} />
                  </span>
                  <button style={{ padding: 4, fontSize: 20 }}>+</button>
                </span>
                <button onClick={() => handleRemove(index)}>Remove</button>
              </div>
            )
          })
        }
      </section>
    </div>

    
  )
}

export default CartPage;

