const csv=require('csvtojson');
const csvFilePath='G:/Intraweb/UploadData.csv';
const stringify = require( 'csv-stringify');
const fs = require( 'fs' );

var jsonData;
var exeData=[];

csv().fromFile(csvFilePath).then((jsonObj)=>{
  convertJsonToReportCsv(jsonObj);
});



const convertJsonToReportCsv = (rawStoryInfo)=>{

  let uniqueStoryInfo={};
  
  rawStoryInfo.forEach(record => {
    uniqueStoryInfo[record.Exe]=[];
  });
  
  rawStoryInfo.forEach(record => {
    uniqueStoryInfo[record.Exe].push(record);
  });
//  console.log(uniqueStoryInfo['1000']);
  
  convertObjectToCsvFile(uniqueStoryInfo);

}

const convertObjectToCsvFile = (rawStoryInfo)=>{
  
//  let put = "Team,DevelopmentStatus,Exe,Tracker,Status,PatternId,Subject,StartDate,EndDate,StartDate ,EndDate,Status,StartDate,EndDate,Status\n";
  
  /*Object.keys(rawStoryInfo).forEach(exeKey => {
    rawStoryInfo[exeKey].forEach(record =>{
      put += record.Team+","+record.DevelopmentStatus+","+record.Exe+","+record.Tracker+","+record.Status+","+record.PatternId+
      ","+record.Subject+","+record.StartDate+","+record.EndDate+","+record.Status+","+record.StartDate+","+
      record.EndDate+","+record.Status+","+record.StartDate+","+record.EndDate+","+record.Status+"\n"
    });
  });
  
  fs.writeFile('myolds.csv', put, (err) => {
    if (err) throw err;
    console.log('my.csv saved.');
  });*/
  
  let put = "Team,DevelopmentStatus,Exe,Tracker,Status,PatternId,Subject,StartDate,EndDate,StartDate ,EndDate,Status,StartDate,EndDate,Status\n";
  Object.keys(rawStoryInfo).forEach(exeKey => {
    rawStoryInfo[exeKey].forEach((record,pos) =>{
      if(pos == 0){
        put += record.Team+","+record.DevelopmentStatus+","+record.Exe+","+record.Tracker+","+record.Status+","+record.PatternId+
        ","+record.Subject+",";
      }
      
      put += record.StartDate+","+record.EndDate+","+record.Status;

      if(pos !== rawStoryInfo[exeKey].length-1){
        put += ",";
      }
    });
    put += "\n";
  });
  
  
  
//  put += "1000, success, acap.dpr, 01/12, 05/12, 01/01, 06/01";
  
  fs.writeFile('mys.csv', put, (err) => {
    if (err) throw err;
    console.log('my.csv saved.');
  });
  
  let data = [];
  let columns = {
      Team:'Team',
      DevelopmentStatus:'Development Status',
      Exe:'Exe',
      Status:'Status',
      PatternId:'PatternId',
      Subject:'Subject',
      StartDate:'StartDate',
      EndDate:'EndDate',
      StartDate:'StartDate', 
      EndDate:'EndDate',
      Status:'Status',
      StartDate:'StartDate',
      EndDate:'EndDate',
      Status:'Status'

  };

  for (var i = 0; i < 10; i++) {
    data.push([i, 'Name ' + i]);
  }

  stringify(data, { header: true, columns: columns }, (err, output) => {
    if (err) throw err;
//    fs.writeFile('my.csv', output, (err) => {
//      if (err) throw err;
//      console.log('my.csv saved.');
//    });
  });
  
}