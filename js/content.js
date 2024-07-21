//if url matches with azure deops then only we will run this 
//sending messages to Release event to perform dom Manipulation for copying the Release
//receiving back to copy instruction
chrome.runtime.onMessage.addListener(function(sender,request,sendResponse){

    if(sender.todo == "copy")
    {
       try{
        var ArtifactsText = [];
            //getting the title of the Artifacts
            Array.from(document.getElementsByClassName("release-summary-node-artifact-alias-container")).forEach(e=>{
               ArtifactsText.push(e.innerText);                  
                })
                //getti g the versio  of the Artifacts
                var ArtifactsVersion = [];
                Array.from(document.getElementsByClassName("release-summary-node-artifact-version-text")).forEach(e=>{
                  ArtifactsVersion.push(e.innerText);                        
                    })
                    console.log((ArtifactsText.length === ArtifactsVersion.length));
                    if(ArtifactsText.length === ArtifactsVersion.length)
                    {
                        //saving data in chrome storage APi
             
                        chrome.storage.local.set({
                            'ArtifactsText': ArtifactsText,
                            'ArtifactsVersion':ArtifactsVersion,
                            "CurrentRelease":document.querySelectorAll(".ellipsis-text")[1].innerText
                          }, () => {
                            console.log('Builds saved to Chrome Storage');
                          });

                          sendResponse({dataCopiedSuccessfully:true, ArtifactsText: ArtifactsText,
                            ArtifactsVersion: ArtifactsVersion,
                            CurrentRelease:document.querySelectorAll(".ellipsis-text")[1].innerText});
                            console.log("send build response to event successfully",document.querySelectorAll(".ellipsis-text")[1].innerText);
                    
                    }
       }catch(ex){
        console.error("Error in copying artifacts:", ex);
       }
    }
});

