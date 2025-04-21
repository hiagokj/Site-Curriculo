let itensSalvos = JSON.parse(localStorage.getItem("itens")) || [];

document.getElementById("foto").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const preview = document.getElementById("previewFoto");

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
      preview.style.display = "block";
      preview.classList.remove("preview-hidden");
    };
    reader.readAsDataURL(file);
  }
});

function gerarCurriculo() {
  const camposObrigatorios = [
    "nome",
    "email",
    "telefone",
    "estadoCivil",
    "cidade",
    "bairro",
    "rua",
    "superior",
    "Escolaridade_data"
  ];

  const dados = {};
  let isValid = true;

  // Captura os campos obrigatórios
  camposObrigatorios.forEach((campo) => {
    const element = document.getElementById(campo);
    dados[campo] = element.value.trim();
    if (!element.value.trim()) isValid = false;
  });

  // Captura as experiências dinâmicas
  const experiencias = [];
  document.querySelectorAll("#experiencias-container .experiencia-item").forEach((item) => {
    const cargo = item.querySelector(".Cargo").value.trim();
    const resumo = item.querySelector(".experiencia").value.trim();
    const dataInicio = item.querySelector(".Experiência_data").value.trim();
    const dataTermino = item.querySelector(".Experiência_data_final").value.trim();

    if (cargo && dataInicio) {
      experiencias.push({
        cargo,
        resumo,
        dataInicio,
        dataTermino: dataTermino || null 
        
      });
    }
  });

  if (experiencias.length === 0) {
    isValid = false;
  }

  dados.experiencias = experiencias;

  const fotoInput = document.getElementById("foto");

  if (!isValid || !fotoInput.files[0]) {
    alert("Preencha todos os campos obrigatórios e selecione uma foto!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    dados.foto = e.target.result;
    localStorage.setItem("curriculo", JSON.stringify(dados));
    window.location.href = "curriculo.html";
  };
  reader.readAsDataURL(fotoInput.files[0]);
}

function adicionarExperiencia() {
  const container = document.getElementById("experiencias-container");

  // Cria um novo elemento de experiência profissional
  const novaExperiencia = document.createElement("div");
  novaExperiencia.classList.add("experiencia-item");
  novaExperiencia.innerHTML = `
    <div class="form-group">
      <label>Cargo: </label>
      <input type="text" class="Cargo" />
    </div>
    <div class="form-group">
      <label>Resumo: </label>
      <textarea class="experiencia" rows="10"></textarea>
    </div>
    <div class="form-grid">
      <div class="form-group">
        <label>Data Início*</label>
        <input type="month" class="Experiência_data" required />
      </div>
      <div class="form-group">
        <label>Data Término</label>
        <input type="month" class="Experiência_data_final" />
      </div>
    </div>
    <button type="button" class="btn-excluir" onclick="excluirExperiencia(this)">Excluir</button>
  `;

  // Adiciona o novo formulário ao contêiner
  container.appendChild(novaExperiencia);
}

function excluirExperiencia(botao) {
  const experienciaItem = botao.closest(".experiencia-item");
  experienciaItem.remove();
}