const form = document.querySelector("#searchForm");
const container = document.querySelector(".container");

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
});

// construction of html with loop
const addToHtml = async function (showsArr) {
  for (let result of showsArr) {
    try {
      // if (result.show.image.original) {
      let src = result.show.image.original;
      let summary = result.show.summary;
      const rating = result.show.rating.average;
      if (!summary) {
        summary = "I can't find summary on this Tv Show. :/";
      }
      const html = `
              <div class=show-container>
                  <a href='https://www.google.com/search?q=${
                    result.show.name
                  }'><img src="${src}"></a>
                  <p>${rating ? "IMDB : " + rating : "Ratings not found"}</p>
                  <div class="summary">${summary}</div>
              </div>
          `;
      container.insertAdjacentHTML("afterend", html);
    } catch (error) {
      console.log(error.message);
    }
  }
};
