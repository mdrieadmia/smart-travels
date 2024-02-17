const allSeat = document.querySelectorAll('.seat');
let totalSelectedSeat = 0;
for(const seat of allSeat){
    seat.addEventListener('click', function(event){
        // Selected seat limit validation
        if(totalSelectedSeat === 4){
            return alert("You can't select more than 4 seat")
        }
        // Total selected seat count
        totalSelectedSeat++;
        const totalSeat = document.getElementById('totalSeat');
        totalSeat.innerText = totalSelectedSeat;
        // Add background color to selected seat
        seat.classList.add('bg-brand-color');
        seat.classList.add('text-white');
        // Avaiable seat count
        const avaiableSeat = document.getElementById('avaiable_seat');
        // Add seat details in ticket container
        const ticketContainer = document.getElementById('TicketContainer');
        const singleTicketPriceStr = document.getElementById('single_ticket_price').innerText; 
        const singleTicketPrice = parseInt(singleTicketPriceStr); 
        const ul = document.createElement('ul');
        const li1 = document.createElement('li');
        const li2 = document.createElement('li');
        const li3 = document.createElement('li');
        li1.innerText = seat.innerText;
        li2.innerText = 'Economy';
        li3.innerText = singleTicketPrice;
        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);
        ticketContainer.appendChild(ul);
        // Set total price value
        totalPriceCount(singleTicketPrice);
        // Coupon validation
        const couponField = document.getElementById('coupon_field');
        const applyBtn = document.getElementById('apply_btn');
        if(totalSelectedSeat === 4){
            applyBtn.removeAttribute('disabled')
        }

    })

}

function totalPriceCount(value){
    let totalPrice = parseInt(document.getElementById('total_price').innerText);
    document.getElementById('total_price').innerText = totalPrice + value;
}

