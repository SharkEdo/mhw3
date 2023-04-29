function onJsonSp(json) {
  console.log('JSON ricevuto');
  console.log(json);
  // Svuotiamo la libreria
  const AlbumV = document.querySelector('#album-view');
  AlbumV.innerHTML = '';
  // Leggi il numero di risultati
  const results = json.albums.items;
  let num_results = results.length;
  // Mostriamone al massimo 10
  if(num_results > 10)
    num_results = 10;


  // Processa ciascun risultato
  for(let i=0; i<num_results; i++)
  {
	console.log('--------------------');
    const album_data = results[i]
	console.log(album_data);
    const title = album_data.name;
	console.log(title);
    const selected_image = album_data.images[0].url;
    const album = document.createElement('div');
    album.classList.add('album');
    const img = document.createElement('img');
    img.src = selected_image;
    const caption = document.createElement('span');
    caption.textContent = title;
    album.appendChild(img);
    album.appendChild(caption);
    AlbumV.appendChild(album);
  }
}

function onResponseSp(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function searchSp(event)
{
  // Impedisci il submit del form
  event.preventDefault();
  // Leggi valore del campo di testo
  const album_input = document.querySelector('#album');
  const album_value = encodeURIComponent(album_input.value);
  console.log('Eseguo ricerca: ' + album_value);
  // Esegui la richiesta
  fetch("https://api.spotify.com/v1/search?type=album&q=" + album_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponseSp).then(onJsonSp);
}

//TOKEN-------------------------

function onTokenJsonSp(json)
{
  console.log(json)
  // Imposta il token global
  token = json.access_token;
}

function onTokenResponseSp(response)
{
  return response.json();
}

// OAuth credentials --- NON SICURO!
const client_id = '792e0c50d0c948d185706c409de54611';
const client_secret = '13ce42c068274989be6dc789b0a336a3';
// Dichiara variabile token
let token;
// All'apertura della pagina, richiediamo il token
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
).then(onTokenResponseSp).then(onTokenJsonSp);
// Aggiungi event listener al form
const formSp = document.querySelector('form#Spotify');
formSp.addEventListener('submit', searchSp);



//NASA -----------------------------------------------------------------------

function onJsonNasa(json) {
  console.log('JSON ricevuto');
  console.log(json);
  // Svuotiamo la libreria
  const MissionTab = document.querySelector('#nasa-view');
  MissionTab.innerHTML = '';
  // Leggi il numero di risultati
  let TotRes = json.collection.metadata.total_hits;
  console.log("Il numero di dati è:" + TotRes);
  // Mostriamone al massimo 10
  if(TotRes > 10)
    TotRes = 10;
  // Processa ciascun risultato
  
  for(let i=0; i<TotRes; i++)
  {
    // Leggi il documento
	const col = json.collection
    const item = col.items[i];
	console.log('----------------------')
	console.log('Item:');
	console.log(item);
	const data = item.data[0];
	console.log('Data:');
	console.log(data);
	const titled = data.title;
	console.log('Titled:');
	console.log(titled);
    // Leggiamo info
    if(!data.nasa_id)
    {
      console.log('Nasa_id mancante, salto');
      continue;
	}
	
	const Nasa_id = data.nasa_id;
	// Costruiamo l'URL della copertina
	const cover_url = 'https://images-assets.nasa.gov/image/' + Nasa_id + '/' + Nasa_id + '~thumb.jpg';
	// Creiamo il div che conterrà immagine e didascalia
	const Mission = document.createElement('div');
	Mission.classList.add('data');
	// Creiamo l'immagine
	const img = document.createElement('img');
	img.src = cover_url;
	// Creiamo la didascalia
	const caption = document.createElement('span');
	caption.textContent = titled;
	// Aggiungiamo immagine e didascalia al div
	Mission.appendChild(img);
	Mission.appendChild(caption);
	// Aggiungiamo il div alla libreria
	MissionTab.appendChild(Mission);
  }
}

function onResponseNasa(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function searchNasa(event)
{
  // Impedisci il submit del form
  event.preventDefault();
  // Leggi valore del campo di testo
  const Mission_input = document.querySelector('#Mission');
  const Mission_value = encodeURIComponent(Mission_input.value);
  console.log('Eseguo ricerca: ' + Mission_value);
  // Prepara la richiesta
  rest_url = 'https://images-api.nasa.gov/search?q=' + Mission_value;

  console.log('URL: ' + rest_url);
  // Esegui fetch
  fetch(rest_url).then(onResponseNasa).then(onJsonNasa);
}

// Aggiungi event listener al form
const formNasa = document.querySelector('form#Nasa');
formNasa.addEventListener('submit', searchNasa)