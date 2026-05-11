package br.com.TrabalhoFinal.GestoreTech.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import br.com.TrabalhoFinal.GestoreTech.entity.MovimentacaoPecaEntity;
import br.com.TrabalhoFinal.GestoreTech.repository.MovimentacaoPecaRepository;

@RestController
@RequestMapping("/movimentacao") 
@CrossOrigin("*")

public class MovimentacaoPecaController {

	@Autowired
	
	private MovimentacaoPecaRepository movimentacao;
	
	@GetMapping("/listartodos")
	@ResponseStatus(HttpStatus.OK)
	public List<MovimentacaoPecaEntity> BuscarCadastro(){
		return movimentacao.findAll();			
	}
	
	@GetMapping("/listarporid/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<MovimentacaoPecaEntity> buscarId(@PathVariable int id) {
		return movimentacao.findById(id);
	}

	@PostMapping("/gravar")
	@ResponseStatus(HttpStatus.CREATED)
	public MovimentacaoPecaEntity  GravarCategoria (@RequestBody MovimentacaoPecaEntity peca ) {
		return movimentacao.save(peca);
	}

	@ResponseStatus(HttpStatus.NO_CONTENT)
	@DeleteMapping("/deletar/{id}")
	public String deletarCategoria(@PathVariable int id) {
		
		if (movimentacao.existsById(id)) {
			movimentacao.deleteById(id);
			
		}
		
		
		return "Movimentacao de Pecas  Deletado";
		
	}
	
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public String atualizartabela(@PathVariable int id, @RequestBody MovimentacaoPecaEntity peca) {
		
		if(movimentacao.existsById(id)) {
			peca.setId(id);
			movimentacao.save(peca);
			return "Atualizado";
		}
		
		
		return "não Atualizado";
		
	}


	
}
