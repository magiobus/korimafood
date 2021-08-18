// ADD PLACE

const { GoogleSpreadsheet } = require("google-spreadsheet");
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEETSAPIKEY = process.env.SHEETSAPIKEY;
const axios = require("axios");

//api route
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name } = req.body;
      let url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${name}?alt=json&key=${SHEETSAPIKEY}`;
      let response = await axios.get(url);
      if (response.status == "200") {
        res.status(200).json(response.data);
      } else {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(error);
      }
      //respond to the frontend...
    } catch (error) {
      //respond to the frontend...
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(error);
    }
  }
}

const addSubmission = async (rows, sheetIndex) => {
  console.log("inside add submission function.... backend");
  // spreadsheet key is the long id in the sheets URL
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
  // use service account creds
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(
      new RegExp("\\\\n", "g"),
      "\n"
    ),
  });
  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[sheetIndex];
  let response = await sheet.addRow(rows); //receives an array of objects
  return response;
};
