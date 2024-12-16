import { userOrderHistoryColumns } from '@/app/account/user_order_history_columns';
import { UserOrderHistoryTable } from '@/app/account/user_order_history_table';
import { getUserOrders } from '@/services/order_api';
import React, { useEffect, useState } from 'react';

const UserOrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userData = localStorage.getItem('user_data');
        if (userData) {
          const parsedData = JSON.parse(userData);
          console.log(parsedData.id);

          const response = await getUserOrders(parsedData.id);
          setOrders(response);
        }
      } catch (error) {
        console.error('Failed to fetch order history', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <UserOrderHistoryTable columns={userOrderHistoryColumns} data={orders} />
    </div>
  );
};

export default UserOrderHistory;
