var div = document.getElementsByTagName("div")[0];
var block = [];
var boomList = [];
var count = 0;
// 获取元素
for (i = 0; i < 10; i++) {
    block[i] = [];
    for(j = 0; j< 10 ; j++){
        block[i][j] = document.getElementsByClassName('block')[10 * i + j ];
    }
}

// 生成炸弹位置
for (var i = 0; i < 15; i++){
    var a = parseInt(Math.random()*100);
    var value = true;
    for(k = 0; k < boomList.length; k++){
        if(boomList[k] == a){
            value = false;
            i--;
        }
    }
    if(value){
        boomList.push(a);
    }
}

function gameover() {
    for (var i = 0; i < 10; i++){
        for (var j = 0; j < 10; j++){
            if (block[i][j].className == 'boom'){
                block[i][j].style= 'background-image:url("boom.jpg");background-size:100%;';
            }
            
        }
    }
    setTimeout(function(){
        alert('中弹了~~~~');
        div.style = 'display: none;';
    }, 50);
    
}

for (var i = 0; i < 10; i++) {
    for(var j = 0; j < 10 ; j++){
        // 点击判断函数
        (function(i,j){
            block[i][j].onmousedown = function(e){
                event.preventDefault();
                if (e.button == 0) {
                    if (block[i][j].className == 'boom') {
                        block[i][j].style= 'background-image:url("boom.jpg");background-size:100%;';
                        setTimeout(function(){
                            gameover();
                        }, 50);
                    }
                    if (block[i][j].className == 'block') {
                        calculate(i,j);
                    }
                }
                if (e.button == 1) {
                    if (block[i][j].style.backgroundImage == '') {
                        block[i][j].style = 'background-image:url("banner.jpg");background-size:100%';
                    }
                    else if (block[i][j].style.backgroundImage) {
                        block[i][j].style.backgroundImage = '';
                    }
                    
                }   
            }
        }(i,j))
        // 生成炸弹
        for(k = 0; k < 15; k++){
            if (boomList[k] == 10 * i + j) {
                block[i][j].className = 'boom';
            }
        }
    }
}
function calculate(i, j) {
    var boomNum = 0;
    for(var x = i-1; x < i+2; x++){
        for(var y = j-1; y < j+2; y++){
            if (x < 0 || y < 0 || x > 9 || y > 9) {
                continue;  
            }
            else if (block[x][y].className == "boom") {
                boomNum++;
            }
        }
    }
    if (block[i][j].innerText == '') {
        count++; 
    }
    block[i][j].innerText = boomNum;
    if (boomNum == 0) {
        for(var x = i-1; x < i+2; x++){
            for(var y = j-1; y < j+2; y++){
                if (x < 0 || y < 0 || x > 9 || y > 9) {
                }
                else if(block[x][y].innerText){
                }
                else{
                    calculate(x,y); 
                }
            }
        }
        
    }
    if (count == 85) {
        setTimeout(function(){
            alert('victory!!!');
        }, 50); 
    }
}