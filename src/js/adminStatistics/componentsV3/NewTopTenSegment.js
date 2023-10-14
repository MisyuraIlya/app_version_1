import React, {useEffect, useState} from 'react';
import MySelectBox from "./MySelectBox";
import commaNumber from 'comma-number';
const NewTopTenSegment = ({titleArr,dataArr,dataArr2,mainTitle,showSelectBox,selectBoxArr,defaultTitle}) => {
    const [openSelect, setOpenSelect] = useState(false);
    const [optionsState, setOptionState] = useState(defaultTitle); //output
    const [data, setData] = useState([])
    const switchedData = () => {
        if(optionsState == 'כמות' ){
            setData(dataArr2)
        } else if(optionsState ==  'מחיר'){
            setData(dataArr)
        } else {
            setData(dataArr)
        }


    }

    useEffect(() => {
        switchedData()

    },[optionsState,dataArr,dataArr2])

    return (
    <div className='container' >

        <div className='flex-container list-block-title-cont'>
            <div className='col-lg-6 title_cont'>
                <h2>{mainTitle}</h2>
            </div>
            {showSelectBox &&
                <div className='col-lg-6 select'>
                    <MySelectBox
                        data={selectBoxArr}
                        globalFileServer={'globalFileServer'}
                        defaultTitle={'בחר'}
                        openSelect={openSelect}
                        setOpenSelect={setOpenSelect}
                        optionsState={optionsState}
                        setOptionState={setOptionState}
                    />
                </div>
            }

        </div>
        <div className='flex-container'>
            {titleArr&& titleArr.map((item,index) => {
                if(titleArr.length == 3 && index == 1){
                    return (
                        <>
                        <div className='col-lg-1'></div>
                        <div className='col-lg-5'>
                            {titleArr[0]}
                        </div>
                        <div className={showSelectBox ?'col-lg-4' : 'col-lg-4'}>
                            {titleArr[1]}
                        </div>
                        {
                            showSelectBox ?
                            <div className='col-lg-2'>
                                {optionsState}
                            </div>
                            :
                            <div className='col-lg-2'>
                                {titleArr[2]}
                            </div>

                        }

                        </>
                    )
                } else if(titleArr.length == 2 && index == 1){
                    return (
                        <>
                        <div className='col-lg-1'></div>
                        <div className='col-lg-5'>
                        {titleArr[0]}
                        </div>
                        <div className='col-lg-2'></div>
                        <div className='col-lg-4'>
                        {titleArr[1]}
                        </div>
                        </>
                    )
                }
            })}
            <div className='divider'></div>

        </div>
        {data && data.map((item,index) =>
        {

            if(titleArr.length == 3){
                return (
                <div className='flex-container prod_container' key={index} style={{paddingTop:'12px'}}>
                    <div className='col-lg-1'>{index+1}. </div>
                    <div className='col-lg-5'>
                        {item.title}
                    </div>
                    <div className='col-lg-3'>
                        {item.num}
                    </div>
                    <div className='col-lg-3'>
                        {commaNumber((parseFloat(item.sum)).toFixed(1))}
                    </div>
                </div>
                )
            } else if(titleArr.length == 2){
                return (
                <div className='flex-container prod_container' key={index} style={{paddingTop:'12px'}}>
                    <div className='col-lg-1'>{index+1}. </div>
                    <div className='col-lg-5'>
                        {item.title}
                    </div>
                    <div className='col-lg-2'></div>
                    <div className='col-lg-4'>
                        {commaNumber(item.num)}
                    </div>

                </div>
                )
            }

            }
        )}
    </div>
    );
};

export default NewTopTenSegment;
