'use strict'

$(document).ready(function() {

  // http endpoint for lambda function 'add_approve'
  //const lambdaPostUrl = 'https://yxe3zhpuc0.execute-api.us-west-2.amazonaws.com/dev/';

  // page elements
  const $uoIdField = $('#uoId');
  const $numHoursField = $('#numHours');
  const $dateField = $('#date');
  const $proctorField = $('#proctor');
  const $submitButton = $('#submit');
  const $responseField = $('#responseField');
  const formHours = document.getElementById('formHours');

  // check form inputs aren't empty - for browser that don't support 'required' attribute
  function checkForm(form) {
    // get all the inputs within the submitted form
    var inputs = form.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
      // only validate the inputs that have the required attribute
      if(inputs[i].hasAttribute("required")){
        if(inputs[i].value == ""){
          // found an empty field that is required
          alert("Please fill all required fields");
          return false;
        }
      }
    }
    return true;
  }

  // function called on submitHours btn press
  function submitHours(){

    //get values from form inputs
    const uoId = $uoIdField.val();
    const numHours = $numHoursField.val();
    const date = $dateField.val();
    const proctor = $proctorField.val();

    //put values into object
    const postData = {
      "uoId": uoId,
      "numHours": numHours,
      "date": date,
      "proctor": proctor
    };

    console.log(postData);

    if (checkForm(formHours)){
      $.ajax({
        url: 'https://yxe3zhpuc0.execute-api.us-west-2.amazonaws.com/dev/',
        type: 'POST',
        crossDomain: true,
        contentType: "application/json",
        data: JSON.stringify(postData),
        dataType: 'json',
        success: function(response){
          console.log("fucking finally it works:");
          console.log(JSON.stringify(response));
        },
        error: function(jqXHR, status, errorThrown ){
          console.log("jqXHR:");
          console.log(JSON.stringify(jqXHR));
          console.log("status:");
          console.log(status);
          console.log("errorThrown:");
          console.log(errorThrown);
        }
      });
    }
  }

  // button submit
  $submitButton.click(submitHours);
});
