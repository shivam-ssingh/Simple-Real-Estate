// const listings = [
//   {
//     id: 1,
//     title: "Luxury Apartment",
//     location: "New York",
//     price: "$500,000",
//     description: "A beautiful luxury apartment in the heart of New York.",
//   },
//   {
//     id: 2,
//     title: "Cozy Cottage",
//     location: "Vermont",
//     price: "$300,000",
//     description: "A cozy cottage surrounded by nature.",
//   },
//   {
//     id: 3,
//     title: "Modern House",
//     location: "California",
//     price: "$750,000",
//     description: "A modern house with all amenities.",
//   },
// ];

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
                  <h2>${listing.name}</h2>
                  <p>Location: ${listing.location}</p>
                  <p>Price: ${listing.price}</p>
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
                <button onclick="bookAppointment( ${selectedListing.id})">Book Appointment</button>
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

function showAlert(event) {
  console.log(event);
  alert("Form submitted successfully!");
}
