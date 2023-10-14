import React from 'react';
import { useForm } from "react-hook-form";
import AuthInput from '../AuthInput/AuthInput';
import { onErrorAlert } from '../../../../agents/utils/sweetAlert';
import { useAuth } from '../../providers/AuthProvider';

const NewB2bForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const {registerClient} = useAuth()
    const onSubmit = (data) => {
        if(data.password === data.confirmPassword) {
            registerClient(data)
        } else {
            onErrorAlert('סיסמאות חיבות להיות תואמות')
        }
    }

    return (
        <form className="connect-b2b-form" onSubmit={handleSubmit(onSubmit)}>
            {/* <img className="user_icon" src={globalFileServer + 'user_icon.png'} /> */}
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
            <p onClick={() => this.setState({ actionToPerform: "register", newUserType: "b2b" })} className="forgot-pass">{ "חזרה לעימות לקוח קיים"}</p>
            <div className="accept">
                <button type='submit'>{"הרשמה"}</button>
            </div>
        </form>
    );
};

export default NewB2bForm;