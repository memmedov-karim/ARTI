    // const Ad = line.slice(0, 12);
    // const Soyad = line.slice(12, 26);
    // const Ata = line.slice(26, 37);
    // const Utis = line.slice(37, 44);
    // const Sinif = line.slice(44, 46);
    // const SinifIndex = line[46];
    // const TestVariant = line[47];
    // const Bölmə = line[48];
    // const Fənn = line[49];
    // const MəktəbKodu = line.slice(50, 55);
    // const Telefon = line.slice(55, 65);
    // const Qrup = line[65];
    // const Cins = line[66];
    // const Cavablar = line.slice(67, 92);
const fs = require("fs")
function findUtisFromLine(line){
    const utis = line.slice(37, 44);
    return utis.trim();
}
function findIndexAndDetect(line){
    const indexK = line.indexOf("K");
    const indexQ = line.indexOf("Q");
    const section = line[48];
    const subject = line[49];
    const numsData = ["0","1","2","3","4","5","6","7","8","9"];
    if((indexK!==66 && indexK>60) || (indexQ!==66 && indexQ>60) || numsData.includes(section) || numsData.includes(subject)){
        return true
    }
    return false
}
//Butun surusmeleri tapir txt filedan
function DetectAllSlidingFromTxt(file){
    const data = fs.readFileSync(`./${file}`).toString().split('\n');
    let checked = false;
    for(let i of data){
        if(findIndexAndDetect(i)){
            checked = true;
            console.log(`Sürüşmə tapıldı:${data.indexOf(i)},Utis:${findUtisFromLine(i)}`);
        }
    }
    if(!checked){
        console.log("Hərşey əladı,sürüşmə yoxdu")
    }
}
DetectAllSlidingFromTxt("elnnew.txt")