
const slots = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4"];
const bookings = [];
let selectedSlot = null;

const parkingGrid = document.getElementById("parkingGrid");
const message = document.getElementById("message");

function renderSlots() {
  parkingGrid.innerHTML = "";
  slots.forEach((slot) => {
    const slotDiv = document.createElement("div");
    slotDiv.textContent = slot;
    slotDiv.classList.add("slot");

    const isBooked = bookings.some(b => b.slot === slot && b.date === document.getElementById("date").value);

    if (slot === selectedSlot) {
      slotDiv.classList.add("selected");
    } else if (isBooked) {
      slotDiv.classList.add("booked");
    }

    slotDiv.addEventListener("click", () => {
      if (slotDiv.classList.contains("booked")) return;
      selectedSlot = slot;
      renderSlots();
    });

    parkingGrid.appendChild(slotDiv);
  });
}

document.getElementById("date").addEventListener("change", renderSlots);

document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (!selectedSlot) {
    message.style.color = "red";
    message.textContent = "Please select a slot!";
    return;
  }

  const alreadyBooked = bookings.some(
    b => b.slot === selectedSlot && b.date === date
  );

  if (alreadyBooked) {
    message.style.color = "red";
    message.textContent = "Slot already booked!";
  } else {
    bookings.push({ slot: selectedSlot, date, time });
    message.style.color = "green";
    message.textContent = `Slot ${selectedSlot} booked successfully!`;
    selectedSlot = null;
    renderSlots();
  }
});

document.getElementById("date").valueAsDate = new Date();
renderSlots();
