package br.com.TrabalhoFinal.GestoreTech.entity;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "movimentacaoPeca")
public class MovimentacaoPecaEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private int id;
	private String tipoMovimentacao;
	private LocalDate dataMovimentacao;
	private int quantidade;
	//Tem que fazer o a ligação aqui👇
	private UsuarioEntity idUsuario;
	//Tem que fazer o a ligação aqui👇
	private EstoqueEntity idEstoque;
	//Tem que fazer o a ligação aqui👇
	private OrdemServicoEntity idOrdemServico;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTipoMovimentacao() {
		return tipoMovimentacao;
	}
	public void setTipoMovimentacao(String tipoMovimentacao) {
		this.tipoMovimentacao = tipoMovimentacao;
	}
	public LocalDate getDataMovimentacao() {
		return dataMovimentacao;
	}
	public void setDataMovimentacao(LocalDate dataMovimentacao) {
		this.dataMovimentacao = dataMovimentacao;
	}
	public int getQuantidade() {
		return quantidade;
	}
	public void setQuantidade(int quantidade) {
		this.quantidade = quantidade;
	}
	public UsuarioEntity getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(UsuarioEntity idUsuario) {
		this.idUsuario = idUsuario;
	}
	public EstoqueEntity getIdEstoque() {
		return idEstoque;
	}
	public void setIdEstoque(EstoqueEntity idEstoque) {
		this.idEstoque = idEstoque;
	}
	public OrdemServicoEntity getIdOrdemServico() {
		return idOrdemServico;
	}
	public void setIdOrdemServico(OrdemServicoEntity idOrdemServico) {
		this.idOrdemServico = idOrdemServico;
	}
	
	

}
