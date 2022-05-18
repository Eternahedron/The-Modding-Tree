var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: [["L"],
                ["C","E"]],
    branches: [["L"],
               ["C","E"]]
 

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "true",
})



addLayer("tree-tab", {
    tabFormat: [["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]],
    previousTab: "",
    leftTab: true,
})

