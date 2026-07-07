package br.com.TrabalhoFinal.GestoreTech.controllers;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import br.com.TrabalhoFinal.GestoreTech.entity.EquipamentoEntity;
import br.com.TrabalhoFinal.GestoreTech.repository.EquipamentoRepository;
import br.com.TrabalhoFinal.GestoreTech.repository.ClienteRepository;

@RestController
@RequestMapping("/equipamentos")
@CrossOrigin("*")
public class EquipamentoController {

	@Autowired
	private EquipamentoRepository equipamentoRepository;
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	@GetMapping("/pesquisar")
	@ResponseStatus(HttpStatus.OK)
	public List<EquipamentoEntity> pesquisarEquipamentos(
			@RequestParam(value = "clienteId") Integer clienteId,
			@RequestParam(value = "numeroSerie", required = false) String numeroSerie,
			@RequestParam(value = "modelo", required = false) String modelo,
			@RequestParam(value = "fabricante", required = false) String fabricante,
			@RequestParam(value = "localizacao", required = false) String localizacao) {
		
		return equipamentoRepository.findByFiltros(clienteId, numeroSerie, modelo, fabricante, localizacao);
	}

	@PostMapping("/salvar")
	@ResponseStatus(HttpStatus.CREATED)
	public EquipamentoEntity salvarEstabelecimento(
			@RequestParam(value = "clienteId") Integer clienteId, 
			@RequestBody EquipamentoEntity equipamento) {
		
		return clienteRepository.findById(clienteId).map(cliente -> {
			equipamento.setCliente(cliente);
			return equipamentoRepository.save(equipamento);
		}).orElse(null);
	}
	@PostMapping("/salvarNormal")
	@ResponseStatus(HttpStatus.CREATED)
	public EquipamentoEntity salvar(@RequestBody EquipamentoEntity equipamento) {
		return equipamentoRepository.save(equipamento);
	}

	@GetMapping("/listarTodos")
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