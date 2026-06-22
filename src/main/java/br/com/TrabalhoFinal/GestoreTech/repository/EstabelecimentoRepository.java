package br.com.TrabalhoFinal.GestoreTech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.TrabalhoFinal.GestoreTech.entity.EstabelecimentoEntity;

@Repository
public interface EstabelecimentoRepository extends JpaRepository<EstabelecimentoEntity, Integer> {

	List<EstabelecimentoEntity>findByCnpjUnidadeStartingWith(String cnpj);
	List<EstabelecimentoEntity>findByRazaoSocialContaining(String razao);
	List<EstabelecimentoEntity>findByNomeUnidadeContaining(String nome);
	List<EstabelecimentoEntity>findByClienteId(int idCliente);
}
