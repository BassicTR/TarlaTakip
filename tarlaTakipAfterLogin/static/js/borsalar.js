var apiUrl = "https://hasanadiguzel.com.tr/api/akaryakit/sehir=ISTANBUL";

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        var akaryakitTableBody = document.getElementById("akaryakitTableBody");

        var selectedProducts = ["Kursunsuz_95(Excellium95)_TL/lt", "Motorin(Eurodiesel)_TL/lt"];
        var uniqueProducts = [];

        for (var cityKey in data.data) {
          for (var productKey in data.data[cityKey]) {
            if (selectedProducts.includes(productKey) && !uniqueProducts.includes(productKey)) {
              var row = document.createElement("tr");
              var cityCell = document.createElement("td");
              var productCell = document.createElement("td");
              var priceCell = document.createElement("td");

              cityCell.textContent = data.qualifications.city;
              productCell.textContent = productKey;
              priceCell.textContent = data.data[cityKey][productKey];

              row.appendChild(cityCell);
              row.appendChild(productCell);
              row.appendChild(priceCell);

              akaryakitTableBody.appendChild(row);
              uniqueProducts.push(productKey);
            }
          }
        }
      })
      .catch(error => console.error("API çağrısı başarısız:", error));