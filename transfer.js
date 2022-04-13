usersAccount = JSON.parse(localStorage.getItem("details"))
cust = JSON.parse(localStorage.getItem("owner"))
userName.innerHTML = `Welcome Dear ${cust.userName}`;
document.getElementById("customerPin").disabled = true
document.getElementById("g").disabled = true;


document.getElementById("pin").style.display="none"
document.getElementById("col-6").style.display="none"
function enter() {

    var rAN = recieverAccountNo.value;
    var aTT = parseInt(amountToTransfer.value)

    for (i = 0; i <= usersAccount.length; i++) {
        acc = usersAccount[i].accountNo
        if (rAN == acc) {
            document.getElementById("col-6").style.display= "block"

            confirmAccountNo.innerHTML = `You want to transfer NGN${aTT} to ${usersAccount[i].fName} account`;
            document.getElementById("customerPin").disabled = false;
            document.getElementById("g").disabled = false;
            document.getElementById("pin").style.display= "block"
        }
    }

}
function tMoney() {
    var rAN = recieverAccountNo.value;
    var amount = parseInt(amountToTransfer.value);
    var decision = (rAN == cust.userAccId)
    if (decision) {
        alert("You cannot transfer to your account")
    }
    if (confirmAccountNo.innerHTML != "confirmation of recipient account number" && !decision) {

        cus = usersAccount.find((j) => j.accountNo == cust.userAccId)
        k = usersAccount.indexOf(cus)
        uIndex = usersAccount[k].userBal.length - 1;
        deduct = usersAccount[k].userBal[uIndex];


        userPin = usersAccount[k].transferPin
        if (userPin == customerPin.value) {
            if (deduct < amount) {
                alert(`Insufficient balance`)
                verifyAmount.innerHTML = `Insufficient balance`
                verifyAmount.style.color = "red"
            }
            else {

                bN = usersAccount.find((h) => h.accountNo == rAN)
                dd = usersAccount.indexOf(bN)
                lastAm = usersAccount[dd].userBal.length - 1
                hH = parseInt(usersAccount[dd].userBal[lastAm])
                var obj = hH + amount
                var time = new Date
                time = time.toLocaleTimeString()
                sendH = { amount, time }
                console.log(obj);
                usersAccount[dd].userBal.push(obj);
                usersAccount[dd].credit.push(sendH)
                sAmount = JSON.stringify(usersAccount);
                localStorage.setItem("details", sAmount)



                let uObj = deduct - amount;
                usersAccount[k].userBal.push(uObj)
                sOwner = JSON.stringify(usersAccount);
                localStorage.setItem("details", sOwner)
            }
        }
        else {
            alert("Incorrect Pin")
        }
    }

}



function logOut() {
    if (confirm("Are you sure you want to log out?")) {
        location.href = "sign-In.html"
    }
}