const fs = require("fs");
const realData = require('./general.json');
const findSecSub = (utis,section,subject) => {
    const data = realData.find(obj=>String(obj["ÜTİS"]) === utis);
    if(!data){
        console.log(`Utis kod səhfdir-${utis}`);
    }
    else{
        const secGen = data["Sektor"][0];
        // const subGen = data["istiqamet"][0]==="İ" ? "I" : data["istiqamet"][0]==="M" ? "R" : data["istiqamet"][0];
        // console.log(subGen)
        // let secCheck = (secGen===section);
        // let subCheck = (subGen===subject);
        // if(secCheck && !subCheck){
        //     console.log(`Utis-${utis},fenn-(${subject}->${subGen})`)
        // }
        if(section !== secGen){
            console.log(`Utis-${utis},bolme-(${section}->${secGen})`)
        }
        //Ikincisi olmalidir
    }
}
const res = (file) => {
    const data = fs.readFileSync(`./${file}`).toString().split('\n');
    for(let i of data){
        findSecSub(i.slice(37, 44),i[48],i[49]); 
    }
}
res('elnnew.txt')
// findSecSub("3052416","A","R")