import React, { Component } from "react";
import { useState, useEffect } from 'react';


export function Error(props) {
    
    return (<p>
        Error: {props.error}
    </p>);
}
