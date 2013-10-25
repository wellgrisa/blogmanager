// $(function() {
//   $('.btn').click(function(e) {    
//     $('#source').quicksand( $('#destination li') );
//     e.preventDefault();
//   })
// });

(function($) {
  $.fn.sorted = function(customOptions) {
    var options = {
      reversed: false,
      by: function(a) { return a.text(); }
    };
    debugger;
    $.extend(options, customOptions);
    $data = $(this);
    arr = $data.get();
    arr.sort(function(a, b) {
      var valA = options.by($(a));
      var valB = options.by($(b));
      if (options.reversed) {
        return (valA < valB) ? 1 : (valA > valB) ? -1 : 0;        
      } else {    
        return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;  
      }
    });
    return $(arr);
  };
})(jQuery);

// DOMContentLoaded
$(function() {

  $("[data-toggle='popover']").popover({ html : true });


  // get the first collection
  var $avatars = $('#avatars');

  // clone avatars to get a second collection
  var $data = $avatars.clone();



  
  $('#bravi').click(function(e) {    

    var $filteredData = $data.find('li');

    var $sortedData = $filteredData.sorted({
      by: function(v) {        
        return $(v).find('strong').text().toLowerCase();
      }
    });

          // finally, call quicksan
          $avatars.quicksand( $sortedData, {            
            duration: 800,
            easing: 'easeInOutQuad'
          });


        });

  $('#women').click(function(e) {    

    var $filteredData = $data.find('.female').closest('li');

          // finally, call quicksand
          $avatars.quicksand( $filteredData, {            
            duration: 800,
            easing: 'easeInOutQuad'
          });


        });




  $('#people').click(function(e) {    

    var $filteredData = $data.find('li[data-type=' + 'People' + ']');



          // finally, call quicksand
          $avatars.quicksand( $filteredData, {            
            duration: 800,
            easing: 'easeInOutQuad'
          });


        });

  $('#all').click(function(e) {    

    var $filteredData = $data.find('li');



          // finally, call quicksand
          $avatars.quicksand( $filteredData, {            
            duration: 800,
            easing: 'easeInOutQuad'
          });


        });


  $('#btnAdd').click(function(e) {      
    ajaxSave();
  });

  $('#btnEdit').click(function(e) {      
    ajaxSave();
  });

  $('#add-topic').click(function(){
    $('#form-topics').append('<div class="form-group"><div class="col-lg-4"><select class="week form-control"><option value="1">1st Week</option><option value="2">2nd Week</option><option value="3">3rd Week</option><option value="4">4th Week</option><option value="5">5th Week        </option></select></div><div class="col-lg-6"><input id="inputTopic" type="text" placeholder="Topic" name="topic" value="" class="form-control"></div><div class="col-lg-2"><div class="btn-group btn-group-justified"><a id="save-topic" href="#" class="btn btn-info">Save</a><a id="delete-topic" href="#" class="btn btn-info">Delete</a></div></div></div>');
  });

  $('#abc').click(function(){

    var data = $('input', '#form-topics').serializeArray();

    data.push({ name : 'week', value : $('.week').val() });

    jQuery.ajax('/topic', {
      data : data,
      type : 'POST',
      dataType: 'jsonp',
    }
    , function (data, textStatus, jqXHR) {
      console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR);
    }).done(function() {
      window.location = '/people/list'
    });
  });

});

function ajaxSave () {

  var person = $('#form-person').serializeArray();  

  person.push({ name : 'topics', value : [{ subject : $('#inputTopic').val(), week: $('.week').val() }] });

  jQuery.ajax($('#form-person').attr('action'), {
    data : person,
    type : 'POST',
    dataType: 'jsonp',
  }
  , function (data, textStatus, jqXHR) {
    console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR);
  }).done(function() {
    window.location = '/people/list'
  });
}
