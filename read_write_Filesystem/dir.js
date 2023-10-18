const fs =require('fs');


if (!fs.existsSync('../new'))
{
fs.mkdir('../new',(err)=>
{
    if (err) throw err; 
    console.log('Banyo');
       
});
}

if(fs.existsSync('../new'))
{
    fs.rmdir('../new',(err)=>
    {
        if(err) throw err;
        console.log('Directory removed');
    })
}

// //exit on uncaught error
// process.on('uncaughtException',err => {
//     console.error('Khai k error ho :',err);
//     process.exit(1);
// })
