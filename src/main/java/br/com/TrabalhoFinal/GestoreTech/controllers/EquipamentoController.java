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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.TrabalhoFinal.GestoreTech.entity.EquipamentoEntity;
import br.com.TrabalhoFinal.GestoreTech.repository.EquipamentoRepository;

@RestController
@RequestMapping("/equipamentos")
@CrossOrigin("*")
public class EquipamentoController {

	@Autowired
	private EquipamentoRepository equipamentoRepository;
	
	@GetMapping("/pesquisar")
	@ResponseStatus(HttpStatus.OK)
	public List<EquipamentoEntity> pesquisarEquipamentos(
			@RequestParam(value = "numeroSerie", required = false) String numeroSerie,
			@RequestParam(value = "modelo", required = false) String modelo,
			@RequestParam(value = "fabricante", required = false) String fabricante,
			@RequestParam(value = "localizacao", required = false) String localizacao) {
		
		return equipamentoRepository.findByFiltros(numeroSerie, modelo, fabricante, localizacao);
	}

	@GetMapping("/listartodos")
	@ResponseStatus(HttpStatus.OK)
	public List<EquipamentoEntity> ListarTodos() {
	    return equipamentoRepository.findAllByOrderByModeloAsc();
	}
	
	@GetMapping("/listaPorID/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<EquipamentoEntity> ListarEquipamentoPorID(@PathVariable Integer id) {
		return equipamentoRepository.findById(id);
	}
	
	@GetMapping("/listartipo/{tipo}")
	@ResponseStatus(HttpStatus.OK)
	public List<EquipamentoEntity> listarTipo(@PathVariable String tipo){
		return equipamentoRepository.findByTipoContainingIgnoreCase(tipo);
	}
	
	@GetMapping("/listarmarca/{nome}")
	@ResponseStatus(HttpStatus.OK)
	public List<EquipamentoEntity> listarMarca(@PathVariable String nome){
		return equipamentoRepository.findByFabricanteContainingIgnoreCase(nome);
	}
	
	@GetMapping("/listarmodelo/{modelo}")
	@ResponseStatus(HttpStatus.OK)
	public List<EquipamentoEntity> listarModelo(@PathVariable String modelo){
		return equipamentoRepository.findByModeloContainingIgnoreCase(modelo);
	}
	
	@GetMapping("/listarserie/{serie}")
	@ResponseStatus(HttpStatus.OK)
	public List<EquipamentoEntity> listarSerie(@PathVariable String serie){
		return equipamentoRepository.findByNumeroSerieContainingIgnoreCase(serie);
	}
	
	@DeleteMapping("/deletar/{id}")
	public String deletarEquipamento(@PathVariable int id) {
		if(equipamentoRepository.existsById(id)) {
			equipamentoRepository.deleteById(id);
			return "Equipamento excluído com sucesso";
		}
		return "Equipamento não encontrado";
	}
	
	@PostMapping("/salvar")
	@ResponseStatus(HttpStatus.CREATED)
	public EquipamentoEntity salvarEstabelecimento(@RequestBody EquipamentoEntity equipamento) {
		return equipamentoRepository.save(equipamento);
	}
	
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public EquipamentoEntity atualizarEstabelecimento(@RequestBody EquipamentoEntity equipamento, @PathVariable int id) {
		if(equipamentoRepository.existsById(id)) {
			equipamento.setId(id);
			return equipamentoRepository.save(equipamento);
		}
		return null;
	}
}