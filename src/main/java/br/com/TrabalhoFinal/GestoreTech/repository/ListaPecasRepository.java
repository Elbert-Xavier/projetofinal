package br.com.TrabalhoFinal.GestoreTech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.TrabalhoFinal.GestoreTech.entity.ListaPecasEntity;

@Repository
public interface ListaPecasRepository extends JpaRepository<ListaPecasEntity, Integer> {

}
