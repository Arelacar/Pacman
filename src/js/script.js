var world = [
    ['S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S'],
    ['S','E','C','C','C','C','C','S','C','C','C','C','C','C','C','S'],
    ['S','C','S','S','S','S','C','S','C','S','C','S','S','S','C','S'],
    ['S','C','S','S','S','S','C','S','C','S','C','S','C','C','C','S'],
    ['S','C','S','S','S','S','C','C','C','S','C','S','C','S','C','S'],
    ['S','C','S','S','S','S','S','S','S','S','C','S','B','S','C','S'],
    ['S','C','S','C','C','C','C','S','S','S','C','S','C','S','C','S'],
    ['S','C','C','C','S','S','C','S','S','S','C','S','C','S','C','S'],
    ['S','C','S','S','S','S','C','S','S','S','C','S','C','C','C','S'],
    ['S','C','S','S','S','S','C','S','S','S','C','S','S','S','C','S'],
    ['S','C','S','C','C','C','C','S','S','S','C','S','S','S','C','S'],
    ['S','C','S','C','S','S','C','C','C','C','C','C','C','C','C','S'],
    ['S','C','S','C','S','S','C','S','S','S','S','S','S','S','C','S'],
    ['S','C','S','C','S','S','C','S','S','S','S','S','S','S','C','S'],
    ['S','C','C','B','S','S','C','C','C','C','C','B','C','C','C','S'],
    ['S','S','S','S','S','S','S','S','S','S','S','S','S','S','S','S'],
];

var pacman = {
    vidas: 3,
    score: 0,
    pos: {x: 1, y: 1},
};

var ghosts = [new ghost(6,9),new ghost(14,7)];

function ghost(x,y) {
    this.pos = {
        x: x,
        y: y
    };
    this.move = function(){
        var decision;
        do{
            decision = Math.floor(Math.random() * 4);
        }while(decision == 0 && world[this.pos.y - 1][this.pos.x] == 'S' || decision == 1 && world[this.pos.y][this.pos.x + 1] == 'S'
        || decision == 2 && world[this.pos.y + 1][this.pos.x] == 'S' || decision == 3 && world[this.pos.y][this.pos.x - 1] == 'S');
        
        console.log(decision);
        switch(decision){
            case 0:{ this.pos.y--; break; }
            case 1:{ this.pos.x++; break; }
            case 2:{ this.pos.y++; break; }
            case 3:{ this.pos.x--; break; }
        }
    }
}

function displayWorld(){
    var display = '';
    for(var i=0; i<16; i++){
        display += "<div class='row'>";
        for(var j=0; j<16; j++){
            if(world[i][j] === 'S')
                display += "<div class='solid'></div>";
            else if(world[i][j] === 'C')
                display += "<div class='coin'></div>";
            else if(world[i][j] === 'B')
                display += "<div class='berry'></div>";
            else
                display += "<div class='empty'></div>";
        }
        display += "</div>";
    }
    document.getElementById('world').innerHTML = display;
}

function displayPacman(){
    var pacman_obj = document.getElementById('pacman');
    pacman_obj.style.left = 20 * pacman.pos.x + "px";
    pacman_obj.style.top = 20 * pacman.pos.y + "px";
}

function displayGhosts(){
    var ghost_obj = document.getElementById('ghost1');
    ghost_obj.style.left = 20 * ghosts[0].pos.x + "px";
    ghost_obj.style.top = 20 * ghosts[0].pos.y + "px";
    var ghost_obj = document.getElementById('ghost2');
    ghost_obj.style.left = 20 * ghosts[1].pos.x + "px";
    ghost_obj.style.top = 20 * ghosts[1].pos.y + "px";
}

function displayLives(){
    document.getElementById('lives').innerText = pacman.vidas;
}

function displayScore(){
    document.getElementById('score').innerText = pacman.score;
}

document.onkeydown = function(e){
    switch(e.keyCode){
        case 40: {
            document.getElementById('pacman').style.transform = "rotate(90deg)";
            if(world[pacman.pos.y + 1][pacman.pos.x] != 'S')
                pacman.pos.y++;
            break;
        }
        case 39: {
            document.getElementById('pacman').style.transform = "none";
            if(world[pacman.pos.y][pacman.pos.x + 1] != 'S')
                pacman.pos.x++;
            break;
        }
        case 38: {
            document.getElementById('pacman').style.transform = "rotate(-90deg)";
            if(world[pacman.pos.y - 1][pacman.pos.x] != 'S')
                pacman.pos.y--;
            break;
        }
        case 37: {
            document.getElementById('pacman').style.transform = "rotate(180deg)";
            if(world[pacman.pos.y][pacman.pos.x - 1] != 'S')
                pacman.pos.x--;
            break;
        }
    }

    ghosts[0].move();
    ghosts[1].move();

    if(pacman.pos.x == ghosts[0].pos.x && pacman.pos.y == ghosts[0].pos.y || pacman.pos.x == ghosts[1].pos.x && pacman.pos.y == ghosts[1].pos.y){
        pacman.vidas--;
        pacman.pos.x = 1;
        pacman.pos.y = 1;
        displayLives();
    }

    if(world[pacman.pos.y][pacman.pos.x] == 'C' || world[pacman.pos.y][pacman.pos.x] == 'B'){        
        if(world[pacman.pos.y][pacman.pos.x] == 'B')
            pacman.score += 50;
        else
            pacman.score += 10;
        world[pacman.pos.y][pacman.pos.x] = 'E';
        displayScore();
    } 

    displayWorld();
    displayPacman();
    displayGhosts();
}

displayWorld();
displayPacman();
displayGhosts();