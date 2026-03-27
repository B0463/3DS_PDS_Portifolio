document.addEventListener('DOMContentLoaded', async function() {
  // Repositórios para carregar previews
  const repos = [
    { owner: 'B0463', name: 'hkcpu', elementId: 'github-preview-1' },
    { owner: 'B0463', name: 'SinasServerSystem', elementId: 'github-preview-2' },
    { owner: 'B0463', name: 'MondOS', elementId: 'github-preview-3' }
  ];

  repos.forEach(repo => loadGithubPreview(repo.owner, repo.name, repo.elementId));
});

async function loadGithubPreview(repoOwner, repoName, elementId) {
  const previewDiv = document.getElementById(elementId);
  if (!previewDiv) return;

  try {
    // Buscar dados do repositório
    const repoResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`);
    const repoData = await repoResponse.json();

    // Buscar linguagens
    const langsResponse = await fetch(repoData.languages_url);
    const langsData = await langsResponse.json();

    // Ordenar linguagens por bytes
    const sortedLangs = Object.entries(langsData).sort((a, b) => b[1] - a[1]).slice(0, 3);

    // Cores das linguagens
    const langColors = {
      'C++': '#f34b7d',
      'Assembly': '#6E4C13',
      'Logisim': '#563d7c',
      'JavaScript': '#f1e05a',
      'TypeScript': '#3178c6',
      'Python': '#3572A5',
      'C': '#555555',
      'HTML': '#e34c26',
      'CSS': '#563d7c',
      'Batchfile': '#c6c6c6'
    };

    // Construir HTML com imagem OG do GitHub
    const previewHTML = `
      <div class="github-card-full" onclick="window.open('https://github.com/${repoOwner}/${repoName}', '_blank')" style="cursor: pointer;">
        <img src="https://opengraph.githubassets.com/1/${repoOwner}/${repoName}" alt="Prévia ${repoName}" class="github-og-image" />
        <h4>${repoData.full_name}</h4>
        <p>${repoData.description || 'Sem descrição'}</p>
        <div class="github-langs-full">
          ${sortedLangs.map(([lang, _]) => `<span class="lang-badge-full"><span class="lang-dot" style="background-color: ${langColors[lang] || '#ccc'};"></span> ${lang}</span>`).join('')}
        </div>
      </div>
    `;

    previewDiv.innerHTML = previewHTML;
  } catch (error) {
    console.error('Erro ao carregar prévia do GitHub:', error);
    previewDiv.innerHTML = '<p style="color: #999; font-size: 0.9rem;">Erro ao carregar repositório.</p>';
  }
}


