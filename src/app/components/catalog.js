"use client";

import React from "react";
import styles from "./catalog.module.css";

const Catalog = (props) => {
  return (
    <div className={styles.catalog}>
      <h5>Catalog Products: {props?.data.length || "0"}</h5>
      <div className={styles.catalog_container}>
        {props.isLoading && <h5>Loading...</h5>}
        {!!props?.error && <h5>There was an error</h5>}
        {props.data.length > 0 ? (
          props.data.map((item) => (
            <div className={styles.catalog_item} key={item.id}>
              <div className={styles.catalog_image}>
                <img src={item.image} alt={item.title} />
              </div>
              <div className={styles.catalog_title}>{item.title}</div>
              <div className={styles.action}>
                <div className={styles.catalog_price}>$ {item.price}</div>
                <div className={styles.action_button}>
                  <button
                    onClick={() =>
                      props.setQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    onClick={() =>
                      props.setQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Catalog;
