const petContainerEL = document.getElementById('pet-container')

// display data
const displayData = (pets) => {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('pet-container').classList.remove('hidden');
    petContainerEL.innerHTML = "";
    petContainerEL.classList.remove('grid')

    if (pets.length === 0) {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="flex flex-col justify-center items-center py-32">
            <div>
                <img src="images/error.webp" alt="" />
            </div>
            <div class="text-center space-y-2">
                <h1 class="text-3xl font-extrabold text-black">No Information Available</h1>
                <p class="text-base w-9/12 mx-auto">
                It is a long established fact that a reader will be distracted by the
                readable content of a page when looking at its layout. The point of
                using Lorem Ipsum is that it has a.
                </p>
            </div>
        </div>
        `
        petContainerEL.appendChild(div);
        return;
    }

    petContainerEL.classList.add('grid')
    pets.forEach(pet => {
        const {breed, date_of_birth, price, image, gender, pet_name} = pet
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="border border-gray-200 p-3 bg-white rounded-lg">
          <div>
            <img src="${image}" alt="" class="rounded-md" />
          </div>

          <div class="space-y-2 border-b-2 border-gray-300 pt-3">
            <h1 class="text-xl font-extrabold">${pet_name}</h1>
            <div class="space-y-1 pb-3">
              <span class="flex items-center gap-2 text-gray-500">
                <img
                  src="https://img.icons8.com/?size=24&id=82774&format=png"
                  alt=""
                  class="w-5 h-5"
                />
                <p>Breed: ${breed}</p>
              </span>
              <span class="flex items-center gap-2 text-gray-500 text-base">
                <img
                  src="https://img.icons8.com/?size=24&id=vwGXRtPWrZSn&format=png"
                  alt=""
                  class="w-5 h-5"
                />
                <p>Birth: ${date_of_birth}</p>
              </span>
              <span class="flex items-center gap-2 text-gray-500 text-base">
                <img
                  src="https://img.icons8.com/?size=24&id=Kv6q3DKYDp1T&format=png"
                  alt=""
                  class="w-5 h-5"
                />
                <p>Gender:${gender}</p>
              </span>
              <span class="flex items-center gap-2 text-gray-500 text-base">
                <img
                  src="https://img.icons8.com/?size=24&id=84993&format=png"
                  alt=""
                  class="w-5 h-5"
                />
                <p>Price : ${price}</p>
              </span>
            </div>
          </div>

          <div class="flex items-center gap-x-3 pt-4">
            <div
              onclick ="postHandler('${image}')"
              class="btn text-[#0E7A81] border border-[#0E7A81] bg-white rounded-xl px-5 py-2  hover:bg-[#0E7A81] hover:text-white"
            >
              <img
                src="https://img.icons8.com/?size=32&id=33481&format=png"
                alt=""
                class="w-5"
              />
            </div>
            <div
              class="btn text-[#0E7A81] border border-[#0E7A81] bg-white rounded-xl px-5 py-2 font-extrabold hover:bg-[#0E7A81] hover:text-white"
            >
              Adopt
            </div>
            <div
              class="btn text-[#0E7A81] border border-[#0E7A81] bg-white rounded-xl px-5 py-2 font-extrabold hover:bg-[#0E7A81] hover:text-white"
            >
              Details
            </div>
          </div>
        </div>
        `;
        petContainerEL.appendChild(div);
    })
}
// display button
const displayBtn = (categories) => {
    categories.forEach((elements) => {
         console.log(elements);
        const { category, category_icon, id} = elements
        const petsBtnEl = document.getElementById('pets-btn');
        const div = document.createElement('div');
        div.innerHTML = `
        <button id="category-btn-${id}" onclick="handleBtn('${category}', ${id})" class="flex justify-center items-center gap-2 px-20 py-4 border border-[#03565c6d] rounded-xl">
            <img src='${category_icon}' alt="" class="h-10 w-10">
            <h1 class="font-extrabold">${category}</h1>
        </button> 
    `;
        petsBtnEl.appendChild(div);
    });

}

let lastClickBtn = null;
// fetch single data or single pets data
const handleBtn = async (category, id) => {

    const currentBtn = document.getElementById(`category-btn-${id}`);

    if(lastClickBtn){
        lastClickBtn.classList.add('rounded-md')
        lastClickBtn.classList.remove('rounded-full', 'bg-[#0E7A81]', 'text-white')
    }
    currentBtn.classList.remove('rounded-md')
    currentBtn.classList.add('rounded-full', 'bg-[#0E7A81]', 'text-white')

    lastClickBtn = currentBtn;

    document.getElementById('pet-container').classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');

    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    const data = await res.json()
    setTimeout(function(){
        displayData(data.data);
    }, 2000)

}

const postHandler = (imgs) => {
    console.log(imgs);
    const postContainerEl = document.getElementById('post-container');
    const div = document.createElement('div');
    div.innerHTML =`

    <img src="${imgs}" alt="" class='rounded-xl border border-gray-200 p-2'>

    ` 
    postContainerEl.append(div);
}



// fetch for pet btn
const loadCatagories = async () => {
    // for catagories btn api
    const url = `https://openapi.programming-hero.com/api/peddy/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayBtn(data.categories);

}
// fetch for all pets data btn
const loadAllData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json()
    displayData(data.pets);
}

loadCatagories();
loadAllData();


