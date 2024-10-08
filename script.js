
// !<----- display all the data start ----->
// display data
const displayData = (pets) => {
    const petContainerEL = document.getElementById('pet-container')
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
        const { breed, date_of_birth, price, image, gender, pet_name, petId } = pet;
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
                <p>Breed: ${breed?breed:"unknown"}</p>
              </span>
              <span class="flex items-center gap-2 text-gray-500 text-base">
                <img
                  src="https://img.icons8.com/?size=24&id=vwGXRtPWrZSn&format=png"
                  alt=""
                  class="w-5 h-5"
                />
                <p>Birth: ${date_of_birth?date_of_birth:"Not available"}</p>
              </span>
              <span class="flex items-center gap-2 text-gray-500 text-base">
                <img
                  src="https://img.icons8.com/?size=24&id=Kv6q3DKYDp1T&format=png"
                  alt=""
                  class="w-5 h-5"
                />
                <p>Gender: ${gender?gender:"unknown"}</p>
              </span>
              <span class="flex items-center gap-2 text-gray-500 text-base">
                <img
                  src="https://img.icons8.com/?size=24&id=84993&format=png"
                  alt=""
                  class="w-5 h-5"
                />
                <p>Price : ${price?price+' $':"Not available"}</p>
              </span>
            </div>
          </div>

          <div class="flex justify-center items-center md:gap-x-3 gap-x-8 pt-4">
            <div
              onclick ="postHandler('${image}')"
              class="btn text-[#0E7A81] border border-[#0E7A81] bg-white rounded-xl md:px-5 px-8 py-2  hover:bg-[#0E7A81] hover:text-white transition easy-in-out duration-300 hover:scale-105"
            >
              <img
                src="https://img.icons8.com/?size=32&id=33481&format=png"
                alt=""
                class="w-5"
              />
            </div>
            <div
               id ='adopt-btn-${petId}'
               onclick="adoptModal('${petId}')"
              class="btn text-[#0E7A81] border border-[#0E7A81] bg-white rounded-xl md:px-5 px-6 py-2 font-extrabold hover:bg-[#0E7A81] hover:text-white transition easy-in-out duration-300 hover:scale-105"
            >
              Adopt
            </div>
            <div
              onclick="openModal('${petId}')"
              class="btn text-[#0E7A81] border border-[#0E7A81] bg-white rounded-xl md:px-5 px-6 py-2 font-extrabold hover:bg-[#0E7A81] hover:text-white transition easy-in-out duration-300 hover:scale-105"
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
        const { category, category_icon, id } = elements
        const petsBtnEl = document.getElementById('pets-btn');
        const div = document.createElement('div');
        div.innerHTML = `
        <button id="category-btn-${id}" onclick="handleBtn('${category}', ${id})" class="flex justify-center items-center gap-2 px-20 py-4 border border-[#03565c6d] rounded-xl transition easy-in-out duration-300 hover:scale-105">
            <img src='${category_icon}' alt="" class="h-10 w-10">
            <h1 class="font-extrabold">${category}</h1>
        </button> 
    `;
        petsBtnEl.appendChild(div);
    });

}
// !<-----display all the data end ----->


// !<-----handle btn start----->
//liked img handler
const postHandler = (imgs) => {
    const postContainerEl = document.getElementById('post-container');
    const div = document.createElement('div');
    div.innerHTML = `

    <img src="${imgs}" alt="" class='rounded-xl border border-gray-200 p-2'>

    `
    postContainerEl.append(div);
}
// sort handler
const sortPrice = () => {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('pet-container').classList.add('hidden');
    setTimeout(() => {

        if (globalPetData.length > 0) {
            const sortData = globalPetData.sort((data1, data2) => data2.price - data1.price);
            displayData(sortData);
        } 
        else {
            console.log("error");
        }
    }, 2000)
}
//details handler
const openModal = async (id) => {
    console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    const data = await res.json();
    console.log(data.petData);
    const { breed, date_of_birth, price, image, gender, pet_name, petId, pet_details } = data.petData
    console.log(petId)
    const showModal = document.getElementById('show-modal');
    showModal.innerHTML = `
            <dialog id="my_modal_5" class="modal">
                <div class="modal-box space-y-4 p-4">
                    <div class="rounded-lg">
                        <img src="${image}" alt="" class="mx-auto rounded-lg">
                    </div>

                    <div>
                        <h1 class="text-xl font-extrabold">${pet_name}</h1>
                    </div>

                    <div class="grid grid-cols-2 gap-2">
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

                    <div class ="border-t-2 border-gray-200">
                        <h1 class='font-bold text-xl py-3'>Details Information</h1>
                        <p class ="py-3 text-base text-gray-500 text-left">${pet_details}</p>
                    </div>

                    <div class="modal-action">
                        <form method="dialog" class ="w-full">
                            <button class="w-full btn bg-[#0E7A81] hover:bg-[#0E7A81] text-[#fff] border-[#0E7A81]">Cancel</button>
                        </form>
                    </div>
                </div>
        </dialog>
    
    `
    my_modal_5.showModal()

}
// adopt modal
const adoptModal = (id)=>{
    console.log(id);
    const count = document.getElementById('adopt-cnt')
    const adoptBtn = document.getElementById(`adopt-btn-${id}`);
    let cnt = 3;
    
    my_modal_1.showModal()
    
    const clockInterval = setInterval(()=>{
        cnt--;
        count.innerText = cnt;
        if(cnt == 0){
            adoptBtn.innerText = "Adopted"
            adoptBtn.setAttribute('disabled', 'true')
            clearInterval(clockInterval);   
            my_modal_1.close()
        }

  
    }, 1000)
    count.innerText = 3;


}
// !<-----handle btn end----->


// !<-----fetch btn start----->
// fetch single data or single pets data
let lastClickBtn = null;
const handleBtn = async (category, id) => {

    const currentBtn = document.getElementById(`category-btn-${id}`);
    globalPetData =[];
    if (lastClickBtn) {
        lastClickBtn.classList.add('rounded-xl')
        lastClickBtn.classList.remove('rounded-full', 'bg-[#0E7A81]', 'text-white')
    }
    currentBtn.classList.remove('rounded-xl')
    currentBtn.classList.add('rounded-full', 'bg-[#0E7A81]', 'text-white')

    lastClickBtn = currentBtn;

    document.getElementById('pet-container').classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');

    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    const data = await res.json()
    setTimeout(function () {
        globalPetData = data.data
        displayData(globalPetData);
    }, 2000)

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
globalPetData = [];
const loadAllData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json()
    globalPetData = data.pets
    displayData(globalPetData);

}
// !<-----fetch btn end----->


// !<-----function call----->
loadCatagories();
loadAllData();


