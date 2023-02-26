// Function to create UI for user List ....................
function createUserList({avatar,name,time},index) {
const newuser=document.createElement("div")
if(index===0){
    newuser.classList.add("user-list")
    newuser.classList.add("active")
}
else{
    newuser.classList.add("user-list")
}
newuser.innerHTML=`
<div class="user-list-sub" onclick="checkScreen(this,${index})">
  
  <div class="avatar">
    <img
      src=${avatar}
      alt=${name}
      loading="lazy"
    />
  </div>
  <div class="profile-highlight">
    <div class="user-name">
      <p class="title">${name}</p>
      <p class="time">${time}</p>
    </div>
    <p class="highlights">
      Lorem, ipsum dolor sit amet consectetur...
    </p>
  </div>
</div>`
document.querySelector(".left").appendChild(newuser)
}
usersData.map((item,index)=>createUserList(item,index))

//  Function to change chat Data based on click...............................
function checkScreen(element,index){
    if(window.screen.width<=600){
        document.querySelector(".left").style.display="none"
        document.querySelector(".right").style.display="block"
        document.querySelector(".right").style.width="100%"
    }
  currentUser(element,index)
}
// Function for getting Data for selected User .......................
function currentUser(element,index) {
   const userList= document.querySelectorAll(".user-list")
   userList.forEach(element=>element.classList.remove("active"))
    element.parentElement.classList.add("active")
    const name=element.children[1].children[0].children[0].innerHTML
    const currentUserData=usersData.filter(item=>item.name===name)
    UpdateChat(currentUserData,Object.values(JsonData)[index]);
}
// Function for Updating Data for selected User .......................
function UpdateChat([{avatar,name,status}],chat){
const current_user=document.createElement("div")
    current_user.classList.add("current-user")
    current_user.innerHTML=`
    <div class="current-user-sub">
    <div class="current_avatar">
      <img
      src=${avatar}
      alt=${name}
    />
    <div class="online"></div>
  </div>
    <div class="current_status">
      <p class="current-title">${name}</p>
      <p class="current-highlights">${status}</p>
    </div>
  </div>`


  if(chat!==undefined){
    const chatData=document.createElement("div")
    current_user.classList.add("chat")
    chat.forEach(element => {
        const user_container=document.createElement("div")
        const user_mssg=document.createElement("p")
        user_mssg.innerText=element.msg.message
        user_container.appendChild(user_mssg)
        if(element.from.type==="user1"){
            user_container.classList.add("user1-container")
            user_mssg.classList.add("user1-mssg")
        }
        else{
            user_container.classList.add("user2-container")
            user_mssg.classList.add("user2-mssg")
        }
        chatData.appendChild(user_container)
    });

    document.querySelector(".chat-box").innerHTML=""
    document.querySelector(".chat-box").appendChild(current_user)
    document.querySelector(".chat-box").appendChild(chatData)
  }
  else{
    const noChat=document.createElement("h5")
    noChat.innerText="Start Chat..."
    document.querySelector(".chat-box").innerHTML=""

    document.querySelector(".chat-box").appendChild(current_user)
    document.querySelector(".chat-box").appendChild(noChat)
  }
}

//Function togGo back for small screen ............................................
function goBack() {
    document.querySelector(".right").style.display="none"
    document.querySelector(".left").style.display="block"
    document.querySelector(".left").style.width="100%"        
}

