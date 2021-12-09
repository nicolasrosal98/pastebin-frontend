export interface Paste {
  id: number;
  paste_title: string;
  paste_body: string;
}

function OnePaste(props: Paste): JSX.Element {
  return (
    <button>
      <h1>{props.paste_title}</h1>
      <ul>
        {props.paste_body
          .split("\n")
          .slice(0, 5)
          .map(function (item, index) {
            return (
              <li key={index} className="multiline-list">
                {item}
                <br />
              </li>
            );
          })}
      </ul>
    </button>
  );
}

export default OnePaste;
