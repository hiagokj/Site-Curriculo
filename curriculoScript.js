function renderizarCurriculo() {
  const dados = JSON.parse(localStorage.getItem("curriculo"));
  const listagem = document.getElementById("Listagem");

  if (!dados) {
    alert("Nenhum currículo encontrado!");
    window.location.href = "index.html";
    return;
  }

  const html = `
      <div class="curriculo-content">
          <img src="${dados.foto}" alt="Foto" class="foto-perfil">
          <div class="dados-pessoais">
              <p><strong>Nome:</strong> ${dados.nome}</p>
              <p><strong>Email:</strong> ${dados.email}</p>
              <p><strong>Telefone:</strong> ${dados.telefone}</p>
              <p><strong>Estado Civil:</strong> ${dados.estadoCivil}</p>
              <p><strong>Endereço:</strong> ${dados.rua}, ${dados.bairro}, ${
    dados.cidade
  }</p>
              <p><strong>Ensino Superior:</strong> ${dados.superior}</p>
          </div>
          <div class="experiencia-box">
              <h3>Experiência Profissional</h3>
              <p>${dados.experiencia.replace(/\n/g, "<br>")}</p>
          </div>
      </div>
  `;

  listagem.innerHTML = html;
}

window.onload = renderizarCurriculo;
