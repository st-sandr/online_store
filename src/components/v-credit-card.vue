<template>
  <div class="card" v-if="show" @mousedown.stop="hideDialog">
    <div class="container">
      <div @mousedown.stop class="card-container">
        <div class="card--credit__card">
          <div class="front">
            <div class="Cheader">
              <div v-show="cardType" class="card__logo">
                <img v-bind:class="cClass" :src="cardType" alt="" />
              </div>
            </div>
            <div class="Cbody">
              <p>{{ cardNumber }}</p>
            </div>
            <div class="Cfooter">
              <div class="name">
                <span>CARD HOLDER</span>
                <p class="name_p">{{ cardHolder }}</p>
              </div>
              <div class="expiration__data">
                <span>EXPIRES</span>
                <p v-if="monthSelection">
                  {{ monthSelection }} / {{ yearSelection }}
                </p>
              </div>
            </div>
          </div>
          <div class="back">
            <div class="strip"></div>
            <div class="cvv-container">
              <p>cvv: {{ cvv }}</p>
              <div class="cvv-strip"></div>
            </div>
          </div>
        </div>
      </div>

      <div @mousedown.stop class="card--form">
        <form>
          <label for="cardNumber">Card Number</label>
          <input
            v-on:keyup="inputFormat()"
            v-model="cardNumber"
            maxlength="19"
            type="text"
            id="cardNumber"
          />
          <label for="cardName">Card Name</label>
          <input
            v-model="cardHolder"
            maxlength="25"
            type="text"
            id="cardName"
          />
          <div class="date--expiration">
            <div>
              <select v-model="monthSelection" name="expirationDate__month">
                <option value="">Month</option>
                <option v-for="item in Months" :value="item.month">
                  {{ item.month }}
                </option>
              </select>
              <select v-model="yearSelection" name="expirationDate__year">
                <option value="">Year</option>
                <option v-for="item in years" :value="item.year">
                  {{ item.year }}
                </option>
              </select>
            </div>
            <div class="cvv">
              <label for="cvvInput">CVV</label>
              <input
                v-model="cvv"
                maxlength="4"
                type="text"
                id="cvvInput"
                onkeypress="return (event.charCode >= 48 && event.charCode <= 57 && /^\d{0,3}$/.test(this.value));"
              />
            </div>
          </div>
        </form>
        <button
          @mousedown="mouseDw"
          @mouseup="mouseUp"
          :class="btnClassName"
          class="CCbtn"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
