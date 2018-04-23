console.log( 'js' )

let currentType = '';
let currentX = '';
let currentY = '';

let updateTextOut = () =>{
    let el = $( '#textOut' );
    el.empty();
    el.val( currentX + ' ' + currentType + ' ' + currentY );
} // updateTextOut

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
        // target textOut by ID, empty, set val to answer
        let el = $( '#textOut' );
        el.empty();
        el.val( response.answer );
    }) // end ajax
} // end answerMeThis

let doMathNow = () => {
    if( currentX === '' || currentY === '' || currentType === '' ){
        alert( 'I don\'t understand!' );
    } // end I gotz empties
    else{
        console.log( 'in doMathNow' );
        // target elements with ids of xIn and yIn and get their val
        // create object to send
        let objectToSend = {
            x: currentX,
            y: currentY,
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
            clearAll();
        }) // end ajax
    } // end no empties
} // end doMathNow

let clearAll = () =>{
    console.log( 'in clearAll' );
    currentX = '';
    currentY = '';
    currentType = ''
    updateTextOut();
} // end clearAll

function setNumber(){
    console.log( 'in setNumber' );
    if( currentType === ''){
        // if type is not set, append to X
        currentX += $( this ).text();
    } // end append to X
    else{
        // if type is set append to Y
        currentY += $( this ).text();
    } // end append to Y
    updateTextOut();
} // end setNumber  

function setOperator(){
    console.log( 'in setOperator:', $( this ).text() );
    currentType = $( this ).text();
    updateTextOut();
} // end setOperator

let readyNow = () => {
    console.log( 'JQ' );
    // click handler for element with id of doMathButton
    $( '#doMathButton' ).on( 'click', doMathNow );
    $( '#goAwayButton' ).on( 'click', clearAll );
    $( '.operatorTypeButtonThing' ).on( 'click', setOperator );
    $( '.numberButton' ).on( 'click', setNumber );
    historyNow();
} // end doc ready

$( document ).ready( readyNow );