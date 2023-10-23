import React from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
let profileObj = [
    /*
    {
        Title: 'ראשי',
        TitleEng: 'Shopping List',
        Link: '/',
        Img: 'home',
        OnlyAgent: false,
        OnlyAgentSuper: false,
        OnlyDesktop:true
    },*/
    
    {
        Title: 'מסמכי לקוח',
        TitleEng: 'My Orders',
        Link: '/docsNew/1/',
        Img: 'storefront',
        OnlyAgent: false,
        OnlyAgentSuper: false,
        OnlyDesktop:false,
        notForMisrad:false
    },
    // {
    // 	Title: 'סל קבוע',
    // 	TitleEng: 'My Products',
    // 	Link: '/category/regular/0/0/0/1/0/',
    // 	Img: 'shopping_bag',
    // 	OnlyAgent: false,
    // 	OnlyAgentSuper: false,
    // 	OnlyDesktop:false,
    // 	notForMisrad:false
    // },
    // {
    // 	Title: 'מומלצים עבורך',
    // 	TitleEng: 'Recommended Products',
    // 	Link: '/category/recommended/0/0/0/1/0/',
    // 	Img: 'star',
    // 	OnlyAgent: false,
    // 	OnlyAgentSuper: false,
    // 	OnlyDesktop:false,
    // 	notForMisrad:false
    // },
    /*{
        Title: 'רשימות קניות',
        TitleEng: 'Shopping List',
        Link: '/shoppinglist/',
        Img: 'checklist',
        OnlyAgent: false
    },*/
    
    {
        Title: 'מסמכים לאישור',
        TitleEng: 'Approve Docs',
        Link: '/approveDoc/1/',
        Img: 'checklist_rtl',
        OnlyAgent: true,
        OnlyAgentSuper: true,
        OnlyDesktop:false,
        notForMisrad:true
    },
    {
        Title: 'מסמכים',
        TitleEng: 'Shopping List',
        Link: '/docsAgent/1/',
        Img: 'article',
        OnlyAgent: true,
        OnlyAgentSuper: false,
        OnlyDesktop:false,
        notForMisrad:false
    },
    /*{
        Title: 'טיוטות',
        TitleEng: 'Shopping List',
        Link: '/agentDrafts/1/',
        Img: 'draft_orders',
        OnlyAgent: true,
        OnlyAgentSuper: false,
        OnlyDesktop:false
    },*/
    {
        Title: 'טיוטות/הזמנות',
        TitleEng: 'Shopping List',
        Link: '/DocsHistoryAgent/1/',
        Img: 'article',
        OnlyAgent: true,
        OnlyAgentSuper: false,
        OnlyDesktop:false,
        notForMisrad:false
    },
    /*{
        Title: 'גביה',
        TitleEng: 'Shopping List',
        Link: '/agentGviya/',
        Img: 'account_balance_wallet',
        OnlyAgent: true,
        OnlyAgentSuper: false,
        OnlyDesktop:false
    },*/
    {
        Title: 'אחרונים במלאי',
        TitleEng: 'Shopping List',
        Link: '/category/lastOnHand/0/0/0/1/0/',
        Img: 'inventory_2',
        OnlyAgent: true,
        OnlyAgentSuper: false,
        OnlyDesktop:false,
        notForMisrad:false
    },
    
    {
        Title: 'ביצועי סוכנים',
        TitleEng: 'Shopping List',
        Link: '/agent-statistics/1/',
        Img: 'support_agent',
        OnlyAgent: true,
        OnlyAgentSuper: true,
        OnlyDesktop:false,
        notForMisrad:true
    }
];

const MyProfile = () => {
    const {user} = useAuth()
    return (
        <div className="Profilepage-subcont2 flex-container">
            <div className={"Profile-page-sub col-lg-12"}>
            <h1>אוזר אישי</h1>
            <div className={"Profile-page-sub2 flex-container"}>
                <div className="col-lg-12 flex-container box-cont">
                    <div className="col-lg-2 col">
                        <p className="title">{'שם'}</p>
                        <p className="value">{user?.name}</p>
                    </div>
                    <div className="col-lg-2 col">
                    <p className="title">{'איש קשר'}</p>
                        <p className="value">{user?.ContactName}</p>

                    </div>
                    <div className="col-lg-2 col">
                    <p className="title">{'מייל'}</p>
                        <p className="value">{user?.mail}</p>

                    </div>
                    <div className="col-lg-2 col">
                    <p className="title">{'טלפון'}</p>
                        <p className="value">{user?.phone}</p>

                    </div>
                    <div className="col-lg-1 col">
                    <p className="title">{'עיר'}</p>
                        <p className="value">{user?.address}</p>
                    </div>
                    {user?.Balance &&
                        <div className="col-lg-1 col">
                        <p className="title">{'יתרת חוב'}</p>
                        <p className={parseInt(user?.balance) < parseInt(this.state.userInfo.MaxObligo) ? 'value' : 'value red'}>{this.numberWithCommas(parseInt(this.state.userInfo.Balance))}</p>
                        </div>
                    }
                    {user?.MaxObligo &&
                        <div className="col-lg-1 col">
                        <p className="title">{'אובליגו'}</p>
                        <p className="value">{this.numberWithCommas(parseInt(this.state.userInfo.MaxObligo))}</p>
                        </div>
                    }
                    <div className="col-lg-1 col">
                        <div className="logOutCont" onClick={()=> this.beforeLogOut()}>
                        <p>{'התנתק'}</p>
                        </div>
                    </div>
                </div>

            </div>
            </div>
            <div className="Profile-slide-menu-cont col-lg-12 flex-container">
            {profileObj?.map((item, ind) => {
                return(
                    <div key={ind} className="Profile-slide-sub col-lg-4">
                        <NavLink to={item.Link}>
                            <div className="Profile-slide-box">
                                <span className="material-symbols-outlined search-img">{item.Img}</span>
                                <h2>{item.Title}</h2>
                            </div>
                        </NavLink>
                    </div>
                )
            
            })}
            </div>
        </div>
    );
};

export default MyProfile;