var firstname="Ben";
var lastname="Stark";

function display(){
    alert('hi')
}

var student={
    name:"张三",
    study:()=>{
        alert("study!");
    },
    introduce:(age)=>{
        alert("my age is "+age);
    }
}

export {firstname,lastname};
export {display as greet};
export {student};