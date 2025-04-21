function renderizarCurriculo() {
  const dados = JSON.parse(localStorage.getItem("curriculo"));
  const listagem = document.getElementById("Listagem");

  if (!dados) {
    alert("Nenhum currículo encontrado!");
    window.location.href = "index.html";
    return;
  }

  const formatarData = (data) => {
    if (!data) return '';
    return new Date(data).toLocaleDateString('pt-BR', {
      month: '2-digit',
      year: 'numeric'
    });
  };

  const experienciasHTML = dados.experiencias
    .map((exp) => `
      <div class="experiencia-item">
        <p><strong>Cargo:</strong> ${exp.cargo}</p>
        <p><strong>Data Início:</strong> ${formatarData(exp.dataInicio)}</p>
        ${exp.dataTermino ? `<p><strong>Data Término:</strong> ${formatarData(exp.dataTermino)}</p>` : ''}
        <p><strong>Resumo:</strong> ${exp.resumo.replace(/\n/g, "<br>")}</p>
      </div>
    `)
    .join("");

  const html = `
    <div class="curriculo-content">
      <img src="${dados.foto}" alt="Foto" class="foto-perfil">
      <div class="dados-pessoais">
        <h3>Dados Pessoais</h3>
        <p><strong>Nome:</strong> ${dados.nome}</p>
        <p><strong>Email:</strong> ${dados.email}</p>
        <p><strong>Telefone:</strong> ${dados.telefone}</p>
        <p><strong>Estado Civil:</strong> ${dados.estadoCivil}</p>
        <p><strong>Endereço:</strong> ${dados.rua}, ${dados.bairro}, ${dados.cidade}</p>
      </div>
      <div class="experiencia-box">
        <h3>Escolaridade</h3>
        <p><strong>Ensino Superior:</strong> ${dados.superior}</p>
        <p><strong>Data Início:</strong> ${formatarData(dados.Escolaridade_data)}</p>
        ${dados.Escolaridade_data_final ? `<p><strong>Data Conclusão:</strong> ${formatarData(dados.Escolaridade_data_final)}</p>` : ''}
      </div>
      <div class="experiencia-box">
        <h3>Experiência Profissional</h3>
        ${experienciasHTML}
      </div>
    </div>
    <div class="controles">
      <button onclick="carregarEstilo('estilo1.css')">Estilo 1</button>
      <button onclick="carregarEstilo('estilo2.css')">Estilo 2</button>
      <button onclick="carregarEstilo('estilo3.css')">Estilo 3</button>
      <button onclick="baixarPDF()">Baixar PDF</button>
    </div>
  `;

  listagem.innerHTML = html;
}
function carregarEstilo(caminho){
  document.getElementById("estilo-principal").href = caminho;
  localStorage.setItem("estilo", caminho);
}
async function baixarPDF() {
  const { jsPDF } = window.jspdf;
  const buttons = document.querySelectorAll("button");
  const originalDisplay = [];
  buttons.forEach(btn => {
    originalDisplay.push(btn.style.display);
    btn.style.display = "none";
  });

  try {
    const element = document.getElementById("Listagem");
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    
   
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
   
    const canvas = await html2canvas(element, {
      scale: 4, 
      useCORS: true,
      logging: true,
      windowWidth: width,
      windowHeight: height,
      letterRendering: true,
      allowTaint: true,
      quality: 0.98
    });

    const imgData = canvas.toDataURL("image/png", 1.0);
  
    const imgWidth = pageWidth - 20; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    
    let position = 10;
    let remainingHeight = imgHeight;

    while (remainingHeight > 0) {
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      remainingHeight -= pageHeight;
      
      if (remainingHeight > 0) {
        pdf.addPage();
        position = -remainingHeight + 10;
      }
    }

    pdf.save("curriculo.pdf");
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    alert("Erro ao gerar PDF: " + error.message);
  } finally {
    buttons.forEach((btn, index) => {
      btn.style.display = originalDisplay[index];
    });
  }
}
window.onload = function() {
  const estilo = localStorage.getItem("estilo");
  if(estilo){
    carregarEstilo(estilo);
  }
}
renderizarCurriculo();
