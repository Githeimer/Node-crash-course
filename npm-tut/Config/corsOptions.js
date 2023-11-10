const whitelist=['https://www.google.com',
'http://127.0.0.1:5500',
'http://localhost:3500'];

const corsOptions ={
    origin:(origin,callback) =>{ //origin is the value from the whitelist array above
        if(whitelist.indexOf(origin) !== -1 || !origin) //remove !origin and localhosts after development
        {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS, get yourself into whitelist'));}
          },
          optionSuccessStatus:200
        }

        module.exports=corsOptions;