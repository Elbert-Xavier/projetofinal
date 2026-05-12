let revelarValor = 1

async function revelar() {
	
	const revela = document.getElementById('senha')
	console.log(revela)
	
	if(revelarValor == 1){
		revela.type = "text";
		revelarValor=2;
		
	}else if(revelarValor == 2) {
		revela.type = "password";
		revelarValor=1;
	}
}
