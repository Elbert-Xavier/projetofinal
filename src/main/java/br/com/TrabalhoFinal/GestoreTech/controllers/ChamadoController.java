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
import br.com.TrabalhoFinal.GestoreTech.entity.UsuarioEntity;
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
	@GetMapping("/contarChamados")
	@ResponseStatus(HttpStatus.OK)
	public long contarChamados() {
	    return chamadoRepository.contarChamados();
	}
	@GetMapping("/contarChamadosFinalizados")
	@ResponseStatus(HttpStatus.OK)
	public long contarChamadosFinalizados() {
	    return chamadoRepository.contarChamadosFinalizados();
	}
	@GetMapping("/ListarChamadoStatus")
	@ResponseStatus(HttpStatus.OK)
	public List<ChamadoEntity> listarChamadosAbertos() {
	    return chamadoRepository.findByStatus("ABERTO");
	}
	@GetMapping("/ListarChamadoMenosAberto")
	@ResponseStatus(HttpStatus.OK)
	public List<ChamadoEntity> listarChamadosMenosAbertos() {
	    return chamadoRepository.findByStatusNot("ABERTO");
	}
	@GetMapping("/listarPorID/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<ChamadoEntity> listarTodosChamadosPorID(@PathVariable int id){
		return chamadoRepository.findById(id);
	}
	@GetMapping("/listarTecnicoPorID/{id}")
	@ResponseStatus(HttpStatus.OK)
	public List<ChamadoEntity> listarTodosTecnicoPorID(@PathVariable int id){
		return chamadoRepository.findByTecnicoId(id);
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
	@PostMapping("/salvar")
	@ResponseStatus(HttpStatus.CREATED)
	public ChamadoEntity salvarChamado(@RequestParam UsuarioEntity cliente,
									   @RequestParam String titulo,
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
        chamado.setPrioridade("em analise");
        chamado.setOrientacao("nao Definido");
        chamado.setTitulo(titulo);
        chamado.setDescricao(descricao);
        chamado.setUrlImagem(nomeArquivo);
        chamado.setStatus("ABERTO");
        chamado.setEquipamento(equipamento);
        chamado.setCliente(cliente);
		

		return chamadoRepository.save(chamado);
	}
	@PostMapping("/salvarNormal")
	@ResponseStatus(HttpStatus.CREATED)
	public ChamadoEntity SalvarNormal(@RequestBody ChamadoEntity chamados) {
		return chamadoRepository.save(chamados);
	}
	
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ChamadoEntity atualizarChamado(@RequestBody ChamadoEntity chamado, @PathVariable int id) {
		if(chamadoRepository.existsById(id)) {
			chamado.setId(id);
			return chamadoRepository.save(chamado);
		}return null;
	}
	@PutMapping("/atribuir/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ChamadoEntity atribuirTecnicoEPrioridade(
			@PathVariable int id,
			@RequestParam String prioridade,
			@RequestParam int idTecnico,
			@RequestParam(required = false) String orientacoes) {
		
		return chamadoRepository.findById(id).map(chamado -> {
			chamado.setPrioridade(prioridade);
			chamado.setStatus("ATRIBUIDO");
			
			if (orientacoes != null && !orientacoes.trim().isEmpty()) {
				chamado.setDescricao(chamado.getDescricao() + " [Orientação Gestor: " + orientacoes + "]");
			}
			
			br.com.TrabalhoFinal.GestoreTech.entity.UsuarioEntity tecnico = new br.com.TrabalhoFinal.GestoreTech.entity.UsuarioEntity();
			tecnico.setId(idTecnico);
			chamado.setTecnico(tecnico);
			
			return chamadoRepository.save(chamado);
		}).orElse(null);
	}
	@DeleteMapping("/deletar/{id}")
	public String encerrarChamado(@PathVariable int id) {
		if(chamadoRepository.existsById(id)) {
			chamadoRepository.deleteById(id);
			return "Chamado encerrado";
		}return "Chamado não encontrado";
	}
}

