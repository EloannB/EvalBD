function getAlbum(num) {
  var album = albums.get(num.valueOf());

  if (album === undefined) {
    // If the album is not found, reset card content and display default images
    $(".card-img-top").attr("src", ""); // Clear the image source
    $(".card-title").text("");
    $(".card-text").text("No album selected.");
    $(".list-group-item").each(function (index) {
      $(this).text("Item " + (index + 1));
    });
    $(".card-link").attr("href", "#").text("Card link");
    $(".card-link:last").attr("href", "#").text("Another link");

  } else {
    // If the album is found, update card content with album details
    var serie = series.get(album.idSerie);
    var auteur = auteurs.get(album.idAuteur);
    var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;
    // Update card content
    $(".card-img-top").attr("src", "albums/" + nomFic + ".jpg");
    $(".card-title").text(album.titre);
    

    // Update list items (assuming you want to display some dynamic content)
    $(".list-group-item:first").text("Series: " + serie.nom);
    $(".list-group-item:eq(1)").text("Number: " + album.numero);
    $(".list-group-item:last").text("Author: " + auteur.nom);

    // Update card links if needed
    $(".card-link:first").attr("href", "#").text("Link to Series");
    $(".card-link:last").attr("href", "#").text("Link to Author");
  }
}

getAlbum({ valueOf: function () { return "19"; } });


document.getElementById('btnSearch').addEventListener('click', function () {
  const radioByAlbum = document.getElementById('ChoixTwo');
  const radioByAuteur = document.getElementById('ChoixOne');
  const radioBySerie = document.getElementById('ChoixThree');
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const resultsContainer = document.getElementById('results');

  // Efface les résultats précédents
  resultsContainer.innerHTML = '';

  // Recherche en fonction du critère sélectionné
     if (searchType === 'Auteur') {
        console.log("Recherche par auteur");
        searchByAuteur(searchInput);
    } else if (searchType === 'Album') {
        console.log("Recherche par album");
        searchByAlbum(searchInput);
    } else if (searchType === 'Serie') {
        console.log("Recherche par série");
        searchBySerie(searchInput);
    } else {
        console.log("Veuillez sélectionner un critère de recherche.");
    }
});

// Fonction pour la recherche par album
function searchByAlbum(searchInput) {
  albums.forEach(album => {
      if (album.titre.toLowerCase().includes(searchInput)) {
          displayResult(album);
      }
  });
}

// Fonction pour la recherche par auteur
function searchByAuteur(searchInput) {
  for (let [idAuteur, auteur] of auteurs.entries()) {
      for (let [idAlbum, album] of albums.entries()) {
          if (album.idAuteur == idAuteur && auteur.nom.toLowerCase().includes(searchInput)) {
              displayResult(album);
          }
      }
  }
}

// Fonction pour la recherche par série
function searchBySerie(searchInput) {
for(let [idSerie, serie] of series.entries()) {
  for (let [idAlbum, album] of albums.entries()) {
      if (album.idSerie == idSerie && album.titre.toLowerCase().includes(searchInput)) {
          console.log(serie.nom+", Album N°"+album.numero+" "+album.titre+", Auteur:"+auteurs.get(album.idAuteur).nom);
          displayResult(album);
      }
  }
}}