package br.com.TrabalhoFinal.GestoreTech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.TrabalhoFinal.GestoreTech.entity.EquipamentoEntity;

@Repository
public interface EquipamentoRepository extends JpaRepository<EquipamentoEntity, Integer> {

	List<EquipamentoEntity> findAllByOrderByModeloAsc();

	

	/*List<EquipamentoEntity>findByNomeContainingIgnoreCase(String nome);
	List<EquipamentoEntity>findByTipoContainingIgnoreCase(String tipo);
	List<EquipamentoEntity>findByFabricanteContainingIgnoreCase(String marca);
	List<EquipamentoEntity>findByModeloContainingIgnoreCase(String modelo);
	List<EquipamentoEntity>findByNumeroSerieContainingIgnoreCase(String numeroSerie);
	List<EquipamentoEntity> findAllByOrderByNomeAsc();

*/
}