let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let deleteAll = document.querySelector('.deleteAll');
let deleteAllSpan = document.querySelector('#deleteAll');
let tbody = document.getElementById('tbody');
let searchInput = document.getElementById('search');

let mood = 'create';
let tmp;
let tmp2="";

// localStorage.clear();
console.log(title,price,taxes,ads,discount,total,count,category,create)

// Start functions scope

//** creat price function */

function getTotal(){
    if(price.value!=""){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML = result;
        if(total.innerHTML!=""){
            total.style.background = '#165d12';
        }
    }else{
        total.innerHTML = 0;
        total.style.background = '#a30d0d';
    }
    
}

//** creat product function */
let products;
if(localStorage.getItem('products')){
    products = JSON.parse(localStorage.getItem('products'));
}
else{
    products = [];
}

displayProd();

create.addEventListener('click',creatProd);

function creatProd(){
    let obj = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value ,
        ads: ads.value,
        discount: discount.value ,
        category: category.value.toLowerCase(),
        count: count.value,
        total: total.innerHTML,
    };
    let h = 0;
    if(title.value!="" && price.value!="" && category.value!=""){
        h = 1;
        if( mood=='create'){
            if(count.value>1){
                for(let i=0;i<count.value;i++){
                    products.push(obj);
                }
            }
            else{
                products.push(obj);
            }
            console.log(products);
            // save in localStorage
            
        }
        else{
            products[tmp] = obj;
            mood = 'create';
            create.innerHTML = "Create"
            count.style.display = 'block';
        }
    }
        if(h){
            clearData();
        }
        h=0;
        localStorage.setItem('products',JSON.stringify(products));
        displayProd();
        getTotal();
}





//** creat clear inputs function */

function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    category.value = "";
    count.value = "";
    total.innerHTML = "";
}

//** creat read function */
console.log(deleteAll)
function displayProd(){
   let re =  products.map((pro,index)=>{
        return `<tr>
        <td>${index+1}</td>
            <td>${pro.title}</td>
            <td>${pro.price}</td>
            <td>${pro.taxes}</td>
            <td>${pro.ads}</td>
            <td>${pro.discount}</td>
            <td>${pro.total}</td>
            <td>${pro.category}</td>
            <td><button onclick="updateData(${index})" class="update bttn">update</button></td>
            <td><button onclick="dis(${index})" class="delete bttn">delete</button></td></tr>`
    }).join('');
    tbody.innerHTML = re;
    if(products.length!=0){
       
        deleteAll.classList.add('active');
        deleteAllSpan.innerHTML = products.length;
    }
    else{
        deleteAll.classList.remove('active');
    }
    
}
//** creat count function */

//** creat delet function */
let sure = document.querySelector('.sure');

function dis(i){
    sure.classList.add('dis');
    scroll({
        top:0,
        behavior: "smooth",
    });
    tmp2 = i;
}
function dis2(){
    sure.classList.add('dis');
    tmp2 = "all"
}
function deleteData(){
    if(tmp2!="all"){
        products.splice(tmp2,1);
        localStorage.setItem('products',JSON.stringify(products));
        console.log(products)
        displayProd();
    }
    else{
        products = [];
        localStorage.products = products;
        displayProd();
    }
    sure.classList.remove('dis');


}
function cancel(){
    sure.classList.remove('dis');      
}

//** creat delet all data function */
console.log(deleteAll);



//** creat update function */

function updateData(i){
    title.value = products[i].title;
    price.value = products[i].price;
    taxes.value = products[i].taxes;
    ads.value = products[i].ads;
    discount.value = products[i].discount;
    category.value = products[i].category;
    total.innerHTML = products[i].total;
    getTotal();
    count.style.display = 'none';
    create.innerHTML = 'Update'
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior: "smooth",
    })
}

//** creat search function */
// console.log(searchInput.Placeholder);
let searchMood = 'title';

function search(id){
    if(id=="titleBtn"){
        searchMood = 'title';
    }
    else{
        searchMood = 'category'
    }
    console.log(id)
    searchInput.setAttribute('placeholder',`search By ${searchMood}`);


    SearchData();
}

function SearchData(){
    searchInput.focus()
    let val = searchInput.value.toLowerCase();
    if( searchMood == 'title'){
        let arr = products.filter(ele=>ele.title.includes(val) );
        g(arr);
        console.log(arr);
    }else{
        let arr = products.filter(ele=>ele.category.includes(val) );
        g(arr);
    }
    
    
}


function g(arr){
       let re =  arr.map((pro,index)=>{
        return `<tr>
        <td>${index+1}</td>
            <td>${pro.title}</td>
            <td>${pro.price}</td>
            <td>${pro.taxes}</td>
            <td>${pro.ads}</td>
            <td>${pro.discount}</td>
            <td>${pro.total}</td>
            <td>${pro.category}</td>
            <td><button onclick="updateData(${index})" class="update bttn">update</button></td>
            <td><button onclick="deleteData(${index})" class="delete bttn">delete</button></td></tr>`
    }).join('');
    tbody.innerHTML = re;
}
//** creat cleanData function */











// End functions scope




// // Dark Mode
// let btn = document.querySelector('.bttn');
// let btnBefore = document.querySelector('.togglebtn');

// if(localStorage.getItem('theme')=='dark'){
//     document.body.classList.remove('white');
//     btnBefore.classList.add('rigth');
//     btn.classList.add('btnBack');
   
// }else{
//     document.body.classList.add('white');
//     btnBefore.classList.remove('rigth');
//     btn.classList.remove('btnBack');
// }
// // localStorage.clear();
// btn.addEventListener('click',()=>{
//     document.body.classList.toggle('white');
//     btnBefore.classList.toggle('rigth');
//     btn.classList.toggle('btnBack');
    
//     if(document.body.classList.contains('white')){
//         window.localStorage.setItem("theme","light");
       
//     }
//     else{
//         window.localStorage.setItem("theme","dark");
       
//     }
// });