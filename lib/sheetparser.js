//parsed the data received by googlespreadsheet
export const parseSheetJson = (sheetJson) => {
  try {
    const { values } = sheetJson.data; //entries of the sheet
    const newValues = values.slice(1); //removes first element of array

    let parsedData = newValues.map((item) => {
      return {
        id: item[0],
        title: item[1],
        photoUrl: item[11],
        review: item[10] || "",
        website: item[5] || "",
        mapsUrl: item[9],
        address: item[6],
      };
    });

    return parsedData;
  } catch (e) {
    return Error("An error ocurred parsing JSON =>", e);
  }
};
