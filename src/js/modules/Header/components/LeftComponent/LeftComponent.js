import React, { useState } from 'react';
import { useAuth } from '../../../Auth/providers/AuthProvider';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import useCart from '../../../Cart/store/CartStore';
import ProfileMenu from './components/ProfileMenu';
import NotificationIcon from '../../../PushNotificationModule/components/NotificationIcon/NotificationIcon';
import { useModals } from '../../../Modals/provider/ModalsProvider';
import useAuthStore from '../../../Modals/store/AuthModalStore';

const LeftComponent = () => {
  const { user, isAgent } = useAuth();
  const { setOpenAuthModal } = useModals();
  const [openProfile, setOpenProfile] = useState(false);
  const { cart } = useCart();
  const {setAction} = useAuthStore()

  return (
    <>
      <ul className={!user ? "prelogIn" : "afterLog"}>
        <li
          id="my-profile-cont"
          className={!openProfile ? "my-profile-cont close" : "my-profile-cont open"}
          onMouseEnter={window.innerWidth > 1150 ? () => setOpenProfile(true) : null}
          onMouseLeave={() => setOpenProfile(false)}
          onClick={() => {setOpenProfile(!openProfile);setAction('login')}}
        >
          {user ? (
            <>
              {window.innerWidth > 1150 ? (
                <div className="img icon">
                  <span className="material-symbols-outlined">person</span>
                  {isAgent ? <p className="agent-title">סוכן</p> : null}
                </div>
              ) : (
                <div className="img icon">
                  <span className="material-symbols-outlined">person</span>
                  {isAgent ? <p className="agent-title">סוכן</p> : null}
                </div>
              )}
            </>
          ) : (
            <div className="img icon" onClick={() => setOpenAuthModal(true)}>
              <span className="material-symbols-outlined">person</span>
            </div>
          )}
          {user && <ProfileMenu />}
        </li>

        {isAgent ? (
          <li className={"left"}>
            <NavLink to={"/ClientsAgent/1/"}>
              <span className="material-symbols-outlined">StoreFront</span>
            </NavLink>
          </li>
        ) : null}
        <NotificationIcon />
        {user && (
          <li>
            <NavLink to={"/cart/"}>
              <button className="icon">
                {cart.length > 0 && (
                  <div className="cart-counter">{cart.length}</div>
                )}
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
            </NavLink>
          </li>
        )}
      </ul>
    </>
  );
};

export default LeftComponent;
