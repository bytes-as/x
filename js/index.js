function startGame() {
    canvasArea.start();
    gamePiece = new component(30, 30, "red", 10, 120, canvasArea);
    removeHTMLElement('start_button');
}

function removeHTMLElement(element_id) {
    var element = document.getElementById(element_id);
    element.parentNode.removeChild(element);
    return false;
}

var canvasArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateCanvasArea, 0.1);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, canvasArea) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.slope = 0;
    this.canvasArea = canvasArea;
    this.updateComponent = function() {
        context = this.canvasArea.context;
        context.fillStyle = color;
        context.fillRect(this.x, this.y, this.height, this.width);
    }
    this.newPosition = function() {
        new_x = this.x + this.speed * Math.cos(this.slope * Math.PI / 180);
        new_y = this.y + this.speed * Math.sin(this.slope * Math.PI / 180);
        if(new_x < this.canvasArea.canvas.width  - this.width  && new_x > 0) this.x = new_x;
        if(new_y < this.canvasArea.canvas.height - this.height && new_y > 0) this.y = new_y;
        // this.x = this.x + this.speed * Math.cos(this.slope * Math.PI / 180);
        // this.y = this.y + this.speed * Math.sin(this.slope * Math.PI / 180);
        document.getElementById('speed').innerHTML = "speed : " + this.speed;
        document.getElementById('slope').innerHTML = "angle : " + this.slope; 
        document.getElementById('x').innerHTML = "x = " + new_x;
        document.getElementById('y').innerHTML = "y = " + new_y; 

    }
    this. moveforward = function() {
        gamePiece.speed += 0.5;
    }

    this.movebackward = function() {
        gamePiece.speed -= 0.5;
    }

    this.turnleft = function() {
        gamePiece.slope -= 2.5;
        if(gamePiece.slope < 0) gamePiece.slope += 360;
        gamePiece.slope = gamePiece.slope%360;
    }

    this.turnright = function() {
        gamePiece.slope += 2.5;
        gamePiece.slope = gamePiece.slope%360;
    }
}

function updateCanvasArea() {
    canvasArea.clear();
    gamePiece.newPosition();
    gamePiece.updateComponent();
}



document.onkeypress = function(event) {
    var key_code = event.keyCode;
    var key_press = String.fromCharCode(key_code);
    if(key_press == 'a') gamePiece.turnleft();
    if(key_press == 'w') gamePiece.moveforward();
    if(key_press == 's') gamePiece.movebackward();
    if(key_press == 'd') gamePiece.turnright();
}