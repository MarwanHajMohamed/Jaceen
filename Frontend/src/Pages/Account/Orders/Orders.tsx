import "./orders.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../../../api/api";
import { Order } from "../../../Context/Order";

export default function Orders() {
  const route = useNavigate();

  // Fetch orders with caching
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    staleTime: 1000 * 60 * 5, // Cache orders for 5 minutes
    refetchOnWindowFocus: false, // Prevent refetching when switching tabs
  });

  return (
    <div className="orders-table">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="order loading">
            <div>
              <div className="order-name"></div>
              <div className="order-quantity"></div>
            </div>
            <div className="order-date"></div>
          </div>
        ))
      ) : !orders || orders.length === 0 ? (
        <div className="empty-orders">
          You have no orders. <a href="/shop/All Products">Browse the shop</a>{" "}
          to place an order!
        </div>
      ) : (
        orders.map((order: Order) =>
          order.items.map((item) => (
            <div className="order" key={item.slug}>
              <div>
                <div
                  className="order-name"
                  onClick={() => route(`/product/${item.slug}`)}
                >
                  {item.name}
                </div>
                <div className="order-quantity">Quantity: {item.quantity}</div>
                <a onClick={() => route(`/product/${item.slug}#reviews`)}>
                  Add a product review
                </a>
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
          ))
        )
      )}
    </div>
  );
}
