chrome.contextMenus.removeAll();
//contextMenu option
var contextMenuOptions={
    "id":"ReleaseCopy",
    "title":"Copy this release",
    "contexts": ["page"
    ],
    documentUrlPatterns: ['https://dev.azure.com/incadeadev/ProductDev/_releaseProgress*']
}
//this will make sure open tab is having azure deps
var isAzureSite =false;
//getting signal from content js if url is relates to Azure or not
chrome.runtime.onMessage.addListener(function(requestMessage,sender,sendResponse){
    //checking signal
    isAzureSite =requestMessage.isAzuretab;
    if ( isAzureSite== true) {
        //creating context Menu for copying option
        chrome.contextMenus.create(contextMenuOptions);
   
       
    }
});

     //click event for the contex Menu
chrome.contextMenus.onClicked.addListener(
    function(e,tab){
      if(e.menuItemId == "ReleaseCopy")
      {
        chrome.tabs.sendMessage(tab.id, { todo: "copy" });
      }
    }
  )