const content = document.getElementById("content")
let data = {};

const artistIds = ["6l3HvQ5sa6mXTsMTB19rO5"];
const requestToken = async () => {

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "grant_type=client_credentials&client_id=64ffb24515d44051b073917a2bd60326&client_secret=7ba47ffd43fc4c799c3e9a64b02b2456"
    });
     data = await response.json()
    console.log(data)
};
const renderPage = async () => {
    await requestToken();

    artistIds.forEach((artistId) => fetchArtist(artistId));
     fetchArtistSongs("6l3HvQ5sa6mXTsMTB19rO5")
}

const fetchArtist = async (artistId) => {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: { "Authorization": `Bearer ${data.access_token}` }
    });

    const artistInfo = await response.json();
    const artist = { image: artistInfo.images[0].url }
    renderArtist(artist);
    

}
const fetchArtistSongs = async (artistId) => {
  
    console.log("fetchArtistSongs: " + data.access_token)
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
        headers: { "Authorization": `Bearer ${data.access_token}` }
    });

    const artistSongs = await response.json()
    
    renderArtistSongs(artistSongs)

}
const fetchArtistAlbums = async (artistId) => {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?market=US`, {
        headers: { "Authorization": `Bearer ${data.access_token}` }
    });

    const artistAlbums = await response.json()
    
    renderArtistAlbums(artistAlbums)

}


const renderArtist = (artist) => {
    const image = document.createElement("img")
    image.src = artist.image
    content.append(image)
}
const renderArtistSongs = (artistSongs) => {
    console.log(artistSongs)
    artistSongs.tracks.forEach((song) => {
        const li = document.createElement("li")
        li.textContent = song.name
        content.append(li)
    })
}
const renderArtistAlbums = (artistAlbums) => {
    console.log(artistAlbums)
    artistAlbums.albums.forEach((album) => {
        const li = document.createElement("li")
        li.textContent = album.name
        content.append(li)
    })
}
//  setInterval(() => { requestToken(), 3600000 })
renderPage(); 



//first get all the info of artist
//image, name ,Genre
//add other 4 artist ids to the array
//write the function that will fetch the albums (event listeners)
//click on album and it will fetch the songs on the album

// file:///Users/shalmalhotra/Development/code/phase-1/phase-1-project/index.html