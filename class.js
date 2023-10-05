const fs = require("fs");
const realData = require('./general.json');

function find(line,clas){
    const utis = line.slice(37, 44);
    const data = realData.find(o=>String(o["ÜTİS"])===utis);
    if(data){
        const classs = "0"+String(data["Sinfi"]);
    if(clas!==classs){
        console.log(`Utis:${utis};(${clas}->${classs}})`)
    }
    }
}
function res(file){
    const data = fs.readFileSync(`./${file}`).toString().split('\n');
    for(let i of data){
        find(i,i.slice(44, 46)); 
    }
}
res("elnnew.txt") 