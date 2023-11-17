function filterByTitle(title) {
    const filteredAlbums = Array.from(albums.values()).filter(album => {
        // Check if album.titre is defined and not null before calling toLowerCase()
        return album.titre && album.titre.toLowerCase().includes(title.toLowerCase());
    });
    renderMobileView(filteredAlbums);
    renderDesktopView(filteredAlbums);
}

function filterBySeries(series) {
    const filteredAlbums = Array.from(albums.values()).filter(album => {
        // Check if album.idSerie is defined and not null before calling toLowerCase()
        return album.idSerie && album.idSerie.toLowerCase() === series.toLowerCase();
    });
    renderMobileView(filteredAlbums);
    renderDesktopView(filteredAlbums);
}

function filterByAuthor(author) {
    const filteredAlbums = Array.from(albums.values()).filter(album => {
        // Check if album.idAuteur is defined and not null before calling toLowerCase()
        return album.idAuteur && album.idAuteur.toLowerCase() === author.toLowerCase();
    });
    renderMobileView(filteredAlbums);
    renderDesktopView(filteredAlbums);
}



$(document).ready(function () {
	renderMobileView();
	renderDesktopView();
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
                <p class="card-text">Number: ${album.numero}</p>
                <p class="card-text">Series: ${serie.nom}</p>
                <p class="card-text">Author: ${auteur.nom}</p>
                <p class="card-text">Price: ${album.prix}</p>
            </div>
        `;
		cardContainer.append(card);
	});
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
            </tr>
        `;
		tableContainer.append(tableRow);
	});
}

$(document).ready(function () {
    // Load initial data
    renderMobileView();
    renderDesktopView();

    // Event listener for the dropdown items
    $('.dropdown-item').on('click', function (event) {
        const filterType = $(this).data('filter');
        handleFilterSelection(filterType);
    });
});

// Function to handle filter selection
function handleFilterSelection(filterType) {
	switch (filterType) {
		case 'titre':
			// Assuming you have an input with id 'filterTitre'
			const titreFilter = $('#filterTitre').val();
			filterByTitle(titreFilter);
			break;
		case 'serie':
			// Assuming you have an input with id 'filterSerie'
			const serieFilter = $('#filterSerie').val();
			filterBySeries(serieFilter);
			break;
		case 'auteur':
			// Assuming you have an input with id 'filterAuteur'
			const auteurFilter = $('#filterAuteur').val();
			filterByAuthor(auteurFilter);
			break;
		default:
		// Handle other filter types if needed
	}
}

