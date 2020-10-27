// ADD PLACE

const { GoogleSpreadsheet } = require('google-spreadsheet');

//api route 
export default async function handler(req, res) {
    const {id, sheetIndex} = req.body
    if (req.method === 'POST') {
        try {
           
        //connect to google sheets and delete row
        await removePlace(id, sheetIndex)

        // //respond to the frontend...
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end()
    } catch (error) {
        //  //respond to the frontend...
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(error)
    }
  }
}

const removePlace = async (id, sheetIndex) => {
    console.log("removing place... =>", id, sheetIndex)
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
//     // use service account creds
    await doc.useServiceAccountAuth({ 
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, 
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(new RegExp("\\\\n", "\g"), "\n")
    });
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[sheetIndex];
    const rows = await sheet.getRows();
    let place = rows.filter(row => {
        return row.id === id
    })

    const rowIndex = place[0]._rowNumber
    return await rows[rowIndex-2].delete()

}
