'use strict';

const plus_one = document.getElementById( 'plusOneButton' );
const plus_five = document.getElementById( 'plusFiveButton' );
const minus_one = document.getElementById( 'minusOneButton' );
const minus_five = document.getElementById( 'minusFiveButton' );
const reset = document.getElementById( 'resetButton' );
const save_number = document.getElementById( 'saveNumberButton' );
let length_save_number = 0;
let delete_all_number = document.getElementById( 'deleteAllNumberButton' );

let num = 0;
let button_id = 0;

function update_num( num ){

  const update_number = document.getElementById( 'countNumber' );
  update_number.textContent = num;

}

plus_one.addEventListener( 'click', function(){

  num ++;
  update_num( num );

}, false);

plus_five.addEventListener( 'click', function(){

  num += 5;
  update_num( num );

}, false);

minus_one.addEventListener( 'click', function(){

  num --;
  update_num( num );

}, false);

minus_five.addEventListener( 'click', function(){

  num -= 5;
  update_num( num );

}, false);

reset.addEventListener( 'click', function(){

  num = 0;
  update_num( num );

}, false);

save_number.addEventListener( 'click', function(){

  if( document.getElementById( 'deleteNumberButton').textContent === 'Back' ){
    alert( 'This operation is not available. Please push "Back" button.' );
    return;
  }

  const now = new Date();
  const formatted = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${now.getHours()}時${now.getMinutes()}分${now.getSeconds()}秒`;

  let number_list = document.createElement( 'li' );
  let tmp = ` <h3>${num}</h3> <p>&nbsp; ${formatted} &nbsp;</p>`;
  number_list.innerHTML = tmp;

  let save_list = document.getElementById( 'saveNumber' );
  save_list.appendChild( number_list ).id = length_save_number;

  num = 0;
  update_num( num );

  length_save_number ++;

}, false);

// get save list id
function get_save_list_id( id ){
  const tmp = document.querySelectorAll( "#saveNumber li" );
  let ans;
  tmp.forEach( item => {
    if( item.id === `${id}` ){
      ans = item;
    }
  })
  return ans;
}

const delete_number_button = document.getElementById( 'deleteNumberButton' );

function delete_number(){
  console.log( 'Start delete' );
  if( length_save_number === 0 ){
    return;
  }
  for( let i=0; i < length_save_number; i++ ){

    let tmp = get_save_list_id( i );
    let tmp_button = document.createElement( 'button' );
    tmp_button.textContent = 'Delete';

    tmp_button.addEventListener( 'click', function(){
      let bool = confirm( 'Really?' );
      if( bool ){
        tmp.remove();
      }
      length_save_number --;
      if( length_save_number === 0 ){
        delete_number_button.textContent = 'Select and Delete';
        delete_number_button.removeEventListener( 'click', back_list );
        delete_number_button.addEventListener( 'click', delete_number );
      }
    }, false);

    tmp.appendChild( tmp_button );

  }

  delete_number_button.textContent = 'Back';
  delete_number_button.removeEventListener( 'click', delete_number );
  delete_number_button.addEventListener( 'click', back_list );
}

function back_list(){
  console.log( 'start back' );
  const save_list = document.querySelectorAll( "#saveNumber li" );
  let i = 0;
  save_list.forEach( li => {
    const tmp_button = li.querySelector( 'button' );
    if( tmp_button ){
      tmp_button.remove();
      li.id = i;
      i++;
    }
  })

  delete_number_button.textContent = 'Select and Delete';
  delete_number_button.removeEventListener( 'click', back_list );
  delete_number_button.addEventListener( 'click', delete_number );
}

delete_number_button.addEventListener( 'click', delete_number );

delete_all_number.addEventListener( 'click', function(){

  const delete_number_button_state = document.getElementById( 'deleteNumberButton' );
  if( delete_number_button_state.textContent === 'Back' ){
    alert( 'This operation is not available. Please push "Back" button.' );
  }
  else{
    const list_item = document.querySelectorAll( "#saveNumber li" );

    for( let i=0; i<list_item.length; i++ ){
      list_item[i].remove();
    }

    length_save_number = 0;

  }

}, false);

// aaa