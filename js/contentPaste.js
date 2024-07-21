chrome.runtime.onMessage.addListener(function(sender,request,sendResposne){

    if(sender.tobepaste==true)
    {
        //cheking weather new create window is there or not
          let isCreateBox  = document.getElementsByClassName("create-release-panel")[0];
          if(isCreateBox)
          {
                let ArtifactsTextFromLive  = document.getElementsByClassName("ms-FocusZone");
                if(ArtifactsTextFromLive!=undefined)
                {
                    let allArtifactstext = ArtifactsTextFromLive[1].innerText.toString().split('\n')
                    console.log(allArtifactstext);
                    //valur to be paste 
                    //document.querySelector(".wrap input").value
                    //now cheking the artifacts coming from copied release
                    if(sender.ArtifactsText && sender.ArtifactsVersion && sender.ArtifactsText.length ==allArtifactstext.length && sender.ArtifactsText.length == sender.ArtifactsVersion.length )
                    {
                       
                       let  correctRearrangedVersion = sortArrayBasedOnOrder(sender.ArtifactsText,allArtifactstext,sender.ArtifactsVersion)
                       console.log("all is correct now",sender.ArtifactsText,correctRearrangedVersion,allArtifactstext);
                        for(let i = 0 ;i<sender.ArtifactsText.length;i++)
                        {
                            if(sender.ArtifactsText[i].trim() == allArtifactstext[i].trim()){
                                console.log("yes");
                                //setting the value
                                document.querySelectorAll(".wrap input")[i].value  = correctRearrangedVersion[i];
                            }
                          
                        }
                    }

                }else{
                    console.log("error occured while parsing artifacts text from create window ");
                }
          }else{
            console.log("new release create box does not exist");
          }
    }
       

})

//making lement order of both array same 
function sortArrayBasedOnOrder(arrayToSort, referenceArray,versionArray) {
    // Create a map to store the index of each element in referenceArray
  // Step 1: Create a map of array1 elements to array3 values
let array1To3Map = {};
for (let i = 0; i < arrayToSort.length; i++) {
    array1To3Map[arrayToSort[i]] = versionArray[i];
}

// Step 2: Sort array1 based on the order of array2
arrayToSort.sort((a, b) => {
    return referenceArray.indexOf(a) - referenceArray.indexOf(b);
});

// Step 3: Rearrange array3 based on the new order of array1
let sortedArray3 = arrayToSort.map(element => array1To3Map[element]);

// Update array3 with the rearranged values
versionArray = sortedArray3;
return versionArray;
    // console.log("inside",arrayToSort,referenceArray,versionArray);
}