chrome.runtime.onMessage.addListener(function(sender,request,sendResponse){

    if(sender.readyForPaste==true)
        {
            console.log(sender,request);
            console.log("is",sender.readyForPaste);
            //checking create release box is opened or not
            let isCreateBox  = document.getElementsByClassName("create-release-panel")[0];
            console.log(isCreateBox);
            if(isCreateBox !==undefined)
            {console.log("Send for crete paste menu");
                   CratePasteReleasMenuContext(ReleaseCopiedStatusFromContent.CurrentRelease);
            }
    
        }


});

 function CratePasteReleasMenuContext(releaseno){
    if(releaseno==undefined)
      releaseno = "unknown"
    var pasteContextMenu={
        "id":"pasteRelease",
        "title":`Paste the builds of release-${releaseno}` ,
        "contexts": ["page"
        ],
        documentUrlPatterns: ['https://dev.azure.com/incadeadev/ProductDev/_release*']
    }
    //creting menu
    chrome.contextMenus.create(pasteContextMenu);
  }