export default {
  name: 'v-credit-cart',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const Months = [
      { month: '0' + 1 },
      { month: '0' + 2 },
      { month: '0' + 3 },
      { month: '0' + 4 },
      { month: '0' + 5 },
      { month: '0' + 6 },
      { month: '0' + 7 },
      { month: '0' + 8 },
      { month: '0' + 9 },
      { month: 10 },
      { month: 11 },
      { month: 12 },
    ];
    const years = ref([]);
    const monthSelection = ref('');
    const yearSelection = ref('');
    const timeToExpire = 9;
    const cardNumber = ref('');
    const cardVadid = ref('');
    const cardType = ref('');
    const cClass = ref('');
    const cvv = ref('');
    const cardHolder = ref('');

    const btnClassName = ref('');

    const regx = [
      {
        name: 'Visa',
        logo: 'https://seeklogo.com/images/V/visa-logo-CF29426B98-seeklogo.com.png',
        re: '^4',
      },
      {
        name: 'Hipercard',
        logo: 'https://cdn.worldvectorlogo.com/logos/hipercard.svg',
        re: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
      },
      {
        name: 'MasterCard',
        logo: 'https://logodownload.org/wp-content/uploads/2014/07/mastercard-logo-novo-3.png',
        re: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
      },
      {
        name: 'Discover',
        logo: 'https://i.pinimg.com/originals/b3/d7/85/b3d7853a11dcc8c424866915ddd4d3e3.png',
        re: /^(6011|65|64[4-9]|622)/,
      },
      {
        name: 'Elo',
        logo: 'https://seeklogo.com/images/E/elo-logo-0B17407ECC-seeklogo.com.png',
        re: /^(4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7][0-9]|9000)|627780|63(6297|6368)|650(03([^4])|04([0-9])|05(0|1)|4(0[5-9]|3[0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8])|9([2-6][0-9]|7[0-8])|541|700|720|901)|651652|655000|655021)/,
      },
      {
        name: 'American Express',
        logo: 'https://ccard-generator.com/assets/images/cardmedium/american-express.png',
        re: /^3[47]\d{13,14}$/,
      },
    ];

    //4 in 4 spaces on input format
    const inputFormat = () => {
      let text = cardNumber.value.split(' ').join('');
      //this.cardVdid is not formated in 4 spaces
      cardVadid.value = text;
      if (text.length > 0) {
        //regExp 4 in 4 number add an space between
        text = text
          .match(new RegExp(/.{1,4}/, 'g'))
          .join(' ')
          //accept only numbers
          .replace(new RegExp(/[^\d]/, 'ig'), ' ');
      }
      //this.cardNumber is formated on 4 spaces
      cardNumber.value = text;
      //after formatd they callback cardType for choose a type of the card
      GetCardType(cardVadid.value);
    };
    //loop for the next 9 years for expire data on credit card
    const expirationDate = () => {
      let yearNow = new Date().getFullYear();
      for (let i = yearNow; i < yearNow + timeToExpire; i++) {
        //реактивна?
        years.value.push({ year: i });
      }
    };

    const validCreditCard = (value) => {
      let inputValidate = document.getElementById('cardNumber');
      // luhn algorithm
      let numCheck = 0,
        bEven = false;
      value = value.toString().replace(new RegExp(/\D/g, ''));
      for (let n = value.length - 1; n >= 0; n--) {
        let cDigit = value.charAt(n),
          digit = parseInt(cDigit, 10);
        if (bEven && (digit *= 2) > 9) digit -= 9;
        numCheck += digit;
        bEven = !bEven;
      }
      let len = value.length;
      //true: return valid number
      //this.cardType return true if have an valid number on regx array
      if (numCheck % 10 === 0 && len === 16 && cardType.value) {
        inputValidate.classList.remove('notValid');
        inputValidate.classList.add('valid');
      }
      //false: return not valid number
      else if (!numCheck % 10 === 0 && len === 16) {
        inputValidate.classList.remove('valid');
        inputValidate.classList.add('notValid');
        //if not have number on input
      } else {
        inputValidate.classList.remove('valid');
        inputValidate.classList.remove('notValid');
      }
    };

    // get the name of the card name
    const GetCardType = (number) => {
      regx.forEach((item) => {
        if (number.match(item.re) != null) {
          cardType.value = item.logo;
          //cClass add a class with the name of cardName to manipulate with css
          cClass.value = item.name.toLowerCase();
        } else if (!number) {
          cardType.value = '';
          cClass.value = '';
        }
      });
      //after choose a cardtype return the number for the luhn algorithm
      validCreditCard(number);
    };

    //  mouse down on btn
    const mouseDw = () => {
      btnClassName.value = 'btn__active';
    };
    //mouse up on btn
    const mouseUp = () => {
      btnClassName.value = '';
    };

    onBeforeMount(() => expirationDate());

    const hideDialog = () => {
      if (confirm('Остановить покупку?')) {
        context.emit('update:show', false);
      } else {
      }
    };

    return {
      Months,
      years,
      monthSelection,
      yearSelection,
      timeToExpire,
      cardNumber,
      cardVadid,
      cardType,
      cClass,
      cvv,
      cardHolder,
      regx,
      btnClassName,
      inputFormat,
      expirationDate,
      validCreditCard,
      GetCardType,
      mouseDw,
      mouseUp,
      hideDialog,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: #2e2e2e;
  font-family: roboto, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  position: absolute;
  height: 100%;
  width: 430px;
}

.card {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}

.card-container {
  top: 10;
  perspective: 1000px;
}

