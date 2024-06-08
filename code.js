
  document.addEventListener("DOMContentLoaded", function () {
    const map = L.map("map").setView([61.524, 105.3188], 4);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    fetch("cities.json")
      .then((response) => response.json())
      .then((cities) => {
        cities.forEach((city) => {
          const coords = city.Координаты
            .split(",")
            .map((coord) => parseFloat(coord.trim()));
          const marker = L.marker(coords).addTo(map);
          const popupContent = `
                  <b>${city.Название}</b><br>
                  Ранее назывался: ${city["Ранее назывался"]}<br>
                  Население: ${city["Численность населения"]}<br>
                  Площадь: ${city.Площадь}
              `;
          marker.bindPopup(popupContent);
        });
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
      });
  });

