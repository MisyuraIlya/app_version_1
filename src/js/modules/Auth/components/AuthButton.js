import React, {useEffect} from 'react';
import { useAuth } from '../providers/AuthProvider';

const AuthButton = ({username, password}) => {
    const {login} = useAuth()

    const enterListener = (event) => {
        if (event.keyCode === 13) {
            login(username, password);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', enterListener, true);

        return () => {
            window.removeEventListener('keydown', enterListener, true);
        };
    }, [login, username, password]);
    
    return (
    <button onClick={() => login(username, password)}>כניסה</button>
    );
};

export default AuthButton;