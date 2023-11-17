if (typeof jQuery !== 'undefined') {
	// Votre code jQuery ici
	$(document).ready(function () {
		renderMobileView();
		renderDesktopView();

		$('.dropdown-item').on('click', function (event) {
			const filterType = $(this).data('filter');
			handleFilterSelection(filterType);
			updateCartContent();
		});

		$('.addToCart').on('click', function () {
			const albumId = $(this).data('album-id');
			addToCart(albumId);
		});

		$('.removeFromCart').on('click', function () {
			const albumId = $(this).data('album-id');
			removeFromCart(albumId);
		});
	});
} else {
	console.error("jQuery n'est pas défini. Assurez-vous d'inclure jQuery avant ce script.");
}

const shoppingCart = [];

function addToCart(albumId) {
	const album = albums.get(albumId);

	if (album) {
		shoppingCart.push({
			id: albumId,
			prix: album.prix
		});

		updateCartContent();
	} else {
		console.error(`Album with ID ${albumId} not found.`);
	}
}

function removeFromCart(albumId) {
	// Implement logic to remove the album from the shopping cart
	// ...

	updateCartContent();
}

function filterByTitle(title) {
	const filteredAlbums = Array.from(albums.values()).filter(album => {
		return album.titre && album.titre.toLowerCase().includes(title.toLowerCase());
	});
	renderMobileView(filteredAlbums);
	renderDesktopView(filteredAlbums);
}

function filterBySeries(series) {
	const filteredAlbums = Array.from(albums.values()).filter(album => {
		return album.idSerie && album.idSerie.toLowerCase() === series.toLowerCase();
	});
	renderMobileView(filteredAlbums);
	renderDesktopView(filteredAlbums);
}

function filterByAuthor(author) {
	const filteredAlbums = Array.from(albums.values()).filter(album => {
		return album.idAuteur && album.idAuteur.toLowerCase() === author.toLowerCase();
	});
	renderMobileView(filteredAlbums);
	renderDesktopView(filteredAlbums);
}

$(document).ready(function () {
	renderMobileView();
	renderDesktopView();

	$('.dropdown-item').on('click', function (event) {
		const filterType = $(this).data('filter');
		handleFilterSelection(filterType);
		updateCartContent();
	});

	$('.addToCart').on('click', function () {
		const albumId = $(this).data('album-id');
		addToCart(albumId);
	});

	$('.removeFromCart').on('click', function () {
		const albumId = $(this).data('album-id');
		removeFromCart(albumId);
	});
});

function renderMobileView(filteredAlbums) {
	const cardContainer = $('#card-container');
	cardContainer.empty();

	const albumsToRender = filteredAlbums || albums;

	albumsToRender.forEach((album, key) => {
		const auteur = auteurs.get(album.idAuteur);
		const serie = series.get(album.idSerie);
		const card = `
            <div class="card">
                <h5 class="card-title">${album.titre}</h5>
                <p class="card-text">Serie: ${serie.nom}</p>
                <p class="card-text">Auteur: ${auteur.nom}</p>
                <p class="card-text">Prix: ${album.prix}€</p>
                <button class="addToCart btn btn-success" data-album-id="${album.id}">Ajouter au panier</button>
                <button class="removeFromCart btn btn-danger" data-album-id="${album.id}">Retirer du panier</button>
            </div>
        `;
		cardContainer.append(card);
	});

	// ... (The rest of your code)
}

function renderDesktopView(filteredAlbums) {
	const tableContainer = $('#table-container');
	tableContainer.empty();

	const albumsToRender = filteredAlbums || albums;

	albumsToRender.forEach((album, key) => {
		const auteur = auteurs.get(album.idAuteur);
		const serie = series.get(album.idSerie);
		const tableRow = `
            <tr>
                <td>${album.titre}</td>
                <td>${album.numero}</td>
                <td>${serie.nom}</td>
                <td>${auteur.nom}</td>
                <td>${album.prix}</td>
                <td>
                    <button class="addToCart btn btn-success" data-album-id="${album.id}">Ajouter au panier</button>
                    <button class="removeFromCart btn btn-danger" data-album-id="${album.id}">Retirer du panier</button>
                </td>
            </tr>
        `;
		tableContainer.append(tableRow);
	});
}

function handleFilterSelection(filterType) {
	switch (filterType) {
		case 'titre':
			const titreFilter = $('#filterTitre').val();
			filterByTitle(titreFilter);
			break;
		case 'serie':
			const serieFilter = $('#filterSerie').val();
			filterBySeries(serieFilter);
			break;
		case 'auteur':
			const auteurFilter = $('#filterAuteur').val();
			filterByAuthor(auteurFilter);
			break;
		default:
		// Handle other filter types if needed
	}
}

function updateCartContent() {
	const cartSummary = $('#cartSummary');
	cartSummary.empty();

	shoppingCart.forEach(album => {
		const albumTitle = albums.get(album.id).titre;
		const cartItem = `<p>${albumTitle} - ${album.prix}</p>`;
		cartSummary.append(cartItem);
	});

	const totalAmount = shoppingCart.reduce((total, album) => total + parseFloat(album.prix), 0);
	const totalElement = `<p>Total: ${totalAmount.toFixed(2)}</p>`;
	cartSummary.append(totalElement);

	// Update the offcanvas body
	$('.offcanvas-body').html(cartSummary.html());
}
