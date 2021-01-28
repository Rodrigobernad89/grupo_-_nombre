$( document ).ready(function() {
 

	var url = window.location;
	// SUBMIT FORM
    $("#login_usuario").submit(function(event) {
        // Prevent the form from submitting via the browser.
        console.log('prevent ****')
		event.preventDefault();
		ajaxPost();
	});
    
    function ajaxPost(){
    	// PREPARE FORM DATA
    		let email = $("#email").val();
    		let password = $("#password").val();
    	fetch('/users/login',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({email:email,password:password})})
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.mensaje == 'error'){
                limpiarFormularioUsuarios();
                $('.toast').toast('show');
                console.log('error')
            }else{
                location.href='/products';
            }
           
        })
    }
    var limpiarFormularioUsuarios = function() {
        $("#login_usuario")[0].reset();
}
})
$(document).ready(function(){
    // Hide the Toast
    $(".toast").hide();

    $(".show-toast").click(function(){
        $("#myToast").toast('show');
    });
    $(".hide-toast").click(function(){
        $("#myToast").toast('hide');
    });
    $(".dispose-toast").click(function(){
        $("#myToast").toast('dispose');
    });
})