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

import br.com.TrabalhoFinal.GestoreTech.entity.EnderecoEntity;
import br.com.TrabalhoFinal.GestoreTech.repository.EnderecoRepository;

@RestController
@RequestMapping("/enderecos")
@CrossOrigin("*")
public class EnderecoController {
	
	@Autowired
	private EnderecoRepository endereco;
	
	@GetMapping("/listartodos")
	@ResponseStatus(HttpStatus.OK)
	public List<EnderecoEntity> BuscarCadastro(){
		return endereco.findAll();			
	}
	
	@GetMapping("/listarporid/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<EnderecoEntity> buscarId(@PathVariable int id) {
		return endereco.findById(id);
	}

	@PostMapping("/gravar")
	@ResponseStatus(HttpStatus.CREATED)
	public EnderecoEntity  GravarCategoria (@RequestBody EnderecoEntity enderecos ) {
		return endereco.save(enderecos);
	}

	@ResponseStatus(HttpStatus.NO_CONTENT)
	@DeleteMapping("/deletar/{id}")
	public String deletarCategoria(@PathVariable int id) {
		
		if (endereco.existsById(id)) {
			endereco.deleteById(id);
			
		}
		
		
		return "Endereco Deletado";
		
	}
	
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public String atualizartabela(@PathVariable int id, @RequestBody EnderecoEntity enderecos) {
		
		if(endereco.existsById(id)) {
			enderecos.setId(id);
			endereco.save(enderecos);
			return "Atualizado";
		}
		
		
		return "não Atualizado";
		
	}



}
