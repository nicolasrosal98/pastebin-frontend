import React, { useState, useEffect } from "react";
import OnePaste from "./OnePaste";
import { Paste } from "./OnePaste";


function MainBody(): JSX.Element {
    const [title, setTitle] = useState<string>("")
    const [body, setBody] = useState<string|null>(null)
    const [pasteList, setPasteList] = useState<Paste[]>([])
    
    useEffect(() => {
        const fetchEpisodes = async () => {
          const response = await fetch("https://pastebin-kasianico.herokuapp.com/pastes");
          const jsonBody: Paste[] = await response.json();
          setPasteList(jsonBody);
          console.log(jsonBody)
        };
    
        fetchEpisodes();
      }, []);

    const onSubmitButton = async () => {
        const titlePaste = { title }
        const bodyPaste = { body }
        await fetch("https://pastebin-kasianico.herokuapp.com/paste", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paste_title: titlePaste.title, paste_body: bodyPaste.body })
        });
    }

    const listPaste = pasteList.slice(pasteList.length - 10, pasteList.length).reverse().map((paste, index) =>
    <OnePaste
        id={paste.id}
        paste_title={paste.paste_title}
        paste_body={paste.paste_body}
        key={index}
    />
    )

    return (
        <>
            <form>
                <input
                    type="text"
                    className='title'
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Paste Title"
                >
                </input>
                <br />
                <input
                    type="text"
                    className='body'
                    onChange={(e) => { setBody(e.target.value) }}
                    placeholder="Paste Body"
                    required
                >
                </input>
                <button onClick={onSubmitButton} >
                    Submit
                </button>
            </form>
            {listPaste}
        </>
    );
}

export default MainBody;