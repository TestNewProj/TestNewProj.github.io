else {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    var nextRow = sheet.getLastRow() + 1

    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header]
    })

    sheet.appendRow(newRow)

    return ContentService.createTextOutput(
      JSON.stringify({ 'result': 'success', 'row': nextRow, e })
    ).setMimeType(ContentService.MimeType.JSON)
  }


  