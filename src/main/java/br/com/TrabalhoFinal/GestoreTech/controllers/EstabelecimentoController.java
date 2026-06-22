package br.com.TrabalhoFinal.GestoreTech.controllers;

import java.util.List;

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

import br.com.TrabalhoFinal.GestoreTech.entity.EstabelecimentoEntity;
import br.com.TrabalhoFinal.GestoreTech.repository.EstabelecimentoRepository;

@RestController
@RequestMapping("/estabelecimentos")
@CrossOrigin("*")
public class EstabelecimentoController {

	@Autowired
	private EstabelecimentoRepository estabelecimentoRepository;
	
	@GetMapping("/listarcnpj/{cnpj}")
	@ResponseStatus(HttpStatus.OK)
	public List<EstabelecimentoEntity> listarCnpj(@PathVariable String cnpj){
		return estabelecimentoRepository.findByCnpjUnidadeStartingWith(cnpj);
	}
	@GetMapping("/listarrazaosocial/{razao}")
	@ResponseStatus(HttpStatus.OK)
	public List<EstabelecimentoEntity> listarRazao(@PathVariable String razao){
		return estabelecimentoRepository.findByRazaoSocialContaining(razao);
	}
	@GetMapping("/listarnome/{nome}")
	@ResponseStatus(HttpStatus.OK)
	public List<EstabelecimentoEntity> listarNome(@PathVariable String nome){
		return estabelecimentoRepository.findByNomeUnidadeContaining(nome);
	}
	@GetMapping("/listarcliente/{idCliente}")
	public List<EstabelecimentoEntity> listarPorCliente(@PathVariable int idCliente){
		return estabelecimentoRepository.findByClienteId(idCliente);
	}
	
	@DeleteMapping("/deletar/{id}")
	public String deletarEstabelecimento(@PathVariable int id) {
		if(estabelecimentoRepository.existsById(id)) {
			estabelecimentoRepository.deleteById(id);
			return "Estabelecimento excluído com sucesso";
		}return "Estabelecimento não encontrado";
	}
	@PostMapping("/salvar")
	@ResponseStatus(HttpStatus.CREATED)
	public EstabelecimentoEntity salvarEstabelecimento(@RequestBody EstabelecimentoEntity estabelecimento) {
		return estabelecimentoRepository.save(estabelecimento);
	}
	@PutMapping("/atualizar")
	@ResponseStatus(HttpStatus.OK)
	public EstabelecimentoEntity atualizarEstabelecimento(@RequestBody EstabelecimentoEntity estabelecimento, @PathVariable int id) {
		if(estabelecimentoRepository.existsById(id)) {
			estabelecimento.setId(id);
			return estabelecimentoRepository.save(estabelecimento);
			
		}return null;
	}
}
