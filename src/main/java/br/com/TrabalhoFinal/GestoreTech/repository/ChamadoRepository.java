package br.com.TrabalhoFinal.GestoreTech.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.TrabalhoFinal.GestoreTech.entity.ChamadoEntity;

@Repository
public interface ChamadoRepository extends JpaRepository<ChamadoEntity, Integer> {


	List<ChamadoEntity> findAllByOrderByDataAberturaDesc();
	

	@Query("SELECT c FROM ChamadoEntity c WHERE " +
	       "(:clienteId IS NULL OR c.equipamento.cliente.id = :clienteId) AND " +
	       "(:status = '' OR :status IS NULL OR c.status = :status) AND " +
	       "(:equipamento = '' OR :equipamento IS NULL OR LOWER(c.equipamento.tipo) LIKE LOWER(CONCAT('%', :equipamento, '%'))) AND " +
	       "(:fabricante = '' OR :fabricante IS NULL OR LOWER(c.equipamento.fabricante) LIKE LOWER(CONCAT('%', :fabricante, '%'))) AND " +
	       "(CAST(:dataInicio AS date) IS NULL OR c.dataAbertura >= :dataInicio) AND " +
	       "(CAST(:dataFim AS date) IS NULL OR c.dataAbertura <= :dataFim) " +
	       "ORDER BY c.dataAbertura DESC")
	List<ChamadoEntity> encontrarPorFiltros(
	        @Param("clienteId") Integer clienteId,
	        @Param("status") String status,
	        @Param("equipamento") String equipamento,
	        @Param("fabricante") String fabricante,
	        @Param("dataInicio") LocalDate dataInicio,
	        @Param("dataFim") LocalDate dataFim
	); 
}