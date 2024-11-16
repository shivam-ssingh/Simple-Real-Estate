function displayListings() {
  fetch("./Data/Listing.json")
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("listing-container");

      data.forEach((listing) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
                  <img src=${listing.featuredImage}>
                  <div class="card-content">
                  <h2>${listing.name}</h2>
                  <p>Location: ${listing.location}</p>
                  <p>Price: ${listing.price}</p>
                  </div>
                  <button onclick="viewDetails(${listing.id})">View Details</button>
              `;
        container.appendChild(card);
      });
    });
}

function viewDetails(id) {
  selectedId = id;
  window.location.href = `details.html#id=${id}`;
}

function displayDetails() {
  const detailsContainer = document.getElementById("details-container");

  fetch("./Data/Listing.json")
    .then((res) => res.json())
    .then((data) => {
      let selectedListing = data.filter((l) => {
        return l.id == getHashParam("id");
      })[0];

      if (selectedListing) {
        let imageList = "";
        for (i = 0; i < selectedListing.otherMedia.length; i++) {
          imageList += `<li class= "detail-image"><img class="feature-image" src=${selectedListing.otherMedia[i].src}></li> `;
        }
        const finalImageList = `<ul class="detail-image-list">${imageList}</ul>`;

        const detailSection = `<div class="detail-content">
                <h2>${selectedListing.name}</h2>
                <p>Location: ${selectedListing.location}</p>
                <p>Price: ${selectedListing.price}</p>
                <p>Description: ${selectedListing.description}</p>
                <button onclick="openForm( ${selectedListing.id})">Book Appointment</button>
                </div>
            `;
        detailsContainer.innerHTML = finalImageList + detailSection;
      } else {
        detailsContainer.innerHTML = "<p>No listing found.</p>";
      }
    });
}

function getHashParam(param) {
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  return hashParams.get(param);
}

function bookAppointment(id, name) {
  window.location.href = `appointment.html#id=${id}`;
  //   alert("Appointment booked!");
}

// Display listings on home page
if (document.getElementById("listing-container")) {
  displayListings();
}

// Display details on details page
if (document.getElementById("details-container")) {
  displayDetails();
}

function openForm() {
  if (document.getElementById("booking-form")) {
    document.getElementById("booking-form").style.display = "block";
  }
}

function closeForm() {
  if (document.getElementById("booking-form")) {
    document.getElementById("mainForm").reset();
    document.getElementById("booking-form").style.display = "none";
  }
}

function showAlert(event) {
  event.preventDefault();
  console.log(event);

  const formData = new FormData(event.target);
  const dataObject = Object.fromEntries(formData.entries());

  console.log(dataObject);

  alert("Form submitted successfully!");
  closeForm();
  showAppointment(dataObject);
}

function showAppointment(form) {
  const appointmentTable = document.createElement("div");
  appointmentTable.className = "booking-table";
  const appointmentDateTimeHTML = `
    <p> Your appointment is: </p>
    <table id="dataTable">
    <thead>
        <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
        </tr>
    </thead>
    <tbody>
      <td>${form.name}</td>
      <td>${form.date}</td>
      <td>${form.time}</td>
    </tbody>
    </table>
`;
  appointmentTable.innerHTML = appointmentDateTimeHTML;

  document.getElementById("details-container").append(appointmentTable);
}
