import React, { useEffect, useState } from "react";
import { Filter, Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMyOrders } from "../store/slices/orderSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const { myOrders } = useSelector((state) => state.order);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const orders = [...(myOrders || [])]
    .sort(
      (a, b) =>
        new Date(b.created_at || 0).getTime() -
        new Date(a.created_at || 0).getTime()
    )
    .map((order) => ({
      ...order,
      status: (order.order_status || "Processing").toLowerCase(),
      date: order.created_at,
      items: (order.order_items || []).map((item) => ({
        id: item.order_item_id || item.product_id,
        productId: item.product_id,
        name: item.title,
        image: item.image,
        category: "",
        quantity: item.quantity,
      })),
    }));

  const filtered =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  const iconByStatus = {
    processing: Package,
    shipped: Truck,
    delivered: CheckCircle,
    cancelled: XCircle,
  };

  const colorByStatus = {
    processing: "text-amber-500",
    shipped: "text-blue-500",
    delivered: "text-emerald-500",
    cancelled: "text-red-500",
  };

  return (
    <div className="pt-20 pb-8 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <h1 className="page-title main-highlight">My Orders</h1>
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary border border-border">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent outline-none text-sm"
            >
              <option value="all">All status</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="glass-panel py-8 text-center">
            <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">
              Dillers se confirm hone ke baad aapke orders yahan dikhai denge. Aap shopping karna shuru kar sakte hain.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-5 py-3 rounded-lg gradient-primary text-primary-foreground font-semibold"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((order) => {
              const StatusIcon = iconByStatus[order.status] || Package;
              return (
                <article key={order.id} className="glass-panel p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="font-bold text-foreground">{order.id}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary ${colorByStatus[order.status]}`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-sm font-semibold capitalize">{order.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border space-y-2.5">
                    {(order.items || []).map((item) => (
                      <Link
                        key={item.id}
                        to={item.productId ? `/product/${item.productId}` : "#"}
                        className="flex items-center gap-3 rounded-lg p-2 hover:bg-secondary/60 transition-colors"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm sm:text-base">{item.name}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {item.category} x {item.quantity || 1}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

