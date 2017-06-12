$(".registerForm").submit(function(e, data) {
  e.preventDefault();
  $(".registerForm .submit").text("Submitting...");
  console.log("submitting form");
  var name = $("#name").val();
  var phone = $("#phone").val();
  var email = $("#email").val();
  var message = $("#message").val();
  var data = {
    name: name,
    phone: phone,
    email: email,
    message: message
  };
  $.ajax({
    type: "POST",
    url: "/send-enquiry",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(data)
  })
  .done(function(data) {
    $(".form-wrapper").hide();
    $('.form-success').show();
  })
  .fail(function(data) {
    $(".registerForm .submit").text("Try again!!");
  });
});

