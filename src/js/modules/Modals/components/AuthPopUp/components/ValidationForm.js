import React from 'react';
import { useForm } from "react-hook-form";
import useAuthStore from '../../../store/AuthModalStore';
import { useAuth } from '../../../../Auth/providers/AuthProvider';

const ValidationForm = () => {
    const {setAction,setUserExtId} = useAuthStore()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {validation} = useAuth()
    const handleLogin = async (data) => {
        const isValid = await validation(data.userExtId, data.phone)
        setUserExtId(data.userExtId)
        if(isValid){
            setAction('registration')
        }
    }
    return (
        <form className="register" onSubmit={handleSubmit(handleLogin)}>
            <div className="connect-b2b-form">
                <div>
                    <span className="material-symbols-outlined" style={{fontSize:'50px'}}>person</span>
                </div>
                <h3>{"הרשמה"}</h3>

                <div className="input-cont">
                    <p>{"מס' לקוח פנימי"}</p>
                    <input type="text" {...register('userExtId', {required:`מספר לקוח שדה חובה`})} />
                </div>
                <div className="input-cont">
                    <p>{"טלפון"}</p>
                    <input type="text" {...register('phone', {required:`טלפון שדה חובה`})}/>
                </div>
                <div className="accept">
                    <button type='submit'>{ "בדיקה"}</button>
                </div>
            </div>
        </form>
    );
};

export default ValidationForm;