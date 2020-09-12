let list = [
    {"desc": "rice", "amount": "1", "value": "4.40"},
    {"desc": "beer", "amount": "12", "value": "1.99"},
    {"desc": "meat", "amount": "1", "value": "15.00"},
    {"desc": "paper", "amount": "3", "value": "5"} 
];

function getTotal(list) {
    let total = 0;
    for (let key in list) {
        total += list[key].value * list[key].amount;
    }
    return total;
}

function setList(list) {
    let table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>';
    for (let key in list) {
        table += '<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+ list[key].amount +'</td><td>'+ formatValue(list[key].value) +'</td><td><button class="btn btn-light" onclick="setUpdate('+key+')">Edit</button> | <button class="btn btn-dark" onclick="deleteData('+key+')">Delete</button></td></tr>';
    }
    table += '</tbody>';
    document.getElementById('listTable').innerHTML = table;
}

function formatDesc(desc) {
    let str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function formatValue(value) {
    let str = parseFloat(value).toFixed(2) + '';
    str = str.replace('.', ',');
    str = '$ ' + str;
    return str;
}

function addData() {
    let desc = document.getElementById("desc").value;
    let amount = document.getElementById("amount").value;
    let value = document.getElementById("value").value;

    let newData = {
        "desc": desc,
        "amount": amount,
        "value": value
    };
    list.unshift(newData);
    setList(list);
}

function setUpdate(id) {
    let obj = list[id];
    document.getElementById('desc').value = obj.desc;
    document.getElementById('amount').value = obj.amount;
    document.getElementById('value').value = obj.value;
    document.getElementById('btnUpdate').style.display = 'inline-block';
    document.getElementById('btnAdd').style.display = 'none';

    document.getElementById('inputIdUpdate').innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
}

function resetForm() {
    document.getElementById('desc').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('value').value = '';
    document.getElementById('btnUpdate').style.display = 'none';
    document.getElementById('btnAdd').style.display = 'inline-block';

    document.getElementById('inputIdUpdate').innerHTML = '';
}

function updateData() {
    let id = document.getElementById('idUpdate').value;
    let desc = document.getElementById('desc').value;
    let amount = document.getElementById('amount').value;
    let value = document.getElementById('value').value;

    list[id] = {
        "desc": desc,
        "amount": amount,
        "value": value
    }
    resetForm();
    setList(list);
}

function deleteData(id) {
    if (confirm('Delete this item?')) {
        if (id === list.length - 1) {
            list.pop();
        }else if (id === 0) {
            list.shift();
        }else {
            let arrayAuxIn = list.slice(0, id);
            let arrayAuxFin = list.slice(id + 1);
            list = arrayAuxIn.concat(arrayAuxFin);
        }
        setList(list);
    }
}

setList(list);

console.log(getTotal(list));
