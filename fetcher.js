const request = require('request');
const fs = require("fs");
const readline = require('readline');
  
var rl = readline.createInterface(
     process.stdin, process.stdout);

const argv = process.argv.slice(2)
const URL = argv[0];
const PATH = argv[1]

console.log(URL);
request(URL, (error, response, body) => {
  if (error) {
    console.log(`HTTP error: ${response.status}`);
    return;
  }
  const content = response;
  // console.log(content);

  const exists = function(path) {
    if (fs.existsSync(path)) {
      console.log('Directory exists!');
      return true;
    } else {
      console.log('Directory not found.');
      return false;
    }
  }
  
  if (exists(argv[1])) {
    rl.question(`${PATH} file path already exists, wanna overwrite it? y/n \n`, (input) => {
      if (input === "n") {
        process.exit(); 
      } else {
        rl.pause(); 
        fs.writeFile(argv[1], JSON.stringify(content), err => {
          if (err) {
            console.error(err);
          }
          console.log(`Downloaded and saved ${JSON.stringify(content).length} bytes to ${argv[1]}`)
        });
      }
    });
  } else {
    fs.writeFile(argv[1], JSON.stringify(content), err => {
      if (err) {
        console.error(err);
      }
      console.log(`Downloaded and saved ${JSON.stringify(content).length} bytes to ${argv[1]}`);
      process.exit(); 
    });
  }

  // if (!exists(argv[1])) {
  //   console.log("hi");
  // }
});