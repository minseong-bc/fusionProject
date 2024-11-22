function filter() {
    var f = document.querySelector('#서울').textContent;
    fetch()
    console.log(f);
}

document.querySelector("button").addEventListener('click', function() {
    var fired_button = this.value;
    console.log(fired_button);  
});
document.querySelector("button").gete