function currentDate() {
  let current_Y = new Date();
  let yearN = current_Y.getFullYear();
  return yearN;
}


$('#start_Y').html('<option value="start">시작년도</option>');
$('#end_Y').html('<option value="end">끝 년도</option>');
for (let i = 1980; i < currentDate(); i++) {
  // console.log(i);
  $('#start_Y').append(`<option value="${i}">${i}</option>`);
  $('#end_Y').append(`<option value="${i}">${i}</option>`);
}


let start;
let end;

function startF() {
  start = $('#start_Y').val();
  return start;
}

function endF() {
  end = $('#end_Y').val();
  return end;
}

$('#search').on('click', function () {
  // console.log('search')
  $('.err2').css('display', 'none');
  $('.err1').css('display', 'none');
  startF();
  endF();
  // console.log(startF());
  // console.log(endF());
  if (startF() == 'start' || endF() == 'end') {
    return $('.err1').css('display', 'block');
  }
  if (startF() >= endF()) {
    return $('.err2').css('display', 'block');
  }
  // console.log(start);
  // console.log(end);
  cab();
})

function cab() {
  $.ajax({
    url: `https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList&apiKey=M2M2OWE1ZmQzMjMyODU2YWI4ZjI4NjAxNmM1ZjhkZGE=&itmId=T10+&objL1=1+1005+1095+1100+1225+2+2010+2020+2030+3+3060+3065+3070+4+4015+4025+4050+4055+4060+4070+4075+4080+4090+4100+4105+4110+4120+4125+4130+4135+4140+4165+4170+4175+4180+4200+4205+4210+4215+4220+4230+4240+6+6010+6060+&objL2=&objL3=&objL4=&objL5=&objL6=&objL7=&objL8=&format=json&jsonVD=Y&prdSe=Y&startPrdDe=${start}&endPrdDe=${end}&orgId=101&tblId=DT_2KAA805_OECD`,
    dataType: 'json',
    type: 'GET',
    success: function (resp) {
      console.log(resp)
      $('.container').html(
        `<table class='table'>
          <th>국가명</th>
          <th>년도</th>
          <th>값</th>
        </table>`
      );
      for (let i = 0; i < resp.length; i++) {
        console.log(i);
        let country = resp[i].C1_NM;
        let year = resp[i].PRD_DE;
        let val = parseInt(resp[i].DT / 100);
        if (val < 0) {
          $('.table').append(
            `<tr>
              <th>${country}</th>
              <th>${year}</th>
              <td class='blue'>${val}억$</td>
            </tr>`
          )
        } else if (val > 0) {
          $('.table').append(
            `<tr>
              <th>${country}</th> 
              <th>${year}</th>
              <td class='red'>${val}억$</td>
            </tr>`
          )
        } else {
          $('.table').append(
            `<tr>
              <th>${country}</th>
              <th>${year}</th>
              <td>${val}억$</td>
            </tr>`
          )
        }
      }













      /*       console.log(resp)
            $('.table').html(`
              <tbody>
                <tr class="topTable">
                  <th>국가명</th>
                </tr>
              </tbody>
            `)
            for (let i = 0; i < end - start + 1; i++) {
              let year = resp[i].PRD_DE;
              $('.topTable').append(`
                <th>${year}</th>
              `)
            }
            for(let i = 0; i < resp.length; i++){
              let country = resp[i].C1_NM;
              let val = parseInt(resp[i].DT / 100);
              // console.log(country)
              if(i%(end-start+1) == 0){
              console.log(country)
                $('.table').append(`
                  <tr class='tr${i}'>
                    <td>${country}</td>
                  </tr>
                `)
              }
              function even(e){
                if(e%(end-start+1) == 0){
                  return e;
                } else {
                  return e-1;
                }
              }
              $(`.tr${even(i)}`).append(`
                <td>${val}</td>
              `)
              console.log(even(i))
            } */
    }
  })
}





















/*       console.log(resp)
      $('.container').html(
        `<table class='table'>
          <tbody>
            <tr class='topTable'>
              <th>국가명</th>
            </tr>
          </tbody>
        </table>`
      );
 
      for (let i = 0; i < resp.length; i++) {
        // console.log(i);
        let country = resp[i].C1_NM;
        let val = parseInt(resp[i].DT / 100);
          $('.table').append(
            `<tr class='tr${i}'>
              <th>${country}</th>
            </tr>`
          )
          console.log(country, 1)
      }
      for (let i = 0; i < end - start + 1; i++) {
        let year = resp[i].PRD_DE;
        let val = parseInt(resp[i].DT / 100);
        $('.topTable').append(
          `<th>${year}</th>`
        )
        $(`.tr${i-1}`).append(
          `<td>${val}억$</td>`
        )
      } */