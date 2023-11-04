import React, {useState} from 'react';
import Select from 'react-select'
import useClientStore from '../../../Admin/store/ClientsStore';
import useNotificationStore from '../../store/notificationStore';


const UserSelection = ({title,id}) => {
    const {clients} = useClientStore()
    const {choosedClients,setChooseClient,selectRadio,setSelectRadio} = useNotificationStore()
    const options = clients.map((item) => {return {value:item.id, label:item.name}})

    const handleSelectChange = selectedOptions => {
        setChooseClient(selectedOptions);
    };

    return (
        <div className='flex-container' style={{padding:'20px'}}>
            <div className='col-lg-2 option'>
                <input
                    type="radio"
                    checked={selectRadio == id}
                    onClick={() => setSelectRadio(id)}
                />
                <label>{title}</label>
            </div>	
            {id !== 1 &&
                <div className='col-lg-10'>
                    <Select options={options} placeholder={'בחר'}  isMulti onChange={handleSelectChange} value={choosedClients}/>
                </div>	
            }

        </div>
    );
};

export default UserSelection;