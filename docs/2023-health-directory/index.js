const select = document.getElementById("map-select");

select.addEventListener('change', () => {
    const value = select.value;
    window.location.href = `${value}.html`;
});