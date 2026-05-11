package br.com.TrabalhoFinal.GestoreTech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.TrabalhoFinal.GestoreTech.entity.EquipeChamadoEntity;

@Repository
public interface EquipeChamadoRepository extends JpaRepository<EquipeChamadoEntity, Integer> {

}
