// requires
let express = require( 'express' );
let app = express();
let bodyParser = require( 'body-parser' );

// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

// globals
const port = 23456;

// spin up server
app.listen( port, function(){
    console.log( 'server up on:', port );
}); // end server up