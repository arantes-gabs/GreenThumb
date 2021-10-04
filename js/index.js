const plantDiv = document.getElementById("plantDiv");
let noResults = document.getElementById("no-results");
let results = document.getElementById("results").style.display = "none";
let sun;
let water;
let pet;

// calling API and putting object into variable
function callAPI() {
  document.getElementById("plantDiv").innerHTML = "";
  fetch(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sun}&water=${water}&pets=${pet}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then(data => {
      plant_list = data;
      for (plant in plant_list) {
        createCustomDiv(plant_list[plant]);
      }
    });
}

// storing the value of each selector
function getOnChange() {
  sun = document.getElementById("select-sun").value;
  water = document.getElementById("select-water").value;
  pet = document.getElementById("select-pet").value;
}

// creating the plant cards div
function createCustomDiv(plant) {
  noResults.remove();
  document.getElementById("results").style.display = "block";
  const divPai = document.createElement('div');
  const divData = document.createElement('div');
  const divName = document.createElement('div');
  const divStaff = document.createElement('div');
  const divPhoto = document.createElement('div');
  const divFlexFirst = document.createElement('div');
  const divFlexSecond = document.createElement('div');
  const textPrice = document.createElement('text');
  const textName = document.createElement('text');
  const img = document.createElement('img');
  let imgStaff = document.createElement('img');
  let IconDog = document.createElement('img');
  let IconSun = document.createElement('img');
  let IconWater = document.createElement('img');
  iconSun();
  iconWater();
  iconDog();

  textPrice.textContent = " $" + plant.price;
  textName.textContent = plant.name;
  img.src = plant.url;

  // filters the pet icon according to the API
  function iconDog() {
    if (plant.toxicity == true) {
      IconDog.src = "../images/icons/toxic.svg";
    } else if (plant.toxicity == false) {
      IconDog.src = "../images/icons/pet.svg";
    }
  }

  // filters the water icon according to the API
  function iconWater() {
    if (plant.water == "daily") {
      IconWater.src = "../images/icons/3-drops.svg";
    } else if (plant.water == "regularly") {
      IconWater.src = "../images/icons/two-drops.svg";
    } else if (plant.water == "rarely") {
      IconWater.src = "../images/icons/1-drop.svg";
    }
  }

  // filters the sun icon according to the API
  function iconSun() {
    if (plant.sun == "high") {
      IconSun.src = "../images/icons/highSun.svg";
    } else if (plant.sun == "low") {
      IconSun.src = "../images/icons/low-sun.svg";
    } else if (plant.sun == "no") {
      IconSun.src = "../images/icons/no-sun.svg";
    }
  }

  if (plant.staff_favorite == true) {
    imgStaff.src = "../images/icons/staff_fav.png"
  } else if (plant.staff_favorite == false) {
    divStaff.remove();
    imgStaff.remove();
  }

  divStaff.appendChild(imgStaff);
  divPhoto.appendChild(img);
  divData.appendChild(divName);
  divData.appendChild(divFlexFirst);
  divName.appendChild(textName);
  divFlexFirst.appendChild(textPrice);
  divFlexFirst.appendChild(divFlexSecond);
  divFlexSecond.appendChild(IconDog);
  divFlexSecond.appendChild(IconSun);
  divFlexSecond.appendChild(IconWater);
  divPai.appendChild(divStaff);
  divPai.appendChild(divPhoto);
  divPai.appendChild(divData);
  plantDiv.appendChild(divPai);

  //class to divs
  divPai.classList.add("plant-card");
  divPhoto.classList.add("plant-photo");
  divFlexFirst.classList.add("plant", "flex");
  divFlexSecond.classList.add("plant", "flex");
  textPrice.classList.add("plant-price");
  divName.classList.add("plant-name");
  divData.classList.add("plant-data")
  divStaff.classList.add("plant-staff-favorite");
}


// import response from "./response.json"
// import "./styles.css"


// console.log(response)

// const histories = response.companies.histories


// const basic = histories.find(history => history.contribution_type_slug === 'basic')
// const 

// console.log(basic)


// document.getElementById("app").innerHTML = `
//   <h1>Hello <span>RV!</span></h1>
// `
