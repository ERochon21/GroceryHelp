const itemInput = document.getElementById('itemName');
const addButton = document.getElementById('addButton');
const itemList = document.getElementById('itemList');
const locationInput = document.getElementById('itemLocation')
const locationList = document.getElementById('locations')

addButton.addEventListener('click', addItemToList);

function addItemToList(){
    const newItemText = itemInput.value.trim();
    const newLocationText = locationInput.value.trim();
    
    
    if(newItemText !== ''){
        if(newLocationText == ''){
            newLocationText = 'Misc.'
        }
        const ol = document.createElement('ol');
        const li = document.createElement('li');

        ol.textContent = newLocationText;
        li.textContent = newItemText;

        
        
        locations.appendChild(ol);
        itemList.appendChild(li);
        

        const itemCollected = document.createElement('button');
        itemCollected.textContent = 'In the Cart!';
        itemCollected.addEventListener('click', function(){
            locations.removeChild(ol);
            itemList.removeChild(li);
        });
        li.appendChild(itemCollected);

        itemInput.value = '';

        itemInput.focus();
    }

}
