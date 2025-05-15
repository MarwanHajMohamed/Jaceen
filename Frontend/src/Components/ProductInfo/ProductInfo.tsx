export default function ProductInfo({
  name,
  price,
  category,
  quantity,
  addSubtractItems,
  addToCartHandler,
}: {
  name: string;
  price: number;
  category: string;
  quantity: number;
  addSubtractItems: (action: string) => void;
  addToCartHandler: () => void;
}) {
  return (
    <>
      <div className="product-name">{name}</div>
      <div className="product-price">£{price.toFixed(2)}</div>
      <div className="product-category">{category}</div>
      <div className="quantity-container">
        <button
          className={quantity === 0 ? "disabled" : ""}
          onClick={() => addSubtractItems("minus")}
        >
          <i className="fa-solid fa-minus"></i>
        </button>
        <div className="counter">{quantity}</div>
        <button onClick={() => addSubtractItems("add")}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="add-to-basket">
        <button onClick={addToCartHandler}>Add to basket</button>
      </div>
    </>
  );
}
