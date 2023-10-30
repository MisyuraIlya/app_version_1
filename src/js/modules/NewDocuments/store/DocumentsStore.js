import { create } from 'zustand'
import { HydraHandler } from '../../../helpers/hydraHandler'
import { DocumentsService } from '../services/document.service'
import { getClientExtId } from '../../Auth/helpers/getCurrentUserId'
import moment from 'moment'
const useDocuments = create((set, get) => ({
    loading: false,

    //========== PAGINATION =============
    totalPages:0,
    page:0,
    setPage:(value) => set({page:value}),
    lastPage:0,
    nextPage:0,
    previousPage:0,
    //===================================

    //========== CALENDAR ===============
    showCalendar:false,
    setShowCalendar:(bool) => set({showCalendar:bool}), 
    type:'',
    setType: (value) => set({type: value, showCalendar:true}),
    dateFrom: new Date(),
    dateTo: new Date(),
    choosedDate: new Date(),
    setDateFrom:(date) => set({dateFrom:date}),
    setDateTo:(date) => set({dateTo:date}),
    //===================================


    //========== SEARCH FILTER ===============
    documentTypes:[
        {value:'all',label:'הכל'},
        {value:'orders',label:'הזמנות'},
        {value:'priceOffer',label:'הצעות מחיר'},
        {value:'deliveryOrder',label:'תעודות משלוח'},
        {value:'aiInvoice',label:'חשבוניות מס'},
        {value:'ciInvoice',label:'חשבוניות מס מרכזות'},
        {value:'returnOrders',label:'החזרות'},
    ],

    selectedDocument:'all',
    setSelectedDocument:(value) => {
        set({selectedDocument:value})
        get().getItems()
    },
    documentType:'',
    setDocumentType:(value) => set({documentType:value}),
    handleSearchClick:() => {

    },
    searchValue: '',
    setSearchValue: (value) => {set({searchItemsValue:value})},
    downloadDocument: (id,value) => {

    },
    handleRestoreCartFunction: () => {

    },
    //========================================



    //========== DATA ===============

    items:[],
    clearItems:() => set({items:[]}),
    getItems: async () => {
        set({loading:true})
        try {
            let response = null
            console.log('get().documentType',get().documentType)
            if(get().documentType === 'document') {
                 response = await DocumentsService.GetDocuments(getClientExtId(), get().selectedDocument ,  moment(get().dateFrom).format('YYYY-MM-DD'), moment(get().dateTo).format('YYYY-MM-DD'), get().page)
                 set({items:response['hydra:member']})
                 const {totalPages, page, lastPage, nextPage, previousPage} = HydraHandler.paginationHandler(response)
                 set({totalPages, page, lastPage, nextPage, previousPage})
            } else if(get().documentType === 'history') {
                 response = await DocumentsService.GetHistory(getClientExtId(), moment(get().dateFrom).format('YYYY-MM-DD'), moment(get().dateTo).format('YYYY-MM-DD'))
                 set({items:response['hydra:member']})
                 const {totalPages, page, lastPage, nextPage, previousPage} = HydraHandler.paginationHandler(response)
                 set({totalPages, page, lastPage, nextPage, previousPage})
            } else if(get().documentType === 'kartesset') {
                 response = await DocumentsService.GetKartesset(getClientExtId(),moment(get().dateFrom).format('YYYY-MM-DD'), moment(get().dateTo).format('YYYY-MM-DD'))
                 set({items:response?.lines['hydra:member']})
                 const {totalPages, page, lastPage, nextPage, previousPage} = HydraHandler.paginationHandler(response)
                 set({totalPages, page, lastPage, nextPage, previousPage})
            } 

        } catch(e) {
            console.error('[ERROR] fetch documents',e)
        } finally {
            set({loading:false})
        }
    },

    orderItems:[],
    getOrderItems: async (id) => {
        set({loading:true})
        try {
            let response = null
            console.log('get().documentType',get().documentType)
            if(get().documentType === 'documentItem') {
                 response = await DocumentsService.GetDocumentsItem(id)
                 set({orderItems:response})
            } else if(get().documentType === 'history') {
                 response = await DocumentsService.GetHistoryItem(id)
                 set({orderItems:response})
            } 

        } catch(e) {
            console.error('[ERROR] fetch documents',e)
        } finally {
            set({loading:false})
        }
    }


    //===============================

}))

export default useDocuments;