/**
 * 🍵 Chai Stall Board - getElementById, querySelector, textContent
 *
 * Sharma ji ki chai stall hai station ke bahar. Unka rate board update
 * karna hai digitally. Cutting chai, masala chai, adrak chai - sabki
 * price dynamically change hoti rehti hai. getElementById se specific
 * chai ka price element dhundho, querySelector se stall ka naam dhundho,
 * aur textContent se values read/write karo.
 *
 * DOM Structure expected:
 *   <div class="chai-stall">
 *     <h1 class="stall-name">Sharma Chai Wala</h1>
 *     <div class="price-board">
 *       <p id="price-masala" class="chai-price" data-chai="masala">₹15</p>
 *       <p id="price-cutting" class="chai-price" data-chai="cutting">₹10</p>
 *       <p id="price-adrak" class="chai-price" data-chai="adrak">₹20</p>
 *     </div>
 *   </div>
 *
 * Functions:
 *
 *   1. updateChaiPrice(document, chaiType, newPrice)
 *      - Finds element with id "price-{chaiType}" using getElementById
 *      - Sets its textContent to "₹{newPrice}"
 *      - Returns true if element found and updated, false if not found
 *      - Validation: newPrice must be a number > 0, else return false
 *      - chaiType must be a non-empty string, else return false
 *
 *   2. getChaiPrice(document, chaiType)
 *      - Finds element with id "price-{chaiType}"
 *      - Reads textContent, removes "₹" prefix, parses to number
 *      - Returns the number price
 *      - Agar element not found, return null
 *
 *   3. updateStallName(document, newName)
 *      - Finds ".stall-name" element using querySelector
 *      - Saves old textContent, updates to newName
 *      - Returns old name string
 *      - Agar element not found, return null
 *      - Agar newName not string or empty, return null
 *
 *   4. highlightCheapestChai(document)
 *      - Finds all ".chai-price" elements using querySelectorAll
 *      - Parses each price (remove ₹, parse to number)
 *      - Adds class "cheapest" to the element with lowest price
 *      - Removes class "cheapest" from all other chai-price elements
 *      - Returns the data-chai attribute value of cheapest chai
 *      - Agar no chai-price elements found, return null
 *
 * Hint: document.getElementById("id") se specific element dhundho,
 *   document.querySelector(".class") se first matching element,
 *   document.querySelectorAll(".class") se saare matching elements.
 *
 * @example
 *   updateChaiPrice(document, "masala", 20);
 *   // => true (element with id "price-masala" now shows "₹20")
 *
 *   getChaiPrice(document, "masala");
 *   // => 20
 *
 *   updateStallName(document, "Sharma Premium Chai");
 *   // => "Sharma Chai Wala" (old name returned)
 *
 *   highlightCheapestChai(document);
 *   // => "cutting" (cheapest chai gets "cheapest" class)
 */
export function updateChaiPrice(document, chaiType, newPrice) {
  if (typeof chaiType !== "string" || chaiType.trim().length === 0) {
    return false;
  }

  if (typeof newPrice !== "number" || isNaN(newPrice) || newPrice <= 0) {
    return false;
  }

  const chaiPrice = document.getElementById(`price-${chaiType}`);

  if (!chaiPrice) {
    return false;
  }

  chaiPrice.textContent = `₹${newPrice}`;

  return true;
}

export function getChaiPrice(document, chaiType) {
  const elem = document.getElementById(`price-${chaiType}`);

  if (!elem) {
    return null;
  }

  const txtContent = elem.textContent;

  const withoutSymbol = txtContent.replace("₹", "");

  const price = parseFloat(withoutSymbol);

  return price;
}

export function updateStallName(document, newName) {
  if (typeof newName !== "string" || newName.trim().length === 0) {
    return null;
  }

  const elem = document.querySelector(".stall-name");

  if (!elem) {
    return null;
  }

  const oldTxtContent = elem.textContent;

  elem.textContent = newName;

  return oldTxtContent;
}

export function highlightCheapestChai(document) {
  const allElem = document.querySelectorAll(".chai-price");

  if (allElem.length === 0) {
    return null;
  }

  allElem.forEach((el) => {
    el.classList.remove("cheapest");
  });

  const cheapestElem = Array.from(allElem).reduce((prev, current) => {
    const withSymbol = current.textContent;

    let withoutSymbol = withSymbol.replace("₹", "");

    current.textContent = withoutSymbol;

    return Number(prev.textContent) < Number(current.textContent)
      ? prev
      : current;
  });

  cheapestElem.classList.add("cheapest");

  let returnData = cheapestElem.getAttribute("data-chai");

  return returnData;
}
