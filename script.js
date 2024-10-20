$(document).ready(function() {
    // wielkie deklaracje
    const board = $('#board');
    const manual = $('.manual')
    const squares = 256;
    let round = 1;
    let prep = 1500;
    let reaction = 1000;
    let count = 10;
    let active = [];
    let isGameOn = false;
    let cursorIndex = null;

    // generowanie kwadracików tutaj żeby nie zaśmiecać source html
    for (let i = 0; i < squares; i++) {
        const square = $('<div class="square"></div>');
        board.append(square);
    }

    // chowamy przed startem
    board.hide();


    // odpalamy fukcje na kliknięcie przycisku
    $(`#start-btn`).on('click', start);

    function start() {
        manual.hide();
        round = 1;
        count = 10;
        // manipuluje css bo show i hide nie działają globalnie
        $('#round-counter').text(`Runda: ${round}`).css('visibility', 'visible');
        $('#start-btn').hide();
        board.show();
        isGameOn = true;
        cursorIndex = null;

        // dajemy userowi chwile na ogarnięcie co sie dzieje
        setTimeout(() => {
            $('.square').css('background-color', 'lightgray');
            nextRound();
        }, prep);
    }

    function nextRound() {
        $('.square').css('background-color', 'lightgray');
        // tworzymy tablice żeby potem używać indexów wybranych losowo kwadracików
        active = [];

        for (let i = 0; i < count; i++) {
            const index = Math.floor(Math.random() * squares);
            active.push(index);
            // .eq służy do generowania nowego obiektu w miejscu poprzedniego na danym indexie. w ten sposób zmieniamy kolor kwadracików na wylosowanych indexach 
            $('.square').eq(index).css('background-color', 'orange');
        }

        setTimeout(() => {
            for (let index of active) {
                $('.square').eq(index).css('background-color', 'red');
            }
        }, reaction);

        setTimeout(() => {
            round++;
            // dodajemy co runde więcej kwadracików
            count += 10;
            $('#round-counter').text(`Runda: ${round}`);
            nextRound();
        }, reaction + 1000);

        loseCheck();
    }
    // sprawdzenie czy user rusza myszką na danym kwadraciku i przypisywanie do zmiennej indexu kwadracika
    $('.square').on("mousemove", function() {
        cursorIndex = $(this).index();
    });

    function loseCheck() {
        if (isGameOn) {
            const under = $('.square').eq(cursorIndex);
            // muszą być 2 kolory w razie jakby ktoś darkreadera używał
            if (under.css('background-color') === 'rgb(255, 0, 0)' || under.css('background-color') === 'rgb(204, 0, 0)') {
                endGame();
            }
            // sprawdzamy co 10ms bo przy 1ms lagi strony
            setTimeout(loseCheck, 10);
        }
    }
    // myśle że ta funkcja logiczna jest
    function endGame() {
        isGameOn = false;
        alert("Przegrywasz!");
        $('#start-btn').show();
        $('#round-counter').hide();
        board.hide();
        // odświeżamy strone za usera żeby czasem jakichś błędów nie zobaczył
        location.reload();
    }
});

// jeszcze by sie przydało sprawdzać czy jakiś agent nie wychodzi poza plansze
// i ewentualnie jeśli był jakoś ogarnąć poprzedni wynik na stronie startowej