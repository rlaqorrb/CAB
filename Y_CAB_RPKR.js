function currentDate(){
  let current_Y = new Date();
  let yearN = current_Y.getFullYear();
  return yearN;
}


$('#start_Y').html('<option value="start">시작년도</option>');
$('#end_Y').html('<option value="end">끝 년도</option>');
for(let i = 1980; i < currentDate(); i++){
  // console.log(i);
  $('#start_Y').append(`<option value="${i}">${i}</option>`);
  $('#end_Y').append(`<option value="${i}">${i}</option>`);
}


let start;
let end;

function startF(){
  start = $('#start_Y').val();
    return start;
}

function endF(){
  end = $('#end_Y').val();
    return end;
}

$('#search').on('click', function(){
  console.log('search')
  $('.err2').css('display', 'none');
  $('.err1').css('display', 'none');
  startF();
  endF();
  console.log(startF());
  console.log(endF());
  if(startF() == 'start' || endF() == 'end'){
    return $('.err1').css('display', 'block');
  }
  if(startF() >= endF()){
    return $('.err2').css('display', 'block');
  }
  console.log(start);
  console.log(end);
  cab();
})

function cab(){
  $.ajax({
    url: `https://ecos.bok.or.kr/api/StatisticSearch/1VZBTWFWGREAGO0F3CF7/json/kr/1/1000/301Y013/A/${start}/${end}/000000`,
    dataType: 'json',
    type: 'GET',
    success: function(resp){
      console.log(resp)
      $('.container').html(
        `<table class='table'>
          <th>년도</th>
          <th>값</th>
        </table>`
        );
      let statistic = resp.StatisticSearch.row;
      for(let i = 0; i < resp.StatisticSearch.row.length; i++){
        console.log(i);
        let year = statistic[i].TIME;
        let val = parseInt(statistic[i].DATA_VALUE /100);
        if(val < 0){
          $('.table').append(
            `<tr>
              <th>${year}</th>
              <td class='blue'>${val}억$</td>
            </tr>`
          )
        } else if(val > 0){
          $('.table').append(
            `<tr>
              <th>${year}</th>
              <td class='red'>${val}억$</td>
            </tr>`
          )
        } else {
          $('.table').append(
            `<tr>
              <th>${year}</th>
              <td>${val}억$</td>
            </tr>`
          )
        }
      }
    }
  })
}

// cab();