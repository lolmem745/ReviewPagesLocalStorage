document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    const reviewsContainer = document.getElementById('reviews-container');

    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};

    function displayProducts() {
        productsContainer.innerHTML = '';
        Object.keys(reviews).forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.textContent = product;
            productItem.addEventListener('click', () => displayReviews(product));
            productsContainer.appendChild(productItem);
        });
    }

    function displayReviews(product) {
        reviewsContainer.innerHTML = '';
        reviews[product].forEach((review, index) => {
            const reviewName = document.createElement('div');
            reviewName.className = 'review-name';
            reviewName.textContent = product;


            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            reviewItem.textContent = review;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-review';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteReview(product, index));

            reviewsContainer.appendChild(reviewName);
            reviewsContainer.appendChild(reviewItem);
            reviewsContainer.appendChild(deleteButton);
        });
    }

    function deleteReview(product, index) {
        reviews[product].splice(index, 1);
        if (reviews[product].length === 0) {
            delete reviews[product];
        }
        localStorage.setItem('reviews', JSON.stringify(reviews));
        displayProducts();
        reviewsContainer.innerHTML = '';
    }

    displayProducts();
});
