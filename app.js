let apiKey = "63e85fe008b647c784be9a99e47497a0";
let page = 1;
let currentCategory = "general";
let pageSize = 3;
let placeholderImg = "my-placeholder.png"; // <-- your custom placeholder image

function loadCategory(category, loadMore = false) {
  if (!loadMore) {
    page = 1;
    currentCategory = category;
    document.getElementById("news-container").innerHTML = ""; // clear old news
  }

  let url = `https://newsapi.org/v2/top-headlines?country=us&category=${currentCategory}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;
  let placeholderImg=" placeholder.png";


  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.articles || data.articles.length === 0) {
        alert("No more news available.");
        return;
      }

      let newsContainer = document.getElementById("news-container");

      data.articles.forEach(article => {
        let card = `
          <div class="card">
            <img src="${article.urlToImage ? article.urlToImage : placeholderImg}" alt="article_image">
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

// Load next page
function loadMore() {
  page++;
  loadCategory(currentCategory, true);
}

// Load default category on page load
window.onload = function() {
  loadCategory("general");
};
