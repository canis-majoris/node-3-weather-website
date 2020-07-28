const weatherSearchForm = document.getElementById("weatherSearchForm");
const message1 = document.getElementById("message-1");
const message2 = document.getElementById("message-2");

weatherSearchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const location = formData.get("location");
  if (location) {
    message1.textContent = "Loading..";
    message2.textContent = "";
    fetch(`/weather?address=${location}`).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            message1.textContent = data.error;
            message2.textContent = "";
          } else {
            message1.textContent = data.forecast;
            message2.textContent = data.location;
          }
        });
      }
    );
  }
});
