const resp = document.getElementsByClassName('resp')[0];

const renderResponse = (res) => {
    if (res.length){
        let str = ``;
        res.forEach(a => { 
            str += `<p>${a.article}</p>`
        });
        resp.innerHTML = str;
    } else {
        resp.innerHTML = 'No response';
    }
}

const getResponse = async() => {
    fetch('/articles')
    .then((response) => {
        if (response.ok){
            return response.json();
        } else {
            resp.innerHTML = `Error`;
        }
    }).then((response) => {
        renderResponse(response);
    });
}

getResponse();