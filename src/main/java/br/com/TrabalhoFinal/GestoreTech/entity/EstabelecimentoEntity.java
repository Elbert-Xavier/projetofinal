package br.com.TrabalhoFinal.GestoreTech.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "estabelecimento")
public class EstabelecimentoEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idCliente")
	private ClienteEntity cliente;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idEndereco")
	private EnderecoEntity endereco;
	
	private String cnpjUnidade;
	private String razaoSocial;
	private String inscricaoEstadual;
	private boolean isentoIE;
	private String inscricaoMunicipal;
	private String nomeUnidade;
	private LocalTime horaAbertura;
	private LocalTime horaFechamento;
	private String tituloResponsavel;
	private String telefone;
	private String email;
	private LocalDate dataCadastro;
	private String status;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public ClienteEntity getCliente() {
		return cliente;
	}
	public void setCliente(ClienteEntity cliente) {
		this.cliente = cliente;
	}
	public EnderecoEntity getEndereco() {
		return endereco;
	}
	public void setEndereco(EnderecoEntity endereco) {
		this.endereco = endereco;
	}
	public String getCnpjUnidade() {
		return cnpjUnidade;
	}
	public void setCnpjUnidade(String cnpjUnidade) {
		this.cnpjUnidade = cnpjUnidade;
	}
	public String getInscricaoEstadual() {
		return inscricaoEstadual;
	}
	public void setInscricaoEstadual(String inscricaoEstadual) {
		this.inscricaoEstadual = inscricaoEstadual;
	}
	public boolean isIsentoIE() {
		return isentoIE;
	}
	public void setIsentoIE(boolean isentoIE) {
		this.isentoIE = isentoIE;
	}
	public String getInscricaoMunicipal() {
		return inscricaoMunicipal;
	}
	public void setInscricaoMunicipal(String inscricaoMunicipal) {
		this.inscricaoMunicipal = inscricaoMunicipal;
	}
	public String getNomeUnidade() {
		return nomeUnidade;
	}
	public void setNomeUnidade(String nomeUnidade) {
		this.nomeUnidade = nomeUnidade;
	}
	public LocalTime getHoraAbertura() {
		return horaAbertura;
	}
	public void setHoraAbertura(LocalTime horaAbertura) {
		this.horaAbertura = horaAbertura;
	}
	public LocalTime getHoraFechamento() {
		return horaFechamento;
	}
	public void setHoraFechamento(LocalTime horaFechamento) {
		this.horaFechamento = horaFechamento;
	}
	public String getTituloResponsavel() {
		return tituloResponsavel;
	}
	public void setTituloResponsavel(String tituloResponsavel) {
		this.tituloResponsavel = tituloResponsavel;
	}
	public String getTelefone() {
		return telefone;
	}
	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public LocalDate getDataCadastro() {
		return dataCadastro;
	}
	public void setDataCadastro(LocalDate dataCadastro) {
		this.dataCadastro = dataCadastro;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getRazaoSocial() {
		return razaoSocial;
	}
	public void setRazaoSocial(String razaoSocial) {
		this.razaoSocial = razaoSocial;
	}
	
	
	
	
	
}
