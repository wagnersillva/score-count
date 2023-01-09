import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Popconfirm, Row, Typography} from "antd";
import {getConfigurationsStorage, setConfigurationsStorage} from "../../../functions/store";
import ModalConfigForm from "./ModalConfigForm";
import {convertDateString, generateUniqueId} from "../../../functions/utils";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const { Meta } = Card;

export default function Configurations({ disabledProximo, setDisabledProximo }){

    const [ openModal, setOpenModal ] = useState(false);
    const [ configEscolhida, setConfigEscolhida ] = useState(null);
    const [ configEditing, setConfigEditing ] = useState(null);
    const [ configurations, setConfigurations ] = useState([]);


    useEffect(() => {
        const list = getConfigurationsStorage();

        list.forEach( config => {
            if(config.isSelected){
                setConfigEscolhida(config)
            }
        });

        setConfigurations(list)

    }, []);


    useEffect(() => {
        setDisabledProximo(!configEscolhida);
    }, [configEscolhida]);

    const editConfig = config => {
        configurations.forEach( configuration => {
            if(config.id === configuration.id){
                configuration.gameName = config.gameName;
                configuration.amountOfMatches = config.amountOfMatches;
                configuration.scoreType = config.scoreType;
                configuration.players = config.players;
            }
        });

        setConfigurations(configurations)
        setConfigurationsStorage(configurations);
    }

    const saveConfig = config => {
        const date = convertDateString(new Date());

        config.createAt = date;
        config.lastUse = date;
        config.isSelected = true;
        config.id = generateUniqueId();

        setConfigEscolhida(config);

        configurations.push(config);
        setConfigurations(configurations)
        setConfigurationsStorage(configurations);
    }

    const isConfigSelecionada = (config) => config?.id === configEscolhida?.id;

    const selectConfig = (config) => {
        configurations.forEach( configuration => {
            const isSameConfig = config.id === configuration.id;

            configuration.lastUse = isSameConfig ? convertDateString(new Date()) : configuration.lastUse;
            configuration.isSelected = isSameConfig;
        });

        setConfigEscolhida(config);
        setConfigurations(configurations)
        setConfigurationsStorage(configurations);
    }

    const handleClickCard = (item) => {
        if(!isConfigSelecionada(item)) selectConfig(item);
        else setConfigEscolhida(null);
    };

    const handleClickEditCard = (item) =>{
        setConfigEditing(item);
        setOpenModal(true)
    }

    const handleClickRemoveCard = (item) =>{
        const newList = configurations.filter( configuration => configuration.id !== item.id);

        setConfigurations(newList)
        setConfigurationsStorage(newList);
    }

    return (
           <>
               <Row className={"configurations-template"}>
                   <Col span={24}>
                       <Typography.Title level={4}>
                           Escolha uma configuração para prosseguir
                       </Typography.Title>
                   </Col>
                   <Col span={24}>
                       <Button className={"button-steps"} onClick={() => setOpenModal(true)}>
                           Nova Configuração
                       </Button>
                   </Col>
                   <Col span={24} xs={20} xl={20} className={"configurations-col-list-cards"}>
                       <div className={"configurations-list-cards"}>
                           {configurations.map( item => (
                               <Card
                                   className={`configurations-list-cards-item ${isConfigSelecionada(item) ? "config-escolhida" : ""}`}
                                   actions={[
                                       <Typography.Link onClick={() => handleClickEditCard(item)}>
                                           <Button icon={ <EditOutlined /> } type="text" />
                                       </Typography.Link>,
                                       <Popconfirm title="Deseja Excluir?" disabled={isConfigSelecionada(item)} onConfirm={() => handleClickRemoveCard(item)}>
                                           <Button disabled={isConfigSelecionada(item)} icon={ <DeleteOutlined /> } danger type="text"  />
                                       </Popconfirm>
                                   ]}
                               >
                                   <Meta
                                       title={item.gameName} onClick={() => handleClickCard(item)}
                                       description={(
                                           <>
                                               <Typography.Text style={{ marginBottom: 24 }}> Criada em: {item.createAt} </Typography.Text>
                                               <br/>
                                               <Typography.Text> Ultima utilização:  {item.lastUse} </Typography.Text>
                                           </>
                                       )}
                                   />
                               </Card>
                           ))}
                       </div>
                   </Col>
               </Row>
               <ModalConfigForm setOpenModal={setOpenModal} open={openModal} config={configEditing} callBack={configEditing ? editConfig : saveConfig } />
           </>
    )
}