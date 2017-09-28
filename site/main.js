'use strict'

function indexScript(){
  $(document).ready(function() {

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

      if (checkForm(formHours)){
        $.ajax({
          url: 'https://yxe3zhpuc0.execute-api.us-west-2.amazonaws.com/dev/',
          type: 'POST',
          dataType: 'text',
          crossDomain: true,
          contentType: 'application/json',
          data: JSON.stringify(postData),
          success: function(response, status, jqXHR){
            console.log("it works:");
            console.log(response);
            $responseField.empty();
            $responseField.append("<p>Succesfully submitted hours for approval</p>");
            formHours.reset();
          },
          error: function(jqXHR, status, errorThrown){
            console.log("error: ");
            console.log(jqXHR['responseText']);
            if(jqXHR['responseText'] === 'badId'){
              $responseField.empty();
              $responseField.append("<p>Invalid UO ID</p>");
            } else {
              $responseField.empty();
              $responseField.append("<p>Unknown error hit up John</p>");
            }
          }
        });
      }
    }


    // button submit
    $submitButton.click(function (e) {
      e.preventDefault();
      submitHours();
    });
  });
}
