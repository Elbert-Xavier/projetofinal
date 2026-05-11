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
import br.com.TrabalhoFinal.GestoreTech.entity.OrdemServicoEntity;
import br.com.TrabalhoFinal.GestoreTech.repository.OrdemServicoRepository;

@RestController
@RequestMapping("/Ordem")
@CrossOrigin("*")

public class OrdemServicoController {

	@Autowired
	
	private OrdemServicoRepository ordem;
	
	@GetMapping("/listartodos")
	@ResponseStatus(HttpStatus.OK)
	public List<OrdemServicoEntity> BuscarCadastro(){
		return ordem.findAll();			
	}
	
	@GetMapping("/listarporid/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<OrdemServicoEntity> buscarId(@PathVariable int id) {
		return ordem.findById(id);
	}

	@PostMapping("/gravar")
	@ResponseStatus(HttpStatus.CREATED)
	public OrdemServicoEntity  GravarCategoria (@RequestBody OrdemServicoEntity servicos ) {
		return ordem.save(servicos);
	}

	@ResponseStatus(HttpStatus.NO_CONTENT)
	@DeleteMapping("/deletar/{id}")
	public String deletarCategoria(@PathVariable int id) {
		
		if (ordem.existsById(id)) {
			ordem.deleteById(id);
			
		}
		
		
		return "Ordem se servico  Deletado";
		
	}
	
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public String atualizartabela(@PathVariable int id, @RequestBody OrdemServicoEntity servicos) {
		
		if(ordem.existsById(id)) {
			servicos.setId(id);
			ordem.save(servicos);
			return "Atualizado";
		}
		
		
		return "não Atualizado";
		
	}


	
}
