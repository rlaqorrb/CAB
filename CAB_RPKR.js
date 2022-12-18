function currentDate(){
  let d = new Date();
  let month = d.getMonth() + 1;
  return month;
}

$('#start_M').html('<option value="start">시작월</option>');
$('#end_M').html('<option value="end">끝월</option>');
for(let i = 1; i < currentDate(); i++){
  console.log(i);
  $('#start_M').append(`<option value="${i}">${i}</option>`);
  $('#end_M').append(`<option value="${i}">${i}</option>`);
}


let start;
let end;

function startF(){
  start = $('#start_M').val();
    return start;
}

function endF(){
  end = $('#end_M').val();
    return end;
}

$('#search').on('click', function(){
  // console.log('search')
  $('.err2').css('display', 'none');
  $('.err1').css('display', 'none');
  // startF();
  // endF();
  console.log(startF());
  console.log(endF());
  if(startF() == 'start' || endF() == 'end'){
    return $('.err1').css('display', 'block');
  }
  if( Number(startF()) >= Number(endF()) ){
    console.log(startF(), endF())
    return $('.err2').css('display', 'block');
  }
  console.log(start);
  console.log(end);
  if(start.length == 1){
    start = '20220' + start;
  } else {
    start = '2022' + start;
  }

  if(end.length == 1){
    end = '20220' + end;
  } else {
    end = '2022' + end;
  }

  cab();
})


function cab() {
  console.log(start, end)
  $.ajax({
    url: `https://ecos.bok.or.kr/api/StatisticSearch/1VZBTWFWGREAGO0F3CF7/json/kr/1/1000/301Y013/M/${start}/${end}/000000`,
    dataType: 'json',
    type: 'GET',
    success: function (resp) {
      console.log(resp)
      $('.container').html(
        `<table class='table'>
          <th>날짜</th>
          <th>값</th>
        </table>`
      );
      let statistic = resp?.StatisticSearch?.row;
      if(statistic){
        for (let i = 0; i < statistic?.length; i++) {
          console.log(i);
          let year = statistic?.[i]?.TIME ?? '정보없음';
          let val = parseInt(statistic?.[i]?.DATA_VALUE / 100) ?? '정보없음';
          console.log(year, val)
          $('.table').append(
            `<tr>
              <th>${year}</th>
              <td>${val}억$</td>
            </tr>`
          )
        }
      } else {
        $('.table').append(
          `<tr>
            <th>정보없음</th>
            <td>정보없음</td>
          </tr>`
        )
      }
    }
  })
}

// cab();