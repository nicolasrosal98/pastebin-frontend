import React, { useState, useEffect } from "react";
import OnePaste from "./OnePaste";
import { Paste } from "./OnePaste";

function MainBody(): JSX.Element {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string | null>(null);
  const [pasteList, setPasteList] = useState<Paste[]>([]);
  const [displayPaste, setDisplayPaste] = useState<string>("");

  useEffect(() => {
    const fetchEpisodes = async () => {
      const response = await fetch(
        "https://pastebin-kasianico.herokuapp.com/pastes"
      );
      const jsonBody: Paste[] = await response.json();
      setPasteList(jsonBody);
    };

    fetchEpisodes();
  }, []);

  const onSubmitButton = async () => {
    const titlePaste = { title };
    const bodyPaste = { body };
    await fetch("https://pastebin-kasianico.herokuapp.com/paste", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paste_title: titlePaste.title,
        paste_body: bodyPaste.body,
      }),
    });
  };

  const listPaste = pasteList
    .slice(pasteList.length - 10, pasteList.length)
    .reverse()
    .map((paste, index) => (
        <div onClick={() => setDisplayPaste(paste.paste_body)} key={index} className="card">
            <OnePaste
            id={paste.id}
            paste_title={paste.paste_title}
            paste_body={paste.paste_body}
            />   
        </div>
    ));

  return (
    <>
      <form>
        <input
          type="text"
          className="title"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Paste Title"
        ></input>
        <br />
        <textarea
            className="body"
            onChange={(e) => {
                setBody(e.target.value);
              }}
            placeholder="Paste Body"
            required
        />
        <button onClick={onSubmitButton}>Submit</button>
      </form>
      <div className="grid">{listPaste}</div>
      <p>{displayPaste.split("\n").map(function(item, index) {
            return (
                <li key={index} className="multiline-list">
                    {item}
                    <br/>
                </li>
        )})}</p>
    </>
  );
}

export default MainBody;
