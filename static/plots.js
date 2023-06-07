let winnersAPI = "/api/v1.0/Winners"

function init () {
    d3.json(winnersAPI).then(function(data) {
        console.log(data)
    })
}