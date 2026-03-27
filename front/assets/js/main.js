document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form-contato');
  if (!form) return;

  const status = document.getElementById('contato-status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const mensagem = form.mensagem.value.trim();

    if (!nome || !email || !mensagem) {
      status.textContent = 'Por favor, preencha todos os campos.';
      status.style.color = 'red';
      return;
    }

    status.textContent = 'Mensagem enviada com sucesso! Em breve retornaremos.';
    status.style.color = 'green';
    form.reset();
  });
});
