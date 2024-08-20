import React, { useEffect, useState } from "react";
import { useGetOrders } from "../api/OrdersApi";
import { useSelector } from "react-redux";
import OrderCard from "@/components/OrderCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import OrderTabs from "@/components/OrdersTab";

const OrdersPage = () => {
  const { user } = useSelector((state) => state.user);
  const [status, setStatus] = useState("pending");
  const [orders, setOrders] = useState(null);

  // Fetch orders using custom hook
  const {
    orders: apiOrders,
    isLoading,
    refetch: refetchOrders,
  } = useGetOrders(user._id, status);

  // Handle tab change event
  const handleTabChange = (newStatus) => {
    setStatus(newStatus);
  };

  // Effect to update orders when apiOrders changes
  useEffect(() => {
    if (apiOrders) {
      setOrders(apiOrders);
    }
  }, [apiOrders]);

  // Effect to refetch orders when status changes
  useEffect(() => {
    // Call the refetchOrders function when status changes
    refetchOrders(user._id, status);
  }, [status]);

  // Conditional rendering of loading state
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Render the OrdersPage UI
  return (
    <div className="container mx-auto mt-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>My Orders</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <OrderTabs onTabChange={handleTabChange} />

      {/* Conditional rendering based on orders state */}
      {orders && orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrdersPage;
