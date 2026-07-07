package br.com.TrabalhoFinal.GestoreTech.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.redis.RedisProperties.Lettuce;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

import br.com.TrabalhoFinal.GestoreTech.entity.UsuarioEntity;
import br.com.TrabalhoFinal.GestoreTech.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin("*")
public class UsuarioController {
	
	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private BCryptPasswordEncoder encoder;
	@Autowired
	private EmailController emailService;
	
	@GetMapping("/listarTodos")
	@ResponseStatus(HttpStatus.OK)
	public List<UsuarioEntity> ListarTodosUsuario() {
		return usuarioRepository.findAll();
	}
	@GetMapping("/listarPorID/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<UsuarioEntity> ListarTodosUsuario(@PathVariable Integer id) {
		return usuarioRepository.findById(id);
	}
	@GetMapping("/listarPorNome/{nome}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<UsuarioEntity> ListarTodosUsuario(@PathVariable String nome) {
		return usuarioRepository.findByNome(nome);
	}
	@GetMapping("/listarTecnicos")
	@ResponseStatus(HttpStatus.OK)
	public List<UsuarioEntity> ListarTodosTecnicos() {
		return usuarioRepository.findAllTecnicos();
	}
	@GetMapping("/listarTecnicosNome/{nome}")
	@ResponseStatus(HttpStatus.OK)
	public List<UsuarioEntity> ListarTodosTecnicos(@PathVariable String nome) {
		return usuarioRepository.findTecnicobyNome(nome);
	}
	
	@PostMapping("/salvar")
	@ResponseStatus(HttpStatus.OK)
	public UsuarioEntity salvar(@RequestBody UsuarioEntity usuario) {
		usuario.setSenha(encoder.encode(usuario.getSenha()));
		return usuarioRepository.save(usuario);
	}
	@PostMapping("/salvarTecnico")
	@ResponseStatus(HttpStatus.OK)
	public UsuarioEntity salvarTecnicoPrimeiroLogin(@RequestBody UsuarioEntity usuario) {	
		String senha = UUID.randomUUID().toString();
		senha = senha.substring(0, 7);
		emailService.enviarEmailConta(usuario.getEmail(), senha.substring(0, 7));
		usuario.setTipoUsuario("TECNICO");
		usuario.setCpf("955.386.120-23");
		usuario.setCargo("indefinido");
		usuario.setPrimeiroLogin(true);
		usuario.setAdmin(false);
		usuario.setDataCadastro(LocalDate.now());
		usuario.setSenha(encoder.encode(senha));
		return usuarioRepository.save(usuario);
	}
	@PostMapping("/salvarCliente")
	@ResponseStatus(HttpStatus.OK)
	public UsuarioEntity salvarClientePrimeiroLogin(@RequestBody UsuarioEntity usuario) {	
		String senha = UUID.randomUUID().toString();
		senha = senha.substring(0, 7);
		emailService.enviarEmailConta(usuario.getEmail(), senha.substring(0, 7));
		usuario.setTipoUsuario("CLIENTE");
		usuario.setCpf("null");
		usuario.setCargo("indefinido");
		usuario.setPrimeiroLogin(true);
		usuario.setAdmin(true);
		usuario.setDataCadastro(LocalDate.now());
		usuario.setSenha(encoder.encode(senha));
		return usuarioRepository.save(usuario);
	}
	@PostMapping("/atualizarPrimeiroLogin/{id}")
	@ResponseStatus(HttpStatus.OK)
	public UsuarioEntity AtualizarTecnicoPrimeiroLogin(@RequestBody UsuarioEntity usuario,@PathVariable Integer id) {	
		if (usuarioRepository.existsById(id)) {
			usuario.setId(id);
			usuario.setPrimeiroLogin(false);
			usuario.setDataCadastro(LocalDate.now());
			usuario.setSenha(encoder.encode(usuario.getSenha()));
			return usuarioRepository.save(usuario);
		}return null;
	}
	
	@PostMapping("/salvarGestor")
	@ResponseStatus(HttpStatus.OK)
	public UsuarioEntity salvarGestorInicial(@RequestBody UsuarioEntity gestor) {
		gestor.setTipoUsuario("gestor");
		return usuarioRepository.save(gestor);
	}
	
	@PostMapping("/login")
	public ResponseEntity<UsuarioEntity> login(
	        @RequestBody UsuarioEntity usuarioLogin) {
	    // busca usuário por email
	    Optional<UsuarioEntity> usuario =
	    		usuarioRepository.findByEmail(usuarioLogin.getEmail());
	    // se encontrou usuário, verifica senha
	    if (usuario.isPresent()) {

	        UsuarioEntity usuarioEncontrado = usuario.get();
	        if (encoder.matches(
	                usuarioLogin.getSenha(),
	                usuarioEncontrado.getSenha())) {

	            return ResponseEntity.ok(usuarioEncontrado);
	        }
	    }
	    return ResponseEntity.status(401).build();
	}
	@GetMapping("/BuscarPorEmail/{email}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<UsuarioEntity>BuscarEmaildeUsuario(@PathVariable String email){
		return usuarioRepository.findByEmail(email);
	}
	@PutMapping("/novaSenha/{novasenha}/{confirmacao}")
	public UsuarioEntity NovaSenhaUsuario(@PathVariable String novasenha,@PathVariable String confirmacao,@RequestBody UsuarioEntity Usuario) {
		if (novasenha.equals(confirmacao)) {
			Usuario.setSenha(encoder.encode(confirmacao));
			return usuarioRepository.save(Usuario);
		}else {
			return null;
		}
	}
	@DeleteMapping("/deletar/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public String DeletarUsuario(@PathVariable Integer id) {
		if (usuarioRepository.existsById(id)) {
			usuarioRepository.deleteById(id);
			return"Usuario Deletado";
		}
			return"Usuario Nao Encontrado";
	}
}
