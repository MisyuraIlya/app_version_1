import React, { useEffect, useState } from 'react';
import { ajax } from '../../helpers/ajaxFunc';
import Select from 'react-select'

const FilterBySlag = ({slag, isTableUser}) => {
    const [data, setData] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [loading, setLoading] = useState(false)
    const [agents, setAgents] = useState([])
    const getData = async () => {
        setLoading(true)
        try {
            let val = {
                slag
            }

            let valAjax = {
                point: 'new_app/index',
                classPoint:'Notifications',
                funcName: 'filterBySlag',
                val:val
            }

            const response = await ajax(valAjax)
            if(response.status == 'success'){
                const dataForSelelect = response.data.map((item) => {return { value:item, label: item }})
                setData(dataForSelelect)
            }
        } catch(e) {
            console.log('error fetch by slag',e)
        } finally {
            setLoading(false)
        }
    } 

    const getAgents = async () => {
        setLoading(true)
        try {
            let val = {
                slag
            }

            let valAjax = {
                point: 'new_app/index',
                classPoint:'Notifications',
                funcName: 'GetAllAgents',
                val:val
            }

            const response = await ajax(valAjax)
            if(response.status == 'success'){
                const dataForSelelect = response.data.map((item) => {return { value:item, label: item }})
                setAgents(dataForSelelect)
            }
        } catch(e) {
            console.log('error fetch by slag',e)
        } finally {
            setLoading(false)
        }
    } 

    const handleSelectChange = selectedOptions => {
        setSelectedOptions(selectedOptions);
        const valued = selectedOptions.map((item) => {return item.value})
        localStorage.setItem(`${slag}`, JSON.stringify(valued))
    };


    useEffect(() => {
        getData()
        getAgents()
    },[])
    return (
        <div>
            {isTableUser ?
            <Select options={data} placeholder={'בחר'}  isMulti onChange={handleSelectChange} value={selectedOptions}/>
            :
            <Select options={agents} placeholder={'בחר'}  isMulti onChange={handleSelectChange} value={selectedOptions}/>
            }
        </div>
    );
};

export default FilterBySlag;