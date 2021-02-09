let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
const port = 8881;
const innerURL = `http://127.0.0.1:${port}`;
const innerPostPath = "/post/projectData";
const innerGetPath = "/get/projectData";
const apiURL = "http://api.openweathermap.org/data/2.5/weather";
const key = "0165b8ab24e6d31dcb94770fa93438ba";
let innerApiResult = null;

const init = () => {
  const zipInput = document.querySelector("#zip");
  const feelingInput = document.querySelector("#feelings");
  const generateBtn = document.querySelector("#generate");
  const entryHolder = document.querySelector("#entryHolder");

  const apiFetchData = async (apiURL, data, key) => {
    console.log(`${apiURL}?zip=${data}&appid=${key}`);
    try {
      const res = await fetch(`${apiURL}?zip=${data}&appid=${key}`);
      return res;
    } catch (err) {
      console.log("error", err);
    }
  };

  const innerFetchPostData = async (innerURL, data) => {
    console.log(`${innerURL}${innerPostPath}`);
    try {
      const res = await fetch(`${innerURL}${innerPostPath}`, {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return res;
    } catch (err) {
      console.log("error", err);
    }
  };

  const innerFetchGetData = async (innerURL) => {
    console.log(`${innerURL}${innerGetPath}`);
    try {
      const res = await (await fetch(`${innerURL}${innerGetPath}`)).json();
      return res;
    } catch (err) {
      console.log("error", err);
    }
  };

  const bindEvent = () => {
    generateBtn.addEventListener("click", async function (e) {
      const zip = zipInput.value;

      try {
        const apiResult = await (await apiFetchData(apiURL, zip, key)).json();
        console.log("apiResult", apiResult);
        const res = await innerFetchPostData(innerURL, {
          content: feelingInput.value,
          temp: apiResult.main.temp,
          date: newDate,
        });
        innerApiResult = await innerFetchGetData(innerURL);
        console.log("innerapi", innerApiResult);
        if (Object.keys(innerApiResult).length) {
          Object.keys(innerApiResult).forEach((i) => {
            entryHolder.querySelector(`#${i}`).innerHTML = innerApiResult[i];
          });
        }
      } catch (err) {
        console.log("error", err);
      }
    });
  };

  bindEvent();
};

init();
