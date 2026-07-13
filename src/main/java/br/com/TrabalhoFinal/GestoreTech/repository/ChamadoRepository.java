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

	List<ChamadoEntity> findByEquipamentoId(Integer equipamentoId);
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

	@Query(value = "SELECT COUNT(*) FROM chamados", nativeQuery = true)
	long contarChamados();
	
	
	@Query(value = "SELECT YEAR(dataAbertura) AS Ano, MONTH(dataAbertura) AS Mes, COUNT(*) AS TotalFinalizados FROM chamados WHERE status = 'finalizado' GROUP BY YEAR(dataAbertura), MONTH(dataAbertura) ORDER BY Ano DESC, Mes DESC;", nativeQuery = true)
	long contarChamadosFinalizados();
	
	@Query("UPDATE ChamadoEntity c SET c.tecnico = null WHERE c.tecnico.id = ?1")
	void setTecnicoNullParaChamadosDoUsuario(int idUsuario);
	
	List<ChamadoEntity> findByStatus(String status);
	List<ChamadoEntity> findByStatusNot(String status);
	List<ChamadoEntity> findByTecnicoId(Integer tecnicoId);
}