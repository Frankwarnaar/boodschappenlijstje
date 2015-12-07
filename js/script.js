var items = [];
var greenItems = [];
var list = document.getElementById("list");
var removeAllItems = document.getElementById("remove");
var markAll = document.getElementById("makeGreen");

function removeItem(array, removeFromArray) {
	for (var i=0; i<array.length; i++){
		if (array[i] === removeFromArray){
			array.splice(i,1);
		}
	}
	return array;
}

function itemExistsInArray(array, item) {
	for (var i=0; i<array.length; i++){
		if (array[i] === item){
			return true;
		}
	}
	return false;
}

function addClass (classToAdd, parent){
	for (var i=0; i<parent.childNodes.length; i++) {
		var childNode = parent.childNodes[i];
		childNode.classList.add(classToAdd);
	}
}

function removeClass (classToRemove, parent){
	for (var i=0; i<parent.childNodes.length; i++) {
		var childNode = parent.childNodes[i];
		childNode.classList.remove(classToRemove);
	}
}

function createItem(item){
	var listElement = document.createElement("li");
	var p = document.createElement("p");
	p.innerHTML = item;
	
	var removeImage = new Image(20, 20);
	removeImage.src="images/remove.png";

	listElement.appendChild(p);
	listElement.appendChild(removeImage);
	list.appendChild(listElement);

	items.push(item);

	markAll.innerHTML = "Alles markeren";

	removeAllItems.disabled = false;
	markAll.disabled = false;

	listElement.addEventListener("click", function (){
		if (listElement.classList.contains("clicked")){
			greenItems = removeItem(greenItems, item);
			markAll.disabled = false;
		} else {
			greenItems.push(item);
		}
		if (items.length === greenItems.length) {
			markAll.innerHTML = "Markeringen verwijderen";
		} else {
			markAll.innerHTML = "Alles markeren";
		}
		listElement.classList.toggle("clicked");
	});

	removeImage.addEventListener("mouseover", function (e){
		listElement.classList.add("removeHover");
		e.stopPropagation();
	});

	removeImage.addEventListener("mouseout", function (e){
		listElement.classList.remove("removeHover");
		e.stopPropagation();
	});

	removeImage.addEventListener("click", function (e){
		list.removeChild(listElement);
		var removeFromArray = listElement.textContent;
		greenItems = removeItem(greenItems, removeFromArray);
		items = removeItem(items, removeFromArray);
		if (items.length === 0){
			markAll.disabled = true;
			removeAllItems.disabled = true;
			markAll.innerHTML = "Alles markeren";
		}
		if ((items.length > 0) && (items.length === greenItems.length)) {
			markAll.innerHTML = "Markeringen verwijderen";
		}
		e.stopPropagation();
	});
}

document.getElementById("form").addEventListener("submit", function (e){
	var field = document.getElementById("input");
	var capitalized = field.value.charAt(0).toUpperCase() + field.value.toLowerCase().substring(1);
	if (capitalized.trim() === "") {
		alert("Je hebt niks ingevoerd. Voer iets in om een item toe te voegen.");
		field.value = "";
	}
	else if (itemExistsInArray(items, capitalized)){
		alert(capitalized + " zit al in je boodschappenlijstje.");
		field.value = "";
	} else {
		createItem (capitalized);
		field.value = "";
	}
	e.preventDefault();
});

removeAllItems.addEventListener("click", function (){
	removeAllItems.disabled = true;
	markAll.innerHTML = "Alles markeren";
	markAll.disabled = true;
	for (var i=items.length; i>0; i--) {
		list.removeChild(list.lastChild);
		removeItem (items, items[i-1]);
	}
	greenItems = [];
});

markAll.addEventListener("click", function (){
	if (items.length > greenItems.length) {
		addClass("clicked", list);
		removeClass("markAllHover", list);
		addClass("markNoneHover", list);
		markAll.innerHTML = "Markeringen verwijderen";
		greenItems = [];
		for (var a=0; a<items.length; a++) {
			greenItems.push(items[a]);
		}
	} else {
		removeClass("clicked", list);
		removeClass("markNoneHover", list);
		addClass("markAllHover", list);
		markAll.innerHTML = "Alles markeren";
		greenItems = [];
	}
});


removeAllItems.addEventListener("mouseover", function(){
	addClass("removeHover", list);
});

removeAllItems.addEventListener("mouseout", function(){
	removeClass("removeHover", list);
});

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

markAll.addEventListener("mouseout", function(){
	removeClass("markAllHover", list);
	removeClass("markNoneHover", list);
});

