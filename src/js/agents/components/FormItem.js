import React, {useState, useEffect} from 'react';
import MyTextArea from '../ui/MyTextArea/MyTextArea';
import MyRange from '../ui/MyRange/MyRange';
import MyDivider from '../ui/MyDivider/MyDivider';
import { useMyQuestionDocsStore } from '../store/QuestionDocsStore';
const FormItem = ({item}) => {
    //store
    const {MyQuestionDocsStoreMethods} = useMyQuestionDocsStore()

    //states
    const [value, setValue] = useState(item.Response)
    const [comment,setComment] = useState('')
    //process
    useEffect(() => {
        if(item.Type == 2){
            if(value == 0){
                setComment('בכלל לא')
            } else if(value == 1) {
                setComment('במידה מועטה')
            } else if (value == 2) {
                setComment('במידה בינונית')
            } else if (value == 3) {
                setComment('במידה רבה')
            } else if (value == 4) {
                setComment('במידה מאוד')
            }

        }

    },[value])

    //helpers
    const handleChangeTyp1 = (response) => {
        MyQuestionDocsStoreMethods.detailedEdit(item.Id,response)
        setValue(response)
    }

    const handleChange2 = (ratingValue) => {
        MyQuestionDocsStoreMethods.detailedEdit(item.Id,ratingValue)
        setValue(ratingValue)
    }

    const typeComponent = (typeNumber) => {
        if(typeNumber == 1) {

            return (
                <>
                    <MyTextArea state={value} setState={handleChangeTyp1} placeholder={'הערה..'}/>
                </>
            )

        } else if(typeNumber == 2)  {
            return (
                <>
                    <div >
                        <MyRange value={value} onChange={handleChange2}/>
                    </div>
                    <div className='myCenterAlign'>
                        <p>{comment}</p>
                    </div>  
                </>
            )
        } 
    }

    return (
        <div className='card'>
            <div className='flex-container'>
                <div className='col-lg-5'>
                    <span>{item.Title}</span>
                </div>    
                <div className='col-lg-7'> 
                    {typeComponent(item.Type)}
                </div>    
                
            </div>  
        </div>   
    )
};

export default FormItem;