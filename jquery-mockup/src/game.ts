import * as $ from 'jquery';

export class Quote {
    text: string
}

export class Ex {
    name: string

}

/*let myex: Ex = {name: "Bench Press" }
let exArr: Ex[] = [
    { name: "Running" },
    { name: "Swimming"}
] */

export class Player {
    name: string = "Moshe Plotkin";
    quotes: Quote[] = [];
    score: number = 0;

    drawQuotes(){
        $("#my-quotes").html(
            this.quotes.map( x => `<li class="list-group-item">${x.text}</li>` ).join("")
        );
    }
}

export class Room {
    players: Player[] = [new Player(), new Player()];
    dealer: Player;
    picture: string;
    quotes: Quote[] = [];

    drawPicture() {
        $("#picture").attr("src", this.picture);
    }
    drawQuotes(){
        $("#played-quotes").html(
            this.quotes.map( x => `<li class="list-group-item">${x.text}</li>` ).join("")
        );
    }
    drawPlayers(){
        $("#players").html(
            this.players.map( x => `<li class="list-group-item">${x.name}</li>` ).join("")
        );
    }
}

export class Game {
    players: Player[] = [];
    pictures: string[] = [];
    quotes: Quote[] = [];
    exercises: Ex[] = [];

    init() {     //everything inside .when being sent to client
        return $.when(
            $.getJSON("/game/pictures").done( data => {
                this.pictures = data;
            }),
            $.getJSON("/game/quotes").done( data =>{
                this.quotes = data;
            }),
            $.getJSON("/game/exercises").done( data =>{
                this.exercises = data;
            })
        );
    }

    displayExercises(){
        $("#my-exercises").html(
            this.exercises.map( x => `<a class="list-group-item">${x.name}</a>` ).join("")
        );
    }
}

// Controller

const game = new Game();
const room = new Room();
const me = new Player();
var i = 0;

game.init().done(()=>{
    room.picture = game.pictures[i];
    room.drawPicture();
    room.drawQuotes();
    room.drawPlayers();

    me.quotes = game.quotes;
    me.drawQuotes();

    

    $("#cmd-flip").click(function(e){
        e.preventDefault();
        i++;
        room.picture = game.pictures[i];
        room.drawPicture();
    })
    
    $("#sign-up-now").click(function(e){
        console.log(game.exercises);
    
        e.preventDefault();
        i++;
        room.picture = game.pictures[i];
        room.drawPicture();
    })

    game.displayExercises();
});

