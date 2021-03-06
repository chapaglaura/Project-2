$(document).ready(function () {


  $(".submit-user-login").on("submit", function (event) {
    event.preventDefault();


    var userLogin = {
      username: $("#username").val().trim(),
      password: $('#password').val().trim()
    };

    console.log('submitting', userLogin);

    $.ajax("/api/userlogin", {
      method: "GET",
      data: userLogin
    }).then(function (data) {
      console.log(data);
      if (data === null) {
        $('.error-msg').removeClass('invisible');
      }
      else {
        console.log("logged in", data.user_id);
        sessionStorage.setItem('logged', true);
        sessionStorage.setItem('user_id', data.user_id);
        window.location.href = '/items/' + data.user_id;
      }
    });
  });

  $('.logout').click(function () {
    sessionStorage.setItem('logged', false);
    sessionStorage.removeItem('user_id');
    window.location.href = '/login';
  });

  $(".submit-user-signup").on("submit", function (event) {
    event.preventDefault();
    var userSignup = {
      username: $("#username").val().trim(),
      password: $('#password').val().trim()
    };

    console.log('submitting', userSignup);

    $.ajax("/api/usersignup", {
      method: "GET",
      data: userSignup
    }).then(function (data) {
      console.log(data);
      if (data.exists) {
        $('.error-msg').removeClass('invisible');
      }
      else {
        console.log("signed up");
        window.location.href = '/login';
      }
    }
    );
  });

  $(".submit-item").on("submit", function (event) {
    event.preventDefault();

    if (!sessionStorage.getItem('logged')) {
      window.location.href = '/login';
    }

    var newItem = {
      item_name: $("#item-name").val().trim(),
      category: $('#category-select').val(),
      location: $('#location-select').val(),
      description: $('#description-text').val().trim(),
      joy: $('.rating').attr('data-value'),
      user_id: sessionStorage.getItem('user_id')
    };

    console.log('submitting', newItem);

    $.ajax("/api/items", {
      type: "POST",
      data: newItem
    }).then(
      function () {
        console.log("created new item");
        location.reload();
      }
    );
  });

  $('.dropdown-item').on('click', function () {
    var value = $(this).text().toLowerCase();
    value = value.split(' ').join('_');
    var filter = $(this).attr('data-filter');
    var id = sessionStorage.getItem('user_id');
    window.location.href = `/items/${id}/${filter}/${value}`;
  });

  $('[contentEditable]').on('blur', function () {
    var cell = $(this);
    if (cell.text() !== cell.data('value')) {
      cell.trigger('change');
    }

    cell.data('value', cell.text());
  }).each(function () {
    $(this).data('value', $(this).text())
  });

  $('td').on('change', function () {

    var id = $(this).parent().attr('data-id');
    var col = $(this).attr('data-name');
    var newValue = {
      id: id,
      col: col,
      value: $(this).text(),
      user_id: sessionStorage.getItem('user_id')
    }
    $.ajax({
      method: "PUT",
      url: '/api/items/',
      data: newValue
    }).then(
      function () {
        console.log("updated item");
        location.reload();
      }
    );
    console.log('old value: ' + $(this).data('value'));
    console.log('current value: ' + $(this).text());
  });

  $('.fa-times').click(function () {
    var id = $(this).parent().parent().attr('data-id');
    var toDelete = {
      id: id
    }
    $.ajax({
      method: 'DELETE',
      url: '/api/items',
      data: toDelete
    }).then(
      function () {
        console.log('deleted item');
        location.reload();
      }
    )
  });

  $('.icon').click(function () {
    var value = $(this).siblings('input')[0].value + '/5';
    $('.rating').attr('data-value', value);
  });

  $("#bedroom").on("click", function () {
    $('.carousel').carousel(0);
    $('.carousel').carousel('pause');
  });
  $("#closet").on("click", function () {
    $('.carousel').carousel(1);
    $('.carousel').carousel('pause');
  });
  $("#office").on("click", function () {
    $('.carousel').carousel(2);
    $('.carousel').carousel('pause');
  });
  $("#kitchen").on("click", function () {
    $('.carousel').carousel(3);
    $('.carousel').carousel('pause');
  });
  $("#entrance").on("click", function () {
    $('.carousel').carousel(4);
    $('.carousel').carousel('pause');
  });
  $("#livingroom").on("click", function () {
    $('.carousel').carousel(5);
    $('.carousel').carousel('pause');
  });
  $("#bathroom").on("click", function () {
    $('.carousel').carousel(6);
    $('.carousel').carousel('pause');
  });


});