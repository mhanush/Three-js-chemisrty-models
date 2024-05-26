const form=document.querySelector('.form');
form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const url="http://localhost:5000/tetrahedral";
    const res=await fetch(url);
    const data=await res.json();
 
    const recvURL=data[0].url;
    console.log(recvURL);
    window.location.href = recvURL;
    console.log(data);

})