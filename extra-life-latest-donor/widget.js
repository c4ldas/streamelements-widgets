window.addEventListener('onWidgetLoad', async function (obj){
  
  //console.log(obj)
  const fieldData = obj.detail.fieldData;
  
  if (fieldData.textShadow == "true"){  
    document.getElementById('most-recent-donation-name').classList.add('text-shadow');
    document.getElementById('most-recent-donation-amount').classList.add('text-shadow');
  }
  
  updateDonation();  
  
  async function updateDonation() {
    const request = await fetch(`https://extra-life.donordrive.com/api/1.3/participants/${fieldData['extraLifeId']}/donations?limit=1&orderBy=createdDateUTC%20DESC`);
    const response = await request.json();
    
    // console.log(response);
    document.getElementById('most-recent-donation-name').innerText = response[0].displayName;
    document.getElementById('most-recent-donation-amount').innerText = ` - \$${response[0].amount}`;
    
    setTimeout( getDonations, fieldData['updateSeconds'] * 1000);
  }
});
