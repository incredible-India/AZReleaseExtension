var notify = {
    type: 'basic',
    title: 'Notification Title',
    message: 'Notification Message',
   iconUrl: 'icons8-azure-16.png'
  };
 



  document.getElementById("notifyButton").onclick = ()=>{


    chrome.notifications.getPermissionLevel(

        (isallowed)=>{
                if(isallowed == "granted"){
                    chrome.notifications.create("mynotification",notify)
                    console.log(isallowed);
                }else{
                    alert("User made the notification off"+ isallowed);
                }
        }
      )



  };

  