import React from 'react';

const ContactFooter = () => {
    return (
        <div className="contact-footer" id="contact-footer">
            <div className="container">
                <div className="main-sub-cont">
                    <div className="sub-cont flex-container">
                        
                        <div className="col-lg-5 cont-about-us">
                            <div className="cont-about-us-cont">
                            <div className="h2-cont">
                                <h2>{'אודותינו'}</h2>
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-4 form-cont">
                            <div className="form">
                            <div className="wr">
                                <div className="input-group">
                                <input
                                    type="text"
                                    value={""}
                                    placeholder={"שם"}
                                    onChange={(e) => this.setState({name: e.target.value})}
                                    id="Name"
                                />
                                </div>
                                <div className="input-group">
                                <input
                                    type="text"
                                    value={''}
                                    placeholder={"מייל"}
                                    onChange={(e) => this.setState({mail: e.target.value})}
                                    id="Mail"
                                />
                                </div>
                                <div className="input-group">
                                <input
                                    type="text"
                                    value={""}
                                    placeholder={"טלפון"}
                                    onChange={(e) => this.setState({phone: e.target.value})}
                                    id="Tel"
                                />
                                </div>
                                <div className="input-group">
                                <textarea
                                    placeholder={"הודעה"}
                                    type="text"
                                    value={""}
                                    onChange={(e) => this.setState({msg: e.target.value})}
                                    id="Msg"
                                />
                                </div>
                                <div className="button-wrapper">
                                <button onClick={()=> this.sendForm()}>{"שלח"}</button>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-3 info-cont">
                            <div className="contact-info">
                                <div className="flex-container row-cont">
                                    <div className="col-lg-2">
                                        <div className="img">
                                            <span className="material-symbols-outlined">location_on</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-10">
                                        <ul>
                                            <li className="title"> {"כתובת:"}</li>
                                            <li> {"רחוב האיצטדיון 9 מגדל העמק 23100"}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex-container row-cont">
                                    <div className="col-lg-2">
                                        <div className="img">
                                            <span className="material-symbols-outlined">call</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-10">
                                    <ul>
                                        <li className="title">{"טלפון:"}</li>
                                        <li>{"972-9-951-5818"}</li>
                                    </ul>
                                    </div>
                                </div>
                                <div className="flex-container row-cont">
                                    <div className="col-lg-2">
                                        <div className="img">
                                            <span className="material-symbols-outlined">alternate_email</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-10">
                                        <ul>
                                            <li className="title">{"אימייל:"}</li>
                                            <li>{"info@ceremonietea.com"}</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex-container row-cont">
                                    <div className="col-lg-2">
                                        <div className="img">
                                        </div>
                                    </div>
                                    <div className="col-lg-10 a-class">
                                        <a className="privacy a-class" href={globalFileServer + 'policy_form.pdf'} target="_blank">
                                            <span className="login">{'תנאי שימוש'}</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="flex-container row-cont">
                                    <div className="col-lg-2">
                                        <div className="img">
                                        </div>
                                    </div>
                                    <div className="col-lg-10 a-class">
                                        <a className="privacy" href={globalFileServer + 'negishut.pdf'} target="_blank">
                                            <span className="login">{'הצהרת נגישות'}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactFooter;