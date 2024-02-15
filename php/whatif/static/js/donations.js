document.querySelectorAll('.notf').forEach(notf => {
    const time = parseInt(notf.querySelector('.date').dataset.date);
    const date = new Date(time * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    const hourMin = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).format(date);
    const formattedDate = `${day} ${month} ${hourMin}`;
    notf.querySelector('.date').textContent = formattedDate;
});