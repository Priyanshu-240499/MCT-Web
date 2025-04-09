const productList = document.getElementById("productList");
    const searchInput = document.getElementById("searchInput");
    const minPriceInput = document.getElementById("minPrice");
    const maxPriceInput = document.getElementById("maxPrice");
    const categorySelect = document.getElementById("categoryFilter");
    const checkboxes = document.querySelectorAll(".filter-checkbox");
    const searchForm = document.getElementById("searchForm");
    const logoutBtn = document.getElementById("logoutBtn");
    let allProducts = [];

    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        allProducts = data;
        displayProducts(allProducts);
      })
      .catch(err => {
        console.error("Failed to load products:", err);
        productList.innerHTML = "<p>Failed to load products.</p>";
      });

    function displayProducts(products) {
      productList.innerHTML = "";
      products.forEach(product => {
        const item = document.createElement("div");
        item.className = "product";
        item.innerHTML = `
          <img src="${product.image}" alt="${product.title}" />
          <h3>${product.title}</h3>
          <p>$${product.price}</p>
          <button onclick="viewDetails(${product.id})">View Details</button>
        `;
        productList.appendChild(item);
      });
    }

    function viewDetails(id) {
      localStorage.setItem("selectedProductId", id);
      window.location.href = "product.html";
    }

    function filterProducts() {
      const query = searchInput.value.toLowerCase();
      const min = parseFloat(minPriceInput.value) || 0;
      const max = parseFloat(maxPriceInput.value) || Infinity;
      const selectedCategory = categorySelect.value;
      const checkedFilters = [...checkboxes].filter(cb => cb.checked).map(cb => cb.value);

      const filtered = allProducts.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
        const matchesPrice = p.price >= min && p.price <= max;
        const matchesCategory = !selectedCategory || p.category === selectedCategory;
        const matchesCheckbox = checkedFilters.length === 0 || checkedFilters.includes(p.category);
        return matchesSearch && matchesPrice && matchesCategory && matchesCheckbox;
      });

      displayProducts(filtered);
    }

    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      filterProducts();
    });

    checkboxes.forEach(cb => cb.addEventListener("change", filterProducts));

    searchInput.addEventListener("input", filterProducts);
    minPriceInput.addEventListener("input", filterProducts);
    maxPriceInput.addEventListener("input", filterProducts);
    // categorySelect.addEventListener("change", filterProducts);

    document.getElementById("toggleTheme").addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      document.getElementById("toggleTheme").textContent = newTheme === "dark" ? "☀️" : "🌙";
    });

    function displayProducts(products) {
        productList.innerHTML = "";
        const liked = JSON.parse(localStorage.getItem("likedProducts")) || [];
      
        products.forEach(product => {
          const isLiked = liked.includes(product.id);
          const item = document.createElement("div");
          item.className = "product";
      
          item.innerHTML = `
            <img src="${product.image}" alt="${product.title}" />
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button onclick="viewDetails(${product.id})">View Details</button>
            <button class="like-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike(${product.id}, this)">
              ❤️
            </button>
          `;
      
          productList.appendChild(item);
        });
      }

      function toggleLike(productId, btn) {
        let liked = JSON.parse(localStorage.getItem("likedProducts")) || [];
      
        if (liked.includes(productId)) {
          liked = liked.filter(id => id !== productId);
          btn.classList.remove("liked");
        } else {
          liked.push(productId);
          btn.classList.add("liked");
        }
      
        localStorage.setItem("likedProducts", JSON.stringify(liked));
      }
    

  logoutBtn.addEventListener("click", () => {
    alert("You have been logged out.");
    window.location.href = "login.html"; // redirect to login page
  });


      