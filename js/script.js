var items = []; //array met hier alle items
var greenItems = []; //array met alle items die gemarkeerd zijn
var list = document.getElementById("list"); //haal ul op en sla deze op in var list. Hier moet de li items in komen
var removeAllItems = document.getElementById("remove"); //haal de "Alles verwijderen" button op en stop deze in var remove
var markAll = document.getElementById("makeGreen"); //haal de "Alles markeren" button op en stop deze in var markAll

// Functie om item uit een array te verwijderen
function removeItem(array, removeFromArray) { //Array = variabele waaruit element verwijderd moet worden, removeFromArray = item dat verwijderd moet worden
	for (var i=0; i<array.length; i++){ // Bron: http://stackoverflow.com/questions/9792927/javascript-array-search-and-remove-string
		if (array[i] === removeFromArray){ //Als het item met de indexwaarde overeenkomt met het item dat in de functie ingevoerd wordt, dan...
			array.splice(i,1); //Haal item uit de array die je erin gooit
		}
	}
	return array; //Je krijgt de array terug, zonder het item dat verwijderd moest worden
}

// Functie om te checken of item al in array zit
function itemExistsInArray(array, item) {
	for (var i=0; i<array.length; i++){
		if (array[i] === item){
			return true; //Als het item in de array zit, krijg je als return true. Doordat je een return gebruikt, exit je de function
		}
	}
	return false; //Als het item niet in de array zit, krijg je als return false
}

//Functie om een class toe te voegen aan alle childs van een parent
function addClass (classToAdd, parent){
	for (var i=0; i<parent.childNodes.length; i++) {
		var childNode = parent.childNodes[i];
		childNode.classList.add(classToAdd);
	}
}

//Functie om een class te verwijderen van alle childs van een parent
function removeClass (classToRemove, parent){
	for (var i=0; i<parent.childNodes.length; i++) {
		var childNode = parent.childNodes[i];
		childNode.classList.remove(classToRemove);
	}
}

// Functie om list item te creëren
function createItem(item){
	//Bron: Jon Ducket - Javacript (pagina 223)
	var listElement = document.createElement("li");//maak List item aan en sla deze op in var listElement
	var p = document.createElement("p");//maak een paragraaf element aan en sla deze op in var p
	p.innerHTML = item; //vul paragraaf met item
	
	// Creëer image | Bron: http://stackoverflow.com/questions/226847/what-is-the-best-javascript-code-to-create-an-img-element
	var removeImage = new Image(20, 20); //creëer image met hoogte x breedte = 20 x 20
	removeImage.src="images/remove.png"; //src van de image

	listElement.appendChild(p);//item wordt gevuld met de variabele p
	listElement.appendChild(removeImage);//item wordt ook gevuld met afbeelding
	list.appendChild(listElement);//Het list item wordt op zijn plaats gezet, in de unordered list

	items.push(item);//Stuur var item naar de array items | Bron: http://stackoverflow.com/questions/1286084/pushing-value-of-var-into-an-array

	markAll.innerHTML = "Alles markeren"; // Als er een item wordt toegevoegd, wordt de tekst in de markeerknop weer "Alles markeren".

	removeAllItems.disabled = false; //Als een element wordt toegevoegd, wordt het attribute disabled verwijderd.
	// Bron: http://stackoverflow.com/questions/7526601/setattributedisabled-false-changes-editable-attribute-to-false
	
	markAll.disabled = false;

	// Toggle class "clicked" aan of uit bij list item bij klik
	listElement.addEventListener("click", function (){
		//Bron: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
		if (listElement.classList.contains("clicked")){ //Als het listElement de class "clicked" bevat, dan...
			greenItems = removeItem(greenItems, item); //Array greenItems wordt geüpdated naar array zonder uitgeklikte item
			markAll.disabled = false; //Markeerknop wordt enabled
		} else { //Als het listElement de class "clicked" niet bevat, dan...
			greenItems.push(item); //Push item naar greenItems (item wordt toegevoegd aan array)
		}
		if (items.length === greenItems.length) { //als er evenveel items als gemaarkeerde items zijn, dan...
			markAll.innerHTML = "Markeringen verwijderen";
		} else {
			markAll.innerHTML = "Alles markeren";
		}
		listElement.classList.toggle("clicked"); //Toggle class "clicked" aan of uit
	});

	//Voeg class hover toe aan listElement als je over removeImage hovert. | Bron: http://stackoverflow.com/questions/8318591/javascript-addeventlistener-using-to-create-a-mouseover-effect
	removeImage.addEventListener("mouseover", function (e){
		listElement.classList.add("removeHover");
		e.stopPropagation(); //Voorkom bubbling, zodat het ListElement niet gehovered wordt. | Bron: Jon Ducket - Javacript (pagina 267)
	});

	//Verwijder class hover van listElement als over removeImage hovert
	removeImage.addEventListener("mouseout", function (e){
		listElement.classList.remove("removeHover");
		e.stopPropagation();
	});

	//verwijder listElement uit unordered list
	removeImage.addEventListener("click", function (e){
		list.removeChild(listElement); //bron: Jon Ducket - Javacript (pagina 225)
		var removeFromArray = listElement.textContent; //haal textcontent uit listElement en stop deze in var removeFromArray
		greenItems = removeItem(greenItems, removeFromArray); //Verwijderde item uit array greenItems halen
		items = removeItem(items, removeFromArray); //Verwijderde item uit array items halen
		if (items.length === 0){ //Als er geen items zijn, worden zowel de markeerknop als de removeknop niet clickable
			markAll.disabled = true; //Markeerknop wordt gedisabled
			removeAllItems.disabled = true; //removeknop wordt gedisabled
			markAll.innerHTML = "Alles markeren";
		}
		if ((items.length > 0) && (items.length === greenItems.length)) { //Als er items zijn en dat zijn er evenveel als het aantal greenItems, dan...
			markAll.innerHTML = "Markeringen verwijderen"; //De tekst in markeerknop wordt "Markeringen verwijderen".
		}
		e.stopPropagation(); //Voorkom bubbling naar listElement, zodat listElement niet de class "clicked" togglet. | bron: Jon Ducket - Javacript (pagina 267)
	});
}

