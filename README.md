M&S Mãos à Obra — Site institucional
M&S Mãos à Obra — empresa de acabamentos, remodelações e isolamento exterior (ETICS/Capoto) com mais de 10 anos de experiência na Margem Sul. Foco B2B: empreiteiros e empresas de construção.

Capa — Equipa

Resumo

Site institucional com: hero, serviços, portefólio, pedido de orçamento e contactos.
Projeto estático (HTML/CSS/JS). Para que o formulário envie mensagens é necessária integração com um serviço externo (ex.: Formspree).
Demo (GitHub Pages)

Depois de ativar o GitHub Pages, o site ficará disponível num URL do tipo:
https://.github.io//
Exemplo esperado (após publicar):
https://gabrielafelix3960-ops.github.io/MS-Maos-a-Obra-Site/
Capturas do portefólio

Reabilitação Loja — Almada
Reabilitação Loja Almada
Obra Estrutural
Obra em Betão
Como executar localmente

Clonar o repositório:
git clone https://github.com/gabrielafelix3960-ops/MS-Maos-a-Obra-Site.git
Abrir a pasta:
cd MS-Maos-a-Obra-Site
Testar localmente:
Abrir index.html no browser; ou
Usar um servidor simples (recomendado para testar JavaScript):
python -m http.server 8000
e abrir http://localhost:8000
Publicar com GitHub Pages

Certifica-te que o ficheiro index.html e a pasta assets/ estão na branch main (ou na pasta docs/).
No GitHub: vai a Settings → Pages → Source: Branch = main, Folder = / (root) → Save.
Aguarda alguns minutos; o GitHub mostrará o URL público do site. Copia esse URL para o campo "Homepage" se quiseres.
Formulário de contacto (opções de integração)

O site é estático — o botão de enviar não envia emails por si. Exemplos de integração:
Formspree (fácil):
Criar conta em https://formspree.io e obter o endpoint (ex.: https://formspree.io/f/TEU_ID).
Substituir a tag no index.html por:
Garantir que cada input tem um atributo name (ex.: name="nome", name="email", name="mensagem").
Netlify Forms (se hospedar no Netlify).
Backend próprio (Node/Express, PHP, etc.).
Estrutura recomendada do repositório

index.html
assets/ (imagens, css, ícones)
README.md
Comandos Git rápidos (se ainda não puseste os ficheiros)

Na pasta do projeto local:
git init
git add .
git commit -m "Add site files and README"
git remote add origin https://github.com/gabrielafelix3960-ops/MS-Maos-a-Obra-Site.git
git branch -M main
git push -u origin main
Notas e boas práticas

Verifica os nomes dos ficheiros em assets/ (case-sensitive no servidor).
Se o site não aparecer imediatamente após ativar Pages, espera alguns minutos e atualiza a página das Settings.
Podes adicionar um arquivo CNAME se tiveres um domínio próprio.
Actualiza os contactos no README caso queiras mudar o email ou telefones.
Contactos (visíveis no site)

Miguel Pessanha — Gestor Comercial / Técnico — Tel: +351 928 377 009
Sandoval — Gestor de Operações / Coordenação — Tel: +351 939 158 702
Email: msmaosaobraconstrucoes@gmail.com
