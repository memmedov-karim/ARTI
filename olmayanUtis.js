const fs = require('fs');
const realData = require('./general.json');
//Umumi datadan utis kodları götürüb
function extractFromObj(general){
    const data = [];
    for(let i of general){
        data.push(String(i["Utis"]));
    }
    return data
}
function findUtisFromLine(line){
    const utis = line.slice(37, 44);
    return utis.trim();
}
//Qeydiyyatda olmayan utis kodları tapır
function detectIllegalUtis(file){
    const data = fs.readFileSync(`./${file}`).toString().split('\n');
    const legalUtisData = extractFromObj(realData);
    // console.log(legalUtisData)
    const illegalUtis = [];
    for(let line of data){
        if(!legalUtisData.includes(findUtisFromLine(line))){
            illegalUtis.push(findUtisFromLine(line));
            console.log(`Problem detected at line:${data.indexOf(line)},UTIS:${findUtisFromLine(line)}`);           
        }
    }
    return illegalUtis;
}
console.log(detectIllegalUtis("./m.txt"))
