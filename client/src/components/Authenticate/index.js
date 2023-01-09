import React from 'react';
import {getToken} from "../../functions/store";

export default function Authenticate({ children }){
    const token = getToken();

    if(token){
        return children;
    }

    return <login />
}