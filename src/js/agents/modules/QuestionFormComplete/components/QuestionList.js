import React, { useEffect } from 'react';
import FormItem from '../../../components/FormItem';
import { useMyQuestionDocsStore } from '../../../store/QuestionDocsStore';
import MyCard from '../../../ui/MyCard/MyCard';
import Container from '../../../ui/Container/Container';
import MyDivider from '../../../ui/MyDivider/MyDivider';
import MyButton from '../../../ui/MyButton/MyButton';

import { useForm } from "react-hook-form";
import MyTextArea from '../../../ui/MyTextArea/MyTextArea';
import MyRange from '../../../ui/MyRange/MyRange';
const QuestionList = () => {
    const {MyQuestionDocsStoreMethods,questionsBank} = useMyQuestionDocsStore()

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        MyQuestionDocsStoreMethods.completeQuestionFrom(data)
    };

    useEffect(() => {
        MyQuestionDocsStoreMethods.fetchQuestionsBank()
    },[])
    

    return (
        <div className='AgentFormDetailed'>
            <MyCard>
                <Container>
                    <div className='head'>
                        <div className='flex-container'>
                            <div className='col-lg-12'>
                                <h4>שאלון</h4>
                            </div>
                        </div>
                    </div>
                    <div className='flex-container'>


                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className='flex-container'>
                            {questionsBank.map((item,index) => {
                                
                                if(item.Type == 1) {
                                    return (
                                        <div className='col-lg-6' key={index}> 
                                            <div className='flex-container myPadding'>
                                                <div className='col-lg-5 myPadding'>
                                                    <p>{item.Title}</p>
                                                </div>    
                                                <div className='col-lg-7'>
                                                    <MyTextArea props={{...register(`${item.Id}`)}}/>

                                                </div>    
                                            </div>    
                                        </div>   
                                        
                                    )
                                } else if (item.Type == 2) {
                                    return (

                                        <div className='col-lg-6' key={index}> 
                                            <div className='flex-container myPadding'>
                                                <div className='col-lg-5 myPadding'>
                                                    <p>{item.Title}</p>
                                                </div>    
                                                <div className='col-lg-7'>
                                                <MyRange props={{...register(`${item.Id}`)}}/>
                                                </div>
                                            </div>    
                                            
                                        </div>   


                                    )
                                }

                            })}
                            
                        </div>


                        <div className='alignLeft myPadding'>
                            <MyButton title={'שלח שאלון'}/>
                        </div> 
                    </form>


                    </div>



                </Container>

            </MyCard>

        </div>
    );
};

export default QuestionList;