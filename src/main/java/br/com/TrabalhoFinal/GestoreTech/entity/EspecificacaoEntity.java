package br.com.TrabalhoFinal.GestoreTech.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "especificacao")
public class EspecificacaoEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String atributo;
	private String valor;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idEquipamento")
	private EquipamentoEntity equipamento;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getAtributo() {
		return atributo;
	}
	public void setAtributo(String atributo) {
		this.atributo = atributo;
	}
	public String getValor() {
		return valor;
	}
	public void setValor(String valor) {
		this.valor = valor;
	}
	public EquipamentoEntity getEquipamento() {
		return equipamento;
	}
	public void setEquipamento(EquipamentoEntity equipamento) {
		this.equipamento = equipamento;
	}
	
}
