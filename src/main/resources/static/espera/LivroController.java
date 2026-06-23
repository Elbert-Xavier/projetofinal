package br.com.empresa18.integracao.bibliotecaestantemagica.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.empresa18.integracao.bibliotecaestantemagica.entity.LivroEntity;
import br.com.empresa18.integracao.bibliotecaestantemagica.repository.LivroRepository;

@RestController
@RequestMapping("/livros")
@CrossOrigin("*")
public class LivroController {
	
	@Autowired
	private LivroRepository livroRepo;
	
	@GetMapping("/listartodos")
	@ResponseStatus(HttpStatus.OK)
	public List< LivroEntity> listarAluno(){
		return livroRepo.findAll();
	}

	@GetMapping("/listarid/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<LivroEntity> listarPorId (@PathVariable Long id){
		return livroRepo.findById(id);
	}
	
	@PostMapping("/salvar")
	@ResponseStatus(HttpStatus.CREATED)
	public LivroEntity cadsatrar (@RequestParam String titulo, 
								  @RequestParam String autor, 
								  @RequestParam String editora, 
								  @RequestParam MultipartFile imagem, 
								  @RequestParam int anoPublicacao, 
								  @RequestParam String isbn, 
								  @RequestParam String genero, 
								  @RequestParam String codigoAcervo, 
								  @RequestParam long estoque) throws IOException {
		
   	 	// Gerar um nome único para o arquivo usando UUID
		
        String nomeArquivo = UUID.randomUUID()
                + "_"
                + imagem.getOriginalFilename();

        // Definir o caminho onde o arquivo será salvo
        Path caminho = Paths.get(
                "C:/Users/Acesso Livre/Documents/uploads" + nomeArquivo
        );
        
        // Salvar o arquivo no caminho definido
        Files.write(caminho, imagem.getBytes());
        
        LivroEntity livro = new LivroEntity();
		livro.setTitulo(titulo);
		livro.setAutor(autor);
		livro.setEditora(editora);
		livro.setImagem(nomeArquivo); // Salvar o nome do arquivo no banco de dados
		livro.setAnoPublicacao(anoPublicacao);
		livro.setIsbn(isbn);			
		livro.setGenero(genero);
		livro.setCodigoAcervo(codigoAcervo);
		livro.setEstoque(estoque);
		

		return livroRepo.save(livro);
	}
	
	@DeleteMapping("/deletar/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public String deletar (@PathVariable long id) {
		
		if(livroRepo.existsById(id)) {
			livroRepo.deleteById(id);
			return"Livro deletado";
		}
		return"Não";
	}
	
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public LivroEntity atualizarTabela (@PathVariable long id,@RequestParam String titulo,
			  @RequestParam String autor, 
			  @RequestParam String editora, 
			  @RequestParam MultipartFile imagem, 
			  @RequestParam int anoPublicacao, 
			  @RequestParam String isbn, 
			  @RequestParam String genero, 
			  @RequestParam String codigoAcervo, 
			  @RequestParam long estoque) throws IOException {

	// Gerar um nome único para o arquivo usando UUID
	
	String nomeArquivo = UUID.randomUUID()
	+ "_"
	+ imagem.getOriginalFilename();
	
	// Definir o caminho onde o arquivo será salvo
	Path caminho = Paths.get(
	"C:/Users/Acesso Livre/Documents/uploads/" + nomeArquivo
	);
	
	// Salvar o arquivo no caminho definido
	Files.write(caminho, imagem.getBytes());
	
	LivroEntity livro = new LivroEntity();
	livro.setTitulo(titulo);
	livro.setAutor(autor);
	livro.setEditora(editora);
	livro.setImagem(nomeArquivo); // Salvar o nome do arquivo no banco de dados
	livro.setAnoPublicacao(anoPublicacao);
	livro.setIsbn(isbn);			
	livro.setGenero(genero);
	livro.setCodigoAcervo(codigoAcervo);
	livro.setEstoque(estoque);
	
	
	if(livroRepo.existsById(id)) {
		

		if(livroRepo.existsById(id)) {
			livro.setId(id);
			
			return livroRepo.save(livro);
		}
	

		return livroRepo.save(livro);

	}
	
	
	return null;
	
	} 
	
	// disponibilidade
	@GetMapping("/disponibilidade/{id}")
	public String verificarDisponibilidade(@PathVariable Long id) {

	    LivroEntity livro = livroRepo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Livro não encontrado"));

	    if(livro.isDisponivel()) {
	        return "Livro disponível";
	    }

	    return "Livro indisponível";
	}
    
    //reserva livro
	@PostMapping("/reservar/{id}")
	public String reservarLivro(@PathVariable Long id) {

	    LivroEntity livro = livroRepo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Livro não encontrado"));

	    if(livro.isDisponivel()) {

	        livro.setDisponivel(false);

	        livroRepo.save(livro);

	        return "Livro reservado com sucesso";
	    }

	    return "Livro já reservado";
	}
	
	@PostMapping("/devolver/{id}")
	public String devolverLivro(@PathVariable Long id) {

	    LivroEntity livro = livroRepo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Livro não encontrado"));

	    livro.setDisponivel(true);

	    livroRepo.save(livro);

	    return "Livro devolvido";
	}
}
