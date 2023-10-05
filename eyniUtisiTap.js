const fs = require('fs')
function findUtisFromLine(line){
    const utis = line.slice(37, 44);
    return utis.trim();
}
function findNameFromLine(line){
  const name = line.slice(0, 12);;
  return name.trim();
}
function findSurFromLine(line){
  const sur = line.slice(12, 26);;
  return sur.trim();
}
//line.slice(12, 26)
function detecNumOfName(name,sur,txtFile){
  const data = fs.readFileSync(`./${txtFile}`).toString().split('\n');
  let numOfUtis = 0;
  for(let i of data){
    if(name === findNameFromLine(i) && sur===findSurFromLine(i)){
      numOfUtis+=1;
    }
  }
  return numOfUtis
}
function detecNumOfUtis(utis,txtFile){
    const data = fs.readFileSync(`./${txtFile}`).toString().split('\n');
    let numOfUtis = 0;
    for(let i of data){
      if(utis === findUtisFromLine(i)){
        numOfUtis+=1;
      }
    }
    return numOfUtis
  }
  function detectSameName(txtFile){
    const data = fs.readFileSync(`./${txtFile}`).toString().split(`\n`);
    const problems = [];
    let checked = false;
    for(let i of data){
      if((detecNumOfName(findNameFromLine(i),findSurFromLine(i),txtFile))>1){
        checked = true
        problems.push(`UTIS:${findUtisFromLine(i)},REPEATED:${(detecNumOfName(findNameFromLine(i),findSurFromLine(i),txtFile))}`)
        fs.writeFile('./problems.txt',`UTIS:${findUtisFromLine(i)},REPEATED:${(detecNumOfUtis(findUtisFromLine(i),txtFile))}`,(err)=>{
          if(err){
            console.log("err")

          }else{
            console.log("writed")
          }
        })
        // console.log()
      }
    }
    let news = [];
    for(let i of problems){
        if(!news.includes(i)){
            news.push(i)
        }
    }
    for(let i of news){
        console.log(i)
    }
    if(!checked){
      console.log("Everything is good!")
    }
  }
  //Txt file da olan eyni utis kodlari tapir
  function detectSameUtis(txtFile){
    const data = fs.readFileSync(`./${txtFile}`).toString().split(`\n`);
    const problems = [];
    let checked = false;
    for(let i of data){
      if((detecNumOfUtis(findUtisFromLine(i),txtFile))>1){
        checked = true
        problems.push(`UTIS:${findUtisFromLine(i)},REPEATED:${(detecNumOfUtis(findUtisFromLine(i),txtFile))}`)
        fs.writeFile('./problems.txt',`UTIS:${findUtisFromLine(i)},REPEATED:${(detecNumOfUtis(findUtisFromLine(i),txtFile))}`,(err)=>{
          if(err){
            console.log("err")

          }else{
            console.log("writed")
          }
        })
        // console.log()
      }
    }
    let news = [];
    for(let i of problems){
        if(!news.includes(i)){
            news.push(i)
        }
    }
    for(let i of news){
        console.log(i)
    }
    if(!checked){
      console.log("Everything is good!")
    }
  }
// for(let i=0;i<4;i++){
//   fs.writeFileSync("ts.txt",String(i));
// }

// detectSameName("./m.txt")
detectSameUtis("umumi 17.06.txt")