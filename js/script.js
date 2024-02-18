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
        seat.classList.add('selected');
        seat.setAttribute('disabled', true);
        // Avaiable seat count
        const avaiableSeat = parseInt(document.getElementById('avaiable_seat').innerText);
        document.getElementById('avaiable_seat').innerText = avaiableSeat - 1 ;
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
        // Coupon button enable
        const applyBtn = document.getElementById('apply_btn');
        if(totalSelectedSeat === 4){
            applyBtn.removeAttribute('disabled')
        }
        // Grand total count
        const totalPrice = parseInt(document.getElementById('total_price').innerText);
        grandTotalPriceCount(totalPrice, 0);
        const phoneInput = document.getElementById('phone').value;
        const nextBtn = document.getElementById('next_btn');
        if(totalSelectedSeat > 0 && phoneInput.length > 0){
        nextBtn.removeAttribute('disabled');
        }
        // Clear data after confirm purchase
        document.getElementById('continue').addEventListener('click',function(){
            ticketContainer.childNodes[0].remove();
            document.getElementById('total_price').innerText = 0
            document.getElementById('grand_total').innerText = 0
            totalSeat.innerText = 0
            const allSelectedSeat = document.querySelectorAll('.selected')
            for(const selected of allSelectedSeat){
                selected.classList.remove('bg-brand-color');
                selected.classList.remove('text-white');
                selected.removeAttribute('disabled');
            }
            totalSelectedSeat = 0;
            document.getElementById('avaiable_seat').innerText = 40;
        })
    })
}
// Coupon code validation 
document.getElementById('apply_btn').addEventListener('click', function(){
    const totalPrice = parseInt(document.getElementById('total_price').innerText);
    const discountContainer = document.getElementById('discount_container');
    const h3 = document.createElement('h3');
    const h4 = document.createElement('h4');
    h3.innerText = "Discount"
    const discountInputField = document.getElementById('discount_input_field');
    const couponField = document.getElementById('coupon_field');
    const couponCodeArr = couponField.value.split(' ');
    const couponCode = couponCodeArr.join('').toUpperCase();
    if(couponCode === 'NEW15'){
        const discountPrice = totalPrice * (15 / 100);
        h4.innerText = discountPrice;
        discountContainer.appendChild(h3);
        discountContainer.appendChild(h4);
        discountInputField.remove();
        grandTotalPriceCount(totalPrice, discountPrice);
    }  
    else if(couponCode === 'COUPLE20'){
        const discountPrice = totalPrice * (20 / 100);
        h4.innerText = discountPrice;
        discountContainer.appendChild(h3);
        discountContainer.appendChild(h4);
        discountInputField.remove();
        grandTotalPriceCount(totalPrice, discountPrice);
    }
    else(
        alert("Invalid Coupon Code")
    )
})
// Input form validation
const nextBtn = document.getElementById('next_btn');
document.getElementById('phone').addEventListener('keyup', function(event){
if(totalSelectedSeat > 0 && event.target.value.length > 0){
    nextBtn.removeAttribute('disabled');
   }
})
// Clear form data after confirm purchase
document.getElementById('continue').addEventListener('click',function(){
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    name.value = '';
    phone.value = '';
    email.value = '';
    nextBtn.setAttribute('disabled', true)
})
// Total price count and set by id
function totalPriceCount(value){
    let totalPrice = parseInt(document.getElementById('total_price').innerText);
    document.getElementById('total_price').innerText = totalPrice + value;
}
// Grand total price count and set by
function grandTotalPriceCount(total, discount){
    let totalPrice = parseInt(document.getElementById('grand_total').innerText);
    document.getElementById('grand_total').innerText = total - discount;
}


