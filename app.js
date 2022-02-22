const form = document.querySelector("#searchForm");
const movie__list = document.querySelector(".movie__list");

// quote
const quoteContainer = document.querySelector(".quote");

// fetching data with api & adding the html
const getMovieDetails = async (name) => {
  try {
    const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${name}`);
    addToHtml(res.data);
    console.log(res.data[0].show);
  } catch (error) {
    console.log(error.message);
  }
};

// getting user input

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const searchText = form.elements.query.value;
  getMovieDetails(searchText);
  form.elements.query.value = "";
  quoteContainer.style.display = "none";
});

const shortenText = (text) => {
  if (text.length > 379) return text.slice(0, 300).concat("...");
  else return text;
};

// construction of html with loop
const addToHtml = async function (showsArr) {
  for (let result of showsArr) {
    try {
      let src = result.show.image.original;
      let name = result.show.name;
      console.log(name);
      let summary = result.show.summary;
      const rating = result.show.rating.average;
      if (!summary) {
        summary = "I can't find summary on this Tv Show. :/";
      } else {
        summary = shortenText(summary);
      }
      const html = `
          <div class="col-lg-4 col-sm-6 shadow-lg p-3 mb-5 rounded bg-dark bg-gradient">
              <a href='https://www.google.com/search?q=${result.show.name}'>
                <img src="${src}" class="img-fluid"  id='image__link'>
              </a>
              <h2 class="bg-danger text-center">${name}</h2>
              <p>${rating ? "IMDB : " + rating : "Ratings not found"}</p>
              <div>${summary}</div>
              <a href="https://www.google.com/search?q=${
                result.show.name
              }" class='btn btn-link text-info'>Read more ...</a>
          </div>
         
      `;
      movie__list.insertAdjacentHTML("afterbegin", html);
    } catch (error) {
      console.log(error.message);
    }
  }
};

// Fetching Randmom quote with api
(async function () {
  const res = await axios.get("https://api.quotable.io/random");
  const author = res.data.author;
  const quote = res.data.content;

  const html = `
        <p>${quote} <br><span> - ${author}</span></p> 
  `;
  quoteContainer.insertAdjacentHTML("beforeend", html);
})();
