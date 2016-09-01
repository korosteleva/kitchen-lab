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
      email: {
        email: true
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


      if (currentIndex === 0) {
        $('.wizard > .content').css('min-height', 320);
      }

      if (form.valid() && currentIndex === 4 && newIndex === 5) {

          $.post({
            url:"/kitchen/kitchen-lab.php",
            data:form.serialize(),
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
    $('html, body').animate({ scrollTop: $(".js-apply").offset().top - 80 }, 'slow');
  });

  $('.js-to-kitchen').on('click', function (evt) {
    evt.preventDefault();
    $('html, body').animate({ scrollTop: $(".js-kitchen-logo").offset().top - 80 }, 'slow');
  });


  // project form
  var projectForm = $('#projectForm');
  projectForm.validate({

    errorPlacement: function errorPlacement(error, element) {
      return true;
    },

    rules: {
      phone: {
        required: true
      },
      email: {
        email: true
      }
    }
  });

  projectForm.on('submit', function (evt) {
    evt.preventDefault();
    if (projectForm.valid()) {
      var formData = projectForm.serialize();
      var formToSubmit = new FormData();

      formToSubmit.append("name", projectForm[0][0]['value']);
      formToSubmit.append("phone", projectForm[0][1]['value']);
      formToSubmit.append("email", projectForm[0][2]['value']);
      formToSubmit.append("project", projectForm[0][3]['files'][0]);

      $.ajax({
        url : '/kitchen/send-project.php',
        type : 'POST',
        data : formToSubmit,
        processData: false,
        contentType: false,
        success : function(data) {
          projectForm.closest('.modal-body').html('<div class="alert alert-success">' +
              'Спасибо! Наш менеджер свяжется с вами в ближайшее время.' +
              '</div>');
        },
        error: function(error) {
          projectForm.closest('.modal-body').html('<div class="alert alert-error">' +
              'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.' +
              '</div>');
        }
      });

    }
  });

  var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: true
  });

}());