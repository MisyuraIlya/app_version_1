import React, { useEffect, useState } from 'react';
import { useMyQuestionDocsStore } from '../../../../store/QuestionDocsStore';
import Container from '../../../../ui/Container/Container';
import MyButton from '../../../../ui/MyButton/MyButton';
import MyCard from '../../../../ui/MyCard/MyCard';
import MyDivider from '../../../../ui/MyDivider/MyDivider';
import moment from 'moment-timezone';
import FormItem from '../../../../components/FormItem';

const AgentFormDetailed = ({handleCloseFormDetailed, choosedObject}) => {

    const {MyQuestionDocsStoreMethods,agetFormDetailed} = useMyQuestionDocsStore()

    const buttonEditHandler = () => {
        MyQuestionDocsStoreMethods.editAgentsForm()
    }
    return (
        <div className='AgentFormDetailed'>
            <MyCard>
                <Container>
                    <div className='head'>
                        <div className='flex-container'>
                            <div className='col-lg-10 colMobile12'>
                                <h4>{choosedObject.ClientName} - {moment(choosedObject.QuestionDate).format('L')}</h4>
                            </div>
                            <div className='col-lg-2  myAlignLeft close_btn' onClick={() => handleCloseFormDetailed()}>
                                <span className="material-symbols-outlined">
                                close
                                </span>
                            </div>
                        </div>
                    </div>
                    <MyDivider/>
                    <div className='flex-container'>
                        {agetFormDetailed.map((item,index) => 
                            <div className='col-lg-4 colMobile12' key={index}> 
                                <FormItem item={item}/>
                            </div>    
                        )}
                    </div>

                <div className='alignLeft myPadding'>
                    <MyButton title={'עדכן מסמך'} buttonClick={buttonEditHandler}/>
                </div> 

                </Container>
            </MyCard>

        </div>
    );
};


export default AgentFormDetailed;