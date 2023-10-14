export const ajaxService = async (value) => {

    try {
        if(localStorage.agent && JSON.parse(localStorage.getItem("agent")).Id){
        if(value?.val?.agentId){
            value.val.agentId = JSON.parse(localStorage.getItem("agent")).Id;
        }
        }
        let res = await $.ajax({
        url: entry + '/app/service.php',
                type: 'POST',
                data: value,
        })
        return res
    } catch(e) {
      console.log('[error ajax]',e )
    }

}