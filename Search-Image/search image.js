var result=document.getElementById("result");

// function change(){
    var sugestions_container=document.getElementById("sugestions_container");
    var background_image=[
        "https://www.tourmyindia.com/blog//wp-content/uploads/2020/11/India-Gate-Delhi.jpg",
        "https://images.unsplash.com/photo-1566650554919-44ec6bbe2518?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwYW5pbWFsfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
        "https://thumbs.dreamstime.com/b/large-group-african-safari-animals-wildlife-conservation-concept-174172993.jpg",
        "https://image.shutterstock.com/image-photo/fresh-fruits-assorted-colorful-backgroundvitamins-260nw-252338818.jpg",
        "https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=2000",
        "https://t3.ftcdn.net/jpg/01/84/29/36/360_F_184293662_ve3sE361ICzPfXL0xaJAQoe6fDBydDSO.jpg",
        "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?cs=srgb&dl=pexels-asad-photo-maldives-457882.jpg&fm=jpg",
        "https://cdn.pixabay.com/photo/2016/04/18/22/05/seashells-1337565__340.jpg",
        "https://img.freepik.com/premium-vector/beautiful-sunset-landscape-lake-with-forest_104785-616.jpg",
        "https://cdn.pixabay.com/photo/2014/12/24/05/02/drop-of-water-578897__480.jpg"];
    var i=0;
    setInterval(() => {
        if(i===10){
            i=0;
        }
        sugestions_container.style.background=
          `url(${background_image[i]})`;
        i++;
    }, 4000);
// }
// change();

const display=(e)=>{
    result.innerHTML="";
    e.preventDefault();
    var search=document.getElementById("search");   
    if(search.value===""){
        alert("Enter what to search in image!")
    }
    else{
    fetch("https://api.unsplash.com/search/photos?query="+search.value+"&client_id=vkDMfPi7AiQJnShDUBv1aFYMrmjc2J-eqVbOE46-C-g&per_page=50")
    .then((response)=>{
        return response.json();
    })
    // .catch(()=>{
    //     console.log("error");
    // })
    .then((data)=>{
        search.value="";
        // console.log(data);
         data.results.forEach(photo => {
            var a=document.createElement("a");
            a.target="_blank";
            var image=document.createElement("img");
            var h5=document.createElement('h5');
            a.appendChild(image);
            a.appendChild(h5);
            a.href=photo.urls.regular;
            image.src=photo.urls.small;
            h5.innerText="View Full image";
            result.appendChild(a);
         });
    })
    // .catch(()=>{
    //     console.log("No data entered");
    // })
    }
    
}
document.getElementById("form").addEventListener('submit',display);




function suggestion_data(search){
    result.innerHTML="";
    fetch("https://api.unsplash.com/search/photos?query="+search+"&client_id=vkDMfPi7AiQJnShDUBv1aFYMrmjc2J-eqVbOE46-C-g&per_page=50")
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
         data.results.forEach(photo => {
            var a=document.createElement("a");
            a.target="_blank";
            var image=document.createElement("img");
            var h5=document.createElement('h5');
            a.appendChild(image);
            a.appendChild(h5);
            a.href=photo.urls.regular;
            image.src=photo.urls.small;
            h5.innerText="View Full image";
            result.appendChild(a);
         });
    })

}
for(var i=0;i<document.querySelectorAll('.images').length;i++){ 
    document.getElementsByClassName('images')[i].addEventListener('click',function(){
      var search_data=this.children[0].alt;
      suggestion_data(search_data);
    })
  }