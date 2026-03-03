
document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemName');
    const addButton = document.getElementById('addButton');
    const location = document.getElementById('itemLocation');
    const quantity = document.getElementById('itemQuant');
    const measurment = document.getElementById('measurment');
    let locationList = {};

    
    addButton.addEventListener('click', () => {
        addItem(itemInput.value, location.value, quantity.value, measurment.value);
        itemInput.value = '';
        location.value = '';
        quantity.value = '';
        measurment.value = '';
    });

    document.addEventListener("keyup", event => {
        if(event.key === "Enter"){
            itemInput.focus()
        }
    })

    const handleEnter = (event) =>{
        if(event.key === 'Enter'){

            addItem(itemInput.value, location.value, quantity.value, measurment.value);
            itemInput.value = '';
            quantity.value = '';
            measurment.value = '';
            location.value = '';
        }
    };

    itemInput.addEventListener('keypress', handleEnter);
    location.addEventListener('keypress', handleEnter);
    quantity.addEventListener('keypress', handleEnter);

    function addItem(itemName, itemLocation, itemQuantity, measurment){
        if(itemName == '') return;
        if(itemQuantity === '' || Number.isInteger(itemQuantity)){
            console.log("im triggered");
            itemQuantity = 1;
            measurment = '';
        }
        itemName = itemName.toLowerCase()
        itemLocation = itemLocation.toLowerCase();

        fullItemInfo = [itemName, itemQuantity, measurment];

        if(itemLocation === ''){
            itemLocation = 'misc';
            addItem(itemName, itemLocation);
        } else if (locationList[itemLocation]){
            const existingItem = locationList[itemLocation].find(item =>
                item[0].toLowerCase() === itemName.toLowerCase()
            );
            if(existingItem && existingItem[2] === measurment){
                if(existingItem[1] === ''){
                    existingItem[1] = Number(itemQuantity) + 1;
                } else{
                    existingItem[1]= Number(existingItem[1]) + Number(itemQuantity);
                }
            } else{
                locationList[itemLocation].push(fullItemInfo);
            }

            
        } else {
            locationList[itemLocation] = [fullItemInfo];
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

        Object.entries(locationList).forEach(([itemLocation, fullItemInfo]) =>{
            const heading = document.createElement('h3');
            heading.textContent = itemLocation.charAt(0).toUpperCase() + itemLocation.slice(1) + ':';
            container.appendChild(heading);

            const ul = document.createElement('ul');

            fullItemInfo.forEach((itemInfo, index) => {
                console.log(locationList[itemLocation]);
                console.log("index: " + index);
                const li = document.createElement('li');
                const name = String(itemInfo[0]);
                const itemName = name.charAt(0).toUpperCase() + name.slice(1);
                const unit = itemInfo[1] || '';
                const measurement = itemInfo[2] || '';
                if(unit == 1 && measurement === ''){
                    li.textContent = itemName.trim();
                }else{
                    li.textContent = itemName + " " + unit + " " + measurement.trim();
                }
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