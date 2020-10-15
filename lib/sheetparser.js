
//parsed the data received by googlespreadsheet
export const parseSheetJson = (sheetJson) => {
        try{
            const {entry} = sheetJson.data.feed; //entries of the sheet
            let parsedData = entry.map((_entry) => {
                return {"name": _entry.gsx$name.$t, "description": _entry.gsx$description.$t, "coverUrl": _entry.gsx$coverurl.$t}
            })
            return parsedData
        }catch(e){
            return Error("An error ocurred parsing JSON =>", e)
        }
}




