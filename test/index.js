// 1.2: 
let a1 = [];
let a2 = [];
let a3 = [];
let m = prompt("nhap do dai mang 1 m = ");
let n = prompt("nhap do dai mang 2 n = ");

function input(arr, number) {
    for (let i = 0; i < number; i++) {
        arr[i] = prompt(`nhap a[${i}]`)
    }
}
input(a1, m);
input(a2, n);
console.log(a1);
console.log(a2);
for (let i = 0; i < a1.length; i++) {
    a3 = a2.filter(i => a1[i]);
}
console.log(a3);
let a4 = [];
for (let i = 0; i < a1.length; i++) {
    if (a3.indexOf(a1[i]) === -1) {
        a4.push(a1[i])
    }
}
for (let i = 0; i < a2.length; i++) {
    if (a3.indexOf(a2[i]) === -1) {
        a4.push(a2[i])
    }
}
console.log(a4);

// 1.1

let arr=[1,2,3,4,5,6,7,8];
function a(arr){
    return arr%2==0;
}

function newarr(arr,a){
    return arr.filter(a);
}

console.log(newarr(arr,a));
