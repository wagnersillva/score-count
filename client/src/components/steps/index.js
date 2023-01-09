import React, {useEffect, useState} from 'react';
import InitialStep from "./Initial";
import {getCurrentStep, setCurrentStep} from "../../functions/store";
import Configurations from "./Configurations";
import TemplateStep from "./TemplateStep";
import Dashboard from "./Dashboard";
import PlayGame from "./PlayGame";

export default function Steps(){

    const [valueCurrentStep, setValueCurrentStep] = useState("initial");
    const [ disabledNext, setDisabledProximo ] = useState(true);

    useEffect(() => {
        setValueCurrentStep(getCurrentStep());
    }, [])

    const setStep = (stepValue) => {
        setCurrentStep(stepValue);
        setValueCurrentStep(stepValue)
    }

    const steps = [
        {
            step: "initial",
            title: "Score Count - Contador de Scores para jogos.",
            component: <InitialStep next={() => setStep('configurations')} />,
            next: {
                label: "Configurações",
                value: "configurations"
            },
            viewBtnPrevius: false,
            viewBtnNext: false,
        },
        {
            step: "configurations",
            title: "Configurações",
            component: <Configurations disabledNext={disabledNext} setDisabledProximo={setDisabledProximo} />,
            next: {
                label: "Confirmar Escolha",
                value: "dashboard"
            },
            previus: {
                label: "Início",
                value: "initial"
            },
            viewBtnPrevius: true,
            viewBtnNext: true,
        },
        {
            step: "dashboard",
            title: "Dashboard",
            component: <Dashboard />,
            previus: {
                label: "Configurações",
                value: "configurations"
            },
            next: {
                label: "Novo Jogo",
                value: "playing"
            },
            viewBtnPrevius: true,
            viewBtnNext: true,
        },
        {
            step: "playing",
            title: "Jogando",
            component: <PlayGame />,
            previus: {
                label: "Encerrar Game",
                value: "dashboard"
            },
            viewBtnPrevius: true,
            viewBtnNext: false,
        },
    ];

    const currentStep = steps.find( e => e.step === valueCurrentStep);

    return <TemplateStep currentStep={currentStep} setStep={setStep} disabledNext={disabledNext} />
}
