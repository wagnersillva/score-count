import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, message, Modal, notification, Row, Select} from "antd";
import TablePlayers from "./TablePlayers";


const initialValues = {
    gameName: null,
    amountOfMatches: 5,
    scoreType: "pontos",
    players: []
}

export default function ModalConfigForm({ open, setOpenModal, config, callBack }){

    useEffect(() => {
        if(!open) return;

        if(config){
            form.setFieldsValue({
                gameName: config.gameName,
                amountOfMatches: config.amountOfMatches,
                scoreType: config.scoreType,
                players: config.players
            });
        } else {
            form.setFieldsValue(initialValues)
        }

    }, [open])

    const [form] = Form.useForm();
    const [players, setPlayers] = useState([]);

    const addPlayer = () => {
        const newPlayer = { name: "Novo Jogador/Equipe" }
        const newPlayers = [...players, newPlayer].map((player, key)=> ({ ...player, key }));

        setPlayers(newPlayers);
    }

    const onSubmit = (values) => {
        if(!players?.length){

            message.error("É preciso informar pelo menos um Jogador ou Equipe")

            return;
        }

        values.players = players;

        callBack(values);
        setOpenModal(false);
    }

    return (
        <Modal
            centered
            open={open}
            onCancel={() => setOpenModal(false)}
            title={ config ? "Editando configuração" : "Nova configuração"}
            onOk={() => form.submit()}
            okText={"Salvar"}
            cancelText={"Cancelar"}
        >
            <Form
                form={form}
                layout="vertical"
                style={{ margin: "20px 0"}}
                onFinish={onSubmit}
            >
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item
                            label={"Nome do Game"}
                            name={"gameName"}
                            rules={[{ required: true, message: 'Por favor, insira o nome do Game' }]}
                        >
                            <Input  />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={"Partidas"}
                            name={"amountOfMatches"}
                            rules={[{ required: true, message: 'Por favor, insira a quantidade de partidas' }]}
                        >
                            <Select defaultValue={"1"} allowClear>
                                <Select.Option value={"1"}> 1 </Select.Option>
                                <Select.Option value={"2"}> 2 </Select.Option>
                                <Select.Option value={"3"}> 3 </Select.Option>
                                <Select.Option value={"4"}> 4 </Select.Option>
                                <Select.Option value={"5"}> 5 </Select.Option>
                                <Select.Option value={"6"}> 6 </Select.Option>
                                <Select.Option value={"7"}> 7 </Select.Option>
                                <Select.Option value={"8"}> 8 </Select.Option>
                                <Select.Option value={"9"}> 9 </Select.Option>
                                <Select.Option value={"10"}> 10 </Select.Option>
                                <Select.Option value={"manualmente"}> Finalizar manualmente </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={"Pontuação"}
                            name={"scoreType"}
                            rules={[{ required: true, message: 'Por favor, insira o tipo da pontuação' }]}
                        >
                            <Select defaultValue={"pontos"} allowClear>
                                <Select.Option value={"pontos"}> Pontos </Select.Option>
                                <Select.Option value={"gols"}> Gols </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Row style={{ marginBottom: 20 }}>
                <Col span={24}>
                    <Button type={"primary"} onClick={() => addPlayer()}>
                        Adicionar jogador/equipe
                    </Button>
                </Col>
            </Row>
            <TablePlayers players={players} setPlayers={setPlayers} />
        </Modal>
    )
}