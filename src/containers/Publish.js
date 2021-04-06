// Import Packages
import React, { useState } from "react";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";

const Publish = ({ userToken }) => {
  const history = useHistory();

  const [preview, setPreview] = useState("");
  const [file, setFile] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState();
  const [color, setColor] = useState("");
  const [etat, setEtat] = useState("");
  const [location, setLocation] = useState("");

  // we perform an onSubmit function to send the data of the ad we want to publish

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();

      formData.append("picture", file);
      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", etat);
      formData.append("city", location);

      const response = await axios.post(
        `https://vinted-backend-luc.herokuapp.com/offer/publish`,

        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data._id) {
        history.push(`/offer/${response.data._id}`);
      } else {
        return alert("An error has occurred");
      }
    } catch (error) {
      return alert(error.message);
    }
  };
  return userToken ? (
    <div className="background-publish">
      <div className="publish-container">
        <h2 className="title">Vendez vos Articles</h2>

        <form onSubmit={onSubmit}>
          {preview ? (
            <div className="preview-img">
              <img src={preview} alt="" />
              <div
                onClick={(event) => {
                  setPreview("");
                }}
              >
                X
              </div>
            </div>
          ) : (
            <div className="import-image">
              <div>
                <label htmlFor="file" className="file">
                  + Ajoute une photo
                </label>
                <input
                  className="input-image"
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={(event) => {
                    setFile(event.target.files[0]);
                    // Preview the image when it is uploaded.
                    setPreview(URL.createObjectURL(event.target.files[0]));
                  }}
                />
              </div>
            </div>
          )}
          <div className="article-section1">
            <div className="titre-article">
              <h4>Titre</h4>
              <input
                type="text"
                placeholder=" ex: Chaussure Nike noir 43 "
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="input-text">
              <h4>Décrivez votre article</h4>
              <textarea
                className="textarea"
                placeholder="ex: Quasiment neuve"
                maxLength="100"
                rows="3"
                cols="3"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="article-section2">
            <div>
              <h4>Marque de l'article</h4>
              <input
                type="text"
                placeholder="ex: Nike Air Max"
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div>
              <h4>Taille de l'article</h4>
              <input
                type="text"
                placeholder="ex: Pointure 43"
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div>
              <h4>Couleur de l'article</h4>
              <input
                type="text"
                placeholder="ex: Noir"
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div>
              <h4>État de l'article</h4>
              <input
                type="text"
                placeholder="ex: Porté une fois"
                onChange={(event) => {
                  setEtat(event.target.value);
                }}
              />
            </div>
            <div>
              <h4>Lieu</h4>
              <input
                type="text"
                placeholder="ex: Paris"
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="article-section3">
            <div>
              <h4>Prix de larticle</h4>
              <input
                type="number"
                placeholder="10"
                min={0}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>
          </div>

          <div className="button">
            <button type="submit">ajouter</button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Redirect to="/user/login" />
  );
};

export default Publish;
