let currentCategory = "world"; 
let placeholderImg = "placeholder.png";

function loadCategory(category) {
  currentCategory = category;
  document.getElementById("news-container").innerHTML = ""; 

  let url = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=e031a516483241b4208938054460ccf4`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data); 

      if (!data.articles || data.articles.length === 0) {
        alert("No news available.");
        return;
      }

      let newsContainer = document.getElementById("news-container");

      data.articles.forEach(article => {
        let card = `
          <div class="card">
            <img src="${article.image ? article.image : placeholderImg}" alt="article_image">
            <h3>${article.title}</h3>
            <p>${article.description || "No description available."}</p>
            <a href="${article.url}" target="_blank">Read more...</a>
          </div>
        `;
        newsContainer.innerHTML += card;
      });
    })
    .catch(error => console.log("Error fetching news:", error));
}

window.onload = function() {
  loadCategory("world"); 
};

