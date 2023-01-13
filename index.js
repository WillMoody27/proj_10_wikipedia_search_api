import { url } from "./src/wikiDocs.js";
const formDOM = document.querySelector(".form");
const inputDOM = document.querySelector(".form-input");
const resultsDOM = document.querySelector(".results");

formDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = inputDOM.value;
  if (!value) {
    resultsDOM.innerHTML =
      '<div class="error"><i class="fa-solid fa-circle-exclamation" id="caution-icon"></i> Please Enter A Valid Search Term</div>';
    return;
  }
  fetchPages(value);
});

// ========= Important
const fetchPages = async (searchValue) => {
  resultsDOM.innerHTML = '<div class="loading">Loading...</div>';
  try {
    // Fetch pages
    const response = await fetch(`${url + searchValue}`);
    const data = await response.json();
    const { search } = data.query;
    if (search.length < 1) {
      resultsDOM.innerHTML =
        '<div class="error"><i class="fa-solid fa-circle-exclamation" id="caution-icon"></i>no matching results. Please try again</div>';
      return;
    }
    renderResults(search);
  } catch (error) {
    resultsDOM.innerHTML = '<div class="error">There was an error....</div>';
  }
};
// ========= Important

const renderResults = (list) => {
  const cardLists = list
    .map((item) => {
      console.log(item);
      const { title, snippet, pageid } = item;
      return ` 
      <article class="article">
          <a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
            <h2 class="article-title">${title}</h2>
            <p class="article-snippet">
              ${snippet}
            </p>
          </a>
        </article>`;
    })
    .join("");
  resultsDOM.innerHTML = cardLists;
};

// COPYRIGHT
const copyrightText = document.querySelector(".copyright-text-date");
const date = new Date();
copyrightText.innerHTML = `<p class="footer-tags">&copy; ${date.getFullYear()} William Hellems-Moody, All Rights Reserved</p>`;
