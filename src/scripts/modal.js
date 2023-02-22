import { posts } from "./database.js";

export function renderModal(){
    const modalHandler = document.querySelector(".modalContainer");
    const openButtons = document.querySelectorAll(".openPost");

    openButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const openedModal = createModal(button.dataset.id);

            modalHandler.innerHTML = "";
            modalHandler.appendChild(openedModal);

            modalHandler.showModal();
            closeModal();
        })
    });
}

export function createModal(id){
   let element = {};

   posts.forEach(post => {
        if(post.id === Number(id)){
            element = post;
        }
   })
   
   const modalDiv = document.createElement("div");
   const modalCard = document.createElement("div");
   const modalCardTitle = document.createElement("div");
   const modalTitleImg = document.createElement("img");
   const modalTitleInfo = document.createElement("div");
   const modalUser = document.createElement("p");
   const modalJob = document.createElement("span");
   const closeButton = document.createElement("button");
   const modalPostContent = document.createElement("div");
   const modalPostTitle = document.createElement("span");
   const modalPostText = document.createElement("p");

   modalDiv.classList.add("modalBoxContainer");
   modalCard.classList.add("modalCard");
   modalCardTitle.classList.add("postCardTitle");
   modalTitleImg.classList.add("userMiniature");
   modalTitleImg.src = `${element.img}`;
   modalTitleInfo.classList.add("cardInfo");
   modalUser.innerText = `${element.user}`;
   modalJob.innerText = `${element.stack}`;
   closeButton.classList.add("closeBtn");
   closeButton.innerText = "X";
   modalPostContent.classList.add("modalPostContent");
   modalPostTitle.innerText = `${element.title}`;
   modalPostText.innerText = `${element.text}`;

   modalDiv.appendChild(modalCard);
   modalCard.append(modalCardTitle, closeButton, modalPostContent);
   modalCardTitle.append(modalTitleImg, modalTitleInfo);
   modalTitleInfo.append(modalUser, modalJob);
   modalPostContent.append(modalPostTitle, modalPostText);

   return modalDiv;

}

export function closeModal(){
    const modalHandler = document.querySelector(".modalContainer");
    const closeButton = document.querySelector(".closeBtn");

    closeButton.addEventListener("click", () => {
        modalHandler.close();
    })
}

renderModal();
