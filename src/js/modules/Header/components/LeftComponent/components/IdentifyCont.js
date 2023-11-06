import React from 'react';
import { useAuth } from '../../../../Auth/providers/AuthProvider';
import useCart from '../../../../Cart/store/CartStore';
import { getClientName } from '../../../../Auth/helpers/getCurrentUserId';

const IdentifyCont = () => {
    const {isUser, isAdmin, isAgent} = useAuth()
    const {selectedMode} = useCart()
    return (
        <div className={'identify-cont'}>
            {!isAgent && !isUser && !isAdmin &&
            <span>{'ברוכים הבאים, בצעו כניסה / הרשמה'}</span>
            }
            {isAgent &&
            <span>{''}</span>
            }
            {isAdmin &&
            <span>{'אדמיניסטרטור'}</span>
            }
            {isUser &&
            <>
            <span>{" | "}</span>
            <span>{getClientName()}</span>
            {selectedMode &&
                <>
                    <span>{" | "}</span>
                    {selectedMode == 'order' &&
                        <span>{"הזמנה"}</span>
                    }
                    {selectedMode== 'request' &&
                        <span>{"ה.מחיר"}</span>
                    }
                    {selectedMode == 'return' &&
                        <span>{"החזרה"}</span>
                    }
                </>
            }
            </>
            }

        </div> 
    );
};

export default IdentifyCont;