import React from 'react';
import {Button, Card, List, Modal} from "antd";

const { Meta } = Card;

export default function ModalShowPlayersScore({ open, setOpenModal, matches }){

    return (
        <Modal
            centered
            open={open}
            onCancel={() => setOpenModal(false)}
            title={"Pontos dos jogadores"}
            footer={[
                <Button key="back" onClick={() => setOpenModal(false)}>
                    Fechar
                </Button>
            ]}
        >
            <div
                style={{
                    maxHeight: 550,
                    overflowY: "auto",
                    paddingInline: 16
                }}
            >
                {matches.map( currentMatch => {
                    return (
                       <Card style={{ marginBlock: 25 }}>
                           <Meta
                               title={`Partida: ${currentMatch.match}`}
                               description={
                                   <List
                                       bordered
                                       dataSource={currentMatch?.playersScores || []}
                                       renderItem={(item) => (
                                           <List.Item>
                                               <List.Item.Meta title={item.name} />
                                               {item.score}
                                           </List.Item>
                                       )}
                                   />
                               }
                           />
                       </Card>
                    )
                })}
            </div>
        </Modal>
    )
}