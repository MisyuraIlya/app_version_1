import React from 'react';
import ModalWrapper from '../../components/ModalWrapper/ModalWrapper';
import useClientStore from '../../../Admin/store/ClientsStore';
import MyInput from '../../../../SharedComponents/MyInput';
import { useForm } from 'react-hook-form';

const ClientOptions = ({active, setActive}) => {
    const {selectedClient, updateClient, updateAuth} = useClientStore()
    const {register, handleSubmit,reset, formState:{errors}} = useForm()

    const handleClock = async (data) => {
        if(data.passwordSecond) {
            await updateAuth(data.username, data.passwordSecond )
        } else {
            await updateAuth(data.username, data.password)
        }
        reset()

    }

    const handleBlocked = async () => {
        let newUser = selectedClient
        newUser.isBlocked = !selectedClient.isBlocked
        await updateClient(newUser)
    }

    const handleNewPassword = async () => {
        let newUser = selectedClient
        newUser.isRegistered = false
        newUser.email = ''
        await updateClient(newUser)
    }

    return (
        <ModalWrapper active={active} setActive={setActive} width={40} height={63}>
            <div className="flex-container">
                <div className="col-lg-6" >
                    <div className='buttonAdminIcon flex-container MyCenetred' onClick={() => handleBlocked()}>
                        <div className="col-lg-4 MyCenetred">
                            {selectedClient?.isBlocked ?
                                <span class="material-symbols-outlined">person_off</span>
                            :
                                <span class="material-symbols-outlined">person</span>
                            }
                        </div>
                        <div className="col-lg-8">
                            {selectedClient?.isBlocked ?
                            <p>הפעלת לקוח</p>
                            :
                            <p>חסימת לקוח</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-lg-6" >
                    <div className='buttonAdminIcon flex-container MyCenetred' onClick={() => handleNewPassword()}>
                        <div className="col-lg-4 MyCenetred">
                            <span class="material-symbols-outlined">lock_open</span>
                        </div>
                        <div className="col-lg-8">
                            <p>איפוס לקוח</p>
                        </div>
                    </div>
                </div>
            </div>
            <form className="pass" onSubmit={handleSubmit(handleClock)}>
                <div className="user-info-wrapp">
                    <div className="popup-contant">
                        <div className="popup-contant-header flex-container">
                            <div className="col-lg-10" >
                                <p>שינוי סיסמה</p>
                            </div>
                            <div className="close-popup col-lg-2">
                                <div onClick={() => this.setState({generatePassword: null})}>
                                    <span class="material-symbols-outlined googleIconHover">password</span>
                                </div>
                            </div>
                        </div>
                        <div className="all-row-cont">
                            <div className="flex-container row-cont" style={{paddingTop:"20px"}}>
                                <div className="col-lg-4 MyCenetred">
                                    <span>סיסמה חדשה</span>
                                </div>
                                <div className="col-lg-8 MyCenetred">
                                    <MyInput googleIcons={'password'} type={'text'} placeholder={'סיסמה חדשה'} register={register} name={'password'} />
                                </div>
                            </div>
                            <button className='buttonGreen'>
                                אישור
                            </button>
                        </div>
                    </div>
                </div>
                <div className="user-info-wrapp">
                    <div className="popup-contant">
                        <div className="popup-contant-header flex-container">
                            <div className="col-lg-10" >
                                <p>הקמת לקוח</p>
                            </div>
                            <div className="close-popup col-lg-2">
                                <div  onClick={() => this.setState({setupUser: null})}>
                                    <span class="material-symbols-outlined googleIconHover">settings_accessibility</span>
                                </div>
                            </div>
                        </div>
                        <div className="all-row-cont">
                            <div className="flex-container row-cont" style={{paddingTop:"20px"}}>
                                <div className="col-lg-4 MyCenetred">
                                    <span>שם משתמש</span>
                                </div>
                                <div className="col-lg-8 MyCenetred">
                                    <MyInput googleIcons={'person'} type={'text'} placeholder={'שם משתמש'} register={register} name={'username'} />
                                </div>
                            </div>
                            <div className="flex-container row-cont" style={{paddingTop:"20px"}}>
                                <div className="col-lg-4 MyCenetred">
                                    <p>סיסמה</p>
                                </div>
                                <div className="col-lg-8 MyCenetred">
                                    <MyInput googleIcons={'password'} type={'text'} placeholder={'סיסמה חדשה'} register={register} name={'passwordSecond'} />
                                </div>
                            </div>
                            <button className='buttonGreen'>
                                אישור
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </ModalWrapper>
    );
};

export default ClientOptions;