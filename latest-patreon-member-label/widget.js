window.addEventListener('onEventReceived', async (obj) => {

  if(!obj.detail.event) return
  if(obj.detail.event.provider != 'patreon') return
  
  const data = obj.detail.event.data
  const username = data.username
  // const updatedAt = obj.detail.event.updatedAt
  
  // document.querySelector('#updatedAt').innerText = updatedAt
  document.querySelector('#username').innerText = username 
  
  await SE_API.store.set('latestpurchase', data);
})

window.addEventListener('onWidgetLoad', async (obj) => {
  
  const fieldData = obj.detail.fieldData
  const latestPurchase = await SE_API.store.get('latestpurchase')
  
  if(fieldData.textShadow == "false"){
    document.querySelector('#username').style.textShadow = 'none'
  } 
  
  document.querySelector('#username').innerText = latestPurchase.username
})
