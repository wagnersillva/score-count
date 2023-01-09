import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Row} from "antd";
import {getCurrentConfiguration} from "../../../functions/store";
import ModalPlayersScore from "./ModalPlayersScore";
import ModalShowPlayersScore from "./ModalShowPlayersScore";

export default function PlayGame(){

    const [currentConfig, setCurrentConfig] = useState();
    const [matches, setMathes] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openShowPlayersModal, setOpenShowPlayersModal] = useState(false);

    useEffect(() => {
        setCurrentConfig(getCurrentConfiguration())
    }, []);

    const handleFinishMatch = (playersScores) => {
        const lastMatchNumber = matches?.at(-1)?.match || 0;
        const currentMatch = {
            match: lastMatchNumber + 1,
            playersScores
        }

        setMathes([...matches, currentMatch])
    }

    const getTotalScores = (currentPlayer) => {
        let sum = 0;

        matches.forEach( match => {
            match.playersScores.forEach( player => {
                if(currentPlayer.name === player.name) {
                    sum += Number(player.score)
                }
            });
        })

        return sum;
    }

    // {
    //     date: '01/01/2023',
    //         amountOfMatches: 7,
    //     scores: '5323',
    //     champion: 'Equipe 1',
    //     matches: [
    //     {
    //         match: 1,
    //         players: [
    //             { name: 'Equipe 1', score: '345'},
    //             { name: 'Equipe 2', score: '214'},
    //             { name: 'Equipe 3', score: '050'},
    //         ],
    //     }
    // ]
    // },

    const canAddMatch = currentConfig?.amountOfMatches !== '' && currentConfig?.amountOfMatches >= matches.length;

    return (
        <Row style={{ paddingInline: 25 }}>
            <Col span={24}>
                Partidas jogadas: {`${matches.length}`}
            </Col>
            <Col
                span={24}
                style={{ marginBlock: 35 }}
            >
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        {currentConfig?.players?.map( player =>(
                            <Col span={ 24 / currentConfig.players.length }>
                                <Card title={`Jogador/Equipe: ${player.name}`} bordered={false}>
                                    Pontos: {getTotalScores(player)}
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>

            </Col>
            <Col
                span={12}
                style={{ marginBlock: 50 }}
            >
                <Button
                    className={"button-general"}
                    onClick={() => setOpenShowPlayersModal(true)}
                >
                    Pontos por Partidas
                </Button>
            </Col>
            <Col
                span={12}
                style={{ marginBlock: 50 }}
            >
                <Button
                    className={"button-general"}
                    disabled={!canAddMatch}
                    onClick={() => setOpenModal(true)}
                >
                    Finalizar partida
                </Button>
            </Col>

            <ModalShowPlayersScore open={openShowPlayersModal} setOpenModal={setOpenShowPlayersModal} matches={matches} />
            <ModalPlayersScore players={currentConfig?.players} open={openModal} setOpenModal={setOpenModal} callBack={handleFinishMatch} />
        </Row>
    )
}