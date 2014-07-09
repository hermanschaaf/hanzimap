//Require
var hanzi = require("hanzi");
//Initiate
hanzi.start();

// var decomposition = hanzi.decompose('爱', 2);
// console.log(decomposition);

m = {};

fs = require('fs');
fs.readFile('allchars.txt', 'utf8', function(err, data){
    if (err) {
        return console.log(err);
    }

    var radicals = {};
    var decomposition = hanzi.decomposeMany(data.substring(0, 3000), 2);

    for (var i = 0; i < data.length && i < 3000; i++) {
        var c = data.charAt(i),
            compMap = {},
            comps = [];

        // remove duplicate components
        for (var g = 0; g < decomposition[c].components.length; g++) {
            if (!compMap[decomposition[c].components[g]]) {
                compMap[decomposition[c].components[g]] = true;
                radicals[decomposition[c].components[g]] = true;
            }
        }
        for (var c in compMap) {
            comps.push(c);
        }
    }
    var response = [];
    for (var r in radicals) {
        response.push({character: r});
    }

    fs.writeFile("radicals.json", JSON.stringify(response), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });

    response = [];
    for (var c in decomposition) {
        response.push({ch: c, r: decomposition[c].components});
    }

    fs.writeFile("characters.json", JSON.stringify(response), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
});