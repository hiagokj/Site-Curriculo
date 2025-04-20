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
    "experiencia",
    "Cargo",
    "Escolaridade_data",
    "Experiência_data"
  ];

  const camposOpcionais = [
    "Escolaridade_data_final",
    "Experiência_data_final"
  ];
  const dados = {};
  let isValid = true;

  camposObrigatorios.forEach((campo) => {
    const element = document.getElementById(campo);
    dados[campo] = element.value.trim();
    if (!element.value.trim()) isValid = false;
  });

  camposOpcionais.forEach((campo) => {
    const element = document.getElementById(campo);
    const valor = element.value.trim();
    if (valor) {
      dados[campo] = valor;
    }
  });

  const fotoInput = document.getElementById("foto");

  if (!isValid || !fotoInput.files[0]) {
    alert("Preencha todos os campos obrigatórios e selecione uma foto!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    dados.foto = e.target.result;
    if (!dados.Escolaridade_data_final) delete dados.Escolaridade_data_final;
    if (!dados.Experiência_data_final) delete dados.Experiência_data_final;
    
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
  `;

  // Adiciona o novo formulário ao contêiner
  container.appendChild(novaExperiencia);
}