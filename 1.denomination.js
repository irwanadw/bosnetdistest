const denominationMoneyAdvice = (yourMoney, denomination) => {
    if (yourMoney === 0) {
      return [];
    } else {
      if (yourMoney >= denomination[0]) {
        left = yourMoney - denomination[0];
        return [denomination[0]].concat(
          denominationMoneyAdvice(left, denomination)
        );
      } else {
        denomination.shift();
        console.log(denomination)
        return denominationMoneyAdvice(yourMoney, denomination);
      }
    }
  };
  const denominations = [100000, 50000, 20000, 5000, 2000, 1000, 500, 100]; // this is denomination
  const yourMoney = 4750 // fill your your money
  console.log(denominationMoneyAdvice(yourMoney, denominations) ,  `suggest denomination of ${yourMoney}`) 
  