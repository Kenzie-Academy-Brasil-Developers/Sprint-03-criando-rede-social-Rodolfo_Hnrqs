import { posts, users, suggestUsers } from "./database.js";
import { renderModal } from "./modal.js";

function renderSuggestions(){
    const suggestContainer = document.querySelector(".sugestionsContainer");
    suggestUsers.forEach(suggestion => {
        const divCard = document.createElement("div");
        const cardTitle = document.createElement("div");
        const titleImage = document.createElement("img");
        const cardInfo = document.createElement("div");
        const cardUserName = document.createElement("p");
        const cardUserJob = document.createElement("span");
        const followBtn = document.createElement("button");

        divCard.classList.add("sugestionsCard");
        cardTitle.classList.add("sugestionsCardTitle");
        titleImage.classList.add("userMiniature");
        titleImage.src = `${suggestion.img}`;
        cardInfo.classList.add("cardInfo");
        cardUserName.innerText = `${suggestion.user}`;
        cardUserJob.innerText = `${suggestion.stack}`;
        followBtn.classList.add("unfollowed");
        followBtn.dataset.suggestId = suggestion.id;
        followBtn.innerText = "Seguir";

        suggestContainer.appendChild(divCard);
        divCard.append(cardTitle, followBtn);
        cardTitle.append(titleImage, cardInfo);
        cardInfo.append(cardUserName, cardUserJob);

    })
}

function renderPosts(){
    const postContainer = document.querySelector(".postCardContainer");
    posts.forEach(post => {
        const divCard = document.createElement("div");
        const cardTitle = document.createElement("div");
        const titleImage = document.createElement("img");
        const cardInfo = document.createElement("div");
        const cardUserName = document.createElement("p");
        const cardUserJob = document.createElement("span");
        const postContentContainer = document.createElement("div");
        const postTitle = document.createElement("span");
        const postText = document.createElement("p");
        const postFooter = document.createElement("div");
        const openPost = document.createElement("button");
        const likePost = document.createElement("button");
        const likeImage = document.createElement("img");

        divCard.classList.add("postCard");
        divCard.id = `post${post.id}`;
        cardTitle.classList.add("postCardTitle");
        titleImage.classList.add("userMiniature");
        titleImage.src = `${post.img}`;
        cardInfo.classList.add("cardInfo");
        cardUserName.innerText = `${post.user}`;
        cardUserJob.innerText = `${post.stack}`;
        postContentContainer.classList.add("postContent");
        postTitle.innerText = `${post.title}`;
        postText.innerText = `${post.text}`;
        postFooter.classList.add("postFooter");
        openPost.classList.add("openPost");
        likePost.classList.add("likeBtn");
        openPost.innerText = "Abrir Post";
        openPost.dataset.id = post.id;
        likeImage.src = "./src/assets/img/Vector.svg";
        likePost.innerText = Number(post.likes);

        let change = false;

        function changeImage(){
            if (change === true){
                likeImage.src = "./src/assets/img/Vector.svg";
            }else {
                likeImage.src = "./src/assets/img/VectorLike.svg";
            }
            change = !change;
        }

        likePost.addEventListener("mouseover", () => {
            changeImage();
        })

        likePost.addEventListener("mouseout", () => {
            changeImage();
        })

        likePost.addEventListener("click", () => {
            changeImage();
        })



        postContainer.appendChild(divCard);
        divCard.appendChild(cardTitle);
        cardTitle.append(titleImage, cardInfo);
        cardInfo.append(cardUserName, cardUserJob);
        divCard.appendChild(postContentContainer);
        postContentContainer.append(postTitle, postText);
        divCard.appendChild(postFooter);
        postFooter.append(openPost, likePost);
        likePost.appendChild(likeImage);
    });
}

function followButton(){
    const followButtons = document.querySelectorAll(".unfollowed");
    followButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            if (button.classList.contains("unfollowed")){
                button.innerText = "Seguindo";
                button.classList.toggle("unfollowed");
                button.classList.toggle("followed");
            }else{
                button.innerText = "Seguir";
                button.classList.toggle("followed");
                button.classList.toggle("unfollowed");
            }
    
        })
    })
}

function registerPost(array){
    const inputs = document.querySelectorAll(".postInput");
    const newPost = {
        user: "Samuel Leão",
        stack: "Front end Engineer",
        img: "./src/assets/img/user1.svg",
        likes: 0
    };
    let emptyInput = 0;

    inputs.forEach(input => {
        if(input.value === ""){
            emptyInput++
        }

        newPost[input.name] = input.value

    })

    newPost.id = array.length + 1;

    if(emptyInput != 0){
        alert("Por favor preencha os campos necessários")
    }

    array.unshift(newPost);
}

function registerPostEvent(array){
    const postContainer = document.querySelector(".postCardContainer");
    const submitButton = document.querySelector("#postBtn");

    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        
        registerPost(array);
        postContainer.innerHTML = "";
        renderPosts();
        renderModal();
    })
}

renderSuggestions();
registerPostEvent(posts);
renderPosts();
renderModal();
followButton();