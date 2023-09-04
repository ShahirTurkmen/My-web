import React from 'react'
import ReactDOM from 'react-dom/client'
// import ReactrouterDOM from 'react-router-dom'
const { useState, useEffect, useRef } = React;
const clientID = "t-FQWYk2PUt13LidWIblzu7SNd9HVOQsK3QA7Lg1Mg4";
const utm = "?utm_source=scrimba_degree&utm_medium=referral"
var API_KEY = 'NpRvp4rxQt7jYkbu95fWvCMrZKxyQKlWcNZfzeopGfI';


const loadData = (options) => {
  fetch(options.url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){ 
       if (options.onSuccess) options.onSuccess(data)
    })
}

const App = (props) => {
  let [photos, setPhotos] = useState([]);
  
  let [Shah, setQuery] = useState("kaba");
  const queryInput = useRef(null);

  const numberOfPhotos = 20;
  const url =
    "https://api.unsplash.com/photos/random/?count=" +
    numberOfPhotos +
    "&client_id=" +
    clientID;

  useEffect(() => {
    const photosUrl = Shah ? `${url}&query=${Shah}` : url;

    loadData({
      url: photosUrl,
      onSuccess: res => {
        setPhotos(res);
      }
    });
  }, [Shah, url]);

  const searchPhotos = e => {
    e.preventDefault();
    setQuery(queryInput.current.value);
  };
  
  return (
        <>
    <div className="box">
      <h2>{props.emoji}</h2>
      <h1>{props.name}'s website</h1>
      <div className="grid">
      { Shah ?
          photos.map(photo => {
          return (
            <div key={photo.id} className="item">
              <img
                className="img"
                src={photo.urls.regular}
              />
              <div className="caption">
                <span className="credits">Photo by 
                  <a href={photo.user.links.html + utm}>   {photo.user.name} 
                  </a>
                  <span> on </span> 
                  <a href={"https://unsplash.com" + utm}>
                    Unsplash
                  </a>
                </span>
              </div>
            </div>
            );
        }) : ""}
      </div>
    </div>
     </>
  );
};

// ReactDOM.render(<App name="Muhammad Shahir Turkmen" emoji="🎉"/>, document.getElementById("root"));
ReactDOM.createRoot(document.getElementById("root")).render(<App name="Muhammad Shahir Turkmen" emoji="👋"/>)
