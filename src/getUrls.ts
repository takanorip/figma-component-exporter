import { Client, Node } from "figma-js";

interface Url {
  image: string;
  name: string;
}

export interface UrlObject {
  urls: Array<Url>;
  message: string;
}

export const getUrls = async (
  token: string,
  fileKey: string
): Promise<UrlObject> => {
  return new Promise((resolve, reject) => {
    const client = Client({
      personalAccessToken: token
    });
    client
      .file(fileKey)
      .then(({ data }) => {
        let components = {};
        const check = (c: Node) => {
          if (c.type === "COMPONENT") {
            const { name, id } = c;

            components[id] = {
              name
            };
          } else if (
            c.type === "INSTANCE" ||
            c.type === "DOCUMENT" ||
            c.type === "FRAME" ||
            c.type === "GROUP" ||
            c.type === "CANVAS"
          ) {
            if (c.children) {
              c.children.forEach(check);
            } else {
              return;
            }
          }
        };
        data.document.children.forEach(check);
        return components;
      })
      .then(components => {
        if (Object.values(components).length === 0) {
          resolve({
            urls: [],
            message: "No components found!"
          });
        } else {
          return client
            .fileImages(fileKey, {
              format: "jpg",
              ids: Object.keys(components),
              scale: 1
            })
            .then(({ data }) => {
              for (const id of Object.keys(data.images)) {
                components[id].image = data.images[id];
              }
              resolve({
                urls: Object.values(components),
                message: ""
              });
            });
        }
      });
  });
};
