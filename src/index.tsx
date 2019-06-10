import React, { useState, Fragment } from "react";
import { render } from "react-dom";
import { FileImageParams } from "figma-js";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
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
    input: {
      marginBottom: 16
    },
    paper: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    formControl: {
      marginBottom: 32,
      minWidth: 120
    },
    table: {
      minWidth: 650
    },
    figure: {
      width: 240,
      height: 180,
      margin: 0
    },
    image: {
      height: "100%",
      width: "100%",
      objectFit: "contain"
    }
  })
);

const App = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [fileKey, setFileKey] = useState<string>("");
  const [format, setFormat] = useState<FileImageParams["format"]>("jpg");
  const [urlObject, setUrlObject] = useState<UrlObject | null>(null);
  const onSubmit = (
    token: string,
    fileKey: string,
    format: FileImageParams["format"]
  ) => {
    setIsLoading(true);
    getUrls(token, fileKey, format).then((data: UrlObject) => {
      setUrlObject({
        urls: Object.values(data.urls),
        message: data.message
      });
      setIsLoading(false);
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
          className={classes.input}
        />
        <TextField
          id="key"
          label="Your file key"
          value={fileKey}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFileKey(event.target.value)
          }
          fullWidth
          className={classes.input}
        />
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="format">Format</InputLabel>
            <Select
              value={format}
              onChange={(
                event: React.ChangeEvent<{ name?: string; value: unknown }>
              ) => setFormat(event.target.value as FileImageParams["format"])}
              inputProps={{
                name: "age",
                id: "format"
              }}
            >
              <MenuItem value="jpg">jpg</MenuItem>
              <MenuItem value="png">png</MenuItem>
              <MenuItem value="svg">svg</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSubmit(token, fileKey, format)}
          disabled={!fileKey || !token || isLoading}
        >
          Get URLs
        </Button>
        <section>
          <h2>Result</h2>
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>component name</TableCell>
                  <TableCell>URL</TableCell>
                  <TableCell>Image</TableCell>
                </TableRow>
              </TableHead>
              {urlObject ? (
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
                        <figure className={classes.figure}>
                          <img className={classes.image} src={u.image} alt="" />
                        </figure>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : null}
            </Table>
          </Paper>
          {isLoading ? <p>loading...</p> : null}
        </section>
      </Container>
    </Fragment>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
