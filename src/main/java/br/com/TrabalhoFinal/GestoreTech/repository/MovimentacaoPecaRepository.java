package br.com.TrabalhoFinal.GestoreTech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.TrabalhoFinal.GestoreTech.entity.MovimentacaoPecaEntity;

@Repository
public interface MovimentacaoPecaRepository extends JpaRepository<MovimentacaoPecaEntity, Integer> {

}
