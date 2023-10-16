const fileSystem= require('fs');
const path= require('path');

const FILEPATH= path.join(__dirname,'..','files','writing.txt');
//fileSystem.readfile('./files/starter.txt', 'utf8' , (err,data) => {})
fileSystem.readFile(FILEPATH, 'utf8' ,(err,data) =>{ 
    if (err) throw err;
    console.log(data);
    console.log(data.toString());
})

//checking which loads first
console.log('I load ');



const newFILEPATH= path.join(__dirname,'..','files','writing_new.txt')

const write_data="this will be the data replaced";

const append_data="\n\nHey it is appended";




fileSystem.writeFile(FILEPATH, write_data , (err)=> {
    if (err) throw err;
    console.log('Writing task accomplished');

    fileSystem.appendFile(FILEPATH, append_data , (err)=>{
        if(err) throw err;
        console.log("Appending task accomplished"); 

        fileSystem.rename(FILEPATH, newFILEPATH, (err)=>{
            if(err) throw err;
            console.log("Renaming Completed");
        });

        });
    });




//exit on uncaught errors
process.on('uncaughtException',err => {
    console.error('Khai k error ho :',err);
    process.exit(1);
})