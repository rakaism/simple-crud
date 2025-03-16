"use client";

import { useEffect, useState } from "react";

interface Product {
  $id: string;
  name: string;
  category: string;
  color: string;
  price: number;
}

export default function List() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/crud");
        if (!response.ok) {
          throw new Error("Gagal fetch produk.");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error: ", error);
        setError("Gagal fetch produk.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/crud/${id}`, { method: "DELETE" });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.$id !== id)
      );
    } catch (error) {
      console.error("Gagal hapus produk.", error);
      setError("Gagal menghapus produk.");
    }
  };

  return (
    <div className="mt-10 flex justify-center relative overflow-x-auto shadow-md sm:rounded-lg">
      {error && <p className="py-5 text-red-500">{error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div className="mt-10 flex justify-center relative overflow-x-auto shadow-md sm:rounded-lg w-3/4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product.$id}
                  className={`${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-800"
                  } border-b dark:border-gray-700 border-gray-200`}
                >
                  <td className="px-6 py-4">{product.$id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {product.name}
                  </td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.color}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">
                    <a
                      href={`/edit/${product.$id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => handleDelete(product.$id)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Tidak ada produk.</p>
      )}
    </div>
  );
}
