
document.getElementsByClassName("table")[0].innerHTML = ""
;              chrome.storage.local.get(["ArtifactsText","ArtifactsVersion","CurrentRelease"]).then((result) => {
                if(result)
                {
                    document.getElementsByClassName("table")[0].innerHTML = `<h1>${result.CurrentRelease}</h1>`
                        for(let i = 0 ;i<result.ArtifactsVersion.length;i++)
                        {
                            document.getElementsByClassName("table")[0].innerHTML += `<p>${result.ArtifactsText[i]}==${result.ArtifactsVersion[i]}</p>`
                        }
                }
               
              });