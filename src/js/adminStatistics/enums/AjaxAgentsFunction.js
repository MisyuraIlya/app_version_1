import $ from "jquery";

export  const ajaxAgentStats = (value) => {
  value.url = 'https://www.digitrade.host/bfl_b2b/app/new-api/sync/adminStats/AgentStats.php'
  if(localStorage.agent){
    return $.ajax({
      url:  entry + '/app/service.php',
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

}
