package br.com.TrabalhoFinal.GestoreTech.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "listaPecas")
public class ListaPecasEntity implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private int id;
	private int quantidade;
	//Tem que fazer o a ligação aqui👇
	private PecaEntity idPeca;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getQuantidade() {
		return quantidade;
	}
	public void setQuantidade(int quantidade) {
		this.quantidade = quantidade;
	}
	public PecaEntity getIdPeca() {
		return idPeca;
	}
	public void setIdPeca(PecaEntity idPeca) {
		this.idPeca = idPeca;
	}
	
	
	
}
