if (sessionStorage.getItem('user_id')) {
    window.location.href = '/items/' + sessionStorage.getItem('user_id');
}