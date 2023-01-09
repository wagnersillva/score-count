import React from 'react';
import {Button, Layout} from "antd";

const {Header, Content, Footer} = Layout

export default function TemplateStep({ setStep, currentStep, disabledNext }){
    return (
        <Layout className={"layout-template-step"}>
            <Header className={"layout-template-step-header"}> {currentStep.title} </Header>
            <Layout className={"layout-template-step-main"}>
                <Content className={"layout-template-step-main-content"}>
                    {currentStep.component}
                </Content>
                <Footer>
                    {
                        currentStep.viewBtnPrevius &&
                        <Button className={"button-steps"} style={{marginRight: currentStep.viewBtnNext ? 12 : 0}} onClick={() => setStep(currentStep.previus.value)}>
                            {currentStep.previus.label}
                        </Button>
                    }
                    {
                        currentStep.viewBtnNext &&
                        <Button className={"button-steps button-primary"} style={{ marginLeft: 12 }} disabled={disabledNext} onClick={() => setStep(currentStep.next.value)}>
                            {currentStep.next.label}
                        </Button>
                    }
                </Footer>
            </Layout>
        </Layout>
    )
}