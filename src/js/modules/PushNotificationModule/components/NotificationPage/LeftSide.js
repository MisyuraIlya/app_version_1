import React, { useEffect, useState } from 'react';
import useNotificationStore from '../../store/notificationStore';
import { useForm} from "react-hook-form";
import MyCropper from '../../../../components/tools/MyCropper';
import { base64ToFile } from '../../../../helpers/base64ToFile';
import { MediaObjectService } from '../../../Admin/services/mediaObject.service';
const LeftSide = () => {
    const {choosedItem,items,save,createItem,updateItem,fetchItems,setChoosedItem} = useNotificationStore()
    const {register, handleSubmit, setValue,  formState:{errors}} = useForm()
    const [loading, setLoading] = useState(false)
    
    const handleForm = async (data) =>  {
        choosedItem.title = data.title
        choosedItem.description = data.description
        choosedItem.link = data.link
        updateItem(choosedItem)
        setChoosedItem({})
    }

    const uploadImg = async (img) => {
        const convertFile = base64ToFile(img.img,img.fileName)
        const res = await MediaObjectService.uploadImage(convertFile, 'notifications')
        await updateItem({id: choosedItem?.id ,image: res['@id']})
        fetchItems()
s    }

    useEffect(() => {
        setValue('title', choosedItem.title || '');
        setValue('description', choosedItem.description || '');
        setValue('link', choosedItem.link || '');
    },[choosedItem])
    
    return (
        <form className="col-lg-4 left-side" onSubmit={handleSubmit(handleForm)}>
            {choosedItem?.id ?
                <div className={"wrapper editing active"}>
                    <div className="inputs">
                        <input
                            type="text"
                            placeholder='כותרת ההודעה'
                            {...register('title')}
                        />
                        <textarea
                            placeholder='מלל הודעה'
                            {...register('description')}
                        />
                        	<input
                            type="text"
                            placeholder='קישור'
                            {...register('link')}
                        />
                        <div className="upload-img">
                            <img
                                className="main-img"
                                src={choosedItem?.image?.filePath ? globalFileServer + "notifications/" + choosedItem?.image?.filePath : globalFileServer + "placeholder.jpg"}
                                onLoad={() => this.setState({ preload: false })}
                            />
                            <MyCropper
                                aspectRatio={16/16} 
                                itemId={choosedItem?.id}
                                folder="notifications"
                                setPreload={() => setLoading(true)}
                                unsetPreload={() => setLoading(false)}
                                uploadImg={uploadImg}
                            />
                        </div>
                    </div>
                    <div className="save">
                        <button type='submit' className="cancel-post" >
                            <span>בטל</span>
                        </button>
                        <button type='submit' className="save-post" >
                            <span>שמור</span>
                        </button>
                    </div>
                </div>
            :
                <div className="wrapper add">
                    <button type='button' onClick={() => createItem()}>
                        <span className="img material-symbols-outlined">add</span>
                        <span>חדש</span>
                    </button>
                </div>
            }


        
        </form>
    );

};

export default LeftSide;