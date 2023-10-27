//netlify makes it easy to use serverless functions. Under the hood, it uses AWS's lambda function on AWS's cloud configuration.
//by default, netlify will look inside the netlify folder in our app, and then look in the nested functions folder. 
// Any functions defined here, netlify will build it during the build step => creates correct resources to serve up functions whenever requests get made to them

require("dotenv").config(); //require is like import => is node's way of doing import. Next, config will attach all of the secret variables in the .env file onto our process environment

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // attach variable defined in .env file

// exports.handler is old way of exporting functions
exports.handler = async (event) => { // event is the request and response, similar to how express works

    //make request to stripe server to make a payment
    try {
        const {amount} = JSON.parse(event.body); // destructure the amount off of the event body object
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method_types: ["card"] // array can accept multiple payment types. Only using card here
        });

        //if payment request to stripe is successful, then return the payment intent back to the front end
        return {
            statusCode: 200,
            body: JSON.stringify({paymentIntent}), // data sent to and from web servers needs to be a string
        }
    } catch (error) {
        console.log({error});

        return {
            statusCode: 400,
            body: JSON.stringify({error}),
        };
    };
};

