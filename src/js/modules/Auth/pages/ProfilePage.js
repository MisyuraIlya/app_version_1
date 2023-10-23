import React from 'react';
import MyProfile from '../components/MyProfile/MyProfile';
import AgentMyProfile from '../components/AgentMyProfile/AgentMyProfile';
import { useAuth } from '../providers/AuthProvider';

const ProfilePage = () => {
    const {isAgent} = useAuth()
    return (
        <div className="page-container Profile-page">
            <div className="Profile-page-subcont">
                <MyProfile/>
                {isAgent &&
                    <AgentMyProfile/>            
                }
            </div>
        </div>
    );
};

export default ProfilePage;