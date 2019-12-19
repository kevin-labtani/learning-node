fetch("http://localhost:3000/weather?address=charleroi")
  .then(resp => resp.json())
  .then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data.location);
      console.log(data.forecast);
    }
  });
