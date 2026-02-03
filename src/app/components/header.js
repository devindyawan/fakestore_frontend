"use client";

import React, { useMemo, useState } from "react";
import styles from "./header.module.css";

import { SlBasket } from "react-icons/sl";
import { FaStore, FaRegTrashAlt } from "react-icons/fa";

const Basket = (props) => {
  return (
    <div className={styles.basket}>
      <div className={styles.basket_header}>
        <button
          disabled={props?.basketdata?.length === 0}
          onClick={() => props.resetQuantity()}
          className={styles.cancel}>
          Cancel All
        </button>
        <button
          disabled={props?.basketdata?.length === 0}
          className={styles.checkout}>
          Checkout
        </button>
      </div>
      {props?.basketdata?.length > 0
        ? props.basketdata.map((item) => (
            <div
              key={item.id}
              className={styles.basket_item}>
              <div className={styles.basket_image}>
                <img
                  src={item.image}
                  alt={item.title}
                />
              </div>
              <div className={styles.basket_title}>{item.title}</div>
              <div className={styles.basket_totalprice}>
                ${parseFloat(item.price * item.quantity).toFixed(2)}
              </div>
              <div className={styles.basket_button}>
                <button
                  onClick={() => props.setQuantity(item.id, item.quantity - 1)}>
                  -
                </button>
                {item.quantity}
                <button
                  onClick={() => props.setQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
                <button
                  className={styles.basket_remove}
                  onClick={() => props.setQuantity(item.id, 0)}>
                  <FaRegTrashAlt />
                </button>
              </div>
            </div>
          ))
        : "Empty Cart"}
    </div>
  );
};

const Header = (props) => {
  const [showBasket, setShowBasket] = useState(false);
  const basketData = useMemo(() => {
    return props.data.filter((item) => item.quantity > 0);
  }, [props.data]);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <FaStore /> OpenStore
      </div>
      <div className={styles.cart}>
        <div
          className={styles.icon}
          onClick={() => setShowBasket(!showBasket)}>
          {basketData.length > 0 && (
            <div className={styles.basketcount}>{basketData.length}</div>
          )}
          <SlBasket color="#3b3b3b" />
        </div>
      </div>
      {showBasket && (
        <Basket
          basketdata={basketData}
          setQuantity={props.setQuantity}
          resetQuantity={props.resetQuantity}
        />
      )}
    </div>
  );
};

export default Header;
