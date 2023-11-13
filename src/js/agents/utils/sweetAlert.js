import SweetAlert from 'sweetalert2';

export const onSuccessAlert = (title, message) => {
    SweetAlert({
        title: title,
        text: message,
        type: 'success',
        timer: 3000,
        showConfirmButton: false
      })
}


export const onErrorAlert = (title, message) => {
    SweetAlert({
        title: title,
        text: message,
        type: 'error',
        timer: 3000,
        showConfirmButton: false,
      })
}

export const onInfoAlert = (title, message) => {
    SweetAlert({
        title: title,
        text: message,
        type: 'info',
        timer: 3000,
        showConfirmButton: false,
      })
}

export const onAsk = (title, message) => {
    return SweetAlert({
        title: title,
        text:message,
        showCancelButton: true,
        confirmButtonColor: '#3B7A82',
        cancelButtonColor: '#959595',
        confirmButtonText: 'אישור',
        cancelButtonText: 'ביטול'
      }).then(function(res) {
        if (res.value) {
            return true
        } else {
            return false
        }
      })
  };

export const apiResponseHandler = (data) => {
    if(data.status == 'success'){
        onSuccessAlert(data.message, '')
    } else if (data.status == 'info'){
        onErrorAlert(data.message,'')
    } else {
        onErrorAlert(data.message,'')
    }
}