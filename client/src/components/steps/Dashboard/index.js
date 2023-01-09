import React, {useEffect, useState} from 'react';
import {Col, Descriptions, Row, Table, Typography} from "antd";
import {configTableMatches, configTablePlayers} from "./utils";
import {getCurrentConfiguration} from "../../../functions/store";
export default function Dashboard(){

    const [currentConfig, setCurrentConfig] = useState();

    useEffect(() => {
        setCurrentConfig(getCurrentConfiguration())
    }, []);

    const matches = [
        {
            date: '01/01/2023',
            amountOfMatches: 7,
            scores: '5323',
            champion: 'Equipe 1',
            matches: [
                {
                    match: 1,
                    players: [
                        { name: 'Equipe 1', score: '345'},
                        { name: 'Equipe 2', score: '214'},
                        { name: 'Equipe 3', score: '050'},
                    ],
                }
            ]
        },
        {
            date: '01/01/2023',
            amountOfMatches: 7,
            scores: '5323',
            champion: 'Equipe 1',
            matches: [
                {
                    match: 1,
                    players: [
                        { name: 'Equipe 1', score: '345'},
                        { name: 'Equipe 2', score: '214'},
                        { name: 'Equipe 3', score: '050'},
                    ],
                }
            ]
        },
        {
            date: '01/01/2023',
            amountOfMatches: 7,
            scores: '5323',
            champion: 'Equipe 1',
            matches: [
                {
                    match: 1,
                    players: [
                        { name: 'Equipe 1', score: '345'},
                        { name: 'Equipe 2', score: '214'},
                        { name: 'Equipe 3', score: '050'},
                    ],
                }
            ]
        },
    ]

    const players = currentConfig?.players ?? []

    const configurationTableMatches = {
        ...configTableMatches,
        dataSource: matches
    }

    const configurationTablePlayers = {
        ...configTablePlayers,
        dataSource: players
    }

    return (
        <>
            <Row className={"dashboard-template"}>
                <Col span={24}>
                    <Typography.Title level={4}>
                        Informações
                    </Typography.Title>
                    <Descriptions layout="vertical" bordered>
                        <Descriptions.Item label="Nome">{currentConfig?.gameName}</Descriptions.Item>
                        <Descriptions.Item label="Partidas por Jogo">{currentConfig?.amountOfMatches}</Descriptions.Item>
                        <Descriptions.Item label="Modo Pontuação">{currentConfig?.scoreType}</Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col span={24}>
                    <Typography.Title level={4}>
                        Jogadores / Equipes
                    </Typography.Title>

                    <Table {...configurationTablePlayers} />
                </Col>
                <Col span={24}>
                    <Typography.Title level={4}>
                        Jogos Anteriores
                    </Typography.Title>
                    <Table {...configurationTableMatches} />
                </Col>
            </Row>
        </>
    )
}