var max_width = 520;
var currentIndex = 0;

var photos = [
    ['unsplash1.jpg'],
    ['unsplash2.jpg'],
    ['unsplash3.jpg']
];

function load() {
    change(0);
}

function change(id) {
    currentIndex = id;
    var img = new Image();
    img.onload = function() {
        document.getElementById('photo').innerHTML = `<img src="${photos[id][0]}" style="width: 100%; height: 100%; object-fit: cover;" />`;
    };
    img.src = photos[id][0]; 
}

function previous() {
    change((currentIndex + 1) % photos.length);
}

function next() {
    change((currentIndex - 1 + photos.length) % photos.length);
}

window.onload = load;
