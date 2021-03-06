function makeCopy() {
/* Erstellt ein regelm��iges Backup der Tabelle, um sie vor z.B. Vandalismus zu sch�tzen */

    var date = new Date();
    var formattedDate = Utilities.formatDate(date, "GMT+2", "dd.MM.yyyy");
    var ssID = SpreadsheetApp.getActiveSpreadsheet().getId();
    var sheetName = SpreadsheetApp.getActiveSpreadsheet().getName();
    var url = "https://spreadsheets.google.com/feeds/download/spreadsheets/Export?key=" + ssID + "&gid=0&portrait=true" + "&exportFormat=pdf"
    var result = UrlFetchApp.fetch(url);
    var contents = result.getContent();
    var name = SpreadsheetApp.getActiveSpreadsheet().getName() + " Backup " + formattedDate;
    var FolderID = "1VSAWIm0WFNwpmE_ful1Vhn90lFCa8ncq"
    var destination = DriveApp.getFolderById(FolderID);
    var file = DriveApp.getFileById(SpreadsheetApp.getActiveSpreadsheet().getId())

    file.makeCopy(name, destination);

    var emailAdress = ["xxx@yyyy"];
    var names = ["nullspace"];
    var index = 0;

    var subject = "Backup " + formattedDate + " wurde angelegt.";

    for (index; index < names.length; index++) {
        var message = "Hallo " + names[index] + ",\n das Backup des Raidkalenders gerade angelegt und befindet sich jetzt in der Ablage und im Anhang.\n Link: https://docs.google.com/spreadsheets/d/1I8ha5Yvh1K0aZ8VSc2o0MoFIWeeJjaxLZCE03OKBKfU/edit#gid=0";
        MailApp.sendEmail(emailAdress[index], subject, message, { attachments: [{ fileName: sheetName + ".pdf", content: contents, mimeType: "application//pdf" }] });
    }
}

function sendReminder(){
/* Sendet auf Wunsch eine Erinnerung zur Pr�fung der Anmeldung zu, unabh�ngig vom Anmeldestatus. */
var date = new Date();
var weekday = date.getDay();
 
var emailAdress = ["xxxx@yyyy"];
var names = ["nullspace"];
var index = 0;  
var formattedDate = Utilities.formatDate(date, "GMT+2", "dd.MM.yyyy");
var url = "xxxxx";  
var subject = "Anmeldehinweis f�r Raid " + formattedDate;
  
if (weekday == 1 || weekday == 4){ /* Mon and Thursday*/
  for(index;index < names.length; index++){
      var message = "Hallo " + names[index] + ",\ndu erh�lst wie gew�nscht einen Anmeldehinweis f�r den heutigen (" + formattedDate + ") Raid.\nBitte �berpr�fe deinen Anmeldestatus unter dem folgendem Link:\n" + url + "\nDiese Email kannst du jederzeit bei Zebee (Discord: El Presidente#7760) abbestellen.\nViele Gr��e";

  MailApp.sendEmail(emailAdress[index], subject, message);
     }
  }
}

function LockCells(){
/* Sperrt die Zellen an Montagen und Donnerstagen, wenn die Anmelde DL vorbei ist */
var date = new Date();
var weekday = date.getDay();
var sheet = SpreadsheetApp.getActive();

/*Real Range is "A1:P62" */
var range = "A1:B1"   
var lockrange = sheet.getRange(range);
  /* Mon and Thursday*/
  if (weekday == 1 || weekday == 4){
    var protection = lockrange.protect().setDescription("Anmelde-DL  vorbei - automatische Entsperrung zwischen 23:00-00:00 Uhr");
    var me = Session.getEffectiveUser();
    protection.addEditor(me);
    protection.removeEditors(protection.getEditors());
    if (protection.canDomainEdit()) {
      protection.setDomainEdit(false);
      }
   }
}
function UnlockCells() {
/* Gibt die Zellen wieder frei */
  var date = new Date();
  var weekday = date.getDay();
  var sheet = SpreadsheetApp.getActive();
    /* Mon and Thursday*/
    if (weekday == 1 || weekday == 4) {
      var protections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
      for (var i = 0; i < protections.length; i++) {
      var protection = protections[i];
          if (protection.canEdit()) {
              protection.remove();
       }
     }
    }
}