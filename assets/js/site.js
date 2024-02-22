var recipeList = 
[
{"title":"Stuffed Peppers","url":"/stuffed-peppers.html"},
{"title":"Baked Ziti","url":"/baked-ziti.html"}
]

var recipes = [];

function search() {
  var input = document.getElementById("searchText").value;
	var tokens = input.split(" ");
	input = "";

  var stopWords = ["and", "or", "i", "the", "of", "a", "as", "at", "is", "are", "to", "if"];

	for(var x=0; x<tokens.length; x++) {
		var word = tokens[x].toLowerCase();

		for (var y=0; y<stopWords.length; y++) {
			if(tokens[x] == stopWords[y]) {
				word = "";
				break;
			}
		}

		if(word != "") {
			input += tokens[x] + "|";
		}
	}

	var cleanedInput = input.substring(0, input.length-1);

	recipes = [];

	for(var i=0; i<recipeList.length; i++) {
		var recipe = recipeList[i];
		var reg = new RegExp(cleanedInput, 'gi');

		if(reg.test(recipe.title)) {
			recipes.push(recipe);
		}
	}

	document.getElementById("content-page").style.display = "none";

	if(recipes.length <= 0) {
		document.getElementById("search-results").innerHTML = "<p style='font-size: 20px;'> No Recipes were found based on your search.</p>";
		document.getElementById("search-list").innerHTML = "";

	} else {
		document.getElementById("search-results").innerHTML = "<p style='font-size: 20px;'>Found " + recipes.length + " matching recipes</p>";
		var html = createResultsHTML(recipes);
		document.getElementById("search-list").innerHTML = html;
	}
}

function createResultsHTML(recipes) {
  var html = "<ul class='none'>";

  for(var i=0; i<recipes.length; i++) {
    var recipe = recipes[i];

     html +=  
       "<a class='link' + 
	"href='/assets/recipes/" + recipe.url + "'>" + recipe.title + 
	"</a>" +
	"<br/>";
  }

  return html;
}

var searchText = document.getElementById("searchText");

searchText.addEventListener("keyup", function(event) {
	if(event.keyCode === 13) {
		event.preventDefault();
		document.getElementById("searchBtn").click();
	}
});

function menuFunction() {
  var x = document.getElementById("recipeTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
