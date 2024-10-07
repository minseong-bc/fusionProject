const autoHyphen2 = (target) => {
    target.value = target.value
    .replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
    const phoneInput = document.getElementById('phone1');
    const tokenButton = document.getElementById('token_button');
 
    // 전화번호가 입력되면 인증번호 전송 버튼 활성화
    if (phoneInput.value.trim() !== "") {
        tokenButton.disabled = false;
    } else {
        tokenButton.disabled = true;
    }

   }
   
        