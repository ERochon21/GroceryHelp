const itemInput = document.getElementById('itemName');
const addButton = document.getElementById('addButton');
const itemList = document.getElementById('itemList');

addButton.addEventListener('click', addItemToList);

function addItemToList(){
    const newItemText = itemInput.value.trim();

    
    if(newItemText !== ''){
        const li = document.createElement('li');

        li.textContent = newItemText;

        itemList.appendChild(li);

        const itemCollected = document.createElement('button');
        itemCollected.textContent = 'Acquired';
        itemCollected.style.marginLeft = '10 px';
        itemCollected.addEventListener('click', function(){
            itemList.removeChild(li);
        });
        li.appendChild(itemCollected);

        itemInput.value = '';

        itemInput.focus();
    }

}
