const realData = require("../general.json");
const fs = require("fs");
function findCent(utis){
  let m = realData.find(ob=>String(ob["Utis"]) === utis);
  if(!m) return "Utis erfdi"
  return m["Mərkəz"]
}
function find(Data) {
  const data = [];
  for (let i of Data) {
    // console.log(i["Utis"])
    if (i["Mərkəz"] === "Sumqayıt, Sumqayıt şəhər 'İstedad' liseyi məktəb (Sumqayıt,5-ci mik. )" && (i["sinif"]===4)) { 
      // console.log(i["Utis"])

      data.push(String(i["Utis"]));
    }
  }
  return data;
}
// console.log(Array.from(new Set(find(realData))));
//SINIF UTIS KITABCADILI
function findUtisFromLine(line) {
  const utis = line.slice(37, 44);
  return utis.trim();
}
//Qeydiyyatda olmayan utis kodları tapır
function detectUtises(file) {
  const data = fs.readFileSync(`../${file}`).toString().split("\n");
  // console.log(legalUtisData)
  const utises = [];
  for (let line of data) {
    utises.push(findUtisFromLine(line));
  }
  return utises;
}
for(let i of detectUtises('m.txt')){
  console.log(findCent(i),i)
}
// console.log(detectUtises("BAKI 14.txt"))
function findGen(big, small) {
  let res = [];
  for (let i of big) {
    if (!small.includes(i)) {
      res.push(i);
    }
  }
  return res;
}
//. console.log(findGen(find(realData),detectUtises("236.txt")).length)
// for(let i of findGen(find(realData),detectUtises("m.txt"))){
//     console.log(i)
// }
// console.log(detectUtises('236.txt'))
