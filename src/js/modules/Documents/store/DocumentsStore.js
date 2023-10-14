import { create } from 'zustand'
import { DocsService } from '../services/docs.services';
import { getCurrentUserId, getUserId } from '../../Auth/helpers/getCurrentUserId';
import moment from 'moment-timezone';
const useDocuments = create((set, get) => ({
    urlNav : '/docsNew/',
    loading: false,
    activeTab: 0,
    setActiveTab: (tab) => set({activeTab: tab}),
    showCalendar: false,
    type:'',
    setShowCalendar: (type) => {
        if(type === 'from') {
            set({showCalendar: true, type, choosedDate: get().dateFrom})
        }

        if(type === 'to') {
            set({showCalendar: true, type, choosedDate: get().dateTo})

        }
    },
    dateFrom: new Date(),
    setDateFrom: (value) => {
        set({dateFrom: value})
    },
    dateTo: new Date(),
    setDateTo: (value) => {
        console.log('value',value)
        set({dateTo: value})
    },
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
    documentTypes:[],
    documentType:'',
    setDocumentType: (type) => set({documentType: type}),
    searchActive:false,
    documents:[],
    total:0,
    page:1, 
    setPage: (page) => set({page}),
    paginateObj: null,
    downloadFile: () => {},
    GetDocuments: async (page) => {
        set({page})
        set({loading: true})
        try {
            const response = await DocsService.
            GetDocuments(
                getCurrentUserId(), 
                getUserId(), 
                get().search, 
                get().documentType,
                moment(get().dateFrom).format('DD/MM/YYYY'),
                moment(get().dateTo).format('DD/MM/YYYY'),
                new Date(),
                page ? page : get().page
            )
    
            if(response.status === 'success') {
                
                set({
                    documents: response.data.paginateObj.array,
                    documentTypes: response.data.selectBox,
                    paginateObj: response.data.paginateObj.paginateObj
                })
            }
        } catch(e) {
            console.error("[Documents] Error fetch" , e)
        } finally {
            set({loading: false})
        }

    },
    DocumentItems:[],
    GetDocumentItem: async (documentNumber) => {
        set({loading: true})
        try {
            const response = await DocsService.GetDocumentsItem(documentNumber)
            if(response.status === 'success') {
                set({
                    DocumentItems: response.data.products,
                    documentsItemsLength: response.data.products?.length,
                    documentsItemsSum: response.data.products?.reduce((accumulator, product) => {return accumulator + product.total;}, 0),
                    documentsItemsDiscount: response.data.totalPrecent, 
                    documentsItemsPriceAfterDiscount: response.data.totalAfterDiscount, 
                    documentsItemsTax: response.data.totalTax, 
                    documentsItemsTotalAfter: response.data.totalPriceAfterTax, 
                })
            }
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
            const response = await DocsService.GetCartesset(getCurrentUserId(), moment(get().dateFrom).format('DD/MM/YYYY'),moment(get().dateTo).format('DD/MM/YYYY'))
            if(response.status === 'success') {
                set({kartessetItems:response.data.lines})
            }
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
    

}))

export default useDocuments;