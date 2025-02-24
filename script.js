function gerarCurriculo() {
    
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;
    let estadoCivil = document.getElementById("estadoCivil").value;
    let cidade = document.getElementById("cidade").value;
    let bairro = document.getElementById("bairro").value;
    let rua = document.getElementById("rua").value;
    let superior = document.getElementById("superior").value;
    let experiencia = document.getElementById("experiencia").value;

    let novaJanela = window.open();

    novaJanela.document.write(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Currículo - ${nome}</title>
        <link rel="stylesheet" href="curriculo.css">
    </head>
    <body>
        <div class="container">
            <h2>${nome}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <p><strong>Estado Civil:</strong> ${estadoCivil}</p>
            <p><strong>Cidade:</strong> ${cidade}</p>
            <p><strong>Bairro:</strong> ${bairro}</p>
            <p><strong>Rua:</strong> ${rua}</p>
            <p><strong>Ensino Superior:</strong> ${superior}</p>
            <p><strong>Experiência Profissional</strong></p>
            <p>${experiencia.replace(/\n/g, "<br>")}</p>
        </div>
    </body>
    </html>
    `);
    
    novaJanela.document.close();
}
