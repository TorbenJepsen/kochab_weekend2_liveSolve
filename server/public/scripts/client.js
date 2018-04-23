console.log( 'js' )

let doMathNow = () => {
    console.log( 'in doMathNow' );
    // target elements with ids of xIn and yIn and get their val
    // create object to send
    let objectToSend = {
        x: $( '#xIn ').val(),
        y: $( '#yIn ').val()
    } // end objectToSend
    console.log( objectToSend );
} // end doMathNow

let readyNow = () => {
    console.log( 'JQ' );
    // click handler for element with id of doMathButton
    $( '#doMathButton' ).on( 'click', doMathNow );
} // end doc ready

$( document ).ready( readyNow );