// This script will generate checkout json with value 1 for all the currency
// Example: https://cdn.jsdelivr.net/gh/fawazahmed0/fawazahmed0.github.io-file-hosting@master/stripe/onetime.json
// https://cdn.jsdelivr.net/gh/fawazahmed0/fawazahmed0.github.io-file-hosting@master/stripe/multitime.json



var fs = require('fs');
// Remove the sk or secret key later when pushing the code to github
// Secret live key was removed, it can be taken from dashboard, the below is fake secret key
var stripe = require('stripe')('sk_live_51GFFEDMEJRJJneICz');
// ID of product, take from dashboard, this is fake value
var productid = 'prod_I6ctfJDdd08SZA'

// Not keeping UGX here
// Refer
var zeroDecimal = ["bif","clp","djf","gnf","jpy","kmf","krw","mga","pyg","rwf","vnd","vuv","xaf","xof","xpf"]

var allCurrency = ["aed","afn","all","amd","ang","aoa","ars","aud","awg","azn","bam","bbd","bdt","bgn","bif","bmd","bnd","bob","brl","bsd","bwp","bzd","cad","cdf","chf","clp","cny","cop","crc","cve","czk","djf","dkk","dop","dzd","egp","etb","eur","fjd","fkp","gbp","gel","gip","gmd","gnf","gtq","gyd","hkd","hnl","hrk","htg","huf","idr","ils","inr","isk","jmd","jpy","kes","kgs","khr","kmf","krw","kyd","kzt","lak","lbp","lkr","lrd","lsl","mad","mdl","mga","mkd","mmk","mnt","mop","mro","mur","mvr","mwk","mxn","myr","mzn","nad","ngn","nio","nok","npr","nzd","pab","pen","pgk","php","pkr","pln","pyg","qar","ron","rsd","rub","rwf","sar","sbd","scr","sek","sgd","shp","sll","sos","srd","std","szl","thb","tjs","top","try","ttd","twd","tzs","uah","ugx","usd","uyu","uzs","vnd","vuv","wst","xaf","xcd","xof","xpf","yer","zar","zmw"]

var decimalCurrency = allCurrency.filter(currency => !zeroDecimal.includes(currency))

oneTimeJson = {}
multiTimeJson = {}


async function start(){

for (var currency of allCurrency){

var amount = zeroDecimal.includes(currency) ? 1 : 100

var singleTime = await stripe.prices.create({product: productid, unit_amount: amount, currency: currency})
var multiTime = await stripe.prices.create({product: productid, unit_amount: amount, currency: currency, recurring: {interval: 'month'}})

oneTimeJson[singleTime['currency']] = singleTime['id']
multiTimeJson[multiTime['currency']] = multiTime['id']

}



fs.writeFileSync('./oneTimeJson', JSON.stringify(oneTimeJson))
fs.writeFileSync('./multiTimeJson', JSON.stringify(multiTimeJson))
}
start()

/*

// monthly

 var price = await stripe.prices.create({
  product: 'prod_HXr86VxRVpnaTN',
  unit_amount: 1000,
  currency: 'usd',
  recurring: {
    interval: 'month',
  },
}).then(console.log);

var j = await price.json()
console.log(j)


// two obj,  oneTime and monthly , contains the price id




stripe.prices.create({
  product: 'prod_HXr86VxRVpnaTN',
  unit_amount: 3000,
  currency: 'jpy',
}).then(console.log)



BIF
CLP
DJF
GNF
HUF
JPY
KMF
KRW
MGA
PYG
RWF
VND
VUV
XAF
XOF
XPF

*/
