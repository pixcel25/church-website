const priests = [
  { pic: "pictures/san.jpg", name: "Late Fr. Santana Carvalho", location: "Vasco da Gama", years: "Parish priest from 2005–2012" },
  { pic: "pictures/diago.jpg", name: "Late Fr. Agnelo Diogo Francisco Tome Baptisa De Souza", location: "Bambolim", years: "Parish priest from 2012–2019" },
  { pic: "pictures/george.jpg", name: "Fr. George Norbert Aguier", location: "Colva", years: "Parish priest from 2019–2025" },
  { pic: "pictures/fr-pic.png", name: "Fr. Agnelo Rodrigues", location: "Socorro", years: "Parish priest from 2025–present" }
];

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('.mainContents');
  if (!main) {
    console.error('Container .mainContents not found');
    return;
  }

  priests.forEach(priest => {
    const div = document.createElement('div');
    div.className = 'priest-div';

    div.innerHTML = `
      <img class="profilePic" src="${priest.pic}" alt="${priest.name}">
      <div class="details">
        <div class="name"><strong>${priest.name}</strong></div>
        <div class="location">from: ${priest.location}</div>
        <div class="years">${priest.years}</div>
      </div>
    `;

    main.appendChild(div);
  });
});
