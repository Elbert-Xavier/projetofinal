package br.com.TrabalhoFinal.GestoreTech.entity;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "RequisicaoPeca")
public class RequisicaoPecaEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	private int id;
	private String status;
	private LocalDate dataSolicitacao;
	private LocalDate dataAprovacao;
	private String tipoRequisicao;
	private String observacao;
	private ListaPecasEntity idListaPecas;
	private UsuarioEntity idUsuario;
	//private ChamadoEntity idChamado;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public LocalDate getDataSolicitacao() {
		return dataSolicitacao;
	}
	public void setDataSolicitacao(LocalDate dataSolicitacao) {
		this.dataSolicitacao = dataSolicitacao;
	}
	public LocalDate getDataAprovacao() {
		return dataAprovacao;
	}
	public void setDataAprovacao(LocalDate dataAprovacao) {
		this.dataAprovacao = dataAprovacao;
	}
	public String getTipoRequisicao() {
		return tipoRequisicao;
	}
	public void setTipoRequisicao(String tipoRequisicao) {
		this.tipoRequisicao = tipoRequisicao;
	}
	public String getObservacao() {
		return observacao;
	}
	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}
	public ListaPecasEntity getIdListaPecas() {
		return idListaPecas;
	}
	public void setIdListaPecas(ListaPecasEntity idListaPecas) {
		this.idListaPecas = idListaPecas;
	}
	public UsuarioEntity getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(UsuarioEntity idUsuario) {
		this.idUsuario = idUsuario;
	}

	
}
