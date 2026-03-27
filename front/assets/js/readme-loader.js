async function loadReadme(owner, repo) {
  const modal = document.getElementById('readme-modal');
  const modalHeader = document.getElementById('readme-modal-header');
  const modalBody = document.getElementById('readme-modal-body');

  // Mostrar modal e loading
  modal.style.display = 'flex';
  modalHeader.innerHTML = `<h2>${owner}/${repo}</h2>`;
  modalBody.innerHTML = '<p>Carregando README...</p>';

  try {
    // Buscar README.md
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);
    
    if (!response.ok) {
      modalBody.innerHTML = '<p>README não encontrado para este repositório.</p>';
      return;
    }

    // GitHub retorna em base64, precisa decodificar
    const data = await response.json();
    const content = atob(data.content);

    // Converter Markdown simples para HTML (básico)
    const html = markdownToHtml(content);
    
    modalBody.innerHTML = html;
  } catch (error) {
    console.error('Erro ao carregar README:', error);
    modalBody.innerHTML = '<p>Erro ao carregar o README. Tente novamente.</p>';
  }
}

function closeReadme() {
  const modal = document.getElementById('readme-modal');
  modal.style.display = 'none';
}

// Fechar modal ao clicar fora
document.addEventListener('click', function(event) {
  const modal = document.getElementById('readme-modal');
  if (event.target === modal) {
    closeReadme();
  }
});

// Converter Markdown básico para HTML
function markdownToHtml(markdown) {
  let html = markdown
    // Headings
    .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
    .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
    // Code blocks com ``` (backticks)
    .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>')
    // Code blocks com ~~~ (tils)
    .replace(/~~~(.*?)~~~/gs, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`(.*?)`/g, '<code>$1</code>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');

  return `<p>${html}</p>`;
}
