var key = "lach0192-reviewr";
var reviewLocalStorage;
var loadedStorage;
var rating = 3;
var stars = null;
var imageLocation;

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        
        // TAKE PICTURE BTN CLICK LISTENER
        document.getElementById("takePictureBtn").addEventListener("click", function(){
            
            navigator.camera.getPicture(onSuccess, onFail, { quality: 50, allowEdit: true,
                destinationType: Camera.DestinationType.FILE_URI });

            function onSuccess(imageURI) {
                //var image = document.getElementById('myImage');
                //image.src = imageURI;
                imageLocation = imageURI;
                                                                   
                var div = document.querySelector(".picHere");
                div.innerHTML = "";
                var myImg = document.createElement("img");
                myImg.setAttribute("id", "picPreview");
                myImg.src = imageLocation;
                                                                   
                div.appendChild(myImg);
                                                                   
                // make button disapear..
                var btnD = document.getElementById("takePictureBtn");
                btnD.setAttribute("style","visibility:hidden");
                                                                   
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }
        });
        
        // if localstorage doesnt exist
        if(!localStorage.getItem(key)){
            var storage = {
                reviews: []
            };

            localStorage.setItem(key, JSON.stringify(storage));
        }
        else{
            loadedStorage = JSON.parse(localStorage.getItem(key));
            console.log("loadedStorage: " + JSON.stringify(loadedStorage));
        }
        
        app.showList();
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },
    
    showList: function(){
        
        document.getElementById("itemInput").value = "";
        
        app.addListeners();
        
        console.log("show list.");
                    
        loadedStorage = JSON.parse(localStorage.getItem(key));
            
        console.log("reviewStorage:\n" + JSON.stringify(loadedStorage));    
        
        //check if array is empty before showing list 
        if(loadedStorage.reviews.length == 0){
            
            console.log("!!! No reviews loded");
        }
        else{
            var reviewList = document.getElementById("review-list");

            for(var i = 0; i < loadedStorage.reviews.length; i++){

                var li = document.createElement("li");
                li.classList.add("table-view-cell");
                li.classList.add("media");

                var a = document.createElement("a");
                a.classList.add("navigate-right");
                a.classList.add("reviewListItem")

                // ITEM ID
                a.setAttribute("id", loadedStorage.reviews[i].id);

                var img = document.createElement("img");
                img.classList.add("media-object");
                img.classList.add("pull-left");

                // ITEM IMG
                img.src = loadedStorage.reviews[i].img;
                img.setAttribute("id", "picSmall");

                var div = document.createElement("div");
                div.classList.add("media-body");

                // ITEM NAME
                var txt = document.createTextNode(loadedStorage.reviews[i].name);

                var p = document.createElement("p");

                // ITEM RATING
                //p.innerHTML = loadedStorage.reviews[i].rating;
                var starDiv = document.createElement("div");
                starDiv.classList.add("stars");
                
                for(var x = 0; x < loadedStorage.reviews[i].rating; x++){
                    
                    let spanStar = document.createElement("span");
                    spanStar.classList.add("starDisplay");
                    spanStar.classList.add("rated");
                    
                    starDiv.appendChild(spanStar);
                }
                
                for (var y = 0; y < (5 - loadedStorage.reviews[i].rating); y++){
                    let spanStar = document.createElement("span");
                    spanStar.classList.add("starDisplay");
                    
                    starDiv.appendChild(spanStar);
                }
                
                var p2 = document.createElement("p");
                
                p.appendChild(starDiv);

                div.appendChild(txt);
                div.appendChild(p2);
                div.appendChild(p);

                a.appendChild(img);
                a.appendChild(div);

                li.appendChild(a);

                reviewList.appendChild(li);

                app.addListeners();
            }
        } 
    },
    
    addListeners: function(){
        
        // STAR RATING
        document.addEventListener('DOMContentLoaded', function(){
            stars = document.querySelectorAll('.star');
            addListeners();
            setRating();
        });

        function addListeners(){
            [].forEach.call(stars, function(star, index){
                star.addEventListener('click', (function(idx){
                
                return function(){
                    rating = idx + 1;  
                    console.log('Rating is now', rating)
                    setRating();
                }
                })(index));
            });
        }

        function setRating(){
            [].forEach.call(stars, function(star, index){
                if(rating > index){
                    star.classList.add('rated');
                }else{
                    star.classList.remove('rated');
                }
            });
        }
        
        // REVIEW ITEM CLICK LISTENER
        var reviewItems = document.querySelectorAll(".reviewListItem");
        
        for(var i = 0; i < reviewItems.length; i++){
            
            reviewItems[i].addEventListener("click", function(ev){
                
                let clickedOn = this.id;
                
                console.log("clicked on " + clickedOn);
                
                let reviewsFromStorage = JSON.parse(localStorage.getItem(key));
                
                let showReview = document.getElementById("showReview");
                showReview.innerHTML = "";
                
                for(var i = 0; i < reviewsFromStorage.reviews.length; i++){
                    if(reviewsFromStorage.reviews[i].id == clickedOn){
                        
                        let img = document.createElement("img");
                        img.classList.add("media-object");
                        img.src = reviewsFromStorage.reviews[i].img;
                        img.setAttribute("id", "pic");
                        
                        let div = document.createElement("div");
                        div.classList.add("media-body");
                        
                        let itemName = document.createTextNode(reviewsFromStorage.reviews[i].name);
                        
                        let itemRating = document.createElement("p");
                        
                        var starDiv = document.createElement("div");
                        starDiv.classList.add("stars");

                        for(var x = 0; x < loadedStorage.reviews[i].rating; x++){

                            let spanStar = document.createElement("span");
                            spanStar.classList.add("starDisplay");
                            spanStar.classList.add("rated");

                            starDiv.appendChild(spanStar);
                        }

                        for (var y = 0; y < (5 - loadedStorage.reviews[i].rating); y++){
                            let spanStar = document.createElement("span");
                            spanStar.classList.add("starDisplay");

                            starDiv.appendChild(spanStar);
                        }

                        var p2 = document.createElement("p");

                        itemRating.appendChild(starDiv);
                        
                        let deleteBtn = document.createElement("button");
                        deleteBtn.classList.add("btn");
                        deleteBtn.classList.add("btn-negative");
                        deleteBtn.classList.add("btn-block");
                        deleteBtn.classList.add("deleteReviewBtn");
                        deleteBtn.setAttribute("id", clickedOn);
                        
                        let span = document.createElement("span");
                        span.classList.add("icon");
                        span.classList.add("icon-close");
                        
                        let deleteTxt = document.createTextNode("Delete");
                        
                        deleteBtn.appendChild(span);
                        deleteBtn.appendChild(deleteTxt);
                        
                        div.appendChild(itemName);
                        div.appendChild(p2);
                        div.appendChild(itemRating);
                        div.appendChild(deleteBtn);
                        showReview.appendChild(img);
                        showReview.appendChild(div);
                    }
                }
                
                app.addListeners();
                
                document.getElementById("viewReviewModal").classList.add("active");
            })
        }
        
        // WRITE REVIEW BTN CLICK LISTENER
        document.getElementById("addReviewBtn").addEventListener("click", function(){
            
            document.getElementById("reviewModal").classList.add("active");
                                                                 
            document.getElementById("takePictureBtn").setAttribute("style","visibility:visable");
        });
        
        
// ----------MOVED TO Line 12------------------
        
//        // TAKE PICTURE BTN CLICK LISTENER
//        document.getElementById("takePictureBtn").addEventListener("click", function(){
//            
//            navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
//                destinationType: Camera.DestinationType.FILE_URI });
//
//            function onSuccess(imageURI) {
//                var image = document.getElementById('myImage');
//                image.src = imageURI;
//            }
//
//            function onFail(message) {
//                alert('Failed because: ' + message);
//            }
//        });
        
//---------------------------------------------
        
        // DELETE REVIEW BTN CLICK LISTENER
        var deleteBtns = document.querySelectorAll(".deleteReviewBtn");
        for(var i = 0; i < deleteBtns.length; i++){
            
            deleteBtns[i].addEventListener("click", function(ev){
                
                let deleteClick = this.id;
                console.log("deleting:" + deleteClick);
                
                let storageList = JSON.parse(localStorage.getItem(key));
                
                        
                for(var i = 0; i < storageList.reviews.length; i++){
                    
                    if(storageList.reviews[i].id == deleteClick){
                        
                        
                        console.log("deleting: " + storageList.reviews[i].id + "It Matches: " + deleteClick);
                        
                        // delete
                        var obj = storageList.reviews[i];
                        
                        if(storageList.reviews.indexOf(obj.id) !== deleteClick){
                            storageList.reviews.splice(i, 1);
                        }
                        
                        console.log(JSON.stringify(storageList));
                        
                    }
                }
                
                localStorage.setItem(key, JSON.stringify(storageList));
                document.getElementById("review-list").innerHTML = "";
                app.showList();
                document.getElementById("viewReviewModal").classList.remove("active");
            });
        }
        
        // SAVE REVIEW BTN CLICK LISTENER
        document.getElementById("saveReviewBtn").addEventListener("click", function(){
            
            console.log("saving...");
                                                                  
            
            
            let storage = JSON.parse(localStorage.getItem(key));
            
            let name = document.getElementById("itemInput").value;
            
            // calculate rating based on stars
            let thisRating = rating;
                                                                  
            // TODO: get picture from camera
            //let img = "img/item.png"
            let img = imageLocation;
            
            if(name == "" || imageLocation == ""){
                
                document.getElementById("errorLabel").innerHTML = "All Fields Required.";
                
                setTimeout(function () {
                    document.getElementById("errorLabel").innerHTML = "";
                }, 2000);
                
                
            }
            else{
            
                let timestamp = Date.now();
    
                storage.reviews.push({

                    id: timestamp,
                    name: name,
                    rating: thisRating,
                    img: img

                });
                
                document.getElementById("savedLabel").innerHTML = "Review Saved."
                                                                  
                let picture = document.getElementById("picPreview");
                let di = document.querySelector(".picHere");
                                                                  
                di.removeChild(picture);
                                                                  
                setTimeout(function () {
                    localStorage.setItem(key, JSON.stringify(storage));
                    document.getElementById("review-list").innerHTML = "";
                    document.getElementById("errorLabel").innerHTML = "";
                    document.getElementById("savedLabel").innerHTML = "";
                    imageLocation = "";
                    app.showList();
                    document.getElementById("reviewModal").classList.remove("active");
                }, 2000);
            }
        });
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
