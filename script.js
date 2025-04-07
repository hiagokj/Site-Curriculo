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
  const campos = [
    "nome",
    "email",
    "telefone",
    "estadoCivil",
    "cidade",
    "bairro",
    "rua",
    "superior",
    "experiencia",
  ];

  const dados = {};
  let isValid = true;

  campos.forEach((campo) => {
    const element = document.getElementById(campo);
    dados[campo] = element.value.trim();
    if (!element.value.trim()) isValid = false;
  });

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
