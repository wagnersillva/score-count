import React, {useEffect} from 'react';
import { Col, Form, InputNumber, Modal, Row} from "antd";

export default function ModalPlayersScore({ open, setOpenModal, players, callBack }){

    useEffect(() => {
        if(open){
            players.forEach( player => {
                form.setFieldsValue({
                    [`player-${player.name}`]: '',
                })
            })
        }
    }, [open])

    const [form] = Form.useForm();

    const onSubmit = (values) => {
        const playersScores = [];

        players.forEach( player => {
            playersScores.push({
                ...player,
                score: values[`player-${player.name}`]
            })
        });

        callBack(playersScores);
        setOpenModal(false);
    }

    return (
        <Modal
            centered
            open={open}
            onCancel={() => setOpenModal(false)}
            title={"Pontos dos jogadores"}
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
                    {players?.map( player => {
                        return (
                            <Col span={12}>
                                <Form.Item
                                    label={`${player.name}`}
                                    name={`player-${player.name}`}
                                    rules={[{ required: true, message: `Por favor, insira os pontos de ${player.name}` }]}
                                >
                                    <InputNumber style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                        )
                    })}
                </Row>
            </Form>
        </Modal>
    )
}