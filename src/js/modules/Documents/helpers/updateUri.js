

export const updateUriFilter = (value, urlParameter,  uri) => {
    uri[urlParameter] = value;
    const queryString = `?fromDate=${uri.fromDate}&toDate=${uri.toDate}&search=${uri.search}&filter=${uri.filter}`;
    return queryString
      
}

export const kartessetUri = (value, urlParameter,  uri) => {
    uri[urlParameter] = value;
    const queryString = `?fromDate=${uri.fromDate}&toDate=${uri.toDate}`;
    return queryString
      
}

export const updateUriNew= (fromDate, toDate, search, filter) => {
    const queryString = `?fromDate=${fromDate}&toDate=${toDate}&search=${search}&filter=${filter}`;
    return queryString
}

export const kartessetUriNew = (fromDate, toDate) => {
    const queryString = `?fromDate=${fromDate}&toDate=${toDate}`;
    return queryString
      
}