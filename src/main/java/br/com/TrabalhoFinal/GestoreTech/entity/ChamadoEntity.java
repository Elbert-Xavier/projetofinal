package br.com.TrabalhoFinal.GestoreTech.entity;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "chamados")
public class ChamadoEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY )
	private int id;
	
	@NotNull
	private LocalDate dataAbertura = LocalDate.now();
	
	@NotBlank
	private String prioridade;
	
	@NotBlank
	@Size(min = 4, max = 50)
	private String titulo;
	
	@NotBlank
	@Size(min = 4, max = 1500)
	@Column(columnDefinition = "TEXT")
	private String descricao;
	
	@NotBlank
	@Size(min = 4, max = 1500)
	@Column(columnDefinition = "TEXT")
	private String orientacao;
	
	private String urlImagem;
	
	@NotBlank
	private String status;


	@ManyToOne
	@JoinColumn(name = "idEquipamento")
	private EquipamentoEntity equipamento;
	
	@ManyToOne
	@JoinColumn(name = "idUsuarioCliente")
	private UsuarioEntity cliente;
	
	@ManyToOne
	@JoinColumn(name = "idUsuarioTecnico")
	private UsuarioEntity tecnico;

	
	
	public String getOrientacao() {
		return orientacao;
	}

	public void setOrientacao(String orientacao) {
		this.orientacao = orientacao;
	}
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public LocalDate getDataAbertura() {
		return dataAbertura;
	}

	public void setDataAbertura(LocalDate dataAbertura) {
		this.dataAbertura = dataAbertura;
	}

	public String getPrioridade() {
		return prioridade;
	}

	public void setPrioridade(String prioridade) {
		this.prioridade = prioridade;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getUrlImagem() {
		return urlImagem;
	}

	public void setUrlImagem(String urlImagem) {
		this.urlImagem = urlImagem;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public EquipamentoEntity getEquipamento() {
		return equipamento;
	}

	public void setEquipamento(EquipamentoEntity equipamento) {
		this.equipamento = equipamento;
	}

	public UsuarioEntity getCliente() {
		return cliente;
	}

	public void setCliente(UsuarioEntity cliente) {
		this.cliente = cliente;
	}

	public UsuarioEntity getTecnico() {
		return tecnico;
	}

	public void setTecnico(UsuarioEntity tecnico) {
		this.tecnico = tecnico;
	}
	

	
}