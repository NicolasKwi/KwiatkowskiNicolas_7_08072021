import axios from "axios";
import React, { useState } from "react";
import EnteteCard from "./card/EnteteCard";
import PiedCard from "./card/PiedCard";
import { getProfilUser } from "./utils";

const Article = ({ post }) => {
  const profilUser = getProfilUser();

  const [postContent] = useState(post.article.content);
  const [postimg] = useState(post.article.img);
  const [postlien] = useState(post.article.lien);

  const [postContentmodif, setPostContentmodif] = useState(
    post.article.content
  );
  const [postimgmodif, setPostimgmodif] = useState(post.article.img);
  const [postlienmodif, setPostlienmodif] = useState(post.article.lien);
  const [file, setFile] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  //selection de l'image
  const handlePicture = (e) => {
    setPostimgmodif(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  //update de l'article modifier
  const handlePostUpdate = () => {
    if (
      postContentmodif !== postContent ||
      postimg !== postimgmodif ||
      postlien !== postlienmodif
    ) {
      const data = new FormData();
      data.append("profilId", profilUser.id);
      data.append("content", postContentmodif);
      data.append("lien", postlienmodif);
      data.append("img", postimgmodif);
      if (file) data.append("image", file);

      //api update article
      axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}/api/post/${post.article.id}`,
        data: data,
        headers: {
          Authorization: `bearer ${profilUser.token}`,
        },
      })
        .then(() => {
          setIsEdit(false);
          document.location.reload();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  //supprime l'article
  const handlePostDelete = () => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/post/${post.article.id}`,
      data: { profilId: profilUser.id },
      headers: {
        Authorization: `bearer ${profilUser.token}`,
      },
    })
      .then(() => {
        document.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <li className="article">
      <div>
        <EnteteCard post={post} key={`entetecard_${post.article.id}`} />
      </div>
      {post.article.profilId === profilUser.id && (
        <div className="icon_boutton_article">
          <img
            src="./img/icons/edit.svg"
            alt="Bouton édition d'article"
            title="Editer"
            onClick={() => {
              setPostContentmodif(postContent);
              setIsEdit(!isEdit);
            }}
          />
          <img
            src="./img/icons/trash.svg"
            alt="Bouton de suppression d'article"
            title="Supprimer"
            onClick={() => handlePostDelete()}
          />
        </div>
      )}
      {isEdit ? (
        <div className="edition_article">
          <textarea
            rows="5"
            defaultValue={postContentmodif}
            onChange={(e) => setPostContentmodif(e.target.value)}
          ></textarea>
          <div className="edition_image">
            {postimgmodif && (
              <img
                className="article_image"
                src={postimgmodif}
                alt="Fichier séléctioné"
              />
            )}
            <div className="image_modif">
              <input
                type="file"
                id={`image_${post.article.id}`}
                name="image"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => handlePicture(e)}
              />
              {postimgmodif && (
                <button
                  onClick={() => {
                    setPostimgmodif("");
                    setFile("");
                    document.getElementById(`image_${post.article.id}`).value =
                      "";
                  }}
                >
                  supprimer image
                </button>
              )}
            </div>
          </div>
          <div className="lien_modif">
            <label htmlFor={`lienmodif_${post.article.id}`}>Lien :</label>
            <input
              type="text"
              id={`lienmodif_${post.article.id}`}
              onChange={(e) => {
                setPostlienmodif(e.target.value);
              }}
              value={postlienmodif}
            />
          </div>
          <div className="edit_mess_button">
            <button onClick={() => handlePostUpdate()}>Enregistrer</button>
            <button onClick={() => setIsEdit(false)}>Annuler</button>
          </div>
        </div>
      ) : (
        <div className="affichage_article">
          <p>{postContent}</p>
          {postimg && (
            <img
              className="article_image"
              alt="Photographie de l'article"
              src={postimg}
            />
          )}
          {postlien && <a href={postlien}>{postlien}</a>}
        </div>
      )}

      <PiedCard post={post} key={`piedscard_${post.article.id}`} />
    </li>
  );
};

export default Article;
