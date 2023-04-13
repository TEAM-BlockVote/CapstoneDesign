const AutoHyphen = (target) => {
    target.value = target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
   }

function PassCompare() {
    var p1 = document.getElementById('Password').value;
    var p2 = document.getElementById('PasswordCheck').value;

    if( p1 != p2 ) {
        alert("비밀번호가 일치 하지 않습니다");
        return false;
    } else if (p1 = p2) {
        window.location.href='Joined.html';
        return true;
    } else {
        alert("비밀번호를 입력하세요")
        return false;
    }
  }