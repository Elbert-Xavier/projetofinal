package br.com.TrabalhoFinal.GestoreTech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.TrabalhoFinal.GestoreTech.entity.RequisicaoPecaEntity;

@Repository
public interface RequisicaoPecaRepository extends JpaRepository<RequisicaoPecaEntity, Integer> {

}
