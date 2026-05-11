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
import br.com.TrabalhoFinal.GestoreTech.entity.EstoqueEntity;
import br.com.TrabalhoFinal.GestoreTech.repository.EstoqueRepository;

@RestController
@RequestMapping("/Estoque")
@CrossOrigin("*")
public class EstoqueController {

		@Autowired
		
		private EstoqueRepository estoque;
		
		@GetMapping("/listartodos")
		@ResponseStatus(HttpStatus.OK)
		public List<EstoqueEntity> BuscarCadastro(){
			return estoque.findAll();			
		}
		
		@GetMapping("/listarporid/{id}")
		@ResponseStatus(HttpStatus.OK)
		public Optional<EstoqueEntity> buscarId(@PathVariable int id) {
			return estoque.findById(id);
		}

		@PostMapping("/gravar")
		@ResponseStatus(HttpStatus.CREATED)
		public EstoqueEntity  GravarCategoria (@RequestBody EstoqueEntity estoques ) {
			return estoque.save(estoques);
		}

		@ResponseStatus(HttpStatus.NO_CONTENT)
		@DeleteMapping("/deletar/{id}")
		public String deletarCategoria(@PathVariable int id) {
			
			if (estoque.existsById(id)) {
				estoque.deleteById(id);
				
			}
			
			
			return "Item do estoque Deletado";
			
		}
		
		@PutMapping("/atualizar/{id}")
		@ResponseStatus(HttpStatus.OK)
		public String atualizartabela(@PathVariable int id, @RequestBody EstoqueEntity Estoque) {
			
			if(estoque.existsById(id)) {
				Estoque.setId(id);
				estoque.save(Estoque);
				return "Atualizado";
			}
			
			
			return "não Atualizado";
			
		}


	
	
}
