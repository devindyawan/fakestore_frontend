"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import Header from "./components/header";
import Catalog from "./components/catalog";

export default function Home() {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        if (response.data.length === 0) setData([]);

        const data = response.data.map((product) => ({
          ...product,
          quantity: 0,
        }));
        setIsLoading(false);

        setData(data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
      }
    };

    getData();
  }, []);

  const setQuantity = (id, quantity) => {
    quantity = quantity < 0 ? 0 : quantity;
    setData((prevData) =>
      prevData.map((product) =>
        product.id === id ? { ...product, quantity } : product
      )
    );
  };

  const resetQuantity = () => {
    setData((prevData) =>
      prevData.map((product) => ({ ...product, quantity: 0 }))
    );
  };

  return (
    <div className={styles.container}>
      <Header
        data={data}
        resetQuantity={resetQuantity}
        setQuantity={setQuantity}
      />
      <Catalog
        data={data}
        setQuantity={setQuantity}
        error={isError}
        isLoading={isLoading}
      />
    </div>
  );
}
