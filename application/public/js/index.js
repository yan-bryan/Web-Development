var url = " https://jsonplaceholder.typicode.com/albums/2/photos ";
var counter;

function buildCard(data){
    var cardDiv = document.createElement("div");
    cardDiv.setAttribute('class', 'photo-card');
    cardDiv.setAttribute('id', 'photo-card');

    var imgTag = document.createElement("img");
    imgTag.setAttribute("class", "photo-img");
    imgTag.setAttribute("src", data.thumbnailUrl);

    var photoDiv = document.createElement("div");
    photoDiv.setAttribute('class', 'photo-info');

    var titleTag = document.createElement('p');
    titleTag.setAttribute("class", "photo-title");
    titleTag.textContent = data.title;

    photoDiv.appendChild(titleTag);
    cardDiv.appendChild(photoDiv);
    cardDiv.appendChild(imgTag);
    

    cardDiv.addEventListener("click", fadeOut);

    return cardDiv;

}

async function fetchWithDOMAPI() {
    try{
        var response = await fetch(url);
        var data = await response.json();
        counter = data.length;
        //console.log(counter);
        var elements = data.map(buildCard);
        document.getElementById('photo-list').append(...elements);
        

    } catch(error) {
        console.log(error);

    }


}

fetchWithDOMAPI();

function fadeOut(ev){
    var ele = ev.currentTarget;
    //ev.currentTarget.remove();
    counter--;
    //console.log(counter);

    console.log(ele);

    ele.style.opacity = '0';
    setTimeout( function() {
        ele.remove();
    }, 1000);


}
