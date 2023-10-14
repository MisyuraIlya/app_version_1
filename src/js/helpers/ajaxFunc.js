export  const ajax = (value) => {

    if(localStorage.agent && JSON.parse(localStorage.getItem("agent")).Id){
      if(value.val.agentId){
        value.val.agentId = JSON.parse(localStorage.getItem("agent")).Id;
      }
    }

    return $.ajax({
      url: entry + '/app/app_data.php',
			type: 'POST',
			data: value,

      // contentType: false,
      // processData: false,
      // cache: false,
      
		}).done(function(data) {
		}.bind(this)).fail(function() {
      console.log('error');
    });
}