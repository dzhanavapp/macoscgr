#!/usr/bin/env node
const axios = require("axios");
const read = require("read");

let userName = process.argv[2];
let repoName = process.argv[3];

if (repoName && userName) {
  read({ prompt: "Password for " + userName + " : ", silent: true }, function(
    er,
    password
  ) {
    if (!er) {
      axios
        .post(
          "https://api.github.com/user/repos",
          { name: repoName },
          {
            auth: {
              username: userName,
              password: password
            }
          }
        )
        .then((req, res) => {
          let link = "https://github.com/" + userName + "/" + repoName;
          console.log("Done. Repository has created");
          console.log(link + "\nCopied in clipboard");

          pbcopy(link);
        })
        .catch(err => {
          console.error("Error");
          console.log("Example : cgr <username> <reponame> ");
        });
    } else {
      console.log(er);
    }
  });
} else {
  console.log("Example : cgr <username> <reponame> ");
}

function pbcopy(data) {
  var proc = require("child_process").spawn("pbcopy");
  proc.stdin.write(data);
  proc.stdin.end();
}
