/* global $, Stripe */
//document ready function
$(document).on('turbolinks:load', function(){
    var theForm =$('#pro_form');
    var submitBtn= $('#form-submit-btn');
    // set stripe public key
    Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
    
    
    // when user clicks form submit button 
    submitBtn.click(function(event){
        
    // prevent default submission behaviour
        event.preventDefault();
        
    // collect credit card fields
        var ccNum = $('#card_number').val(),
            cvcNum =$('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();
        //send card information to stripe
         Stripe.createToken({
            number : ccNum,
            cvc: cvcNum,
            exp_month: expMonth,
            exp_year: expYear
        }, stripeResponseHandler);
    });
        


//stripe will return back a card token
// injecr card token as hidden feild into form
// submit form to our rails app

});
