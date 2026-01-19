document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemName');
    const addButton = document.getElementById('addButton');
    const location = document.getElementById('itemLocation');
    let locationList = {};

    addButton.addEventListener('click', () => {
        addItem(itemInput.value, location.value);
        itemInput.value = '';
        location.value = '';
    });

    function addItem(itemName, itemLocation){
        if(itemName == '') return;
        itemName = itemName.toLowerCase();
        itemLocation = itemLocation.toLowerCase();


        if(itemLocation == ''){
            itemLocation = 'misc';
            addItem(itemName, itemLocation);
        } else if (locationList[itemLocation]){
            locationList[itemLocation].push(itemName);
        } else {
            locationList[itemLocation] = [itemName];
        }
        renderLists();    
    }

    function removeItem(itemLocation, index){
        if(locationList[itemLocation] && locationList[itemLocation][index] !== undefined){
            locationList[itemLocation].splice(index, 1);
            if(locationList[itemLocation].length === 0){
                delete locationList[itemLocation];
            }
        }
        renderLists();    
    }

    function renderLists(containerId = 'list-container'){
        const container = document.getElementById(containerId);
        if(!container) return;

        container.innerHTML = '';

        Object.entries(locationList).forEach(([itemLocation, items]) =>{
            const heading = document.createElement('h3');
            heading.textContent = itemLocation.charAt(0).toUpperCase() + itemLocation.slice(1) + ':';
            container.appendChild(heading);

            const ul = document.createElement('ul');

            items.forEach((item, index) => {
                const li = document.createElement('li');
                li.textContent = item.charAt(0).toUpperCase() + item.slice(1);;

                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.onclick = () => removeItem(itemLocation, index);
                li.appendChild(document.createTextNode(' '));
                li.appendChild(removeBtn);
                
                ul.appendChild(li);
            });

            container.appendChild(ul);
        });
    }
});