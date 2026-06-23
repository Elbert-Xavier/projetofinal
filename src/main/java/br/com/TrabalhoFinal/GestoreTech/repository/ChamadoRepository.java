package br.com.TrabalhoFinal.GestoreTech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.TrabalhoFinal.GestoreTech.entity.ChamadoEntity;

@Repository
public interface ChamadoRepository extends JpaRepository<ChamadoEntity, Integer>{

	List<ChamadoEntity> findAllByOrderByPrioridadeDesc();
	List<ChamadoEntity> findByPrioridade(int prioridade);
	
}
