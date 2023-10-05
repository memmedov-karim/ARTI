const fs = require("fs");
const realData = require('./general.json');
const json2xls = require('json2xls');
function smUt(ut,data){
  let cn = 0;
  for(let i of data){
    if(i["UTİS"]===ut){
      cn+=1
    }
  }
  return cn
}
// for(let i of realData){
//   if(smUt(i["UTİS"],realData)>1){
//     console.log(i["UTİS"])
//   }
// }
//Umumi datadan utis kodları götürüb
function extractFromObj(general){
    const data = [];
    for(let i of general){
        data.push(String(i["UTİS"]));
    }
    return data
}
//Bir setirden utis kodu tapır
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
// console.log(realData)
//Hansisa setirde surusme varsa tapir
function DetectSlidingAtLine(line){
    if (
      line[66] === "K" ||
      line[66] === "Q" ||
      line[66] === "*" ||
      line[66] === "-" ||
      line[66] === " "
    ) {
      return true;
    }
    return false;
};
//Butun surusmeleri tapir txt filedan
function DetectAllSlidingFromTxt(file){
    const data = fs.readFileSync(`./${file}`).toString().split('\n');
    for(let i of data){
        if(!DetectSlidingAtLine(i)){
            console.log(`Sliding detected at line:${data.indexOf(i)},UTIS:${findUtisFromLine(i)}`);
        }
    }
}
function detecNumOfUtis(utis,txtFile){
  const data = fs.readFileSync(`./${txtFile}`).toString().split('\n');
  let numOfUtis = 0;
  for(let i of data){
    if(utis === findUtisFromLine(i)){
      numOfUtis+=1
    }
  }
  return numOfUtis
}
//Txt file da olan eyni utis kodlari tapir
function detectSameUtis(txtFile){
  const data = fs.readFileSync(`./${txtFile}`).toString().split(`\n`);
  const problems = [];
  let checked = false;
  for(let i of data){
    if((detecNumOfUtis(findUtisFromLine(i),txtFile))>1){
      checked = true
      console.log(`UTIS:${findUtisFromLine(i)},REPEATED:${(detecNumOfUtis(findUtisFromLine(i),txtFile))}`)
    }
  }
  if(!checked){
    console.log("Everything is good!")
  }
}
// detectSameUtis("ZERDAB.txt")
// console.log(detecNumOfUtis("4102514","ZERDAB.txt"))
// DetectAllSlidingFromTxt("ZERDAB.txt");

function convertlinetoobject(line){
    const Ad = line.slice(0, 12);
    const Soyad = line.slice(12, 26);
    const Ata = line.slice(26, 37);
    const Utis = line.slice(37, 44);
    const Sinif = line.slice(44, 46);
    const SinifIndex = line[46];
    const TestVariant = line[47];
    const Bölmə = line[48];
    const Fənn = line[49];
    const MəktəbKodu = line.slice(50, 55);
    const Telefon = line.slice(55, 65);
    const Qrup = line[65];
    const Cins = line[66];
    const Cavablar = line.slice(67, 92);
    const TələbəData = {
      Ad: Ad,
      Soyad: Soyad,
      Ata: Ata,
      Utis: Utis,
      Sinif: Sinif,
      SinifIndex: SinifIndex,
      TestVariant: TestVariant,
      Bolme: Bölmə,
      Fenn: Fənn,
      MktbKodu: MəktəbKodu,
      Telefon: Telefon,
      Qrup: Qrup,
      Cins: Cins,
      Cavablar: Cavablar,
    };
    return TələbəData;
};

function converttoobjandpusharray(array){
    const ArrayWithObj = [];
    for (let i of array) {
      ArrayWithObj.push(seperate(i));
    }
    return ArrayWithObj;
};
function creatclearjson(file, data){
    const jsonString = JSON.stringify(data);
    fs.writeFile(file, jsonString, (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    });
  };
function writedatatojsonfile(file, data){
    const jsonString = JSON.stringify(data);
    fs.writeFile(file, jsonString, (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    });
  };
function converttoobjandpusharray(array){
    const ArrayWithObj = [];
    for (let i of array) {
      ArrayWithObj.push(convertlinetoobject(i));
    }
    return ArrayWithObj;
  };
// writedatatojsonfile('./test.json',converttoobjandpusharray(fs.readFileSync(`./ZERDAB.txt`).toString().split('\n')))

// const jsonData = fs.readFileSync('./test.json', 'utf8');
// const data = JSON.parse(jsonData);

// const xls = json2xls(data);

// fs.writeFileSync('data.xlsx', xls, 'binary')
// console.log(convertlinetoobject(fs.readFileSync(`./ZERDAB.txt`).toString().split('\n')[0]))
// console.log(fs.readFileSync(`./ZERDAB.txt`).toString().split('\n')[0])