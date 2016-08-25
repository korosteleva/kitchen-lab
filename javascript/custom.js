(function () {
  var form = $("#example-form");

  form.validate({

    errorPlacement: function errorPlacement(error, element) {
      return true;
    },

    rules: {
      phone: {
        required: true
      },
      name: {
        required: true
      }
    }
  });

  form.children("div").steps({
    headerTag: "h3",
    bodyTag: "section",
    transitionEffect: "slideLeft",
    labels: {
      next: "Продолжить",
      loading: "Загрузка ..."
    },

    onInit: function () {
      form.find('.actions').after('<div class="steps-counter clearfix">шаг <span>1</span> из 5</div>')
    },

    onStepChanging: function (event, currentIndex, newIndex) {

      if (form.valid() && currentIndex === 4 && newIndex === 5) {
          var contentType ="application/x-www-form-urlencoded; charset=utf-8";

          //for IE8,IE9
          if (window.XDomainRequest) {
            contentType = "text/plain";
          }

          $.ajax({
            url:"http://tsm.4each.ru/kitchen-lab.php",
            data:form.serialize(),
            type:"POST",
            dataType:"json",
            contentType:contentType,
            success: function() { },
            error: function(jqXHR, textStatus, errorThrown) {
              console.log('error', jqXHR, textStatus, errorThrown);
            }
          });

        $('.steps-counter').remove();
      } else if (form.valid()) {
        $('.steps-counter').find('span').html( parseInt(newIndex) + 1 );
      }


      return form.valid();
    }
  });

  $('.header__apply').on('click', function (evt) {
    evt.preventDefault();
    $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
  });

}());