document.getElementById("form").addEventListener("submit", function (e){ //als je submit, dan...
	var field = document.getElementById("input"); //Haal input op en stop deze in var field
	var capitalized = field.value.charAt(0).toUpperCase() + field.value.toLowerCase().substring(1);//Maak var capitalized met hoofdletter 1e letter + de letter vanaf positie 1 in kleine letters | Bron: http://forwebonly.com/capitalize-the-first-letter-of-a-string-in-javascript-the-fast-way/
	if (capitalized.trim() === "") {//Haalt spaties weg | Bron: http://www.w3schools.com/jsref/jsref_trim_string.asp
		alert("Je hebt niks ingevoerd. Voer iets in om een item toe te voegen.");//geef foutmelding | Bron: http://www.w3schools.com/js/js_popup.asp
		field.value = ""; //leeg invoerveld
	}
	else if (itemExistsInArray(items, capitalized)){ //Check of het toe te voegen object al in array items zit.
		alert(capitalized + " zit al in je boodschappenlijstje."); //foutmelding
		field.value = ""; //leeg invoervoer
	} else {
		createItem (capitalized); //voer functie uit met parameter capitalized
		field.value = ""; //leeg invoerveld
	}
	e.preventDefault();//cancel event submit van form | bron http://www.w3schools.com/jsref/event_preventdefault.asp
});

removeAllItems.addEventListener("click", function (){ //Event als je op de removeknop drukt
	removeAllItems.disabled = true; //Verwijderknop ziet er niet meer clickable uit
	markAll.innerHTML = "Alles markeren";
	markAll.disabled = true; //Markeerknop ziet er niet meer clickable uit
	// For loop om alle items te verwijderen
	for (var i=items.length; i>0; i--) {
		list.removeChild(list.lastChild); //Bron: Jon Ducket - Javacript (pagina 225)
		removeItem (items, items[i-1]);
	}
	greenItems = [];//Leeg de array itemsGreen
});

// Maak alle toegevoegde items groen
markAll.addEventListener("click", function (){ //Als je op de knop klikt, dan...
	if (items.length > greenItems.length) { //Als niet alles groen is, dan...
		addClass("clicked", list); //Voeg class clicked aan alle childs van list toe
		removeClass("markAllHover", list); //Verwijder class markAllHover van alle childs van list
		addClass("markNoneHover", list); //Voeg class markNoneHover toe aan alle childs van list
		markAll.innerHTML = "Markeringen verwijderen"; //Tekst in knop wordt "Markeringen verwijderen".
		greenItems = []; //greenItems wordt geleegd, zodat je straks geen greenItems dubbel hebt.
		// For loop om alle items te pushen naar greenItems
		for (var a=0; a<items.length; a++) {
			greenItems.push(items[a]);
		}
	} else { //Als wel alles groen is, dan...
		removeClass("clicked", list); //Verwijder class clicked van alle childs van list
		removeClass("markNoneHover", list); //Verwijder class markNoneHover van alle childs van list
		addClass("markAllHover", list); //Voeg class markAllHover toe aan all childs van list
		markAll.innerHTML = "Alles markeren"; //Tekst in knop wordt "Alles markeren".
		greenItems = []; //greenItems wordt geleegd.
	}
});

// Bron voor eventListeners van hoveren: http://stackoverflow.com/questions/8318591/javascript-addeventlistener-using-to-create-a-mouseover-effect

//Maak alle items rood bij hover over knop om alles te verwijderen
removeAllItems.addEventListener("mouseover", function(){
	addClass("removeHover", list);
});

//Maak alle items niet meer rood als je stopt met hoveren
removeAllItems.addEventListener("mouseout", function(){
	removeClass("removeHover", list);
});

//Items iets donkerder maken / iets lichter maken bij hoveren over markeerknop
markAll.addEventListener("mouseover", function(){
	for (var i=0; i<list.childNodes.length; i++) {
		var childNode = list.childNodes[i];
		if (!childNode.classList.contains("clicked")) {
			childNode.classList.add("markAllHover");
		}
	}
	if (markAll.textContent == "Markeringen verwijderen") {
		addClass("markNoneHover", list);
	}
});

//Verwijder alle hoverclasses weer als je stopt met hoveren
markAll.addEventListener("mouseout", function(){
	removeClass("markAllHover", list);
	removeClass("markNoneHover", list);
});

