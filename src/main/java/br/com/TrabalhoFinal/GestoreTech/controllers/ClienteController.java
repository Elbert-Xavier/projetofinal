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

import br.com.TrabalhoFinal.GestoreTech.entity.ClienteEntity;
import br.com.TrabalhoFinal.GestoreTech.repository.ClienteRepository;

@RestController
@RequestMapping("/clientes")
@CrossOrigin("*")
public class ClienteController {
	
	
	@Autowired
	private ClienteRepository cliente;
	
	@GetMapping("/listartodos")
	@ResponseStatus(HttpStatus.OK)
	public List<ClienteEntity> BuscarCadastro(){
		return cliente.findAll();			
	}
	
	@GetMapping("/listarporid/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<ClienteEntity> buscarId(@PathVariable int id) {
		return cliente.findById(id);
	}

	@PostMapping("/gravar")
	@ResponseStatus(HttpStatus.CREATED)
	public ClienteEntity  GravarCategoria (@RequestBody ClienteEntity clientes ) {
		return cliente.save(clientes);
	}

	@ResponseStatus(HttpStatus.NO_CONTENT)
	@DeleteMapping("/deletar/{id}")
	public String deletarCategoria(@PathVariable int id) {
		
		
		if (cliente.existsById(id)) {
			cliente.deleteById(id);
			
		}
		return "Cliente Deletado";
		
	}
	
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public String atualizartabela(@PathVariable int id, @RequestBody ClienteEntity clientes) {
		
		if(cliente.existsById(id)) {
			clientes.setId(id);
			cliente.save(clientes);
			return "Atualizado";
		}
		
		
		return "não Atualizado";
		
	}


}

