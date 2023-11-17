if (e.parameter.filename) {
    const folderId = "1owHqgli6isDgKHOcWh0CHjI9lIv-gKML";  // Or Folder ID which is used for putting the file instead of "root", if you need.
    const obj = JSON.parse(e.postData.contents);

    const blob = Utilities.newBlob(
      obj.file,
      e.parameter.mimeType,
      e.parameter.filename
    );

    const file = DriveApp.getFolderById(folderId).createFile(blob);
    const responseObj = {
      filename: file.getName(),
      fileId: file.getId(),
      fileUrl: file.getUrl(),
    };
    obj.file = responseObj.fileUrl;

    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    //var range = sheet.getRange("A1:A").getValues();
    //var filtered_r = range.filter(String).length;
    var newRow = headers.map(function (header) {
      return header === 'timestamp' ? new Date() : obj[header];
    });
    //sheet.getRange(filtered_r + 1, 1, 1, newRow.length).setValues([newRow]);
    sheet.appendRow(newRow)

    return ContentService.createTextOutput(
      JSON.stringify({ 'result': 'success', 'row': nextRow, e })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
  var sheet = doc.getSheetByName(sheetName)
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
  sheet.appendRow(newRow)






















