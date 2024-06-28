document.addEventListener('DOMContentLoaded', () => {
    const submitReview = document.getElementById('submit-review');
    const productNameInput = document.getElementById('product-name');
    const reviewTextInput = document.getElementById('review-text');
    const errorMessage = document.getElementById('error-message');

    submitReview.addEventListener('click', () => {
        const productName = productNameInput.value.trim();
        const reviewText = reviewTextInput.value.trim();

        if (productName === '' || reviewText === '') {
            errorMessage.textContent = 'Product name and review text cannot be empty.';
            return;
        }

        if (reviewText.length < 50 || reviewText.length > 500) {
            errorMessage.textContent = 'Review must be between 50 and 500 characters.';
            return;
        }

        const reviews = JSON.parse(localStorage.getItem('reviews')) || {};

        if (!reviews[productName]) {
            reviews[productName] = [];
        }

        reviews[productName].push(reviewText);
        localStorage.setItem('reviews', JSON.stringify(reviews));

        productNameInput.value = '';
        reviewTextInput.value = '';
        errorMessage.textContent = '';

        alert('Review added successfully!');
    });
});
