// PRUEBA FINAL ->
$("#search-form").submit(evt => {
  evt.preventDefault();
  getJobs()
    .then(res => renderJobs(res))
    .catch(err => console.log(err));
});

const getSearchParams = () => {
  let params = {
    desc: $("#description").val(),
    location: $("#location").val()
  };
  return params;
};

const getJobs = async () => {
  const baseUrl = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?";
  const { desc, location } = getSearchParams();
  const url = `${baseUrl}description=${desc}&location=${location}`;
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  };
  const response = await axios.get(url, config);
  console.log(response.data);
  return response.data;
};

const renderJobs = jobList => {
  for (let job of jobList) {
    let { title, url, type, company, location, description } = job;
    $("#job-list").append(`
      <tr>
        <td><a href=${url}>${title}</a></td>
        <td>${type}</td>
        <td>${company}</td>
        <td>${location}</td>
        <td>${description}</td>
      </tr>
    `);
  }
};