.card--credit__card {
  width: 350px;
  height: 200px;
  border-radius: 10px;
  background: url('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRtX-QkYwDKEXw_jriWgI5vplXUadOusPHRitOZKZCfBqJqK7IU');
  background-size: cover;
  position: relative;
  z-index: 2;
  -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.card--form {
  width: 430px;
  height: 460px;
  background: #fff;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  position: absolute;
  z-index: 1;
  -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

form {
  width: 100%;
  height: 65%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  font-size: 13px;
}

form input {
  width: 90%;
  height: 25px;
  border: 2px solid #ccc;
  outline: none;
  border-radius: 5px;
  padding-left: 5px;
  margin-left: auto;
  margin-right: auto;
}

label {
  padding: 15px 0px 0px 20px;
  color: #595959;
}

form input:focus {
  box-shadow: 0 0 5px #d4eafd;
  border-color: #4bdee5;
}

.date--expiration {
  width: 90%;
  height: 50px;
  margin: 20px 0px 0px 0px;
  padding: 0px 5px 0px 5px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date--expiration input {
  width: 100px;
}

select {
  width: 100px;
  height: 33px;
  border: 2px solid #ccc;
  outline: none;
  border-radius: 5px;
}

.card__logo {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: none;
  margin-right: 5px;
  margin-top: 5px;
}

img {
  width: 60px;
  height: 40px;
  user-select: none;
}

.visa {
  width: 58px;
  height: 25px;
}

.elo {
  height: 27px;
}

.Cheader {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-direction: row-reverse;
}

.Cbody {
  width: 100%;
  height: 33px;
  position: absolute;
  bottom: 40%;
  display: flex;
  align-items: center;
}

.Cbody p {
  font-size: 30px;
  margin-left: 8%;
  color: white;
}

.Cfooter {
  width: 95%;
  height: 33px;
  position: absolute;
  bottom: 6%;
  margin-left: 5px;
  display: flex;
  align-items: center;
}

.Cfooter .name {
  width: 70%;
  height: 100%;
  color: white;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  margin-left: 10px;
}

.name span {
  font-size: 10px;
}

.expiration__data {
  width: 30%;
  height: 100%;
  color: white;
}

.expiration__data p {
  position: absolute;
  right: 0;
  top: 0;
}

.expiration__data span {
  font-size: 10px;
  position: absolute;
  right: 0;
  top: 0;
}

.CCbtn {
  width: 90%;
  height: 45px;
  position: absolute;
  bottom: 7%;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  border-radius: 4px;
  background: #2e2e2e;
  box-shadow: 3px 10px 20px 0px rgba(0, 0, 0, 0.3);
  font-size: 20px;
  color: white;
  transition: 0.1s ease;
  cursor: pointer;
  outline: none;
}

.btn__active {
  bottom: 6%;
  left: 49%;
}

.card-container {
  position: relative;
  width: 350px;
  height: 200px;
  z-index: 2;
  left: 40px;
  top: 110px;
}

.card--credit__card {
  position: absolute;
  transition: 1s ease;
  transform-style: preserve-3d;
}

.cvv-active {
  transform: rotateY(180deg);
}

.front {
  width: 350px;
  height: 200px;
}

.front,
.back {
  position: absolute;
  backface-visibility: hidden;
}

.back {
  width: 350px;
  height: 200px;
  color: white;
  transform: rotateY(180deg);
  border-radius: 10px;
  background: url('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRtX-QkYwDKEXw_jriWgI5vplXUadOusPHRitOZKZCfBqJqK7IU');
  background-size: cover;
  z-index: 2;
  -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.strip {
  width: 100%;
  height: 40px;
  background: linear-gradient(135deg, #404040, #1a1a1a);
  position: relative;
  top: 25px;
}

.cvv-container {
  width: 90%;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cvv-container p {
  z-index: 2;
  position: absolute;
  left: 65%;
  top: 25%;
  color: black;
  margin: 0;
}

.cvv-container .cvv-strip {
  width: 100%;
  height: 35px;
  background: white;
  position: absolute;
  top: 5%;
}

.valid {
  border-color: #4bb54380;
  box-shadow: 0 0 2px #4bb54380;
  background: #4bb54310;
}

.valid:focus {
  border-color: #4bb54310;
  box-shadow: 0 0 2px #4bb543;
}

.notValid {
  border-color: #d8000c;
  box-shadow: 0 0 2px #d8000c;
  background: #d800bb10;
}

.notValid:focus {
  border-color: #d8000c;
  box-shadow: 0 0 2px #d8000c;
  background: #d800bb10;
}
</style>
