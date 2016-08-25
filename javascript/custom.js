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

    onStepChanging: function (event, currentIndex, newIndex) {

      if (currentIndex === 4 && newIndex === 5) {
        if (form.valid()) {
          console.log(form.serializeArray());
          return true;
        }
      }

      return form.valid();
    }
  });


  $('.header__apply').on('click', function (evt) {
    evt.preventDefault();
    $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
  });

}());