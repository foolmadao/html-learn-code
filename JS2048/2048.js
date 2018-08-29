var colorMapping = {"0": "#ccc0b3", "2": "#eee4da", "4": "#ede0c8", "8": "#f2b179", "16": "#f59563", "32": "#f67e5f", "64": "#f65e3b", "128": "#edcf72", "256" : "#edcc61", "512": "#9c0", "1024": "#33b5e5", "2048": "#09c"};
var my2048;
var rows = 4;
var cols = 4;
var squareWidth = 100;
var spacing = 12;
var squareSet = [];
var key = true;
var failFlag = false;

function init(){
    my2048 = document.getElementById('my2048');
    //初始化面板
    initBoard()
    //初始化方块  
    randGenerateSquare()  
    randGenerateSquare() 
    //添加事件
    bindEvent()
}
function bindEvent(){
    document.onkeydown = function(e){
        if (e.key == 'ArrowUp'&& key){
            key = false;
            squareSet = getNewLocation('up');
            move();
        }else if(e.key == 'ArrowDown'&& key){
            key = false;
            squareSet = getNewLocation('down');
            move();
        }else if(e.key == 'ArrowLeft'&& key){
            key = false;
            squareSet = getNewLocation('left');
            move();
        }else if(e.key == 'ArrowRight'&& key){
            key = false;
            squareSet = getNewLocation('right');
            move();
        }
    }
    document.ontouchstart= function(e){
        var locX = e.targetTouches[0].pageX;
        var locY = e.targetTouches[0].pageY;
        document.ontouchmove = function(ev){
            var dx = ev.targetTouches[0].pageX - locX;
            var dy = ev.targetTouches[0].pageY - locY;
            if(Math.abs(dx) > 50 || Math.abs(dy) > 50){
                if(key){
                    if(Math.abs(dx) <= dy){
                        key = false;
                        squareSet = getNewLocation('down');
                        move();
                    }else if(Math.abs(dx) <= Math.abs(dy) && dy < 0){
                        key = false;
                        squareSet = getNewLocation('up');
                        move();
                    }else if(Math.abs(dy) <= dx){
                        key = false;
                        squareSet = getNewLocation('right');
                        move();
                    }else if(Math.abs(dy) <= Math.abs(dx) && dx < 0){
                        key = false;
                        squareSet = getNewLocation('left');
                        move();
                    }
                }
            }
        }
    }
}
function updateData(){
    for(var i = 0; i < rows; i++ ){
        for(var j = 0; j < cols; j++){
            if(squareSet[i][j]){
                if(squareSet[i][j].nextSquare){
                    squareSet[i][j].innerHTML = squareSet[i][j].num * 2;
                    squareSet[i][j].num = squareSet[i][j].num * 2
                    squareSet[i][j].style.background = colorMapping[squareSet[i][j].num];
                    squareSet[i][j].nextSquare.remove();
                    squareSet[i][j].nextSquare = null;
                    if(squareSet[i][j].num == 2048){
                        alert('you got it')
                    }
                }
            }
        }
    }
}
function move(){
    for(var i = 0; i < rows; i++ ){
        for(var j = 0; j < cols; j++){
            if(squareSet[i][j]){
                squareSet[i][j].style.left = j * squareWidth + (j + 1) * spacing + 'px';
                squareSet[i][j].style.top = i * squareWidth + (i + 1) * spacing + 'px';
                if(squareSet[i][j].nextSquare){
                    squareSet[i][j].nextSquare.style.left = j * squareWidth + (j + 1) * spacing + 'px';
                    squareSet[i][j].nextSquare.style.top = i * squareWidth + (i + 1) * spacing + 'px';
                    
                }
            }
        }
    }
    setTimeout(function(){
        updateData();
        randGenerateSquare() 
        key = true;
    }, 500);
}
function getNewLocation(direction){
    var newSquareSet = [];
    for(var i = 0; i < rows; i++ ){
        newSquareSet[i] = [];
        for(var j = 0; j < cols; j++){
            newSquareSet[i][j] = null;
        }
    }
    if(direction == 'left'){
        for(var i = 0; i < rows; i++ ){
            for(var j = 0; j < cols; j++){
                if(squareSet[i][j]){
                    for(var k = 0;k < cols;k++){
                        if(newSquareSet[i][k] == null){
                            newSquareSet[i][k] = squareSet[i][j];
                            k = cols;
                        }else if(newSquareSet[i][k].num == squareSet[i][j].num && (!newSquareSet[i][k].nextSquare)&& !newSquareSet[i][k+1]){
                            newSquareSet[i][k].nextSquare = squareSet[i][j];
                            k = cols;
                        }
                    }
                }
            }
        }
    }else if(direction == 'right'){
        for(var i = 0; i < rows; i++ ){
            for(var j = cols - 1; j >= 0; j--){
                if(squareSet[i][j]){
                    for(var k = cols - 1;k >= 0; k--){
                        if(newSquareSet[i][k] == null){
                            newSquareSet[i][k] = squareSet[i][j];
                            k = -1;
                        }else if(newSquareSet[i][k].num == squareSet[i][j].num && (!newSquareSet[i][k].nextSquare) && !newSquareSet[i][k-1]){
                            newSquareSet[i][k].nextSquare = squareSet[i][j];
                            k = -1;
                        }
                    }
                }
            }
        }
    }else if(direction == 'up'){
        for(var j = 0; j < cols; j++ ){
            for(var i = 0; i < rows; i++){
                if(squareSet[i][j]){
                    for(var k = 0;k < rows;k++){
                        if(newSquareSet[k][j] == null){
                            newSquareSet[k][j] = squareSet[i][j];
                            k = rows;
                        }else if(newSquareSet[k][j].num == squareSet[i][j].num && (!newSquareSet[k][j].nextSquare) && !newSquareSet[k+1][j]){
                            newSquareSet[k][j].nextSquare = squareSet[i][j];
                            k = rows;
                        }
                    }
                }
            }
        }
    }else if(direction == 'down'){
        for(var j = 0; j < cols; j++ ){
            for(var i = rows - 1; i >= 0; i--){
                if(squareSet[i][j]){
                    for(var k = rows - 1;k >= 0;k--){
                        if(newSquareSet[k][j] == null){
                            newSquareSet[k][j] = squareSet[i][j];
                            k = -1;
                        }else if(newSquareSet[k][j].num == squareSet[i][j].num && (!newSquareSet[k][j].nextSquare)&& !newSquareSet[k-1][j]){
                            newSquareSet[k][j].nextSquare = squareSet[i][j];
                            k = -1;
                        }
                    }
                }
            }
        }
    }
    return newSquareSet;
}
function randGenerateSquare(){
    failFlag = true;
    for(var i = 0; i < rows; i++){
        for(var j = 0; j < cols; j++){
            if(!squareSet[i][j]){
                failFlag = false;
                break;
            }
        }
    }
    if(failFlag){
        alert('死翘翘了')
        return true;
    }
    while(true){
        var ranRow = Math.floor(Math.random() * rows);
        var ranCol = Math.floor(Math.random() * cols);
        var ranNum = (Math.random() > 0.5 ? 2 : 4);
        if(!squareSet[ranRow][ranCol]){
            squareSet[ranRow][ranCol] = createSquare(ranNum, ranRow, ranCol);
            my2048.appendChild(squareSet[ranRow][ranCol]);
            return true;
        }
}
}
function createSquare(value, row, col){
    var temp = document.createElement('div');
    temp.style.width = squareWidth + 'px';
    temp.style.height = squareWidth + 'px';
    temp.style.background = colorMapping[value];
    temp.style.left = col * squareWidth + (col + 1) * spacing + 'px';
    temp.style.top = row * squareWidth + (row + 1) * spacing + 'px';
    temp.style.lineHeight = squareWidth + 'px';
    temp.style.textAlign = 'center';
    temp.style.fontSize = 0.4 * squareWidth + 'px';
    temp.num = value;
    temp.row = row;
    temp.col = col;
    temp.style.transition = 'left 0.5s,top 0.5s';
    if(value){
        temp.innerHTML = '' + value;
    }
    return temp;
}
function initBoard(){
    my2048.style.width = cols * 100 + (cols + 1) * spacing + 'px';
    my2048.style.height = rows * 100 + (rows + 1) * spacing + 'px';
    for(var i = 0; i < rows; i++){
        squareSet[i] = [];
        for(var j = 0; j < cols; j++){
            my2048.appendChild(createSquare(0, i, j))
            squareSet[i][j] = null;
        }
    }
}

window.onload = function(){
    init();

}