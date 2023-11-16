// SUPPRESSION DU JQUERY DE BASE POUR UTILISER DES FONTIONS FULL JS
document.addEventListener('DOMContentLoaded', function () {
	// Définition des chemins vers les images par défaut et les répertoires d'images
	const srcImg = 'images/';
	const albumDefaultMini = srcImg + 'noComicsMini.jpeg';
	const albumDefault = srcImg + 'noComics.jpeg';
	const srcAlbumMini = 'albumsMini/';
	const srcAlbum = 'albums/';

	// Sélection des éléments du DOM
	const txtSerie = document.querySelector('#serie');
	const txtNumero = document.querySelector('#numero');
	const txtTitre = document.querySelector('#titre');
	const txtAuteur = document.querySelector('#auteur');
	const txtPrix = document.querySelector('#prix');
	const imgAlbum = document.querySelector('#album');
	const imgAlbumMini = document.querySelector('#albumMini');

	// Gestion des événements d'erreur pour les images
	imgAlbum.addEventListener('error', handleImageError);
	imgAlbumMini.addEventListener('error', handleImageError);

	const id = document.querySelector('#id');
	id.addEventListener('change', function () {
		getAlbum(this);
	});


	// Fonction pour obtenir les détails de l'album en fonction de son ID
	function getAlbum(num) {
		const albumId = num.value;

		const albumDetails = getAlbumDetails(albumId);
		if (!albumDetails) {
			// Si les détails ne sont pas disponibles, affiche les images par défaut
			clearAlbumDetails();
			afficheAlbums(imgAlbumMini, imgAlbum, srcAlbumMini + 'defaultMini.jpeg', srcAlbum + 'default.jpeg');
		} else {
			// Si les détails sont disponibles, affiche les détails et les images correspondantes
			const cheminImageMiniature = srcAlbumMini + albumDetails.imageMiniature;
			const cheminImageNormale = srcAlbum + albumDetails.imageNormale;

			displayAlbumDetails(albumDetails);
			afficheAlbums(imgAlbumMini, imgAlbum, cheminImageMiniature, cheminImageNormale);
		}
	}


	// Fonction pour afficher les détails de l'album dans les éléments de l'interface utilisateur
	function displayAlbumDetails(albumDetails) {
		txtSerie.value = albumDetails.serie;
		txtNumero.value = albumDetails.numero;
		txtTitre.value = albumDetails.titre;
		txtAuteur.value = albumDetails.auteur;
		txtPrix.value = albumDetails.prix;
	}

	// Fonction pour réinitialiser les champs de détails d'album
	function clearAlbumDetails() {
		txtSerie.value = '';
		txtNumero.value = '';
		txtTitre.value = '';
		txtAuteur.value = '';
		txtPrix.value = 0;
	}

	// Fonction pour afficher les images de l'album avec un effet de transition
	function afficheAlbums(albumMini, album, nomFicMini, nomFic) {
		albumMini.src = nomFicMini;
		album.src = nomFic;

		addTransitionEffect(albumMini);
		addTransitionEffect(album);
	}

	// Fonction pour ajouter un effet de transition à un élément spécifié
	function addTransitionEffect(element) {
		element.classList.add('transition-effect');
		setTimeout(() => {
			element.classList.remove('transition-effect');
		}, 1000);
	}

	function getAlbum(num) {
		const albumId = num.value;

		// Récupère les détails de l'album en utilisant son ID dans la collection d'albums
		const album = albums.get(albumId);

		// Si l'album n'est pas trouvé, efface les détails affichés et montre des images par défaut
		if (!album) {
			clearAlbumDetails();
			afficheAlbums(imgAlbumMini, imgAlbum, albumDefaultMini, albumDefault);

			// Si l'album est trouvé, récupère les détails de la série et de l'auteur associés à cet album
		} else {
			const serie = series.get(album.idSerie);
			const auteur = auteurs.get(album.idAuteur);

			// Met à jour les champs d'affichage avec les détails de l'album, de la série et de l'auteur
			txtSerie.value = serie.nom;
			txtNumero.value = album.numero;
			txtTitre.value = album.titre;
			txtAuteur.value = auteur.nom;
			txtPrix.value = album.prix;

			// Crée un nom de fichier pour les images de l'album en combinant les détails de l'album
			let nomFic = serie.nom + '-' + album.numero + '-' + album.titre;

			// Utilisation d'une expression régulière pour supprimer les caractères non autorisés dans les noms de fichiers : '!?.":$
			nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, '');

			// Affiche les images de l'album en utilisant les chemins appropriés basés sur le nom de fichier construit
			afficheAlbums(
				imgAlbumMini,
				imgAlbum,
				srcAlbumMini + nomFic + '.jpg',
				srcAlbum + nomFic + '.jpg'
			);
		}
	}

	// Fonction pour effacer les détails affichés de l'album
	function clearAlbumDetails() {
		txtSerie.value = '';
		txtNumero.value = '';
		txtTitre.value = '';
		txtAuteur.value = '';
		txtPrix.value = 0;
	}

	// Fonction pour gérer les erreurs d'image
	function handleImageError(img) {
		img.src = './noComics.jpeg';
		img.alt = 'Image non disponible';
		img.onerror = null;
	}
});

function displayAlbumsAsTable(albumsData, container) {
    const table = document.createElement('table');
    table.classList.add('album-table');

    const tableHeader = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Série</th>
        <th>Numéro</th>
        <th>Titre</th>
        <th>Auteur</th>
        <th>Prix</th>
    `;
    tableHeader.appendChild(headerRow);
    table.appendChild(tableHeader);

    const tableBody = document.createElement('tbody');

    albumsData.forEach(album => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${album.idSerie}</td>
            <td>${album.numero}</td>
            <td>${album.titre}</td>
            <td>${album.idAuteur}</td>
            <td>${album.prix}</td>
        `;
        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    container.appendChild(table);
}

function displayAlbumsAsCards(albumsData, container) {
    const cardContainer = document.createElement('div'); // Crée un conteneur temporaire

    albumsData.forEach(album => {
        const cardHTML = `
            <!-- Structure HTML d'une carte d'album -->
            <div class="col-6 mb-4">
                <div class="card">
                    <img src="albums/${album.idSerie}-${album.numero}-${album.titre}.jpg" class="card-img-top" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${album.titre}</h5>
                        <p class="card-text">N°${album.numero}, Série: ${album.idSerie}, Auteur: ${album.idAuteur}</p>
                        <!-- Vous pouvez ajouter d'autres éléments de la carte ici si nécessaire -->
                    </div>
                </div>
            </div>
        `;
        cardContainer.innerHTML += cardHTML;
    });

    container.appendChild(cardContainer); // Ajoute toutes les cartes une seule fois
}