package br.com.TrabalhoFinal.GestoreTech.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import br.com.TrabalhoFinal.GestoreTech.entity.ClienteEntity;

@Repository
public interface ClienteRepository extends JpaRepository<ClienteEntity, Integer> { // Ajustado para Integer

    @Query("SELECT c FROM ClienteEntity c WHERE " +
           "(:search IS NULL OR :search = '' OR LOWER(c.razaoSocial) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(c.nomeFantasia) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR c.cnpj LIKE CONCAT('%', :search, '%')) " +
           "AND (:cidade IS NULL OR :cidade = '' OR LOWER(c.cidade) LIKE LOWER(CONCAT('%', :cidade, '%'))) " +
           "AND (:estado IS NULL OR :estado = '' OR c.estado = :estado) " +
           "ORDER BY c.razaoSocial ASC")
    List<ClienteEntity> findByFiltros(
        @Param("search") String search, 
        @Param("cidade") String cidade, 
        @Param("estado") String estado
    );
}