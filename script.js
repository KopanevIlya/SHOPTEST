const API_URL =
//  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
  "https://api.npoint.io/79ad3d7050f00c74c2c4";



class GoodsItem {
  constructor(title, price, id) {
    this.title = title;
    this.price = price;
    this.id = id;
  }
  render() {
    return `<div class="goods-item" id=${this.id}><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
   
  }

  async fetchGoods() {
    const responce = await fetch(`${API_URL}`);
    if (responce.ok) {
      const catalogItems = await responce.json();
      this.goods = catalogItems;
 
    } else {
      alert("Нет ответа от сервера");
    }
  }




  render() {
    let listHtml = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(
        good.product_name,
        good.price,
        good.id_product
      );
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
    
  }
}


const init = async () => {
  const list = new GoodsList();
  await list.fetchGoods();
  list.render();
  const spisok = list;
  const basket = []
   document.querySelectorAll('.goods-item').forEach(elem => {
    elem.addEventListener('click',  function(){
    let id_prod = this.id;
    let sea = spisok.goods.find(item => item.id_product == id_prod);
    basket.push(sea);
    console.log(basket)
   })

   })
   let button = document.querySelector('.button');
   button.addEventListener('click',  ()=>{
    document.querySelector('.basket-list').innerHTML = basket.map(e=>`<div class="goods-item" id=${e.id}><h3>${e.product_name}</h3><p>${e.price}</p></div>`).join('')
     });
  }

  
window.onload = init;

  //   for(let i=0; i<spisok.goods.length; i++){
  //     if(spisok.goods[i].id_product == id_prod){
  //       sea = spisok.goods[i].id_product;
  //       break;
  //     }
  //   }
  //   console.log(sea);
  //    })