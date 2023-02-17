//What events will your application need?
//What APIs will you need and in what order?
//How will you obtain the user's location?
//How will you add the user's location to the map?
//How will you get the selected location from the user?
//How will you add that information to the map?
//Add a simple select interface for the user with the following values: coffee, restaurant, hotel, and market. Next, create a space where you will place your map.

//Add a Map to Your Application
const myMap = {
    coordinates:[],
    businesses:[],
    map:[],
    markers:[],

    buildMap(){
        this.map('map', {
            center: this.coordinates,
            zoom: 11,
        });
        //Add User's Coordinates to the Map
        //Tiles
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map)
        //Markers
        const marker = L.marker(this.coordinates)
        marker
        .addTo(this.map)
        .bindPopup('<b> Your location.</b><br>')
        .openPopup();
    },
    //Add Business Markers
    addMarkers() {
        for (var i = 0; i < this.businesses.length; i++) {
        this.markers = L.marker([
            this.businesses[i].latitude,
            this.businesses[i].longitude,
        ])
            .bindPopup(`<p1>${this.businesses[i].name}</p1>`)
            .addTo(this.map)
        }
}
}
    async function getCordinates(){
        const position = await new Promise((resolve,reject)=>{
            navigator.geolocation.getCurrentPosition(resolve, reject)
        });
        return [position.coordinates.latitude, position.coordinates.longitude]
    
    }

    //Get Business Type from User (Event Handlers)
    window.onload = async () => {
        const coordinates = await getCoordinates()
        console.log(coordinates)
        myMap.coordinates = coordinates
        myMap.buildMap()
    }
    document.getElementById('submit').addEventListener('click', async (event) => {
        event.preventDefault()
        let business = document.getElementById('business').value
        console.log(business)

        document.getElementById('submit').addEventListener('click', async (event) => {
            event.preventDefault()
            let business = document.getElementById('business').value
            let data = await getFoursquare(business)
            myMap.businesses = processBusinesses(data)
            myMap.addMarkers()
    })
})
    //Connect to Foursquare
    async function getFoursquare(business) {
    const options = {
        method: 'GET', 
        headers: {accept: 'application/json',
        authorization: 'fsq321samLi2Vfo4x4/14oZCOu3judB7NRPYa/6SzesAEG0='}
    }
}

//Create an Array of Businesses
let limit = 5
	let latitude = myMap.coordinates[0]
	let longitude = myMap.coordinates[1]
	let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=coffee&limit=5&ll=41.8781%2C-87.6298`, options)
	let data = await response.text()
	let parsedData = JSON.parse(data)
	let businesses = parsedData.results
	return businesses




