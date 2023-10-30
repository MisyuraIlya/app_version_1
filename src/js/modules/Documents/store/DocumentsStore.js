import { create } from 'zustand'
import { DocsService } from '../services/docs.services';
import { getCurrentUserId, getUserId } from '../../Auth/helpers/getCurrentUserId';
import moment from 'moment-timezone';
import { HydraHandler } from '../../../helpers/hydraHandler';
const useDocuments = create((set, get) => ({
    loading: false,
    activeTab: 0,
    setActiveTab: (tab) => set({activeTab: tab}),
    showCalendar: false,
    setType: (value) => set({type: value, showCalendar:true}),
    setShowCalendar: (value) => set({showCalendar: value}),
    dateFrom: new Date(),
    setDateFrom: (value) => {
        set({dateFrom: value})
    },
    dateTo: new Date(),
    setDateTo: (value) => {
        console.log('value',value)
        set({dateTo: value})
    },
    dateFrom: new Date(),
    type:'',
    choosedDate: new Date(),
    handleChangeCalendar: (date) => {
        if(get().type === 'from') {
            set({dateFrom: date, showCalendar: false})
        }

        if(get().type === 'to') {
            set({dateTo:date, showCalendar: false})
        }
    },
    search: '',
    setSearch: (value) => set({search: value}),
    filter:'הכל',
    setFilter: (value) => set({filter:value}),

    documentType:'',
    setDocumentType: (type) => set({documentType: type}),
    searchActive:false,
    documents:[],
    total:0,
    paginateObj: null,
    downloadFile: () => {},
    GetDocuments: async () => {
        set({loading: true})
        try {
            const response = await DocsService.
            GetDocuments(
                getCurrentUserId(), 
                get().documentType,
                moment(get().dateFrom).format('YYYY-MM-DD'),
                moment(get().dateTo).format('YYYY-MM-DD'),
                get().page
            )
            // if(response.status === 'success') {
                
                set({
                    documents: response['hydra:member'],
                    // documentTypes: response.selectBox['hydra:member'],
            //         paginateObj: response.data.paginateObj.paginateObj
                })
                const {totalPages, page, lastPage, nextPage, previousPage} = HydraHandler.paginationHandler(response)
                set({totalPages, page, lastPage, nextPage, previousPage})
            // }
        } catch(e) {
            console.error("[Documents] Error fetch" , e)
        } finally {
            set({loading: false})
        }

    },

    page:1, 
    setPage: (page) => set({page:page}),
    totalPages:1,
    lastPage:1,
    nextPage:1,
    previousPage:1,

    DocumentItems:[],
    GetDocumentItem: async (documentNumber) => {
        set({loading: true})
        try {
            const response = await DocsService.GetDocumentsItem(documentNumber)

            set({
                DocumentItems: response.products["hydra:member"],
                documentsItemsLength: response.products["hydra:totalItems"],
                documentsItemsSum: response.products["hydra:member"]?.reduce((accumulator, product) => {return accumulator + product.total;}, 0),
                documentsItemsDiscount: response.totalPrecent, 
                documentsItemsPriceAfterDiscount: response.totalAfterDiscount, 
                documentsItemsTax: response.totalTax, 
                documentsItemsTotalAfter: response.totalPriceAfterTax, 
            })
        } catch(e) {
            console.error("[Documents] Error fetch" , e)
        } finally {
            set({loading: false})
        }
    },
    documentsItemsLength:0,
    documentsItemsSum:0,
    documentsItemsDiscount:0,
    documentsItemsPriceAfterDiscount:0,
    documentsItemsTax:0,
    documentsItemsTotalAfter:0,
    DownloadXls: async (documentNumber, documentType) => {
        if(documentType === 'pdf') {
            set({pdfViewer:true})
        }
        try {
            set({loading: true})
            const res = await DocsService.DownloadXls(documentNumber, documentType)
            if (res.result == "success") {
                let tmpUrl = entry + '/output/' + res.link;
                set({linkDocument:tmpUrl})

                if(documentType === 'xls') {
                    window.open(tmpUrl, '_blank');
                }
              }

        } catch(e) {
            console.error("[Documents] Error fetch" , e)
        } finally {
            set({loading: false})
        }
    },
    pdfViewer: false,
    setPdfViewer: (bool) => set({pdfViewer: bool}),
    linkDocument:'',
    createNewCart: async (documentNumber) => {
        set({loading: true})
        try {
            const response = await DocsService.CartRestore(getCurrentUserId(),documentNumber)
            console.log('response',response)
            return response;
        } catch(e) {
            console.error("[Documents] Error createNewCart" , e)
        } finally {
            set({loading: false})
        } 
    },
    kartessetItems: [],
    getCartesset: async () => {
        set({loading: true})
        try {
            const response = await DocsService.GetCartesset(getCurrentUserId(), moment(get().dateFrom).format('YYYY-MM-DD'),moment(get().dateTo).format('YYYY-MM-DD'))
            set({kartessetItems:response?.lines["hydra:member"]})
        } catch(e) {
            console.error("[Documents] Error fetch" , e)
        } finally {
            set({loading: false})
        }
    },
    downloadKartesset: async (typeFile) => {
        set({loading: true})
        if(typeFile === 'pdf') {
            set({pdfViewer:true})
        }
        try {
            const response = await DocsService.DownloadCartesset(getCurrentUserId(),typeFile, moment(get().dateFrom).format('DD/MM/YYYY'),moment(get().dateTo).format('DD/MM/YYYY'))
            
            if(response.result === 'success') {
                let tmpUrl = entry + '/output/' + response.link;
                console.log('tmpUrl',tmpUrl)
                set({linkDocument:tmpUrl})

                if(typeFile === 'xls') {
                    window.open(tmpUrl, '_blank');
                }
            }
        } catch(e) {
            console.error("[Documents] Error fetch" , e)
        } finally {
            set({loading: false})
        }
    },
    searchItemsValue: '',
    setSearchItemsValue: (value) => {set({searchItemsValue:value})},

    // GET HISTORY 
    historyItems:[],
    getHistory: async () => {
        set({loading: true})
        try {
            const response = await DocsService.GetHistory(getCurrentUserId(), moment(get().dateFrom).format('YYYY-MM-DD'),moment(get().dateTo).format('YYYY-MM-DD'))
            set({
                historyItems:response["hydra:member"],
            })
        } catch(e) {
            console.error("[Documents] Error fetch" , e)
        } finally {
            set({loading: false})
        }
    },
    historyCardItems:[],
    GetHistoryItem: async (documentId) => {
        set({loading: true})
        try {
            const response = await DocsService.GetHistoryItem(documentId)
            console.log('response',response)
            set({historyCardItems:response})
        } catch(e) {
            console.error("[Documents] Error fetch" , e)
        } finally {
            set({loading: false})
        }
    },

}))

export default useDocuments;