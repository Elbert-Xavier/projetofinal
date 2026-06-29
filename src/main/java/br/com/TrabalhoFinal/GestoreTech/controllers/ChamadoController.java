package br.com.TrabalhoFinal.GestoreTech.controllers;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
import org.springframework.web.multipart.MultipartFile;

import br.com.TrabalhoFinal.GestoreTech.entity.ChamadoEntity;
import br.com.TrabalhoFinal.GestoreTech.entity.EquipamentoEntity;
import br.com.TrabalhoFinal.GestoreTech.repository.ChamadoRepository;

@RestController
@RequestMapping("/chamados")
@CrossOrigin("*")
public class ChamadoController {

	@Autowired
	private ChamadoRepository chamadoRepository;
	
	@GetMapping("/listartodos")
	@ResponseStatus(HttpStatus.OK)
	public List<ChamadoEntity> listarTodosChamados(){
		return chamadoRepository.findAll();
	}
	@GetMapping("/listarPorID/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<ChamadoEntity> listarTodosChamadosPorID(@PathVariable int id){
		return chamadoRepository.findById(id);
	}
	
	/*@GetMapping("/listarporestabelecimento/{idEstabelecimento)")
	@ResponseStatus(HttpStatus.OK)
	public List<ChamadoEntity> listarPorEstabelecimento(@PathVariable int idEstabelecimento){
		return chamadoRepository.findByEquipamentoEstabelecimentoId(idEstabelecimento);
	}
	@GetMapping("/listarporcliente/{idCliente}")
	@ResponseStatus(HttpStatus.OK)
	public List<ChamadoEntity> listarPorCliente(@PathVariable int idCliente){
		return chamadoRepository.findByEquipamentoEstabelecimentoClienteId(idCliente);
	}
	@GetMapping("/ordenarprioridade")
	@ResponseStatus(HttpStatus.OK)
	public List<ChamadoEntity> ordenarPorPriodidade(){
		return chamadoRepository.findAllByOrderByPrioridadeDesc();
	}
	@GetMapping("/listarporprioridade")
	@ResponseStatus(HttpStatus.OK)
	public List<ChamadoEntity> listarPorPrioridade(int prioridade){
		return chamadoRepository.findByPrioridade(prioridade);
	}
	*/
	@DeleteMapping("/deletar/{id}")
	public String encerrarChamado(@PathVariable int id) {
		if(chamadoRepository.existsById(id)) {
			chamadoRepository.deleteById(id);
			return "Chamado encerrado";
		}return "Chamado não encontrado";
	}
	@PostMapping("/salvar")
	@ResponseStatus(HttpStatus.CREATED)
	public ChamadoEntity salvarChamado(@RequestParam String titulo,
									   @RequestParam String descricao,
									   @RequestParam EquipamentoEntity equipamento,
									   @RequestParam MultipartFile urlImagem) throws IOException {
		
        String nomeArquivo = UUID.randomUUID()
                + "_"
                + urlImagem.getOriginalFilename();

        Path caminho = Paths.get(
                "//SC-ALPHA/deploy/gestoretech/img/" + nomeArquivo
        );
        
        Files.write(caminho, urlImagem.getBytes());
        
        ChamadoEntity chamado = new ChamadoEntity();
        chamado.setDataAbertura(LocalDate.now());
        chamado.setPrioridade("indefinido");
        chamado.setTitulo(titulo);
        chamado.setDescricao(descricao);
        chamado.setUrlImagem(nomeArquivo);
        chamado.setStatus("pendente");
        chamado.setEquipamento(equipamento);
		

		return chamadoRepository.save(chamado);
	}
	
	@PutMapping("/atualizar")
	@ResponseStatus(HttpStatus.OK)
	public ChamadoEntity atualizarChamado(@RequestBody ChamadoEntity chamado, @PathVariable int id) {
		if(chamadoRepository.existsById(id)) {
			chamado.setId(id);
			return chamadoRepository.save(chamado);
		}return null;
	}
	
	
}
