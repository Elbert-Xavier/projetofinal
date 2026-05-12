package br.com.TrabalhoFinal.GestoreTech.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.TrabalhoFinal.GestoreTech.entity.EspecificacaoEntity;
import br.com.TrabalhoFinal.GestoreTech.repository.EspecificacaoRepository;

@RestController
@RequestMapping("/especificacao")
@CrossOrigin("*")
public class EspecificacaoController {

	@Autowired
	private EspecificacaoRepository especificacaoRepository;
	
	@GetMapping("/listartodos")
	@ResponseStatus(HttpStatus.OK)
	public List<EspecificacaoEntity> listarTodasEspecificacoes(){
		return especificacaoRepository.findAll();	}
	
}
