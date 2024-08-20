const searchBox=document.querySelector('.searchBox');
const searchButton=document.querySelector('.searchButton');
const productContainer=document.querySelector('.productContainer');
const closebtn=document.querySelector('.foodClose');
const recipedetailscontent=document.querySelector('.recipe-details-content');
const fooddetails=document.querySelector('.food-details');

const food=async(query)=>{
    productContainer.innerHTML="Searching... "
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response=await data.json();
    productContainer.innerHTML="";
    response.meals.forEach(meal => {
        const foodDiv=document.createElement('div');
        foodDiv.classList.add('foodDv');
        foodDiv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}<h3>
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>

        `
        const button=document.createElement('button');
        button.textContent="Details";
        foodDiv.appendChild(button);
        button.addEventListener('click',()=>{
        popUp(meal);
        });

        productContainer.appendChild(foodDiv);
    });
    
    
}

const fetchIngredents=(meal)=>{
let ingredentsList="";
for(let i=1;i<=20;i++){
    const ingredent=meal[`strIngredient${i}`];
    if(ingredent){
        const measure=meal[`strMeasure${i}`];
        ingredentsList+=`<li>${measure} ${ingredent}</li>`
    }
    else
    {
        break;
    }
}
return ingredentsList;
}

const popUp = (meal) => {
    recipedetailscontent.innerHTML=`
    <h2 class="recipename">${meal.strMeal}</h2>
    <h3>Recipe:</h3>
    <ul class="ingredientList">${fetchIngredents(meal)}</ul>
     <div>
     <h3>Instructions:</h3>
     <p class="instructions"> ${meal.strInstructions}</p>
     </div>
    `
   
    recipedetailscontent.parentElement.style.display="block";
}


closebtn.addEventListener('click',()=>{
    recipedetailscontent.parentElement.style.display="none";
})

searchButton.addEventListener('click', (e)=>{
    e.preventDefault();
    const serachInput=searchBox.value.trim();
    food(serachInput);
    // console.log("Button Clicked");
});

