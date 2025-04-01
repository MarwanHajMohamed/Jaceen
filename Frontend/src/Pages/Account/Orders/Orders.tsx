import "./orders.css";
import { useEffect, useState } from "react";
import { fetchOrders } from "../../../api/api";
import { Order } from "../../../Context/Order";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const route: NavigateFunction = useNavigate();

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      const data = await fetchOrders();

      setOrders(data);
      setLoading(false);
    };

    loadOrders();
  }, []);

  return (
    <div className="orders-table">
      {loading && orders.length === 0 ? (
        Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="order loading">
            <div>
              <div className="order-name"></div>
              <div className="order-quantity"></div>
            </div>
            <div className="order-date"></div>
          </div>
        ))
      ) : orders.length === 0 ? (
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
