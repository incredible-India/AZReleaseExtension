//if url matches with azure deops then only we will run this 
//sending messages to Release event to perform dom Manipulation for copying the Release
chrome.runtime.sendMessage({
    isAzuretab:true,
})

//receiving back to copy instruction
chrome.runtime.onMessage.addListener(function(sender,request,sendResposne){

    if(sender.todo == "copy")
    {
       try{
            //getting the title of the Artifacts
            Array.from(document.getElementsByClassName("release-summary-node-artifact-alias-container")).forEach(e=>{

        
                console.log(e.innerText);
                    
                })
                Array.from(document.getElementsByClassName("release-summary-node-artifact-version-text")).forEach(e=>{

                    console.log(e.innerText);
                        
                    })
       }catch(ex){

       }
    }
});