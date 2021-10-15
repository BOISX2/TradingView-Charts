const log = console.log;
//step 1: Chart Properties
const chartProperties = {
	width : 1500,
	height :  600,
	timeScale:{
		timeVisible:true,
		secondVisible:false,
	}
}
//step 2: Create the chart and bind it to the tvchart div element
const domElement = document.getElementById('tvchart');
const chart = LightweightCharts.createChart(domElement,chartProperties);
//step 3: Add the candlestick series
const candleSeries = chart.addCandlestickSeries();
fetch(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1000`).then(res => res.json()).then(data => {
	const cdata = data.map(d => {
		return {time:d[0]/1000,open:parseFloat(d[1]),high:parseFloat(d[2]),low:parseFloat(d[3]),close:parseFloat(d[4])}
	})
	candleSeries.setData(cdata);
}).catch(err => log(err))