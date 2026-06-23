package br.com.TrabalhoFinal.GestoreTech.entity;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ordemServico")
public class OrdemServicoEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private int id;
	private String status;
	private LocalDate dataPevistaBaixa;
	private LocalDate dataBaixa;
	private PecaEntity idPeca;
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
	public LocalDate getDataPevistaBaixa() {
		return dataPevistaBaixa;
	}
	public void setDataPevistaBaixa(LocalDate dataPevistaBaixa) {
		this.dataPevistaBaixa = dataPevistaBaixa;
	}
	public LocalDate getDataBaixa() {
		return dataBaixa;
	}
	public void setDataBaixa(LocalDate dataBaixa) {
		this.dataBaixa = dataBaixa;
	}

	public PecaEntity getIdPeca() {
		return idPeca;
	}
	public void setIdPeca(PecaEntity idPeca) {
		this.idPeca = idPeca;
	}
	
	
	
	

}
