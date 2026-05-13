package br.com.TrabalhoFinal.GestoreTech.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
	
	@GetMapping("/listarTodos")
	@ResponseStatus(HttpStatus.OK)
	public List<UsuarioEntity> ListarTodosUsuario() {
		return usuarioRepository.findAll();
	}
	
	@PostMapping("/salvar")
	@ResponseStatus(HttpStatus.OK)
	public UsuarioEntity salvar(@RequestBody UsuarioEntity usuario) {
		usuario.setSenha(encoder.encode(usuario.getSenha()));
		return usuarioRepository.save(usuario);
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
	        // compara senha enviada com senha armazenada (hash)
	        if (encoder.matches(
	                usuarioLogin.getSenha(),
	                usuarioEncontrado.getSenha())) {

	            return ResponseEntity.ok(usuarioEncontrado);
	        }
	    }
	    // se não encontrou usuário ou senha não bate, retorna 401
	    return ResponseEntity.status(401).build();
	}
}
