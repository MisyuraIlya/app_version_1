export const decodeUri = (searchUrl) => {
    const searchParams = new URLSearchParams(searchUrl);
    const decodedParams = {};
    searchParams.forEach((value, key) => {
      decodedParams[key] = value;
    });
    return decodedParams;
}