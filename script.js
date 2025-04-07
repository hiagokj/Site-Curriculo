function gerarCV() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const formacao = document.getElementById("formacao").value.trim();
  const experiencia = document.getElementById("experiencia").value.trim();
  const habilidades = document.getElementById("habilidades").value.trim();
  const imagemInput = document.getElementById("imagem");
  const outputDiv = document.getElementById("cvOutput");
  const downloadBtn = document.getElementById("downloadBtn");

  

  if (!nome || !email || !telefone || !endereco || !formacao || !experiencia || !habilidades) {
      alert("Por favor, preencha todos os campos!");
      return;
  }

  // Lógica para pegar a imagem
  let imagemHTML = '';
  if (imagemInput.files && imagemInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
          imagemHTML = `<img src="${e.target.result}" alt="Foto" class="cv-image">`;
          mostrarCurriculo(imagemHTML);  // Gera o currículo
      };
      reader.readAsDataURL(imagemInput.files[0]);
  } else {
      mostrarCurriculo(imagemHTML);  // Gera o currículo sem imagem
  }

  function mostrarCurriculo(imagemHTML) {
      outputDiv.innerHTML = `
          <div class="cv-container">
              ${imagemHTML}
              <h2>${nome}</h2>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Telefone:</strong> ${telefone}</p>
              <p><strong>Endereço:</strong> ${endereco}</p>
              <h3>Formação Acadêmica</h3>
              <p>${formacao}</p>
              <h3>Experiência Profissional</h3>
              <p>${experiencia}</p>
              <h3>Habilidades</h3>
              <p>${habilidades}</p>
          </div>
      `;
      downloadBtn.style.display = "block";  // Exibe o botão de download
  }
}

function baixarCV() {
  const cvContent = document.getElementById("cvOutput").innerHTML;
  
  if (!cvContent) {
      alert("Por favor, gere o currículo antes de baixar.");
      return;
  }

  const blob = new Blob([`
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Currículo - ${document.getElementById("nome").value}</title>
          <style>
              body { font-family: 'Poppins', sans-serif; padding: 20px; }
              .cv-container { max-width: 700px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); }
              h2 { text-align: center; border-bottom: 2px solid #28a745; padding-bottom: 10px; }
              p { font-size: 16px; line-height: 1.6; }
              .cv-image { width: 100px; height: 100px; border-radius: 50%; margin-bottom: 20px; }
          </style>
      </head>
      <body>
          ${cvContent}
      </body>
      </html>
  `], { type: "text/html" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "curriculo.html";
  link.click();
}

function previewImage(event) {
  const imagePreview = document.getElementById("imagePreview");
  imagePreview.innerHTML = '';  // Limpar pré-visualização anterior

  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          const imgElement = document.createElement("img");
          imgElement.src = e.target.result;
          imagePreview.appendChild(imgElement);
      };
      reader.readAsDataURL(file);
  }
}



