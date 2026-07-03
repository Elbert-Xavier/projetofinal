package br.com.TrabalhoFinal.GestoreTech.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.TrabalhoFinal.GestoreTech.entity.UsuarioEntity;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Integer> {

	Optional<UsuarioEntity> findByEmail(String email);
	Optional<UsuarioEntity> findByNome(String nome);
	@Query(value = "SELECT * FROM usuario WHERE tipoUsuario = 'TECNICO'", nativeQuery = true)
	List<UsuarioEntity> findAllTecnicos();
	@Query(value = "SELECT * FROM usuario WHERE tipoUsuario = 'TECNICO' AND LOWER(nome) LIKE LOWER(CONCAT('%', :nome, '%'))", nativeQuery = true)
	List<UsuarioEntity>findTecnicobyNome(@Param("nome") String nome);
}
