import React, { useState, useEffect } from "react";
import OnePaste from "./OnePaste";
import { Paste } from "./OnePaste";

function MainBody(): JSX.Element {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [pasteList, setPasteList] = useState<Paste[]>([]);
  const [displayPaste, setDisplayPaste] = useState({ body: "", title: "" });

  useEffect(() => {
    const fetchEpisodes = async () => {
      const response = await fetch(
        "https://pastebin-kasianico.herokuapp.com/pastes/"
      );
      const jsonBody = await response.json();
      setPasteList(jsonBody.data);
    };

    fetchEpisodes();
  }, []);

  const onSubmitButton = async () => {
    try {
      const titlePaste = { title };
      const bodyPaste = { body };
      if (typeof bodyPaste.body === "string" && bodyPaste.body.length > 0) {
        await fetch("https://pastebin-kasianico.herokuapp.com/paste", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paste_title: titlePaste.title,
            paste_body: bodyPaste.body,
          }),
        });
      }
      console.log(body);
    } catch (err) {
      console.error(err);
    }
  };

  let listPaste;
  if (pasteList.length < 10) {
    listPaste = pasteList.reverse().map((paste, index) => (
      <div
        onClick={() =>
          setDisplayPaste({ body: paste.paste_body, title: paste.paste_title })
        }
        key={index}
        className="card-paste"
      >
        <OnePaste
          id={paste.id}
          paste_title={paste.paste_title}
          paste_body={paste.paste_body}
        />
      </div>
    ));
  } else {
    listPaste = pasteList
      .slice(pasteList.length - 10, pasteList.length)
      .reverse()
      .map((paste, index) => (
        <div
          onClick={() =>
            setDisplayPaste({
              body: paste.paste_body,
              title: paste.paste_title,
            })
          }
          key={index}
          className="card-paste"
        >
          <OnePaste
            id={paste.id}
            paste_title={paste.paste_title}
            paste_body={paste.paste_body}
          />
        </div>
      ));
  }

  return (
    <>
      <form>
        <input
          type="text"
          className="form-title-input"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Paste Title"
        ></input>
        <br />
        <textarea
          className="form-body-input"
          onChange={(e) => {
            setBody(e.target.value);
          }}
          placeholder="Paste Body"
          required
        />
        <button onClick={onSubmitButton} className="submit-button">
          Submit
        </button>
      </form>
      <div className="body">
        <div>
          <h2>History of Pastes</h2>
          <div className="grid-pastes">{listPaste}</div>
        </div>
        <div>
          <h2>Full Paste</h2>
          <div className="card-full">
            <h2>{displayPaste.title}</h2>
            <p className="p-form">
              {displayPaste.body.split("\n").map(function (item, index) {
                return (
                  <li key={index} className="multiline-list">
                    {item}
                    <br />
                  </li>
                );
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainBody;
