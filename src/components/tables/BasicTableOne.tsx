"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface Order {
  id: number;
  productImage: string;
  title: string;
  orderNo: string;
  quantity: number;
  price: number;
  customer: {
    name: string;
    address: string;
    phone: string;
  };
}

const tableData: Order[] = [
  {
    id: 1,
    productImage: "/images/gamepad.png",
    title: "H1 Gamepad",
    orderNo: "3213A",
    quantity: 2,
    price: 1400,
    customer: {
      name: "Md Amir Hamza Nirob",
      address: "House 15, Road 12, 3rd Floor, Apt B3, Mohakhali, Dhaka",
      phone: "+8801722001122",
    },
  },
  {
    id: 2,
    productImage: "/images/gamepad.png",
    title: "H1 Gamepad",
    orderNo: "3213A",
    quantity: 2,
    price: 1400,
    customer: {
      name: "Md Amir Hamza Nirob",
      address: "House 15, Road 12, 3rd Floor, Apt B3, Mohakhali, Dhaka",
      phone: "+8801722001122",
    },
  },
  {
    id: 3,
    productImage: "/images/gamepad.png",
    title: "H1 Gamepad",
    orderNo: "3213A",
    quantity: 2,
    price: 1400,
    customer: {
      name: "Md Amir Hamza Nirob",
      address: "House 15, Road 12, 3rd Floor, Apt B3, Mohakhali, Dhaka",
      phone: "+8801722001122",
    },
  },
];

export default function OrdersTable() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="overflow-x-auto border rounded-lg bg-white">
      <table className="w-full border-collapse">
        {/* Table Header */}
        <thead className="border-b border-gray-100 dark:border-white/[0.05]">
          <tr>
            <th className="px-5 py-3 font-medium text-gray-500 text-start text-sm">
              Product
            </th>
            <th className="px-5 py-3 font-medium text-gray-500 text-start text-sm">
              Title
            </th>
            <th className="px-5 py-3 font-medium text-gray-500 text-start text-sm">
              Order No
            </th>
            <th className="px-5 py-3 font-medium text-gray-500 text-start text-sm">
              Quantity
            </th>
            <th className="px-5 py-3 font-medium text-gray-500 text-start text-sm">
              Price
            </th>
            <th className="px-5 py-3 font-medium text-gray-500 text-start text-sm">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((order) => (
            <React.Fragment key={order.id}>
              {/* Main Row */}
              <tr
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => toggleRow(order.id)}
              >
                <td className="px-4 py-3 border-b w-[60px]">
                  <Image
                    src={order.productImage}
                    alt={order.title}
                    width={40}
                    height={40}
                  />
                </td>
                <td className="px-4 py-3 border-b">{order.title}</td>
                <td className="px-4 py-3 border-b">#{order.orderNo}</td>
                <td className="px-4 py-3 border-b text-center">
                  {String(order.quantity).padStart(2, "0")}
                </td>
                <td className="px-4 py-3 border-b">৳{order.price}</td>
                <td className="px-4 py-3 border-b text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Delete", order.id);
                    }}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X size={18} />
                  </button>
                </td>
              </tr>

              {/* Expanded Row */}
              {expandedRow === order.id && (
                <tr>
                  <td colSpan={6} className="bg-gray-100 px-4 py-4 text-sm">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{order.customer.name}</p>
                        <p>{order.customer.address}</p>
                        <p>{order.customer.phone}</p>
                      </div>

                      <div className="flex items-center gap-6 mt-3">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" /> Cancel
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" /> Delivered
                        </label>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
