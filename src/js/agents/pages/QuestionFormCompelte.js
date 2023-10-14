import React from 'react';
import QuestionFormCompleteModule from '../modules/QuestionFormComplete/QuestionFormCompleteModule';
import Container from '../ui/Container/Container';

const QuestionFormCompelte = () => {
    return (
        <div className='page-container myMarginTop'>
            <Container>
                    <QuestionFormCompleteModule/>
            </Container>
        </div>
    );
};

export default QuestionFormCompelte;