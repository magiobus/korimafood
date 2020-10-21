
//parsed the data received by googlespreadsheet
export const parseSheetJson = (sheetJson) => {
        try{
            const {entry} = sheetJson.data.feed; //entries of the sheet
            let parsedData = entry.map((_entry) => {
                return {
                    "id": _entry.gsx$id.$t, 
                    "title": _entry.gsx$title.$t,
                    "photoUrl": _entry.gsx$photourl.$t,
                    "review": _entry.gsx$review.$t || '',
                    "website": _entry.gsx$website.$t || '',
                    "mapsUrl": _entry.gsx$mapsurl.$t,
                    "address": _entry.gsx$address.$t

                }
            })
            return parsedData
        }catch(e){
            return Error("An error ocurred parsing JSON =>", e)
        }
}





