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



