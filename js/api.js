


// category api fetch

const cataApiFetch = async () => {

    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        const data = await res.json();
        displayCategory(data);

    }
    catch (err) {
        console.log("opps", err);
    }
}

// videos card details api fetch

const videosApiFetch = async (searchValue = "") => {

    try {
        const searchValueTrimmed = searchValue.trim().toLowerCase();
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title= ${searchValueTrimmed}`);
        const data = await res.json();

        displayVideos(data);



    } catch (err) {
        console.log("opps", err)
    }

}


// remove active btn

function removeActiveBtn() {
    const cataBtn = document.getElementsByClassName('cata-btn');
    for (const btn of cataBtn) {
        btn.classList.remove('bg-error', 'text-white');
    }
}

const cataWiseVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => {

            removeActiveBtn();

            const cataBtn = document.getElementById(`btn-${id}`);
            cataBtn.classList.add('bg-error', 'text-white');

            displayVideos(data.category)
        })

        .catch((err) => console.log(err));
}




// display videos functions
function displayVideos(categoryData) {

    const videosContainer = document.getElementById('videosContainer');
    videosContainer.innerHTML = '';

    // console.log(categoryData);

    // check video length 

    if (categoryData.length == 0) {
        videosContainer.classList.remove('grid');
        videosContainer.innerHTML = `
            <div class="flex flex-col h-[60vh] justify-center items-center">
                <img src="./assets/img/Icon.png" alt="no videos available icon">
                <p class="text-2xl mt-3 font-semibold">No videos available now!</p>
            </div>
        `
    } else {
        videosContainer.classList.add('grid');
    }


    const allVideos = categoryData?.videos || categoryData;
    allVideos?.forEach((video) => {


        const videoCard = document.createElement('div');

        videoCard.innerHTML = `
         <div class="card card-compact">
                <figure class="h-[200px] relative">
                    <img class="w-full h-full object-cover"
                        src="${video.thumbnail}" />

                       ${video.others.posted_date ? ` <div class="absolute top-40 right-1 bg-gray-700 px-2 py-1 rounded-md">
                              <p class="text-white text-xs">${video.others.posted_date}</p>
                            </div>`: ""}


                </figure>
                <div class="card-body mt-2">
                    <div class="flex gap-3">
                        <img class="w-[45px] h-[45px] rounded-full object-cover"
                            src="${video.authors[0].profile_picture}"
                            alt="author img">

                            
                        <div>
                            <h2 class="text-[18px] font-semibold">${video.title}
                            </h2>
                            <p class="flex gap-2 py-1 font-semibold text-gray-500">${video.authors[0].profile_name} <span>${video.authors[0].verified == true ? `<img
                                        class="w-[20px] h-[20px] object-cover"
                                        src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt="Author img">`: ''}</span></p>
                            <p><span>${video.others.views}</span> views</p>
                            <div class="flex justify-end p-2">
                                <button class="btn">Details</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        `;

        videosContainer.appendChild(videoCard);





    })

}




// category button display function
function displayCategory(data) {

    const cateContainer = document.getElementById('catagory_container');

    const categorys = data.categories;

    categorys.forEach((items) => {

        const div = document.createElement('div');

        div.innerHTML = `
         <button id="btn-${items.category_id}" class="btn cata-btn" onclick="cataWiseVideos(${items.category_id}) ">${items.category}</button>
        `;
        cateContainer.appendChild(div);

    })

}

// search featured functionality

document.getElementById('userSearch').addEventListener('keyup', (e) => {
    videosApiFetch(e.target.value);
})


cataApiFetch();
videosApiFetch();





// others function but not using here



// catawise video load

// const cataWiseVideos = async (id) =>{

//   try{
//     const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
//     const data = await res.json();
//     displayVideos(data.category);

//   }
//   catch(err){
//     console.log("opps", err);
//   }

// }


// .........


// .........

// const cataWiseVideos = (id) => {
//     fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
//         .then((res) => res.json())
//         .then((data) => {

//             if (Array.isArray(data.category)){
//                 console.log(data.category);
//                 displayVideos(data.category);
//             }else{
//                 console.log("This is not an array");
//             }
//         })

//         .catch((err) => console.log(err));
// }