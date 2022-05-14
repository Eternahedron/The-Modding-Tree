addLayer("L", {
    name: "Levels", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#3636FF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "levels", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6, // Prestige currency exponent
        gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('L', 13)) mult = mult.times(upgradeEffect('L', 13))
        if (hasUpgrade('L', 15)) mult = mult.times(upgradeEffect('L', 15))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "l", description: "L: Reset for some new levels", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades : {

    11: {    title: "Add a gamemode",
    description: "add a new gamemode, doubling point gain",
    cost: new Decimal(1)
    
    },
    12: {    title: "Comments",
       description: "add commenting to levels, making levels boost point gain",
       cost: new Decimal(2),
       effect() {
           return player[this.layer].points.add(1.5).pow(0.4)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
    },
    13: {    title: "Level verification",
       description: "levels need to be verified now, making points boost level gain for some reason",
       cost: new Decimal(5),
       effect() {
        return player.points.add(1).pow(0.15)
    },
       effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" 
    },
    },
    14:{    title: "Likes",
       description: "you can like levels now, making points boost point gain",
       cost: new Decimal(15),
       effect() {
        return player.points.add(1).pow(0.2)
    },
       effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" 
    },

    },
    15:{    title: "Dislikes",
       description: "you can dislike levels now, making levels boost level gain",
       cost: new Decimal(25),
       effect() {
        return player[this.layer].points.add(1).pow(0.2)
    },
       effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" 
    },

    },
    21: {    title: "Playing Levels",
    description: "Unlocks the Completions layer and double point gain",
    cost: new Decimal(125)
    
    }
    },
    layerShown(){return true}
}),
addLayer("completions", {
    name: "Completions",
    symbol: "C",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "6dc600",
    requires: 400,
    resource: "levels beaten",
    baseResource: "L",
    baseAmount() {return player.L.points},
    type: "normal",
    exponent: 0.4,
    gainMult() {
        mult = new Decimal(1) // Calculate the multiplier for main currency from bonuses
        return mult
    },
    gainExp() {
        return new Decimal(1) // Calculate the exponent on main currency from bonuses
    },
    row: 2,
    layerShown() {return true},
      upgrades: {

    },
})
