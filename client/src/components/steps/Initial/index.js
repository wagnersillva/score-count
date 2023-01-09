import React from 'react';
import {Button, Typography} from "antd";

export default function InitialStep({ next }){
    return (
        <span>
            <Typography.Title level={3}>
                Bem-vindo
            </Typography.Title>
            <br/>
            <Button onClick={next}>
                Clique para Iniciar
            </Button>
        </span>
    )
}