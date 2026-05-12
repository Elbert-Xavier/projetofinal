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

import br.com.TrabalhoFinal.GestoreTech.entity.ListaPecasEntity;
import br.com.TrabalhoFinal.GestoreTech.repository.ListaPecasRepository;

@RestController
@RequestMapping("/listapecas")
@CrossOrigin("*")
public class ListaPecasController {
	
	
	@Autowired
	
	private ListaPecasRepository listaPecas;
	
	@GetMapping("/listartodos")
	@ResponseStatus(HttpStatus.OK)
	public List<ListaPecasEntity> BuscarCadastro(){
		return listaPecas.findAll();			
	}
	
	@GetMapping("/listarporid/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<ListaPecasEntity> buscarId(@PathVariable int id) {
		return listaPecas.findById(id);
	}

	@PostMapping("/gravar")
	@ResponseStatus(HttpStatus.CREATED)
	public ListaPecasEntity  GravarCategoria (@RequestBody ListaPecasEntity ListaPecas ) {
		return listaPecas.save(ListaPecas);
	}

	@ResponseStatus(HttpStatus.NO_CONTENT)
	@DeleteMapping("/deletar/{id}")
	public String deletarCategoria(@PathVariable int id) {
		
		
		if (listaPecas.existsById(id)) {
			listaPecas.deleteById(id);
			
		}
		return "Peça Apagada";
		
	}
	
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public String atualizartabela(@PathVariable int id, @RequestBody ListaPecasEntity ListaPecas) {
		
		if(listaPecas.existsById(id)) {
			ListaPecas.setId(id);
			listaPecas.save(ListaPecas);
			return "Atualizado";
		}
		
		
		return "não Atualizado";
		
	}

	

}
