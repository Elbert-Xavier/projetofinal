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
import br.com.TrabalhoFinal.GestoreTech.entity.EquipeChamadoEntity;
import br.com.TrabalhoFinal.GestoreTech.repository.EquipeChamadoRepository;

@RestController
@RequestMapping("/equipechamados")
@CrossOrigin("*")

public class EquipeChamadoController {

	
	@Autowired
	private EquipeChamadoRepository equipe;
	
	@GetMapping("/listartodos")
	@ResponseStatus(HttpStatus.OK)
	public List<EquipeChamadoEntity> BuscarCadastro(){
		return equipe.findAll();			
	}
	
	@GetMapping("/listarporid/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<EquipeChamadoEntity> buscarId(@PathVariable int id) {
		return equipe.findById(id);
	}

	@PostMapping("/gravar")
	@ResponseStatus(HttpStatus.CREATED)
	public EquipeChamadoEntity  GravarCategoria (@RequestBody EquipeChamadoEntity equipes ) {
		return equipe.save(equipes);
	}

	@ResponseStatus(HttpStatus.NO_CONTENT)
	@DeleteMapping("/deletar/{id}")
	public String deletarCategoria(@PathVariable int id) {
		
		if (equipe.existsById(id)) {
			equipe.deleteById(id);
			
		}
		
		
		return "Equipe Chamado  Deletado";
		
	}
	
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public String atualizartabela(@PathVariable int id, @RequestBody EquipeChamadoEntity equipes) {
		
		if(equipe.existsById(id)) {
			equipes.setId(id);
			equipe.save(equipes);
			return "Atualizado";
		}
		
		
		return "não Atualizado";
		
	}


	
}
