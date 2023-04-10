var url = " https://jsonplaceholder.typicode.com/albums/2/photos ";

async function fetchWithString() {
    try{
        var response = await fetch(url);
        var data = await response.json();
        //var htmlString = ``;
        
       /* data.forEach( function(photo) {
            console.log(photo);
        }); */

       /* for(let i = 0 ; i < data.length ; i++) {
            htmlString = data.at(i);
            console.log(htmlString);
        } */
        
       // document.getElementById('photo-list').innerHTML = htmlString;

        var htmlString = data.reduce( function(prev, data) {
            return ( prev + `<div class ="photo-card">
            <div class="photo-info">
                <p class="photo-title"> ${data.title} </p>
            </div>
            <img class="photo-img" src="${data.thumbnailUrl}" />
        </div>`
            );
        },"");

        document.getElementById('photo-list').innerHTML = htmlString;

    } catch(error) {
        console.log(error);

    }


}

fetchWithString();