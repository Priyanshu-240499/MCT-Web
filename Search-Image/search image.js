var result=document.getElementById("result");

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
        console.log(data);
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