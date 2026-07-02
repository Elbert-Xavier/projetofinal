package br.com.TrabalhoFinal.GestoreTech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.TrabalhoFinal.GestoreTech.entity.EquipamentoEntity;

@Repository
public interface EquipamentoRepository extends JpaRepository<EquipamentoEntity, Integer> {

	List<EquipamentoEntity> findAllByOrderByModeloAsc();
	List<EquipamentoEntity> findByTipoContainingIgnoreCase(String tipo);
	List<EquipamentoEntity> findByFabricanteContainingIgnoreCase(String marca);
	List<EquipamentoEntity> findByModeloContainingIgnoreCase(String modelo);
	List<EquipamentoEntity> findByNumeroSerieContainingIgnoreCase(String numeroSerie);

	@Query("SELECT e FROM EquipamentoEntity e WHERE " +
	       "(:numeroSerie IS NULL OR :numeroSerie = '' OR LOWER(e.numeroSerie) LIKE LOWER(CONCAT('%', :numeroSerie, '%'))) " +
	       "AND (:modelo IS NULL OR :modelo = '' OR LOWER(e.modelo) LIKE LOWER(CONCAT('%', :modelo, '%'))) " +
	       "AND (:fabricante IS NULL OR :fabricante = '' OR LOWER(e.fabricante) LIKE LOWER(CONCAT('%', :fabricante, '%'))) " +
	       "AND (:observacoes IS NULL OR :observacoes = '' OR LOWER(e.observacoes) LIKE LOWER(CONCAT('%', :observacoes, '%'))) " +
	       "ORDER BY e.modelo ASC")
	List<EquipamentoEntity> findByFiltros(
	    @Param("numeroSerie") String numeroSerie, 
	    @Param("modelo") String modelo, 
	    @Param("fabricante") String fabricante,
	    @Param("observacoes") String observacoes
	);
}