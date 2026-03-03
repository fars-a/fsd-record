function sendData() {

    const name = document.getElementById("name").value;
    const suggestion = document.getElementById("suggestion").value;

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            suggestion: suggestion
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("response").innerText = data.message;
    });

}