export async function getAddressByCep(cep) {
  return fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((resp) => resp.json())
    .catch(() => {
      alert('Cep Inválido');
    });
}
