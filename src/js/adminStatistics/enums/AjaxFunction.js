import $ from "jquery";
export  const ajax = (value) => {
    value.url = 'https://www.digitrade.host/app/new-api/sync/adminStats/AdminStats.php'
    if(localStorage.role ){
      return $.ajax({
        url:   entry + '/app/service.php',
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
