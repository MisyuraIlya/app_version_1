import React from 'react';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import useClientStore from '../../../Admin/store/ClientsStore';

const ClientOptions = ({active, setActive}) => {
    const {selectedClient} = useClientStore()
    return (
        <ModalWrapper active={active} setActive={setActive}>
            <div className="more_cont">
                <div className="more_cont-header flex-container">
                    <div className="col-lg-10" >
                        <p></p>
                    </div>
                    <div className="close-popup col-lg-2">
                        <div className="close-popup-cont" onClick={() => this.unsetMore.bind(this,selectedClient.Id)}>
                            <img src={globalFileServer + 'icons/close_purple.svg'} />
                        </div>
                    </div>
                </div>
                {!selectedClient?.isRegistered ?
                <div className="flex-container row" onClick={() => this.setupUserClick.bind(this,selectedClient.Id, selectedClient.Mail)}>
                    <div className="col-lg-2">
                        <img src={globalFileServer + 'icons/wheel1.svg'} />
                    </div>
                    <div className="col-lg-10">
                        <p>הקמת לקוח</p>
                    </div>
                </div>
                :null}
                {selectedClient?.isRegistered ?
                <div className="flex-container row" onClick={() => this.goToPassSetup.bind(this, selectedClient.Id, selectedClient.Mail)}>
                    <div className="col-lg-2">
                        <img src={globalFileServer + 'icons/wheel1.svg'} />
                    </div>
                    <div className="col-lg-10" src={globalFileServer + 'icons/clients/pass.svg'}>
                        <p>שינוי סיסמה</p>
                    </div>
                </div>
                :null}
                <div className="flex-container row" onClick = {() => this.updateUserInfo.bind(this, selectedClient.Id, selectedClient.Blocked, "Blocked")}>
                    <div className="col-lg-2">
                        <img src={globalFileServer + 'icons/wheel1.svg'} />
                    </div>
                    <div className="col-lg-10">
                        {selectedClient?.isBlocked ?
                        <p>הפעלת לקוח</p>
                        :
                        <p>חסימת לקוח</p>
                        }
                    </div>
                </div>
                {selectedClient?.isRegistered ?
                <div className="flex-container row" onClick = {() => this.resetUser.bind(this, selectedClient.Id)}>
                    <div className="col-lg-2">
                        <img src={globalFileServer + 'icons/wheel1.svg'} />
                    </div>
                    <div className="col-lg-10">
                        <p>איפוס לקוח</p>
                    </div>
                </div>
                :null}
            </div>
            <div className="pass">
                <div className="user-info-wrapp">
                    <div className="popup-contant">
                        <div className="popup-contant-header flex-container">
                            <div className="col-lg-10" >
                                <p>שינוי סיסמה</p>
                            </div>
                            <div className="close-popup col-lg-2">
                                <div className="close-popup-cont" onClick={() => this.setState({generatePassword: null})}>
                                    <img src={globalFileServer + 'icons/close_purple.svg'} />
                                </div>
                            </div>
                        </div>
                        <div className="all-row-cont">
                            <div className="flex-container row-cont">
                                <div className="col-lg-4">
                                    <p>סיסמה חדשה</p>
                                </div>
                                <div className="col-lg-8">
                                    <input
                                    type="text"
                                    value={''}
                                    onChange={(e) => this.setState({newPassword: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="btn-container">
                                <p onClick={() => this.updateUserInfo.bind(this, selectedClient?.Id, this.state.newPassword, "Password")}>אישור</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user-info-wrapp">
                    <div className="popup-contant">
                        <div className="popup-contant-header flex-container">
                            <div className="col-lg-10" >
                                <p>פרטי כניסה</p>
                            </div>
                            <div className="close-popup col-lg-2">
                                <div className="close-popup-cont" onClick={() => this.setState({setupUser: null})}>
                                <img src={globalFileServer + 'icons/close_purple.svg'} />
                                </div>
                            </div>
                        </div>
                        <div className="all-row-cont">
                            <div className="flex-container row-cont">
                                <div className="col-lg-4">
                                    <p>שם משתמש</p>
                                </div>
                                <div className="col-lg-8">
                                <input
                                    type="text"
                                    value={''}
                                    onChange={(e) => this.setState({toSend: e.target.value})}
                                />
                                </div>
                            </div>
                            <div className="flex-container row-cont">
                                <div className="col-lg-4">
                                    <p>סיסמה</p>
                                </div>
                                <div className="col-lg-8">
                                <input
                                    type="text"
                                    value={''}
                                    onChange={(e) => this.setState({newPassword: e.target.value})}
                                />
                                </div>
                            </div>
                            <div className="btn-container">
                                <p onClick={() => this.setupUserApprove.bind(this)}>אישור</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user-info-wrapp">
                    <div className="popup-contant">
                        <div className="popup-contant-sub">
                            <div className="popup-contant-header flex-container">
                                <div className="col-lg-10" >
                                    <p>סל קבוע</p>
                                </div>
                                <div className="close-popup col-lg-2">
                                    <div className="close-popup-cont" onClick={() => this.setState({regProdsUser: false, regProds: []})}>
                                    <   img src={globalFileServer + 'icons/close_purple.svg'} />
                                    </div>
                                </div>
                            </div>
                            <div className="all-row-cont">
                            <div className="reg-heading">
                                <div className="flex-container">
                                    <div className="col-lg-3">
                                        <div className="wrapp">
                                        <p>סטאטוס</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="wrapp">
                                        <p>מס' קטלוגי</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="wrapp">
                                        <p>מוצר</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* {this.state.regProds.map((ele,ind) => {
                                return(
                                <div key={ind} className="flex-container row-cont">
                                    <div className="col-lg-3 status">
                                    {!ele.Visible ?
                                        <div onClick={this.updateRegProd.bind(this, 1, selectedClient?.ExId, ele.CatalogNumber)} className="input active">
                                            <img src={globalFileServer + "icons/done.svg"} alt=""/>
                                        </div>
                                    :
                                    <div onClick={this.updateRegProd.bind(this, null, selectedClient?.ExId, ele.CatalogNumber)} className="input">
                                        <img src={globalFileServer + "icons/cross-bold.svg"} alt=""/>
                                    </div>
                                    }
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="wrapp">
                                            <p>{ele.CatalogNumber}</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="wrapp">
                                            <p>{ele.Title}</p>
                                        </div>
                                    </div>
                                </div>
                                )
                            })} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default ClientOptions;