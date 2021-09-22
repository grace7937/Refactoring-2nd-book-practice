const invoice = 
  {
    "customer": "BigCo",
    "performances":[
      {
        "playID": "hamlet",
        "audience": 55
      },
      {
        "playID": "as-like",
        "audience": 35
      },
      {
        "playID": "othellow",
        "audience": 40
      },

    ]
  };

const plays = {
  "hemlet": {"name": "Hemlet", "type": "tragedy"},
  "as-like": {"name": "As You Like It", "type": "comedy"},
  "hemlet": {"name": "Othellow", "type": "tragedy"}
}

function statement(invoice, plays) {
  console.log(plays);
  console.log(invoice);
  let totalAmount = 0;
  let volumCredits = 0;
  let result = `청구 내역(고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    console.log('id',plays[perf.playID]);
    const play = plays[perf.playID];
    console.log(play);
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
        case "comedy": 
        thisAmount = 30000;
        if(perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience -20);
        }
        thisAmount += 300 *perf.audience;
        break;
        default:
        throw new Error(`알수 없는장르: ${play.type}`)  
    }

    //포인트 정립
    volumCredits += Math.max(perf.audience -30, 0);

    //희극 관객 5명마다 포인트 추가
    if("comedy" === play.audience) volumCredits += Math.floor(perf.audience / 5 );


    //청구 내역을 출력한다.
    result += `${play.name}: ${format(thisAmount/100)} (${perf.audience}석)\n`
    totalAmount += thisAmount;
  }

  result += `총액: ${format(totalAmount/100)}\n`;
  result += `적립 포인트: ${volumCredits}점\n`;
  return result;
}



console.log('statement', statement(invoice, plays));
