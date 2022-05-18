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
        if (hasMilestone('C', 0)) mult = mult.times(3)
        if (hasUpgrade('L', 24)) mult = mult.times(upgradeEffect('L', 24))
        if (hasUpgrade('C', 14)) mult = mult.times(upgradeEffect('C', 14).pow(2))
        mult = mult.times(buyableEffect('L',12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "l", description: "L: Reset for some new levels", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    buyables: {
    11: {
        cost(x) { return new Decimal(100).pow(x.add(3)).div(buyableEffect(this.layer, 13)) },
        title() {return "New Update"},
        display() { return " Cost: " + format(tmp[this.layer].buyables[this.id].cost) 
                    + " New Updates: " + getBuyableAmount(this.layer, this.id) 
                    + " Effect " + format(buyableEffect(this.layer, this.id))   },
        unlocked() { return hasUpgrade("C", 12) },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        effect() {
        {let updatebase = 2
        if (hasUpgrade('L',23)) updatebase = 3
        return new Decimal(0).add(updatebase).pow(getBuyableAmount([this.layer], [this.id]))}
    },
        style: {
    width: "100px",
    "min-height": "100px",
    "max-height": "100px"
         },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },   
    },
    12: {
        cost(x) { return new Decimal((getBuyableAmount([this.layer], [this.id])).add(1e32).pow((getBuyableAmount([this.layer], [this.id])).add(1)).pow(0.75)).add(1e32)  },
        title() {return "Increase Object Limit"},
        display() { return " Cost: " + format(tmp[this.layer].buyables[this.id].cost) 
                    + " Object Limit *: " + (getBuyableAmount(this.layer, this.id).add(1)) 
                    + " Effect " + format(buyableEffect(this.layer, this.id))   },
        unlocked() { return hasUpgrade("C", 15) },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        effect() {
        
        return new Decimal(getBuyableAmount([this.layer], [this.id]).pow(getBuyableAmount([this.layer], [this.id]).times(1.75)))
    },
        style: {
    width: "120px",
    "min-height": "120px",
    "max-height": "120px"
         },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },   
    },
    13: {
        cost(x) { return new Decimal(getBuyableAmount([this.layer], [this.id]).pow(getBuyableAmount([this.layer], [this.id]).pow(3)).times(1e50)) },
        title() {return "Update Expander"},
        display() { return " Cost: " + format(tmp[this.layer].buyables[this.id].cost) 
                    + " Expanders: " + getBuyableAmount(this.layer, this.id) 
                    + " Effect " + format(buyableEffect(this.layer, this.id))   },
        unlocked() { return hasUpgrade("C", 15) },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        effect() {
        
        return new Decimal(getBuyableAmount([this.layer], [this.id]).pow(1.25).add(1).pow(12.5))
    },
        style: {
    width: "100px",
    "min-height": "100px",
    "max-height": "100px"
         },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },   
    },

    
},
softcap: new Decimal(1e10),
           softcapPower: new Decimal(0.75),
