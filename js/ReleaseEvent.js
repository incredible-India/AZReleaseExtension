//chrome.contextMenus.removeAll();
//contextMenu option
chrome.runtime.onInstalled.addListener(() => {
var contextMenuOptions={
    "id":"ReleaseCopy",
    "title":"Copy this release",
    "contexts": ["page"
    ],
    documentUrlPatterns: ['https://dev.azure.com/incadeadev/ProductDev/_releaseProgress*']
}
var ArtifactsTexts=[];
var ArtifactsVersions=[];
chrome.contextMenus.create(contextMenuOptions); 


     //click event for the contex Menu
     chrome.contextMenus.onClicked.addListener(
      function(e,tab){
        if(e.menuItemId == "ReleaseCopy")
        {
        (async ()=>{
         try {
          var reposenfromContentScript =  await chrome.tabs.sendMessage(tab.id, { todo: "copy" });
          console.log(await reposenfromContentScript);
          var ReleaseCopiedStatusFromContent =  reposenfromContentScript;
          //content script copied builds successfully
          console.log(ReleaseCopiedStatusFromContent);
          if(ReleaseCopiedStatusFromContent  && ReleaseCopiedStatusFromContent.dataCopiedSuccessfully == true)
          {
            console.log("received builds in event");
            //if release build copied successfully
            //getting the data back from message event not storage and showing the paste Context Menu
            if(ReleaseCopiedStatusFromContent.ArtifactsText && ReleaseCopiedStatusFromContent.ArtifactsVersion)
        {   
             ArtifactsTexts = ReleaseCopiedStatusFromContent.ArtifactsText;
             ArtifactsVersions=ReleaseCopiedStatusFromContent.ArtifactsVersion;
             //removing context menu if ny exist
             chrome.contextMenus.remove("pasteRelease", () => {
              if (chrome.runtime.lastError) {
                  console.log("Error removing context menu item:", chrome.runtime.lastError.message);
              } else {
                  console.log("Context menu item 'pasteRelease' removed successfully");
              }
          });
                      await CratePasteReleasMenuContext(ReleaseCopiedStatusFromContent.CurrentRelease);
                      //setting the abdge on top
                    try {
                      chrome.action.setBadgeText({ text: ReleaseCopiedStatusFromContent.CurrentRelease.match(/\d+/)[0] });
                      chrome.action.setBadgeBackgroundColor({ color: "green" });
                    } catch (error) {
                      console.log(
                        "Error occired during seeting up the badge",error
                      );
                    }

         
        }
          else{
          console.log("problem occred in data send by content");
        }


          }else{
            console.log("something went wrong while copying release");
          }
         } catch (error) {
          console.log("error is ",error);
         }
        })();

        }
        if(e.menuItemId == "pasteRelease")
        {
          if(ArtifactsTexts && ArtifactsVersions && ArtifactsTexts.length ==ArtifactsVersions.length )
              var pasteResposne =   chrome.tabs.sendMessage(tab.id,{tobepaste:true,ArtifactsText:ArtifactsTexts,ArtifactsVersion:ArtifactsVersions})

        }
      }
    )


//will create menu for pasting the builds
async function CratePasteReleasMenuContext(releaseno){
  if(releaseno==undefined)
    releaseno = "unknown"
  var pasteContextMenu={
      "id":"pasteRelease",
      "title":`Paste the builds of ${releaseno}` ,
      "contexts": ["page"
      ],
      documentUrlPatterns: ['https://dev.azure.com/incadeadev/ProductDev/_release*']
  }
  //creting menu
  chrome.contextMenus.create(pasteContextMenu);
}


});

