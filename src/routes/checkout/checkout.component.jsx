import { useContext, useEffect } from 'react'
import { CartContext } from '../../contexts/cart.context'
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {
  const {
    setIsCartOpen,
    cartItems,
    cartTotal,
  } = useContext(CartContext);

  useEffect(() => {
    setIsCartOpen(false)
  }, [])

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Total>Total: ${cartTotal}</Total>
    </CheckoutContainer>
  );
}

export default Checkout
