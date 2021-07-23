// Import dependencies
import express from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';

const app = express(); // Init Express instance
app.set('view engine', 'ejs'); // Set Express view engine to EJS 
app.use(cookieParser()); // Bind cookie parser middleware to parse cookies in requests
app.use(express.urlencoded({ extended: false})); // Bind Express middleware to parse request bodies for POST requests
app.use(express.json()); // Bind Express middleware to parse JSON request bodies
app.use(methodOverride('_method')); // Bind method override middleware to parse PUT and DELETE requests sent as POST requests
app.use(express.static('public')); // Expose the files stored in the public folder

const PORT = 3004;
app.listen(PORT);