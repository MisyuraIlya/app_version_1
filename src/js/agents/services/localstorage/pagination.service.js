export function fetchPage(history) {
    return history.location.pathname.split('/')[3]
  }

export const fetchUrlWithourPagination = (history) => {
  let splited = history.location.pathname.split('/')
  let result = '/' + splited[1] + '/' + splited[2] + '/'
  return result
}