import React, { useState, Fragment } from "react";
import { render } from "react-dom";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { getUrls, UrlObject } from "./getUrls";

import "./styles.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    table: {
      minWidth: 650
    }
  })
);

const App = () => {
  const classes = useStyles();
  const [token, setToken] = useState<string>("");
  const [fileKey, setFileKey] = useState<string>("");
  const [urlObject, setUrlObject] = useState<UrlObject | null>(null);
  const onSubmit = (token: string, fileKey: string) => {
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
      <Container maxWidth="lg">
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
          disabled={!fileKey || !token}
        >
          Get URLs
        </Button>
        <section>
          <h2>URLs</h2>
          {urlObject ? (
            <Paper className={classes.paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>component name</TableCell>
                    <TableCell>URL</TableCell>
                    <TableCell>Image</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {urlObject.urls.map(u => (
                    <TableRow key={u.name}>
                      <TableCell component="th" scope="row">
                        {u.name}
                      </TableCell>
                      <TableCell>
                        <a target="_blank" rel="noopener" href={u.image}>
                          {u.image}
                        </a>
                      </TableCell>
                      <TableCell>
                        <figure>
                          <img src={u.image} alt="" />
                        </figure>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          ) : null}
        </section>
      </Container>
    </Fragment>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
