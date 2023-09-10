const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const compiler = require("compilex");
const envData = { stats: true };
compiler.init(envData);
app.use(bodyParser.json());
// Serve static files from the specified directory
app.use("/codemirror-5.65.14", express.static("G:/Compiler/codemirror-5.65.14"));
// Serve the HTML file for the root route
app.get("/", function (req, res) {
    compiler.flush(function(){
        console.log("deleted")
    })
  res.sendFile("G:/Compiler/index.html"); // Provide the full file path here
})

// Handle the "compile" POST route
app.post("/compile", function (req, res) {
  var code = req.body.code;
  var input = req.body.input;
  var lang = req.body.lang;
  try {
    if (lang === "Cpp") {
      if (!input) {
        var compileOptions = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
        compiler.compileCPP(compileOptions, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        var compileOptions = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
        compiler.compileCPPWithInput(compileOptions, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    } else if (lang === "Java") {
      if (!input) {
        var compileOptions = { OS: "windows" };
        compiler.compileJava(compileOptions, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        var compileOptions = { OS: "windows" };
        compiler.compileJavaWithInput(compileOptions, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    } else if (lang === "Python") {
      if (!input) {
        var compileOptions = { OS: "windows" };
        compiler.compilePython(compileOptions, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        var compileOptions = { OS: "windows" };
        compiler.compilePythonWithInput(compileOptions, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    }
  } catch (e) {
    console.log("error");
  }
});

app.listen(8000);
