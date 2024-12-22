$(document).ready(() => {
    const savedTheme = localStorage.getItem('theme') || 'theme-light';
    $('body').removeClass('theme-light theme-dark').addClass(savedTheme);
  
    $('#themeSwitcher').click(() => {
      const currentTheme = $('body').hasClass('theme-light') ? 'theme-light' : 'theme-dark';
      const newTheme = currentTheme === 'theme-light' ? 'theme-dark' : 'theme-light';
      $('body').removeClass('theme-light theme-dark').addClass(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  
    $('.thumbnail').click(function () {
      $('#modalImage').attr('src', $(this).attr('src'));
      $('#modal').removeClass('hidden');
    });
  
    $('#closeModal').click(() => {
      $('#modal').addClass('hidden');
    });
  
    $('.toggle-content').click(function () {
      $(this).next().toggleClass('hidden');
    });
  
    $('.accordion-header').click(function () {
      $(this).next().toggleClass('hidden');
    });
  
    $('#reviewForm').submit(function (e) {
      e.preventDefault();
      const password = $('#password').val();
      if (password.length < 6) {
        toastr.error('Password must be at least 6 characters long');
        return;
      }
      toastr.success('Review submitted successfully!');
    });
  
    $.getJSON('reviews.json', (data) => {
      const reviewList = data.map((r, i) => `
        <tr>
          <td class="border p-2">${r.game}</td>
          <td class="border p-2">${r.review}</td>
          <td class="border p-2">
            <button class="edit-btn bg-yellow-500 text-white p-1 rounded" data-id="${i}">Edit</button>
            <button class="delete-btn bg-red-500 text-white p-1 rounded" data-id="${i}">Delete</button>
          </td>
        </tr>
      `);
      $('#reviewList').html(reviewList);
    });
  
    $(document).on('click', '.delete-btn', function () {
      $(this).closest('tr').remove();
      toastr.success('Review deleted successfully!');
    });
  
    $('#fetchWeather').click(function () {
      $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?q=Sarajevo&appid=f45d1ed9e2f4717cb77854f6cf3fe079&units=metric',
        success: (data) => {
          $('#weatherInfo').text(`Current temperature in Sarajevo: ${data.main.temp}°C`);
        },
        error: () => {
          toastr.error('Failed to fetch weather data.');
        },
      });
    });
  });