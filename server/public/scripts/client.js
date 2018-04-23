console.log( 'js' )

let currentType = '';

let historyNow = () =>{
    console.log( 'in historyNow' );
    // GET call to /history
    $.ajax({
        method: 'GET',
        url: '/history'
    }).then( function( response ){
        console.log( 'back from server with:', response );
        // display on DOM
        let el = $( '#historyOut' );
        el.empty();
        // loop through the array for ul elements
        for( let i=0; i<response.history.length; i++){
            el.append( '<li>' + response.history[i].x + ' ' +
             response.history[i].type + ' ' + response.history[i].y + '</li>' );
        } // end for
    }) // end ajax
} // end historyNow

let answerMeThis = () =>{
    console.log( 'in answerMeThis' ); 
    $.ajax({
        method: 'GET',
        url: '/answer'
    }).then( function( response ){
        console.log( 'back from server with:', response );
        // target #answerOut, clear, and append answer
        let el = $( '#answerOut' );
        el.empty();
        el.append( 'Answer: ' + response.answer );
    })
} // end answerMeThis

let doMathNow = () => {
    if( $( '#xIn ').val() === '' || $( '#yIn ').val() === '' || currentType === '' ){
        alert( 'no empties, yo!' );
    } // end I gotz empties
    else{
        console.log( 'in doMathNow' );
        // target elements with ids of xIn and yIn and get their val
        // create object to send
        let objectToSend = {
            x: $( '#xIn ').val(),
            y: $( '#yIn ').val(),
            type: currentType
        } // end objectToSend
        console.log( 'sending to server:', objectToSend );
        $.ajax({
            method: 'POST',
            url: '/doMath',
            data: objectToSend
        }).then( function( response ){
            console.log( 'back from server with:', response );
            answerMeThis();
            historyNow();
        }) // end ajax
    } // end no empties
} // end doMathNow

let clearAll = () =>{
    console.log( 'in clearAll' );
    $( '#xIn ').val( '' );
    $( '#yIn ').val( '' );
    currentType = '';
} // end clearAll

function setOperator(){
    console.log( 'in setOperator:', $( this ).text() );
    currentType = $( this ).text();
} // end setOperator

let readyNow = () => {
    console.log( 'JQ' );
    // click handler for element with id of doMathButton
    $( '#doMathButton' ).on( 'click', doMathNow );
    $( '#goAwayButton' ).on( 'click', clearAll );
    $( '.operatorTypeButtonThing' ).on( 'click', setOperator );
    historyNow();
} // end doc ready

$( document ).ready( readyNow );