console.log("popup")

function makeList(listData) {
    console.log(listData)
    listContainer = document.createElement('div');
    listElement = document.createElement('ul');
    numberOfListItems = listData.length;
    listItem = 0;
    i = 0;
    console.log(document.getElementById('list'))
    document.getElementById('list').appendChild(listContainer);
    listContainer.appendChild(listElement);
    for (i = 0; i < numberOfListItems; ++i) {
        //listItem = document.createElement('li');
        listItem.innerHTML = "<li>" + listData[i].user_name + "</li>";
        listElement.appendChild(listItem);
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "fetch completed") {
            makeList(request.data);
            console.log(request.data)
        }
    }
);
