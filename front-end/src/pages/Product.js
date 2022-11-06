import React, { Component } from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

export function Product(props) {
    
    const setError = props.setError;
    const updateCart = props.updateCart;

    const addToCart = async(id) =>{
        try {      
            await axios.post(`/api/cart/${id}`);
          } catch(error) {
            setError("error posting cart: " + error);
          }
        updateCart();
    }

    return (
        <p>
            {props.product.name}, ${props.product.price} <button onClick={e => addToCart(props.product.id)}>Add to Cart</button>
        </p>
        );


}

