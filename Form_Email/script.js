let form =document.forms["contact-form"];
let error = document.querySelector(".error");
let success = document.querySelector(".success");
let waitmsg = document.querySelector(".please-wait");
let submitButton = document.querySelector(".submitbtn");



function disableButton(){
    submitButton.disabled =true;
    submitButton.classList.add("disabled");
    waitmsg.innerHTML = "Please wait...";
}

function enableButton(){
    submitButton.disabled = false;
    submitButton.classList.remove("disabled");
    waitmsg.innerHTML = "";
}
function clearError (){
    error.innerHTML="";
    error.style.display= "";

}

function clearForm(){
    form.firstname.value = "";
    form.surname.value= "";
    form.email.value= "";
    form.message.value= "";
    waitmsg.innerHTML= "";
        


setTimeout (function(){
    success.style.display= "";
    success.innerHTML= "";
    submitButton.disabled = false;
    submitButton.classList.remove("disabled");
}, 3000);

}

    form.addEventListener("submit",function (e){
        e.preventDefault();
        let formdata = {
            "name": this.firstname.value,
            "surname": this.surname.value,
            "email": this.email.value,
            "message": this.message.value
         }  

        for (let[key,value] of Object.entries(formdata)){
            if(value === ""){
            error.style.display ="block";
            error.innerHTML = "All fields are required";
            return false;
        }else{
            clearError();
        }
    }

    let JSONdata = JSON.stringify(formdata);

    let http = new XMLHttpRequest();
    http.open("POST","script.php", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send("message="+ JSONdata);
    disableButton();


    http.onload =function(){
        if(this.readyState == 4 && this.status==200){
            let response = this.responseText;
            if(response.indexOf("Error")!= -1){
                error.style.display="block";
                error.innerHTML = response;
                enableButton();
            }else{
                clearError();
                success.style.display = "block";
                success.innerHTML =response;
                clearForm();
            }
        }
    }

});
