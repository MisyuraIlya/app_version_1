import React from 'react';
import useAuthStore from '../../../store/AuthModalStore';
import { useAuth } from '../../../../Auth/providers/AuthProvider';
import { useForm } from "react-hook-form";
import { useModals } from '../../../provider/ModalsProvider';

const ForgotPasswordStepOne = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const {setAction,setEmail} = useAuthStore()
    const {restorePasswordStepOne} = useAuth()
    const {setOpenAuthModal} = useModals()
    
    const handleLogin = (data) => {
        restorePasswordStepOne(data.email)
        setEmail(data.email)
        setAction('forgotPassordStepTwo')
    }

    return (
    <form className='login' onSubmit={handleSubmit(handleLogin)}>
        <div className="forgot-pass-wrapp">
            <div className="forgot-password">
                <div className="cancel">
                    <div onClick={() => setOpenAuthModal(false)}>
                        <img src={globalFileServer + 'icons/close.svg'} alt="" />
                    </div>
                </div>
                <div>
                    <h3>{"אנא הקלידו את כתובת המייל שלכם"}</h3>
                    <input type="text" {...register('email', {required:`אימייל שדה חובה`})} placeholder={"אימייל"} />
                    <button type='submit'>{"שלח"}</button>
                    <button type='button' onClick={() => setAction('login')} style={{marginTop:'20px'}}>{"חזרה"}</button>
                </div> 
            </div>
        </div> 
    </form>

    );
};

export default ForgotPasswordStepOne;