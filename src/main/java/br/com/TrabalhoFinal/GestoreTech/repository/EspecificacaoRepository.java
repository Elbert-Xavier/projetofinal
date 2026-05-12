package br.com.TrabalhoFinal.GestoreTech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.TrabalhoFinal.GestoreTech.entity.EspecificacaoEntity;

@Repository
public interface EspecificacaoRepository extends JpaRepository<EspecificacaoEntity, Integer> {

}
