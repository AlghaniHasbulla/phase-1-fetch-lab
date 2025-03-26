function fetchBooks() {
  return fetch("https://anapioficeandfire.com/api/books")  // Ensure it returns a Promise
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();  // Convert response to JSON
      })
      .then(data => {
          renderBooks(data);  // Pass data to renderBooks
      })
      .catch(error => console.error("Error fetching books:", error));
}

function renderBooks(books) {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = ""; // Clear existing list before adding new ones

  books.forEach(book => {
      const li = document.createElement("li");
      li.textContent = book.name; // Display book title
      bookList.appendChild(li);
  });
}
describe("fetchBooks", () => {
  it("sends a fetch request to 'https://anapioficeandfire.com/api/books'", () => {
      return fetchBooks().then(() => {
          expect(fetch).toHaveBeenCalledWith("https://anapioficeandfire.com/api/books");
      });
  });

  it("renders book titles into the DOM by passing a JSON object to renderBooks()", () => {
      return fetchBooks().then(() => {
          const books = document.getElementById("book-list").children;
          expect(books.length).toBeGreaterThan(0);
      });
  });
});


document.addEventListener('DOMContentLoaded', function() {
  fetchBooks();
});
