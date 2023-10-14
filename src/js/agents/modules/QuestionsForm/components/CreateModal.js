import React, { useEffect, useState } from 'react';
import MyModal from '../../../ui/MyModal/MyModal';
import MyEditableInput from '../../../ui/MyEditableInput/MyEditableInput'
import MyAddInputButton from '../../../ui/MyAddInputButton/MyAddInputButton';
import { useMyQuestionDocsStore } from '../../../store/QuestionDocsStore';
import MyDivider from '../../../ui/MyDivider/MyDivider';
import ClientSearchInput from '../../../components/ClientsSearchInput/ClientSearchInput';
import MyButton from '../../../ui/MyButton/MyButton';
const CreateModal = ({handleCloseModal}) => {

    //stores
    const {MyQuestionDocsStoreMethods,questionsBank,questionTypes,selectedOption} = useMyQuestionDocsStore()

    //states 
    const [addQuestion, setAddQuestion] = useState('')
    const [search, setSearch] = useState('')
    const [activeTypes, setActiveTypes] = useState(false)
    const handleCreateForm = () => {
        setActiveTypes(true)
        MyQuestionDocsStoreMethods.fetchQuestionTypesBank()

    }

    const sendCreatedForm = () => {
        MyQuestionDocsStoreMethods.CreateQuestion(addQuestion,search)
        setAddQuestion('')
        setActiveTypes(false)
    }

    const createAgentFormHandler = () => {
        MyQuestionDocsStoreMethods.createAgentFrom(search)
        handleCloseModal()
    }

    useEffect(() => {
        MyQuestionDocsStoreMethods.fetchQuestionsBank()
    },[])
    return (
        <MyModal title={'שלח שאלון'} isButton={false} buttonTitle={'שמור שאלון'} buttonClick={createAgentFormHandler} >

            {! activeTypes ?
                        <div className='com1'>
                        {/* this component adds clinet name */}
                        {/* <div className='myPadding'>
                            <ClientSearchInput value={search} onChange={setSearch} />
                        </div> */}
                        <div className='list_form'> 
                        {questionsBank.map((item,index) => {
        
                            return(
                                <>
                                <div className='myPadding' key={index}> 
                                    <MyEditableInput value={item.Title} />
                                </div>
                                <MyDivider/>
                                </>
        
                            )
                            })}
                        </div>
        
                        <div className='myPadding'>
                            <MyAddInputButton placeholder={'הזן שאלה'} value={addQuestion} onChange={setAddQuestion} onClick={() => handleCreateForm()}/>
                        </div>
                    </div>
        
            :
            
            <div className='comp2'>
                <h4>מחר בסוג שדה</h4>
                <div>
                    {questionTypes.map((item,index) => {
                        return(
                            <div className='flex-container' key={index}>
                                <input 
                                 type="checkbox"
                                 value={item.Id}
                                 checked={selectedOption == item.Id}
                                 onChange={(e) => MyQuestionDocsStoreMethods.setSelectedOption(e.target.value) }
                                />
                                <p>{item.Name}</p>
                            </div>    
                        )
                    })}
                    <div className='myPadding colMobile6'>
                        <MyButton title={'הוסף'} buttonClick={sendCreatedForm}/>
                    </div>
                </div>
            </div>
            }




        </MyModal>
    );
};

export default CreateModal;