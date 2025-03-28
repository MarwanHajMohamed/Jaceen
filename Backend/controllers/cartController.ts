import { applyCoupon } from "./couponController";

export const checkout = async (
  req: any,
  res: any
) => {
  const { cartItems, couponCode } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ success: false, message: "Cart items are required." });
  }

  const cartTotal = cartItems.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
  );

  try {
    let finalTotal = cartTotal;

    if (couponCode) {
      finalTotal = await applyCoupon(cartTotal, couponCode);
    }

    res.status(200).json({
      success: true,
      total: finalTotal,
      cartSummary: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      }))
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
