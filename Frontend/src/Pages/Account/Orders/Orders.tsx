import "./orders.css";
import { useEffect, useState } from "react";
import { fetchOrders } from "../../../api/api";
import { Order } from "../../../Context/Order";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const route: NavigateFunction = useNavigate();

  useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchOrders();

      setOrders(data);
    };

    loadOrders();
  }, []);

  return (
    <div className="orders-table">
      {orders.length === 0 ? (
        <div className="empty-orders">
          You have no orders. <a href="/shop/All Products">Browse the shop</a>{" "}
          to place an order!
        </div>
      ) : (
        orders.map((order) => {
          return order.items.map((item) => {
            return (
              <div className="order">
                <div>
                  <div
                    className="order-name"
                    onClick={() => route(`/product/${item.slug}`)}
                  >
                    {item.name}
                  </div>
                  <div className="order-quantity">
                    Quantity: {item.quantity}
                  </div>
                </div>
                <div>
                  <div className="order-createdAt">
                    Ordered:{" "}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-US")
                      : "N/A"}
                  </div>
                </div>
              </div>
            );
          });
        })
      )}
    </div>
  );
}
