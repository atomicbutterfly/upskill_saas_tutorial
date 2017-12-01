/* global $, Stripe */
//document ready function
$(document).on('turbolinks:load', function(){
    var theForm = $('#pro_form');
    var submitBtn= $('#form-submit-btn');
    // set stripe public key
    Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
    
    
    // when user clicks form submit button 
    submitBtn.click(function(event){
    
    // prevent default submission behaviour
        event.preventDefault();
        submitBtn.val("Processing").prop('disabled', true);
        
    // collect credit card fields
        var ccNum = $('#card_number').val(),
            cvcNum =$('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();
            
            
        // use stripe JS library to check for card errors
        var error = false;
        
        // validate card number.
        if(!Stripe.card.validateCardNumber(ccNum)){
            error = true;
            alert('the credit card number appears to be invalid');
        }
        
    
        
         // validate CVC number
        if (!Stripe.card.validateCVC(cvcNum)){
            error = true;
            alert('the cvc number appears to be invalid');
        }
        
         // validate expiration date
        if (!Stripe.card.validateExpiry(expMonth, expYear)){
            error = true;
            alert('the expiry date appear to be invalid');
    
        }
        
        if (error) {
            //if there are card errors, dont send to stripe
            submitBtn.prop('disabled', false).val("Sign up");
            
            } else {
               
                    // send card info to stripe 
                    //send card information to stripe
                 Stripe.createToken({
                    number : ccNum,
                    cvc: cvcNum,
                    exp_month: expMonth,
                    exp_year: expYear
                }, stripeResponseHandler);
                
            }
        return false;
    });
//stripe will return back a card token.
function stripeResponseHandler(status, response) {
    //get the token from the response
   var token = response.id;
   
   // inject card token as hidden field
   theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );

// submit form to our rails app
    theForm.get(0).submit();
}

});
