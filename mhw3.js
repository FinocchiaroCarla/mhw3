const app_id='1c7bc491';
const app_key='4d133a53d9813618868f3408ee1bba53';


const mod1=document.querySelector('#modal1');
mod1.addEventListener('click',showModal1);

const esc1=document.querySelector('#modal-view1 .esc');
esc1.addEventListener('click',hideModal1);

const view1=document.querySelector('#modal-view1');

const library=document.querySelector('#library');

function showModal1(){
    view1.classList.remove('hidden');
    document.body.classList.add('no-scroll');
}

function hideModal1(){
    view1.classList.add('hidden');
    library.innerHTML = '';
    document.body.classList.remove('no-scroll');
}

const form = document.querySelector('#recipes');
form.addEventListener('submit', search)

function search(event){
    event.preventDefault();
    const recipe_input = document.querySelector('#recipe');
    const recipe_value = encodeURIComponent(recipe_input.value);
    console.log('Eseguo ricerca: ' + recipe_value);
    rest_url = 'https://api.edamam.com/api/recipes/v2?type=public&q='+recipe_value+'&app_id='+app_id+'&app_key='+app_key;
    console.log('URL: ' + rest_url);
    fetch(rest_url).then(onResponse1).then(onJson1);
  }

  function onResponse1(response){
    console.log('Risposta ricevuta');
    return response.json();
  }

  function onJson1(json){
    console.log('JSON ricevuto');
    console.log(json);
    
    library.innerHTML = '';

    const results = json.hits;
    let num_results = results.length;

    if(num_results > 8)
    num_results = 8;

    for(let i=0; i<num_results; i++){
    const recipe_data = results[i]

    const name = recipe_data.recipe.label;
    const selected_image = recipe_data.recipe.images.SMALL.url;
    
    const rec = document.createElement('div');
    rec.classList.add('element');
    
    const img = document.createElement('img');
    img.src = selected_image;

    const caption = document.createElement('p');
    caption.textContent = name;

    rec.appendChild(img);
    rec.appendChild(caption);

    library.appendChild(rec);

    }
  }


  const client_id="cb56fc26442b428b98de6c829127c63b";
const client_secret="8c93141fd8444e2595eb50480638cf42";

let token;

//prendo il token
fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);

function onTokenResponse(response){
  return response.json();
}

function onTokenJson(json){
  console.log(json)
  token = json.access_token;
}

//associo la funzione play al bottone
const button = document.querySelectorAll('.spotify');
for(const buttons of button){
buttons.addEventListener('click', play)
}

function play(event){
  event.preventDefault();
  const select = event.currentTarget;
  const id = select.dataset.choiceId;
  
  if(id=="parmigiana"){
    fetch("https://api.spotify.com/v1/episodes/4ovwYMctQzWbxSibrTQ9hN?market=it",
      {
        headers:
        {
         'Authorization': 'Bearer ' + token
        }
      }
    ).then(onResponse).then(onJson);

  }else if(id=="carbonara"){
    fetch("https://api.spotify.com/v1/episodes/08BJs3u4C2MhUJESVph4gc?market=it",
      {
        headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
    ).then(onResponse).then(onJson);

  }else if(id=="lasagne"){
  //lasagne
    fetch("https://api.spotify.com/v1/episodes/5XRLMVjU9vdtIhBd4BdiRW?market=it",
      {
        headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
    ).then(onResponse).then(onJson);

  }else if(id=="pizza"){
  //pizza
    fetch("https://api.spotify.com/v1/episodes/4WTLq7uXaCw4gTl1DqdDss?market=it",
      {
        headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
    ).then(onResponse).then(onJson);

  }else{
  //tiramisu
  fetch("https://api.spotify.com/v1/episodes/6ErDemSZwImeTLASIqfX9N?market=it",
  {
    headers:
    {
      'Authorization': 'Bearer ' + token
    }
  }
  ).then(onResponse).then(onJson);

  }
}

function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

const view2 = document.querySelector('#modal-view2');

function onJson(json) {
  console.log('JSON ricevuto');
  console.log(json);

    view2.classList.remove('hidden');
    document.body.classList.add('no-scroll');
    const body=document.querySelector('#modal-view2 div.body');
    body.innerHTML = '';

    const div = document.createElement('div');
    div.classList.add('prop');
    const image = json.images[1].url;
    const title = json.name;
    const link = json.external_urls.spotify;
    const author= json.show.name;

    const img = document.createElement('img');
    img.src = image;

    const authors = document.createElement('span');
    authors.classList.add('strong');
    authors.textContent = author;

    const caption = document.createElement('span');
    caption.textContent = title;

    const links = document.createElement('a');
    links.href = link;
    links.textContent="ASCOLTA ORA";

    div.appendChild(img);
    div.appendChild(authors);
    div.appendChild(caption);
    div.appendChild(links);

    body.appendChild(div);


  
}

const esc2=document.querySelector('#modal-view2 .esc');
esc2.addEventListener('click',hideModal2);

function hideModal2(){
  view2.classList.add('hidden');
  document.body.classList.remove('no-scroll');
}