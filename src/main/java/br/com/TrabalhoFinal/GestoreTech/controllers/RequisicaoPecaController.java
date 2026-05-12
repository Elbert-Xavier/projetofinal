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
import br.com.TrabalhoFinal.GestoreTech.entity.RequisicaoPecaEntity;
import br.com.TrabalhoFinal.GestoreTech.repository.RequisicaoPecaRepository;

@RestController
@RequestMapping("/requisicoes")
@CrossOrigin("*")


public class RequisicaoPecaController {

	@Autowired
	private RequisicaoPecaRepository requisicao;
	
	@GetMapping("/listartodos")
	@ResponseStatus(HttpStatus.OK)
	public List<RequisicaoPecaEntity> BuscarCadastro(){
		return requisicao.findAll();			
	}
	
	@GetMapping("/listarporid/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<RequisicaoPecaEntity> buscarId(@PathVariable int id) {
		return requisicao.findById(id);
	}

	@PostMapping("/gravar")
	@ResponseStatus(HttpStatus.CREATED)
	public RequisicaoPecaEntity  GravarCategoria (@RequestBody RequisicaoPecaEntity peca ) {
		return requisicao.save(peca);
	}

	@ResponseStatus(HttpStatus.NO_CONTENT)
	@DeleteMapping("/deletar/{id}")
	public String deletarCategoria(@PathVariable int id) {
		
		if (requisicao.existsById(id)) {
			requisicao.deleteById(id);
			
		}
		
		
		return "Peca solicitada  Deletado";
		
	}
	
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public String atualizartabela(@PathVariable int id, @RequestBody RequisicaoPecaEntity peca) {
		
		if(requisicao.existsById(id)) {
			peca.setId(id);
			requisicao.save(peca);
			return "Atualizado";
		}
		
		
		return "não Atualizado";
		
	}


}
