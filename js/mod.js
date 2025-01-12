let modInfo = {
	name: "The Geometry Dash Tree",
	id: "FromSMtoCYCLOLCYC",
	author: "Icosalord",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.02",
	name: "3 Layers",
}

let changelog = `<h1>Changelog:</h1><br><br>
    <h3>v0.02</h3><br>
	    -Added the basis for a new static row 2 layer.<br><br>

    <h3>v0.01</h3><br>
	    -Added gameplay with 2 layers up until about e160 points.<br><br>

	<h3>v0.0</h3><br>
		- And the code fell, ready for change. <br>`
		

let winText = `Welcome to the endgame as of this update. Congrats on coming so far.`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
        if (hasUpgrade('L', 11)) gain = gain.times(2)
        if (hasUpgrade('L', 12)) gain = gain.times(upgradeEffect('L', 12))
		if (hasUpgrade('L', 14)) gain = gain.times(upgradeEffect('L', 14))
		if (hasUpgrade('L', 21)) gain = gain.times(2)
		gain = gain.times(buyableEffect('L',11))
		gain = gain.times(player.C.points.add(1))
		if (hasUpgrade('C', 14)) mult = mult.times(upgradeEffect('C', 14).pow(3))
		
		
		
 	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e160"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(60) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}