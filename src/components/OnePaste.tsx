export interface Paste {
  id: number;
  paste_title: string;
  paste_body: string;
}

function OnePaste(props: Paste): JSX.Element {
  return (
    <>
      <h1>{props.paste_title}</h1>
      <p>{props.paste_body}</p>
    </>
  );
}

export default OnePaste;
