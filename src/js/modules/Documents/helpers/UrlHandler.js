export const UrlHandler = {
    createUrl(locationSearch,page,from,to,documentType,search){
        const urlSearchParams = new URLSearchParams(locationSearch);
        if(from && !urlSearchParams.get('from')) {
            urlSearchParams.set('from', from);
        }
        if(to && !urlSearchParams.get('to')){
            urlSearchParams.set('to', to);
        }
        if(documentType && !urlSearchParams.get('documentType')){
            urlSearchParams.set('documentType', documentType);
        }
        if(search && !urlSearchParams.get('search')) {
            urlSearchParams.set('search', search);
        }
        if(page && !urlSearchParams.get('page')){
            urlSearchParams.set('page', page);
        }
        const updatedUrl = '?' + urlSearchParams.toString();
        console.log('updatedUrl',updatedUrl)
        return updatedUrl;
    },

    getUrlParams(locationSearch){
        const urlSearchParams = new URLSearchParams(locationSearch);
        const from = urlSearchParams.get('from');
        const to = urlSearchParams.get('to');
        const documentType = urlSearchParams.get('documentType');
        const search = urlSearchParams.get('search');
        const page = urlSearchParams.get('page');
        return {page, from, to, documentType, search}
    },

    isThereParams(locationSearch) {
        const urlSearchParams = new URLSearchParams(locationSearch);
        const from = urlSearchParams.get('from');
        const to = urlSearchParams.get('to');
        const documentType = urlSearchParams.get('documentType');
        const page = urlSearchParams.get('page');
        if(from && to && documentType && page) {
            return true 
        } else {
            return false
        }
    }

}