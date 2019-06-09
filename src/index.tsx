import React, { useState } from "react";
import { render } from "react-dom";
import { getUrls, UrlObject } from "./getUrls";

import "./styles.css";

const App = () => {
  const [token, setToken] = useState<string>("");
  const [fileKey, setFileKey] = useState<string | number>("");
  const [urlObject, setUrlObject] = useState<UrlObject | null>(null);
  const onSubmit = (token, fileKey) => {
    getUrls(token, fileKey).then((data: UrlObject) => {
      setUrlObject({
        urls: Object.values(data.urls),
        message: data.message
      });
    });
  };
  return (
    <div className="App">
      <h1>Get Exported URL Figma Components</h1>
      <div>
        <label htmlFor="token">Your token</label>
        <input
          id="token"
          type="text"
          value={token}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setToken(event.target.value)
          }
        />
      </div>
      <div>
        <label htmlFor="key">Your file key</label>
        <input
          id="key"
          type="text"
          value={fileKey}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFileKey(event.target.value)
          }
        />
      </div>
      <button onClick={() => onSubmit(token, fileKey)}>Get URLs</button>
      <div>
        <h2>URLs</h2>
        {urlObject ? (
          <ul>
            {urlObject.urls.map(u => (
              <li>
                <p>{u.name}</p>
                <p>{u.image}</p>
                <figure>
                  <img src={u.image} alt="" />
                </figure>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
