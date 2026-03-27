/**
 * 💒 Wedding Card Maker - Event Delegation
 *
 * Sharma ji ki beti ki shaadi ka digital card banana hai! Event delegation
 * use karke dynamic elements handle karo. Ek parent pe listener lagao,
 * aur child elements ke events handle karo. Jaise shaadi mein ek event
 * manager saare kaam coordinate karta hai, waise hi ek parent listener
 * saare child events manage karta hai.
 *
 * Functions:
 *
 *   1. setupGuestList(containerElement)
 *      - Sets up event delegation on containerElement for click events
 *      - Clicking any .remove-btn inside container removes its parent .guest-item
 *      - Returns object with:
 *        addGuest(name, side): creates div.guest-item with:
 *          - data-name attribute = name
 *          - data-side attribute = side ("bride" or "groom")
 *          - span with textContent = name
 *          - button.remove-btn with textContent "Remove"
 *          Appends to container. Returns the created element.
 *        removeGuest(name): finds .guest-item with data-name matching name,
 *          removes it. Returns true if found and removed, false otherwise.
 *        getGuests(): returns array of {name, side} objects from current
 *          .guest-item children in the container
 *      - Agar containerElement null/undefined, return null
 *
 *   2. setupThemeSelector(containerElement, previewElement)
 *      - Creates 3 button.theme-btn elements inside containerElement:
 *        "traditional", "modern", "royal" (textContent and data-theme)
 *      - Event delegation on containerElement: clicking any .theme-btn:
 *        - Sets previewElement.className to the clicked theme name
 *        - Sets previewElement's data-theme attribute to the theme name
 *      - Returns object with:
 *        getTheme(): returns previewElement's current data-theme value or null
 *      - Agar containerElement or previewElement null/undefined, return null
 *
 *   3. setupCardEditor(cardElement)
 *      - Event delegation on cardElement for click events
 *      - Clicking any element with [data-editable] attribute:
 *        - Removes "editing" class and contentEditable from any currently
 *          editing element inside cardElement
 *        - Sets clicked element's contentEditable = "true"
 *        - Adds class "editing" to clicked element
 *      - Clicking on cardElement itself (not on a [data-editable] child):
 *        - Removes "editing" class and contentEditable from any editing element
 *      - Returns object with:
 *        getContent(field): finds element with data-editable=field,
 *          returns its textContent. Returns null if not found.
 *      - Agar cardElement null/undefined, return null
 *
 * Hint: Event delegation means: ek parent pe listener lagao, then
 *   event.target se check karo ki actual click kahan hua. event.target.closest()
 *   use karo parent elements check karne ke liye.
 *
 * @example
 *   const container = document.createElement("div");
 *   const guestList = setupGuestList(container);
 *
 *   guestList.addGuest("Rahul", "groom");
 *   guestList.addGuest("Priya", "bride");
 *   guestList.getGuests();
 *   // => [{ name: "Rahul", side: "groom" }, { name: "Priya", side: "bride" }]
 *
 *   guestList.removeGuest("Rahul"); // => true
 *   guestList.getGuests();
 *   // => [{ name: "Priya", side: "bride" }]
 */
export function setupGuestList(containerElement) {
  if (!containerElement) return null;

  containerElement.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const item = e.target.closest(".guest-item");
      if (item) {
        item.remove();
      }
    }
  });

  return {
    addGuest: (name, side) => {
      const item = document.createElement("div");
      item.className = "guest-item";
      item.dataset.name = name;
      item.dataset.side = side;

      const sp = document.createElement("span");
      sp.textContent = name;
      item.appendChild(sp);

      const btn = document.createElement("button");
      btn.className = "remove-btn";
      btn.textContent = "Remove";
      item.appendChild(btn);

      containerElement.appendChild(item);
      return item;
    },
    removeGuest: (name) => {
      const guests = containerElement.querySelectorAll(".guest-item");
      for (const guest of guests) {
        if (guest.dataset.name === name) {
          guest.remove();
          return true;
        }
      }
      return false;
    },
    getGuests: () => {
      const guests = containerElement.querySelectorAll(".guest-item");
      const result = [];
      for (const guest of guests) {
        result.push({
          name: guest.dataset.name,
          side: guest.dataset.side
        });
      }
      return result;
    }
  };
}

export function setupThemeSelector(containerElement, previewElement) {
  if (!containerElement || !previewElement) return null;

  const themeList = ["traditional", "modern", "royal"];
  for (const t of themeList) {
    const btn = document.createElement("button");
    btn.className = "theme-btn";
    btn.textContent = t;
    btn.dataset.theme = t;
    containerElement.appendChild(btn);
  }

  containerElement.addEventListener("click", (e) => {
    const btn = e.target.closest(".theme-btn");
    if (btn) {
      const thm = btn.dataset.theme;
      previewElement.className = thm;
      previewElement.dataset.theme = thm;
    }
  });

  return {
    getTheme: () => previewElement.dataset.theme || null
  };
}

export function setupCardEditor(cardElement) {
  if (!cardElement) return null;

  cardElement.addEventListener("click", (e) => {
    const editableTarget = e.target.closest("[data-editable]");
    
    const curr = cardElement.querySelector(".editing");
    if (curr && curr !== editableTarget) {
      curr.classList.remove("editing");
      curr.contentEditable = "false";
    }

    if (editableTarget) {
      editableTarget.contentEditable = "true";
      editableTarget.classList.add("editing");
    }
  });

  return {
    getContent: (field) => {
      const el = cardElement.querySelector(`[data-editable="${field}"]`);
      return el ? el.textContent : null;
    }
  };
}
