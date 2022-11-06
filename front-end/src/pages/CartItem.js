import React, { Component } from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

export function CartItem(props) {
    
    const setError = props.setError;
    const updateCart = props.updateCart;


    const addQuantity = async(id) =>{
        try {      
            await axios.post(`/api/cart/${id}`);
          } catch(error) {
            setError("error posting cart: " + error);
          }
        updateCart();
    }

    const subQuantity = async(id) =>{
        try {      
            await axios.put(`/api/cart/${id}/${props.item.quantity-1}`);
          } catch(error) {
            setError("error posting cart: " + error);
          }
        updateCart();
    }

    const removeItem = async(id) =>{
        try {      
            await axios.delete(`/api/cart/${id}`);
          } catch(error) {
            setError("error posting cart: " + error);
          }
        updateCart();
    }


    return (
        <p>
            {props.item.name}, {props.item.quantity} <button onClick={e => subQuantity(props.item.id)}>-</button><button onClick={e => addQuantity(props.item.id)}>+</button><button onClick={e => removeItem(props.item.id)}>Remove from cart</button>
        </p>
        );


}

