package br.com.TrabalhoFinal.GestoreTech.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.TrabalhoFinal.GestoreTech.entity.UsuarioEntity;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Integer> {

	Optional<UsuarioEntity> findByEmail(String email);
}
