const fs = require('fs');

// fs.readFile('./data.txt',{encoding : 'utf8'}, (err,data) => {
//     console.log('Error: ',err);
//     console.log('Data: ',data);
// });
fs.watchFile('./data.txt',(current, previous)=>{
    console.log('File change');
});

const data = new Uint8Array(Buffer.from('Node.js'));
fs.writeFile('./data.txt', data, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});



