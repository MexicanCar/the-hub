
document.getElementById("foodSubmit").addEventListener("click", function(event){
    event.preventDefault();



    

    const value = encodeURI(document.getElementById("foodInput").value);
    if(value === ""){
        return;
    }

    const url2 = "https://api.edamam.com/api/nutrition-data?app_id=bc8bd65d&app_key=84d4b3bd544f1cad2e2b1cb5753b58e9&ingr=1%20" + value;

    fetch(url2)
        .then(function(response){
            return response.json();
        }).then(function(json){
            console.log(json);

            let result = "<h2>" + document.getElementById("foodInput").value + "</h2>";
            result += "<h4>General Info:</h4>";
            result += "<div><strong>Calories</strong>: " + json.calories + "</div>";
            result += "<div><strong>Diet Labels</strong>:<br>";
            for(let i = 0; i < json.dietLabels.length; i++){
                result += json.dietLabels[i];
            }
            result += "</div>";
            result += "<div><strong>Total Weight</strong>: " + json.totalWeight + "g</div>";
            document.getElementById("basic-facts").innerHTML = result;
        });

  


    const url = "https://api.edamam.com/api/food-database/v2/parser?ingr=" + value + "&app_id=083d5a43&app_key=8fb9ddcbd71596921a149515abae8ff6";

    fetch(url)
        .then(function(response){
            return response.json();
        }).then(function(json){
            console.log(json);
            
            let options = "";
            for(let i = 0; i < json.hints.length; i++){
                let image = document.createElement("img");
                image.setAttribute("src", json.hints[i].food.image);

                if(image.complete){
                options += "<div class='search'>";
                options += "<h4 class='option'>" + json.hints[i].food.label + "</h4>"; 
                options += "<div class='inside'>"
                options += "<img class='option-img' src='" + json.hints[i].food.image + "' alt=''/>"
                options += "<div class='facts'>"
                options += "<div><strong>Fat</strong>: " + json.hints[i].food.nutrients.FAT + " g</div>";
                options += "<div><strong>Kcal</strong>: " + json.hints[i].food.nutrients.ENERC_KCAL + "</div>";
                options += "<div><strong>Fiber</strong>: " + json.hints[i].food.nutrients.FIBTG + " g</div>";
                options += "<div><strong>Protien</strong>: " + json.hints[i].food.nutrients.PROCNT + " g</div>";
                options += "</div>";   
                options += "</div>";  
                options += "</div>";     
            }
                image.remove();
            }
            document.getElementById("food-label").innerHTML = options;
        });

        
    });
    