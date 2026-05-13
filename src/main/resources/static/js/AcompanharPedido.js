
function StatusPedidoAtual(PedidoStatus) {
	if(PedidoStatus == ""){
		let div1 = document.getElementById('EstadoChamado1')
		div1.className = "step active";
	}else if(PedidoStatus == ""){
		let div1 = document.getElementById('EstadoChamado1')
		div1.className = "step completed";
		div1.innerHTML=`
			<div class="step-icon"><i class="fa-solid fa-desktop"><span class="check">✓</span></i></div>
			<label>Análise do problema</label>
			<span>29/08/2025 14:20</span>
			`
		let div2 = document.getElementById('EstadoChamado2')
		div2.className = "step active";
	}else if(PedidoStatus == ""){
		let div1 = document.getElementById('EstadoChamado1')
		div1.className = "step completed";
		div1.innerHTML=`
			<div class="step-icon"><i class="fa-solid fa-desktop"><span class="check">✓</span></i></div>
			<label>Análise do problema</label>
			<span>29/08/2025 14:20</span>
			`
		let div2 = document.getElementById('EstadoChamado2')
		div2.className = "step completed";
		div2.innerHTML=`
			<div class="step-icon"><i class="fa-solid fa-check"><span class="check">✓</span></i></div>
			<label>Chamado aceito</label>
			<span>29/08/2025 14:25</span>
			`
		let div3 = document.getElementById('EstadoChamado3')
		div3.className = "step active";
	}else if(PedidoStatus == ""){
		let div1 = document.getElementById('EstadoChamado1')
		div1.className = "step completed";
		div1.innerHTML=`
			<div class="step-icon"><i class="fa-solid fa-desktop"><span class="check">✓</span></i></div>
			<label>Análise do problema</label>
			<span>29/08/2025 14:20</span>
			`
		let div2 = document.getElementById('EstadoChamado2')
		div2.className = "step completed";
		div2.innerHTML=`
			<div class="step-icon"><i class="fa-solid fa-check"><span class="check">✓</span></i></div>
			<label>Chamado aceito</label>
			<span>29/08/2025 14:25</span>
			`
		let div3 = document.getElementById('EstadoChamado3')
		div3.className = "step completed";
		div3.innerHTML=`
			<div class="step-icon"><i class="fa-solid fa-truck"><span class="check">✓</span></i></div>
			<label>Técnico a caminho</label>
			<span>29/08/2025 14:30</span>
			`
		let div4 = document.getElementById('EstadoChamado4')
		div4.className = "step active";
	}else if(PedidoStatus == ""){
		let div1 = document.getElementById('EstadoChamado1')
		div1.className = "step completed";
		div1.innerHTML=`
			<div class="step-icon"><i class="fa-solid fa-desktop"><span class="check">✓</span></i></div>
			<label>Análise do problema</label>
			<span>29/08/2025 14:20</span>
			`
		let div2 = document.getElementById('EstadoChamado2')
		div2.className = "step completed";
		div2.innerHTML=`
			<div class="step-icon"><i class="fa-solid fa-check"><span class="check">✓</span></i></div>
			<label>Chamado aceito</label>
			<span>29/08/2025 14:25</span>
			`
		let div3 = document.getElementById('EstadoChamado3')
		div3.className = "step completed";
		div3.innerHTML=`
			<div class="step-icon"><i class="fa-solid fa-truck"><span class="check">✓</span></i></div>
			<label>Técnico a caminho</label>
			<span>29/08/2025 14:30</span>
			`
		let div4 = document.getElementById('EstadoChamado4')
		div4.className = "step completed";
		div4.innerHTML=`
			<div class="step-icon"><i class="fa-solid fa-wrench"><span class="check">✓</span></i></div>
			<label>Conserto em andamento</label>
			<span>-</span>
			`
		let div5 = document.getElementById('EstadoChamado5')
		div5.className = "step active";
	}else if(PedidoStatus == "") {
		let div1 = document.getElementById('EstadoChamado1')
		div1.className = "step completed";
		div1.innerHTML=`
			<div class="step-icon"><i class="fa-solid fa-desktop"><span class="check">✓</span></i></div>
			<label>Análise do problema</label>
			<span>29/08/2025 14:20</span>
			`
		let div2 = document.getElementById('EstadoChamado2')
		div2.className = "step completed";
		div2.innerHTML=`
			<div class="step-icon"><i class="fa-solid fa-check"><span class="check">✓</span></i></div>
			<label>Chamado aceito</label>
			<span>29/08/2025 14:25</span>
			`
		let div3 = document.getElementById('EstadoChamado3')
		div3.className = "step completed";
		div3.innerHTML=`
			<div class="step-icon"><i class="fa-solid fa-truck"><span class="check">✓</span></i></div>
			<label>Técnico a caminho</label>
			<span>29/08/2025 14:30</span>
			`
		let div4 = document.getElementById('EstadoChamado4')
		div4.className = "step completed";
		div4.innerHTML=`
			<div class="step-icon"><i class="fa-solid fa-wrench"><span class="check">✓</span></i></div>
			<label>Conserto em andamento</label>
			<span>-</span>
			`
		let div5 = document.getElementById('EstadoChamado5')
		div5.className = "step completed";
		div1.innerHTML=`
			<div class="step-icon"><i class="fa-solid fa-circle-check"><span class="check">✓</span></i></div>
			<label>Pedido finalizado</label>
			<span>-</span>
			`
	}
	
}
