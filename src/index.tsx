import React, { useState, Fragment } from "react";
import { render } from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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
    <Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <h1>Get Exported URL Figma Components</h1>
        <TextField
          id="token"
          label="Your token"
          value={token}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setToken(event.target.value)
          }
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="key"
          label="Your file key"
          value={fileKey}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFileKey(event.target.value)
          }
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSubmit(token, fileKey)}
        >
          Get URLs
        </Button>
        <section>
          <h2>URLs</h2>
          {urlObject ? (
            <ul>
              {urlObject.urls.map(u => (
                <li key={u.name}>
                  <p>name: {u.name}</p>
                  <p>url: {u.image}</p>
                  <figure>
                    <img src={u.image} alt="" />
                  </figure>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      </Container>
    </Fragment>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
