
//gET RANDOM PLACE FROM GOOGLE SHEETS API 
const { GoogleSpreadsheet } = require('google-spreadsheet');

const getSpreadSheet = async function(creds, spreadSheetId){
  const doc = new GoogleSpreadsheet(spreadSheetId);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo(); // loads document properties and worksheets
  console.log("doc =>", doc)
  return doc;
}    
    
export default function  handler(req, res) {    
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ name: 'John De' }))
}