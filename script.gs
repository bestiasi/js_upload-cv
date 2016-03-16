function doGet(e) {
  var output = HtmlService.createHtmlOutputFromFile('form.html');
  //output.setSandboxMode(HtmlService.SandboxMode.IFRAME);
  return output;
}

function uploadFiles(form) {  
  try {
    var all = form.toateCompaniile;
    var blob = form.fisierCV;
    var fname = blob.getName();
    var extensionfinder = /(?:\.([^.]+))?$/;
    var ext = extensionfinder(fname)[1];
    blob.setName(form.nume + '_' + form.prenume + '.' + ext);    
    
    if(typeof all === 'undefined') {
      if (typeof form.companii == 'undefined') {
        return "Selectati cel putin o companie.";
      }
      if(typeof form.companii == 'string') {
        var folder, folders = DriveApp.getFoldersByName(form.companii);
        
        if (folders.hasNext()) {
          folder = folders.next();
        } else {
          folder = DriveApp.createFolder(form.companii);
        }       
        var file = folder.createFile(blob);
        uploadToAll(blob, form);
      }
      else {  
        for(var key in form.companii) {
          var folder, folders = DriveApp.getFoldersByName(form.companii[key]);
          if (folders.hasNext()) {
            folder = folders.next();
          } else {
            folder = DriveApp.createFolder(form.companii[key]);
          }      
          var file = folder.createFile(blob);
          }
          uploadToAll(blob, form);
        
      } } /*else {
        
        var folder, folders = DriveApp.getFolders();
        while(folders.hasNext()){          
          folder = folders.next();
          var file = folder.createFile(blob);
          file.setDescription("De trimis la toti.");
        }
        uploadToAll(blob, form);
     }*/
                  
    return "CVul a fost încărcat cu succes!";    
  } catch (error) {
    
    return error.toString();
  }
  
}

function uploadToAll(file, form)
{
  
  var folder, foldersAll = DriveApp.getFoldersByName('Toate toate');
        
    if (foldersAll.hasNext()) {
      folder = foldersAll.next();
    } else {
      folder = DriveApp.createFolder('Toate toate');
    }
    var fileCV = folder.createFile(file);
}
