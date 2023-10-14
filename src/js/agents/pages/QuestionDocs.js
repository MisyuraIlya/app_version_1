import React from 'react';
import Container from '../ui/Container/Container';
import AgentLayout from '../components/layout/AgentLayout';
import QuestionsFormModule from '../modules/QuestionsForm/QuestionsFormModule';
const QuestionDocs = () => {
    return (
        <div className='page-container myMarginTop'>
            <Container>
                <AgentLayout>
                    <QuestionsFormModule/>
                </AgentLayout>
            </Container>
        </div>
    );
};

export default QuestionDocs;