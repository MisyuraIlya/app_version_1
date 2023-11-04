
import moment from 'moment';
import { create } from 'zustand'
import { NotificationsServices } from '../services/notifications/notifications.service';
import { onAsk } from '../../../agents/utils/sweetAlert';

const useNotificationStore = create((set, get) => ({
    loading:false,
    createItem: async (object) => {
        try {
            set({loading:true})
            const newObject = {
                title: null,
                description: null,
                link: null,
                createdAt: moment().format('YYYY-MM-DD'),
                isSend: false,
                image: null,
                isPublic: false,
                isPublished: false
            }
            if(object?.id){
                console.log(object['@id'])
                newObject.title =  object?.title
                newObject.description = object?.description
                newObject.link = object?.link
                newObject.image = object?.image['@id']
            } 

            const response = await NotificationsServices.createItem(newObject)
            set({choosedItem:response})
            get().fetchItems()
        } catch(e) {

        } finally {
            set({loading:false})
        }

    },
    items:[],
    fetchItems: async () => {
        try {
            set({loading:true})
            const newObject = {
                title: null,
                description: null,
                link: null,
                createdAt: moment().format('YYYY-MM-DD'),
                isSend: false,
                image: null,
                isPublic: false,
                isPublished: false
            }
            const response = await NotificationsServices.fetchNotifications()
            set({items:response["hydra:member"]})
        } catch(e) {

        } finally {
            set({loading:false})
        } 
    },

    updateItem: async (item) => {
        try {
            set({loading:true})
            const response = await NotificationsServices.updateItem(item)
            set({choosedItem:response})
            get().fetchItems()
        } catch(e) {

        } finally {
            set({loading:false})
        } 
    },

    deleteItem: async (id) => {
        try {
            set({loading:true})
            const ask = await onAsk('למחוק שורה זו?')
            if(ask){
                await NotificationsServices.deeletItem(id)
                set({choosedItem:{}})
                get().fetchItems()
            }
        } catch(e) {

        } finally {
            set({loading:false})
        }
    },
    
    choosedClients:[],
    setChooseClient:(arr) => set({choosedClients:arr}),
    selectRadio:'',
    setSelectRadio:(value) => set({selectRadio:value}),

    choosedItem:{},
    setChoosedItem:(value) => set({choosedItem:value}),
    itemToSend:{},
    setItemToSend: (value) => set({itemToSend:value}),
    sendNotification: async () => {
        try {
            set({loading:true})
            const object = {
                id:get().selectRadio,
                values:get().choosedClients
            }
            const response = await NotificationsServices.sendNotification(object)
        } catch(e) {

        } finally {
            set({loading:false})
        }
    }
}))

export default useNotificationStore;