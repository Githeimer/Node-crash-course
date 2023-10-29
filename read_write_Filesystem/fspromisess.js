const fsPromises = require('fs').promises;
const path=require('path');

const FILEPATH= path.join(__dirname,'..','files','starter.txt');

const fileOps = async () => {
    try{
        const data= await fsPromises.readFile(FILEPATH, 'utf8');

        console.log(data);

        await fsPromises.writeFile(path.join(__dirname,'..','files','promiseWrite.txt'),data);
        await fsPromises.appendFile(path.join(__dirname,'..','files','promiseWrite.txt'),'\n\nHi again I am NAN');
        await fsPromises.rename(path.join(__dirname,'..','files','promiseWrite.txt'),path.join(__dirname,'..','files','NewPromise.txt'));

       const NewData= await fsPromises.readFile(path.join(__dirname,'..','files','NewPromise.txt'));
       console.log(NewData.toString());


    }catch (err){
        console.error('error nai error ko sansar',err);
    }
}

fileOps();