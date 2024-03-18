const fs= require('fs');


console.log("First Line");
const data = fs.readFileSync('file1.txt');

console.log("File1 Data is-> " + data);

const data1 = fs.readFileSync('file2.txt');

console.log("File1 Data is-> " + data1);


console.log("Last Line")