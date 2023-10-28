import React from 'react';
import { useForm } from "react-hook-form";
import AuthInput from '../AuthInput/AuthInput';
import { onErrorAlert } from '../../../../agents/utils/sweetAlert';
import { useAuth } from '../../providers/AuthProvider';
import useAuthStore from '../../../Modals/store/AuthModalStore';

const NewB2bForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const {registerClient} = useAuth()
    const {setAction} = useAuthStore()
    const onSubmit = (data) => {
        if(data.password === data.confirmPassword) {
            registerClient(data)
        } else {
            onErrorAlert('סיסמאות חיבות להיות תואמות')
        }
    }

    return (
        <form className="register" onSubmit={handleSubmit(onSubmit)}>
            <div className='connect-b2b-form'>
                <div>
                    <span className="material-symbols-outlined" style={{fontSize:'50px'}}>person</span>
                </div>
                <h3>{"הרשמה לקוח חדש"}</h3>
                <AuthInput
                    title={'שם העסק'}
                    type='text'
                    name={'company'}
                    register={register}
                    error={errors.company?.message}
                />
                <AuthInput
                    title={'ח.פ'}
                    type='number'
                    name={'companyId'}
                    register={register}
                    error={errors.company?.message}
                />
                <AuthInput
                    title={'שם מלא'}
                    type='text'
                    name={'fullName'}
                    register={register}
                    error={errors.company?.message}
                />
                <AuthInput
                    title={'טלפון'}
                    type='phone'
                    name={'phone'}
                    register={register}
                    error={errors.company?.message}
                />
                <AuthInput
                    title={'עיר'}
                    type='text'
                    name={'town'}
                    register={register}
                    error={errors.company?.message}
                />
                <AuthInput
                    title={'כתובת'}
                    type='text'
                    name={'address'}
                    register={register}
                    error={errors.company?.message}
                />
                <AuthInput
                    title={'מייל'}
                    type='email'
                    name={'email'}
                    register={register}
                    error={errors.company?.message}
                />
                <AuthInput
                    title={'סיסמא'}
                    type='password'
                    name={'password'}
                    register={register}
                    error={errors.company?.message}
                />
                <AuthInput
                    title={'אימות סיסמא'}
                    type='text'
                    name={'confirmPassword'}
                    register={register}
                    error={errors.company?.message}
                />
                <p onClick={() => setAction('validation')} className="forgot-pass" style={{cursor:'pointer'}}>{ "חזרה לעימות לקוח קיים"}</p>
                <div className="accept">
                    <button type='submit'>{"הרשמה"}</button>
                </div>
            </div>
        </form>
    );
};

export default NewB2bForm;