var hero = [
    {name:'刚背兽', src:'bb.png',group:'bright', des:'你干哈？'},
    {name:'冰魂', src:'binghun.jpg',group:'dark', des:'极寒幽魂～～'},
    {name:'影魔', src:'sf.png',group:'dark', des:'你的灵魂是我的，哈哈'},
    {name:'沙王', src:'sk.jpg',group:'bright', des:'沙尘风暴！'},
    {name:'敌法师', src:'AM.jpg',group:'bright', des:'魔法之血债，汝之性命来偿还！'},
    {name:'夜魔', src:'yemo.jpg',group:'dark', des:'白昼行将，暗夜魔王！'}
];
var listul = document.getElementsByClassName('hero')[0];
var myinput = document.getElementsByTagName('input')[0];
var buttonAll = document.getElementsByTagName('li')[0];
var buttonBright = document.getElementsByTagName('li')[1];
var buttonDark = document.getElementsByTagName('li')[2];
var dark = true;
var bright = true;
function render(list) {
    var str = '';
    list.forEach(function(ele, index){
        str += '<li>\
        <img src="'+ele.src+'">\
        <span class="name">'+ele.name+'</span>\
        <span class="des">'+ele.des+'</span>\
    </li>';
    });
    listul.innerHTML = str;
}
render(hero);

myinput.oninput = function(){
    var value = this.value;
    render(filterText(value, hero));
}
buttonBright.onmousedown = function () {
    dark = false;
    bright = true;
    document.getElementsByClassName('active')[0].className = '';
    buttonBright.className = 'active';
    render(filterText(myinput.value, hero));
}
buttonDark.onmousedown = function () {
    dark = true;
    bright = false;
    document.getElementsByClassName('active')[0].className = '';
    buttonDark.className = 'active';
    render(filterText(myinput.value, hero));
}
buttonAll.onmousedown = function () {
    dark = true;
    bright = true;
    document.getElementsByClassName('active')[0].className = '';
    buttonAll.className = 'active';
    render(filterText(myinput.value, hero));
}
function filterText(text,arr){
    var newArr = arr.filter(function(ele, index){
        if(ele.name.indexOf(text) !== -1){
             return true;
        }
    })
    if(!dark || !bright){
        if(dark){
            newArr = newArr.filter(function(ele,index){
                if(ele.group.indexOf("dark") !== -1){
                    return true;
                }
            })
        }
        if(bright){
            newArr = newArr.filter(function(ele,index){
                if(ele.group.indexOf("bright") !== -1){
                    return true;
                }
            })
        }
    }
    return newArr;
}