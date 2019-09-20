array=['1','3','2','6','5'];
console.log(array);
var pos = array.indexOf('2');
// Remove an item by index position
console.log('pos: '+pos);
var removedItem = array.splice(pos, 1);
console.log('removedItem: '+removedItem);
console.log(array);