passiveGeneration() {
           let lvlpersec = 0
           if (hasMilestone('C',1)) lvlpersec=0.1
           return lvlpersec;
           },
           doReset(ResettingLayer) {
    var keep = []
    if (hasMilestone("C", 2)) keep.push("upgrades")
    if (ResettingLayer !== "L") layerDataReset(this.layer, keep)
    
    
},

       
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
    
    },
    22: {    title: "Skill Un-Issuer",
    description: "Levels boost completion gain very slightly. nah jk its a big buff",
    cost: new Decimal(25000),
    unlocked() { return hasUpgrade("C", 11) },
    effect() {
        return player[this.layer].points.add(2).pow(0.1)
    },
       effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" 
    },
    },
    23: {    title: "Update Director",
    description: "Updates boost point gain more",
    cost: new Decimal(5e16),
    unlocked() { return hasUpgrade("C", 13) },
    
    },
    24: {title: "New Main Levels",
    description: "There are some main levels for each update, boosting level gain.",
    cost: new Decimal(5e22),
    unlocked() { return hasUpgrade("C", 13) },
    effect() {
        return getBuyableAmount('L',11).add(1).pow(1.5)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" 
    },
    
    },
    25: {title: "Bugfixes",
    description: "Get bugs fixed in updates, making it easier to beat levels.",
    cost: new Decimal(1e32),
    unlocked() { return hasUpgrade("C", 13) },
    effect() {
        return getBuyableAmount('L',11).add(1).pow(1)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" 
    },
    }
    },
    layerShown(){return true}
})
addLayer("C", {
    name: "Completions",
    symbol: "C",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#FFFF19",
    requires: 400,
    resource: "levels beaten",
    baseResource: "L",
    baseAmount() {return player.L.points},
    type: "normal",
    exponent: 0.4,
    softcap: new Decimal(1e20),
           softcapPower: new Decimal(0.75),
    gainMult() {
        mult = new Decimal(1) // Calculate the multiplier for main currency from bonuses
        if (hasUpgrade('L', 22)) mult = mult.times(upgradeEffect('L', 22))
        if (hasUpgrade('L', 25)) mult = mult.times(upgradeEffect('L', 25))
        if (hasUpgrade('C', 14)) mult = mult.times(upgradeEffect('C', 14).pow(1))
        return mult
    },
    hotkeys: [
        {key: "c", description: "C: Reset to beat some levels", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    gainExp() {
        return new Decimal(1) // Calculate the exponent on main currency from bonuses
    },
    row: 2,
    layerShown() {if (hasUpgrade('L', 21) || player[layer].unlocked ) return true},
      upgrades: {
      11: {    title: "Upgrade Unlocker 1",
    description: "unlock 1 level upgrade, its a good one",
    cost: new Decimal(10)
    },
      12: {title: "Buyable Unlocker 1",
      description: "haha funni weed cost, also gives you a buyable ig",
      cost: new Decimal(420)
    },
      13: {title: "Upgrade Unlocker 2",
      description: "unlock several level upgrades",
      cost: new Decimal(25000000)
    },
      14: {title: "Trinity Booster",
      description: "boosts points, levels, and completions. buff^3, buff^2, buff^1 respectively.",
      cost: new Decimal(5e16),
      unlocked() { return hasUpgrade("L", 25) | hasUpgrade("C", 14) },
    effect() {
        return player[this.layer].points.add(1).log(3)
    },
       effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" 
    },},
     15: {title: "Buyable Unlocker 2",
      description: "unlock two level buyables",
      cost: new Decimal(1e30),
      unlocked() { return hasUpgrade("C", 14) },
    },
     16: {title: "Your Own Levels",
      description: "unlock a new tier 2 layer",
      cost: new Decimal(1e48),
       unlocked() { return hasUpgrade("C", 15) },
       },


    },
    milestones: {
    0: {
        requirementDescription: "3 completions",
        effectDescription: "Triple level gain",
        done() { return player.C.points.gte(3) }
    },
    1: {
        requirementDescription: "750,000 completions",
        effectDescription: "Gain 10% of levels on reset per second",
        done() { return player.C.points.gte(750000) }
    },
    2: {
        requirementDescription: "e24 completions",
        effectDescription: "Level upgrades are permanent.",
        done() { return player.C.points.gte(1e24) }
    },


    
    }
})
addLayer("E", {
    name: "Levels Built",
    symbol: "E",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#6AFF4D",
    requires: 1000,
    resource: "levels uploaded",
    baseResource: "L",
    baseAmount() {return player.L.points},
    type: "static",
    exponent: 3,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    hotkeys: [
        {key: "e", description: "E: Reset to make some levels", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    gainExp() {
        return new Decimal(1)
    },
    row: 2,
    layerShown() {return (hasUpgrade('C', 16) )}
 
    
})
