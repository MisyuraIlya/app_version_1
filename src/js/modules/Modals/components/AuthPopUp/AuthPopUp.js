import React, { useState } from 'react';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import { useAuth } from '../../../Auth/providers/AuthProvider';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import ForgotPasswordStepOne from './components/ForgotPasswordStepOne';
import ForgotPasswordStepTwo from './components/ForgotPasswordStepTwo';
import ValidationForm from './components/ValidationForm';
import useAuthStore from '../../store/AuthModalStore'
import NewB2bForm from '../../../Auth/components/NewB2bForm/NewB2bForm';
const AuthPopUp = ({active, setActive}) => {
    const {action} = useAuthStore()
    const {loading, login,registration,validation} = useAuth()
    return (
        <div className="popup" id="userEntry">
            {loading && 
                <div className="spinner-wrapper">
                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                </div>
            }
            <div className="popup-wrapper">
                <div className="wrapp">
                    <div onClick={() => setActive(false)} className="close-popup">
                        <img src={globalFileServer + 'icons/close-dark.svg'} alt="" />
                    </div>
                    <div className="user-entry-wrapper">
                        <div className="user-entry">
                            {action === 'login' &&
                                <LoginForm/>
                            }
                            {action === 'registration' &&
                                <RegistrationForm/>
                            }
                            {action === 'forgotPassordStepOne' &&
                                <ForgotPasswordStepOne/>
                            }
                            {action === 'forgotPassordStepTwo' &&
                                <ForgotPasswordStepTwo/>
                            }
                            {action === 'validation' &&
                                <ValidationForm/>
                            }
                            {action === 'registerNewClient' &&
                                <NewB2bForm/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPopUp;