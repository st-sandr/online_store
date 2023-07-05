<template>
  <div :class="{ wrapper: show }" @mousedown.stop="hideDialog">
    <div class="v-credit-card" v-if="show">
      <div class="v-credit-card__container">
        <div @mousedown.stop class="v-credit-card__container__card">
          <div class="v-credit-card__container__card__header">
            <div
              v-show="cardType"
              class="v-credit-card__container__card__header__logo"
            >
              <img v-bind:class="cClass" :src="cardType" alt="" />
            </div>
          </div>
          <div class="v-credit-card__container__card__body">
            <p class="v-credit-card__container__card__body__p">
              {{ cardNumber }}
            </p>
          </div>
          <div class="v-credit-card__container__card__footer">
            <div class="v-credit-card__container__card__footer__name">
              <span class="v-credit-card__container__card__footer__name__span"
                >CARD HOLDER</span
              >
              <p>
                {{ cardHolder }}
              </p>
            </div>
            <div class="v-credit-card__container__card__footer__data">
              <span class="v-credit-card__container__card__footer__data__span"
                >EXPIRES</span
              >
              <p
                class="v-credit-card__container__card__footer__data__p"
                v-if="monthSelection"
              >
                {{ monthSelection }} / {{ yearSelection }}
              </p>
            </div>
          </div>
        </div>

        <div @mousedown.stop class="v-credit-card__container__form">
          <form class="v-credit-card__container__form__data">
            <label for="v-credit-card__container__form__data__number"
              >Card Number</label
            >
            <input
              class="input"
              v-on:keyup="inputFormat()"
              v-model="cardNumber"
              maxlength="19"
              type="text"
              id="cardNumber"
            />
            <label for="v-credit-card__container__form__data__name"
              >Card Name</label
            >
            <input
              class="input"
              v-model="cardHolder"
              maxlength="25"
              type="text"
              id="cardName"
            />
            <div class="v-credit-card__container__form__data__date">
              <div>
                <select
                  v-model="monthSelection"
                  name="expirationDate__month"
                  class="v-credit-card__container__form__data__date__select"
                >
                  <option value="">Month</option>
                  <option v-for="item in Months" :value="item.month">
                    {{ item.month }}
                  </option>
                </select>
                <select
                  v-model="yearSelection"
                  name="expirationDate__year"
                  class="v-credit-card__container__form__data__date__select"
                >
                  <option value="">Year</option>
                  <option v-for="item in years" :value="item.year">
                    {{ item.year }}
                  </option>
                </select>
              </div>
              <div class="v-credit-card__container__form__data__date__cvv">
                <label for="cvvInput">CVV</label>
                <input
                  class="v-credit-card__container__form__data__date__cvv__input"
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
            class="v-credit-card__container__form__btn"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

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

const emit = defineEmits(['update:show']);
const hideDialog = () => {
  if (confirm('Остановить покупку?')) {
    emit('update:show', false);
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

@import '/src/assets/styles/components/v-credit-card.scss';
</style>
