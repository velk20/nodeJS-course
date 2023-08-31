function main(arr) {
  let result;
  let n = arr[0];

  for (let a = 1; a <= 9; a++) {
    for (let b = 9; b >= a; b--) {
      for (let c = 0; c <= 9; c++) {
        for (let d = 9; d >= c; d--) {
          let sum = a + b + c + d;
          let prod = a * b * c * d;

          if (sum == prod && Number(n[n.length - 1]) == 5 && !result) {
            result = '' + a + b + c + d;
            break;
          } else if (Math.floor(prod / sum) == 3 && Number(n) % 3 == 0 && !result) {
            result = '' + d + c + b + a;
            break;
          }

        }
        if (result) {
          break;
        }
      }
      if (result) {
        break;
      }
    }
    if (result) {
      break;
    }
  }

  if (!result) {
    console.log('Nothing found');
  } else {
    console.log(result);
  }


}

main(['123']);
main(['145']);
main(['214']);