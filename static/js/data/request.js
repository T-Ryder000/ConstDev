export const request = () => new Promise((resolve, reject) => {
  fetch('/db.json')  // Certifique-se de que o caminho está correto
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(result => {
      resolve(result);
    })
    .catch(error => {
      reject(error.message);
      console.log('1');
    });
});
