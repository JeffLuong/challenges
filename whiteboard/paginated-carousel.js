/**
 * The goal of this whiteboard coding session is to build a paginated carousel that fetches
 * and renders 5 address options for a given user in a checkout experience. The carousel should
 * look something like this:
 *
 * +-----------------------------------------------------+
 * |                                                     |
 * |   Address Options:                                  |
 * |   +---------------------------------------------+   |
 * |   |    +---+   +---+   +---+   +---+   +---+    |   |
 * |   | << | A |   | B |   | C |   | D |   | E | >> |   |
 * |   |    +---+   +---+   +---+   +---+   +---+    |   |
 * |   +---------------------------------------------+   |
 * |                                                     |
 * +-----------------------------------------------------+
 *
 * Each item (represented in A-E) is an address option that looks something like this:
 *
 * +--------------------+
 * |  James Bob         |
 * |  123 Everlane Dr.  |
 * |  Brooklyn, NY      |
 * |  11212             |
 * +--------------------+
 */

/*
  HTML Markup:

  <section class="carousel-container">
    <h3>Addresses</h3>
    <div class="carousel">
      <button onclick="rotate(-1)"><<</button>
      <div class="carousel-items" />
      <button onclick="rotate(1)">>></button>
    </div>
  </section>
 */

/*
  JSON Data structure:

  {
    "skip": 0,
    "limit": 5,
    "total": 25,
    "addresses": [
      {
        "name": "James Bob",
        "street": "123 Everlane Dr.",
        "city": "Brooklyn",
        "state": "NY",
        "zip": 11212
      }
    ]
  }
*/

// Carousel script on page load:
(function() {
  const url = 'https://some-address-endpoint.baz/addresses?user=123'
  const limit = 5;
  let skip = 0;

  async function fetchAddresses(_skip, _limit) {
    try {
      const req = await fetch(`${url}&skip=${_skip}&limit=${_limit}`);
      return req.json();
    } catch (e) {
      throw e;
    }
  }

  function renderAddresses(addresses) {
    // Address grouped container
    const container = document.createElement('div');

    addresses.forEach(address => {
      const element = document.createElement('article');
      const { name, street, city, state, zip } = address;
      const text = [name, street, city, state, zip].reduce((a, c) => {
        const p = document.createElement('p');
        p.innerText = c;
        return [...a, c];
      }, []);

      text.reverse().forEach(p => element.appendChild(p));
      container.appendChild(element);
    });
  }

  function fetchAndRender(_skip, _limit) {
    try {
      fetchAddresses(_skip, _limit)
      .then(adds => renderAddresses(adds));
    } catch (e) {
      // render error
    } finally {
      skip = _limit;
    }
  }

  function rotate(value) {
    if (value > 0) {
      // animat carousel forwards and render loading state
      fetchAndRender(skip, limit);
    } else {
      // animate carousel backwards
    }
  }

  fetchAndRender(skip, limit);
})();