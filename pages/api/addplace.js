const { GoogleSpreadsheet } = require('google-spreadsheet');

//api route 
export default async function handler(req, res) {
   if (req.method === 'POST') {

    try {
        const data = req.body
        //connect to google sheets and save
        const submissionSheetIndex = 8;
        await addSubmission(data, submissionSheetIndex)

        //respond to the frontend...
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end()
    } catch (error) {
         //respond to the frontend...
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(error)
    }
  }
}


const addSubmission = async (rows, sheetIndex) => {
    console.log("inside add submission function.... backend")
    // spreadsheet key is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    // use service account creds
    await doc.useServiceAccountAuth({ 
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, 
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(new RegExp("\\\\n", "\g"), "\n")
    });
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[sheetIndex];
    let response = await sheet.addRow(rows); //receives an array of objects
    return response;
}