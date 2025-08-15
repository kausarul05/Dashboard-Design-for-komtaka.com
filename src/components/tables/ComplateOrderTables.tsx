
import React from "react";
import Image from "next/image";

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

export default function ComplateOrderTables() {
    // const [expandedRow, setExpandedRow] = useState<number | null>(null);

    // const toggleRow = (id: number) => {
    //     setExpandedRow(expandedRow === id ? null : id);
    // };

    return (
        <div className="overflow-x-auto border rounded-lg bg-white">
            <table className="w-full border-collapse">
                {/* Table Header */}
                <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                    <tr>
                        <th className="px-5 py-3 font-medium text-gray-500 text-center text-sm">
                            Product
                        </th>
                        <th className="px-5 py-3 font-medium text-gray-500 text-center text-sm">
                            Title
                        </th>
                        <th className="px-5 py-3 font-medium text-gray-500 text-center text-sm">
                            Order No
                        </th>
                        <th className="px-5 py-3 font-medium text-gray-500 text-center text-sm">
                            Quantity
                        </th>
                        <th className="px-5 py-3 font-medium text-gray-500 text-center text-sm">
                            Price
                        </th>
                        <th className="px-5 py-3 font-medium text-gray-500 text-center text-sm">
                            Status
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {tableData.map((order) => (<tr
                        className="hover:bg-gray-50 cursor-pointer"
                        // onClick={() => toggleRow(order.id)}
                        key={order.id}
                    >
                        <td className="px-4 py-3 border-b w-[60px]">
                            <Image
                                src={order.productImage}
                                alt={order.title}
                                width={40}
                                height={40}
                            />
                        </td>
                        <td className="px-4 py-3 border-b text-center">{order.title}</td>
                        <td className="px-4 py-3 border-b text-center">#{order.orderNo}</td>
                        <td className="px-4 py-3 border-b text-center">
                            {String(order.quantity).padStart(2, "0")}
                        </td>
                        <td className="px-4 py-3 border-b text-center">৳{order.price}</td>
                        <td className="px-4 py-3 border-b text-center">
                            Complate
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
