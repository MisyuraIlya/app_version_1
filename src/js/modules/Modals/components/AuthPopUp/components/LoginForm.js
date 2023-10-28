import React from 'react';
import { useForm } from "react-hook-form";
import useAuthStore from '../../../store/AuthModalStore';
import { useAuth } from '../../../../Auth/providers/AuthProvider';
const LoginForm = () => {
    const {login} = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {setAction} = useAuthStore();

    const handleLogin = (data) => {
        login(data.email, data.password)
    }

    return (
        <form className="login" onSubmit={handleSubmit(handleLogin)}>
            <div>
                <span className="material-symbols-outlined" style={{fontSize:'50px'}}>person</span>
            </div>
            <h3>{"כניסה"}</h3>
            <div className="input-cont">
                <p>{"מייל"}</p>
                <input type="text" {...register('email', {required:`מייל שדה חובה`})} />
            </div>
            <div className="input-cont">
                <p>{"סיסמה"}</p>
                <input id="password" type="password" {...register('password', {required:`סיסמא שדה חובה`})} />
            </div>
            <div className="actions">
                <div className="send btn-cont">
                    <button type='submit'>כניסה</button>
                </div>
            </div>
            <p onClick={() => setAction("forgotPassordStepOne")} className="forgot-pass">{'שחזר סיסמה'}</p>
            <div className="new-cust-cont">
                <p className="new-cust-title">{"טרם נרשמת?"}</p>
                <p onClick={() => setAction("validation")} className="new-cust-button">{"לחץ כאן להרשמה"}</p>
            </div>
        </form>
    );
};

export default LoginForm;