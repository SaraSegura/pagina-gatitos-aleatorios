const API_URL_RANDOM =
  "https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_xKPuRURI7sdbuuiXBuxx5xSgLJ7o4oYRBRVALsfStuudueWUUBbw6QHDUDWvjSEn";

const API_URL_FAVORITES =
  "https://api.thecatapi.com/v1/favourites?&api_key=live_xKPuRURI7sdbuuiXBuxx5xSgLJ7o4oYRBRVALsfStuudueWUUBbw6QHDUDWvjSEn";

const spanError = document.getElementById("error");

const btn1 = document.getElementById("btn1");
const svg1 = btn1.querySelector("svg");

const btn2 = document.getElementById("btn2");
const svg2 = btn2.querySelector("svg");

const btn3 = document.getElementById("btn3");
const svg3 = btn3.querySelector("svg");

btn1.addEventListener("click", () => {
  svg1.classList.toggle("fill-rose-600");
});

btn2.addEventListener("click", () => {
  svg2.classList.toggle("fill-rose-600");
});
btn3.addEventListener("click", () => {
  svg3.classList.toggle("fill-rose-600");
});

async function loadRandomMichis() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log("Random");
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const btn3 = document.getElementById("btn3");

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;

    btn1.onclick = () => saveFavouriteMichi(data[0].id);
    btn2.onclick = () => saveFavouriteMichi(data[1].id);
    btn3.onclick = () => saveFavouriteMichi(data[2].id);
  }
}

async function loadFavouriteMichis() {
  const res = await fetch(API_URL_FAVORITES);
  const data = await res.json();
  console.log("Favoritos");
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    data.forEach((michi) => {
      const section = document.getElementById("favoriteMichis");
      const article = document.createElement("article");
      const imgContainer = document.createElement("div");
      const img = document.createElement("img");
      const btn = document.createElement("button");

      // Crear un elemento SVG y establecer atributos
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.setAttribute("viewBox", "0 0 512 512");

      // Crear el elemento <path> y establecer el atributo "d"
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute(
        "d",
        "M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5"
      );

      // Agregar el <path> al <svg>
      svg.appendChild(path);

      // Establecer el estilo del SVG
      img.classList.add(
        "w-36",
        "h-36",
        "object-cover",
        "rounded-full",
        "mr-5",
        "mb-10",
        "border-8",
        "border-white"
      );
      imgContainer.classList.add("relative");
      svg.classList.add("w-4", "h-4", "fill-rose-600");
      btn.classList.add(
        "text-white",
        "font-bold",
        "py-2",
        "px-2",
        "rounded-full",
        "bg-pink-300",
        "absolute",
        "top-2",
        "left-5",
        "border-2",
        "border-pink-700"
      );
      btn.addEventListener("click", () => {
        svg.classList.toggle("fill-current");
      });

      const btnText = document.createTextNode(" ");

      img.src = michi.image.url;

      btn.appendChild(svg);
      btn.appendChild(btnText);

      imgContainer.appendChild(img);
      imgContainer.appendChild(btn);

      article.appendChild(imgContainer);

      section.appendChild(article);
    });
  }
}

async function saveFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  const data = await res.json();

  console.log("Save");
  console.log(res);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  }
}

loadRandomMichis();
loadFavouriteMichis();
