const baseUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php'
const SearchURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const foodBodySelector = document.getElementById("apiData")
const singleFoodBodySelector = document.getElementById('singlefood')
const inputValueSelector = document.getElementById('inputValue')
const inputbtnSelector = document.getElementById('inputbtn')
const SearchShow = document.getElementById('searchitemlist')

fetch(baseUrl)
  .then(response => response.json())
  .then(data => {
    foodBodySelector.innerHTML = data.categories.map((item) => {
      return (`<div class="col-md-3">
            <div class="card" style="width: 18rem;">
                <img onClick=getSingleFood(${item.idCategory}) src=${item.strCategoryThumb} class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title text-center" onClick=getSingleFood(${item.idCategory})>${item.strCategory}</h5>
                </div>
            </div>
        </div>`)
    }).join('')
  })

const getSingleFood = (id) => {
  fetch(baseUrl)
    .then(res => res.json())
    .then(data => {
      const singleFood = (data.categories[id - 1]);
      singleFoodBodySelector.innerHTML = `<div class="card single-food" style="width: 35rem;">
            <img src=${singleFood.strCategoryThumb} class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${singleFood.strCategory}</h5>
              <p class="card-text">${singleFood.strCategoryDescription}</p>
            </div>
          </div>`
    })
}

const allFood = async (userData, arrayData) => {
  const responseData = await fetch(baseUrl)
  const allData = await responseData.json()

  if (userData) {
    arrayData = allData.categories
    const suggestion = arrayData.filter((food) => {
      return food.strCategory.toLowerCase().startsWith(userData);
    })

    finalSerach = suggestion.map((item) => {
      return `<li class='single-search-item' onClick=setValue('${item.strCategory}') >${item.strCategory}</li>`
    }).join('')

    SearchShow.innerHTML = finalSerach;

  }

}

const setValue = (valData) => {
  inputValueSelector.value = valData
  SearchShow.innerHTML = '';
}


inputValueSelector.addEventListener('keyup', (e) => {

  let userData = e.target.value
  let arrayData = [];

  allFood(userData, arrayData)

})

inputbtnSelector.addEventListener('click', function (e) {
  const val = inputValueSelector.value
  getSearchFood(val)
})


const getSearchFood = (getval) => {
  if (getval) {
    fetch(SearchURL + getval)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.error);
        }
        return response.json();
      })
      .then(data => {
        if(!data.meals){
          singleFoodBodySelector.innerHTML = `<div class="card single-food" style="width: 35rem;">
          <div class="card-body">
            <h5 class="card-title">No data Found</h5>
          </div>
        </div>`
        }else{
          const singleFood = (data.meals[0]);
          console.log(singleFood);
          singleFoodBodySelector.innerHTML = `<div class="card single-food" style="width: 35rem;">
              <div class="card-body">
                <h5 class="card-title">Name: ${singleFood.strMeal}</h5>
                <p class="card-text">Category: ${singleFood.strCategory}</p>
                <p class="card-text">Country: ${singleFood.strArea}</p>
                <h6 class="card-title">Ingredient List</h6>
                <p class="card-text">${singleFood.strIngredient1}</p>
                <p class="card-text">${singleFood.strIngredient2}</p>
                <p class="card-text">${singleFood.strIngredient3}</p>
                <p class="card-text">${singleFood.strIngredient4}</p>
                <p class="card-text">${singleFood.strIngredient5}</p>
                <p class="card-text">${singleFood.strIngredient5}</p>
                <p class="card-text">${singleFood.strIngredient6}</p>
                <p class="card-text">${singleFood.strIngredient7}</p>
              </div>
            </div>`
        }

        

      })
  }
}