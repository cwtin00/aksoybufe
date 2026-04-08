localStorage.removeItem('cart'); 
localStorage.clear();            
let cart = [];                   

const menuData = {
    "Menüler": [
        { n: "Aksoy 3 Kafadar Menü", p: "875,00 ₺", d: "3 Adet Maxi Karışık Sandviç + Patates + 1 LT İçecek" },
        { n: "Aksoy 5'li Parti Menü", p: "1.000,00 ₺", d: "5 Adet Maxi Karışık Sandviç + 2 LT İçecek" },
        { n: "Aksoy Aile Boyu", p: "900,00 ₺", d: "4 Adet Maxi Karışık Sandviç + 2 LT İçecek" },
        { n: "Aksoy Ayvalık Menü", p: "370,00 ₺", d: "Karışık Ayvalık Tostu + Patates + Ayran" },
        { n: "Aksoy Dana Burger Menü", p: "370,00 ₺", d: "Dana Hamburger + Patates + Kutu İçecek" },
        { n: "Aksoy Kanka Menü", p: "675,00 ₺", d: "2 Adet Maxi Karışık Sandviç + Patates + 1 LT İçecek" },
        { n: "Aksoy King Menü", p: "430,00 ₺", d: "Duble Burger + Patates + Kutu İçecek" },
        { n: "Aksoy Köfte Menü", p: "380,00 ₺", d: "Izgara Köfte + Patates + Kutu İçecek" },
        { n: "Aksoy Öğrenci Dostu Menü", p: "230,00 ₺", d: "Maxi Karışık Sandviç + Küçük Ayran" },
        { n: "Aksoy Special Menü", p: "370,00 ₺", d: "Maxi Karışık Sandviç + Patates + Kutu İçecek" },
        { n: "Aksoy Tatlılı Menü", p: "380,00 ₺", d: "Seçmeli Sandviç + Patates + Tatlı + İçecek" }
    ],
    "Burgerler": [
        { n: "Dana Cheeseburger", p: "240,00 ₺", d: "Özel dana köftesi ve erimiş peynir" },
        { n: "Dana Duble Burger", p: "385,00 ₺", d: "Doyurucu çift katlı dana burger" },
        { n: "Dana Hamburger", p: "220,00 ₺", d: "Klasik lezzet, özel dana eti" },
        { n: "Tavuk Burger", p: "200,00 ₺", d: "Çıtır tavuk ve özel sos" },
        { n: "Tavuk Cheeseburger", p: "215,00 ₺", d: "Çıtır tavuk ve peynir keyfi" }
    ],
    "Tavuklar": [
        { n: "3 Parça Ekmek Arası Izgara Tavuk", p: "275,00 ₺", d: "Izgara tavuk göğsü, taze sebze ve özel sos" },
        { n: "Yarım Ekmek Soslu Tavuk", p: "210,00 ₺", d: "Özel marine soslu tavuk parçaları" },
        { n: "Yarım Ekmek Kaşarlı Tavuk", p: "230,00 ₺", d: "Erimiş kaşer peyniri ve ızgara tavuk" }
    ],
    "Tostlar": [
        { n: "Aksoy Sanayi Tostu", p: "215,00 ₺", d: "Bol salçalı, sucuklu ve kaşarlı dev sanayi tostu" },
        { n: "Karışık Ayvalık Tostu", p: "210,00 ₺", d: "Özel Ayvalık ekmeğine zengin karışık malzeme" },
        { n: "Peynirli Domatesli Ayvalık Tostu", p: "160,00 ₺", d: "Beyaz peynir ve taze domatesli Ayvalık lezzeti" },
        { n: "Sucuk Kaşar Ayvalık Tostu", p: "210,00 ₺", d: "Kasap sucuk ve bol kaşarlı Ayvalık tostu" },
        { n: "Yumurtalı Karışık Ayvalık Tostu", p: "210,00 ₺", d: "Özel karışık malzemeli ve yumurtalı tost" }
    ],
    "Sandviçler": [
        { n: "3 Parça Karışık Sandviç", p: "275,00 ₺", d: "Doyurucu 3 parça karışık malzeme" },
        { n: "Duble Karışık Sandviç", p: "245,00 ₺", d: "Çift katlı zengin içerik" },
        { n: "Kaşarlı Patso", p: "190,00 ₺", d: "Çıtır patates ve bol kaşar peyniri" },
        { n: "Maxi Karışık Sandviç", p: "210,00 ₺", d: "Büyük boy karışık sandviç lezzeti" },
        { n: "Patso", p: "170,00 ₺", d: "Klasik çıtır patatesli sandviç" },
        { n: "Sade Kaşar", p: "160,00 ₺", d: "Erimiş kaşar peyniri keyfi" },
        { n: "Sade Sosis", p: "160,00 ₺", d: "Izgara sosisli klasik lezzet" },
        { n: "Sade Sucuk", p: "160,00 ₺", d: "Kasap sucuklu sandviç" },
        { n: "Sosisli Patso", p: "190,00 ₺", d: "Sosis ve patates kızartması bir arada" },
        { n: "Sucuk Kaşar", p: "210,00 ₺", d: "Sucuk ve kaşar peyniri uyumu" },
        { n: "Sucuk Kaşar Yumurta", p: "230,00 ₺", d: "Sucuk, kaşar ve taze yumurta" },
        { n: "Tam Ekmek Karışık Sandviç", p: "320,00 ₺", d: "Büyük boy doyurucu tam ekmek" },
        { n: "Tombul Karışık", p: "210,00 ₺", d: "Tombul ekmek arası bol malzeme" },
        { n: "Yarım Ekmek Karışık", p: "210,00 ₺", d: "Standart boy karışık sandviç" },
        { n: "Yumurtalı Karışık Sandviç", p: "230,00 ₺", d: "Taze yumurta eklenmiş karışık lezzet" }
    ],
    "Köfteler": [
        { n: "3 Parça Ekmek Arası Izgara Köfte", p: "285,00 ₺", d: "Köfte, domates, yeşillik, soğan" },
        { n: "Yarım Ekmek Izgara Köfte", p: "220,00 ₺", d: "Kaşarlı ızgara köfte, sebze ve soslar" },
        { n: "Yarım Ekmek Kaşarlı Izgara Köfte", p: "240,00 ₺", d: "Özel soslu tavuk, domates, marul, soğan" }
    ],
    "Porsiyonlar": [
        { n: "Porsiyon Köfte", p: "320,00 ₺", d: "Özel garnitür ve salata ile servis edilir" }
    ],
    "Yan Ürünler": [
        { n: "Porsiyon Patates Kızartması", p: "125,00 ₺", d: "Baharatlı çıtır patates" },
        { n: "Soğan Halkası (10 Adet)", p: "125,00 ₺", d: "Çıtır panelenmiş soğan halkaları" },
        { n: "Çıtır Tavuk Halkası (3 Adet)", p: "125,00 ₺", d: "Lezzetli çıtır tavuk parçaları" }
    ],
    "Dondurmalar": [
        { n: "Maraş Usulü Cup (100ml)", p: "50,00 ₺", d: "Hakiki Maraş dondurması" },
        { n: "Dondurmalı Çikolata Bar", p: "50,00 ₺", d: "Dondurma ve çikolata uyumu" },
        { n: "Carte D'or Çikolatalı", p: "60,00 ₺", d: "Yoğun çikolata keyfi" },
        { n: "Carte D'or Meyve Rüyası", p: "60,00 ₺", d: "Taze meyve parçacıklı dondurma" }
    ],
    "Tatlılar": [
        { n: "Kazandibi", p: "100,00 ₺", d: "Karamelize edilmiş nefis sütlü tatlı" },
        { n: "Keşkül", p: "50,00 ₺", d: "Geleneksel bademli sütlü tatlı" },
        { n: "Supangle", p: "50,00 ₺", d: "Yoğun çikolatalı ve kek parçalı klasik" }
    ],
    "İçecekler": [
        { n: "1 LT Ayran", p: "80,00 ₺", d: "Soğuk aile boyu ayran" },
        { n: "1 LT Kola", p: "80,00 ₺", d: "Soğuk şişe Coca-Cola" },
        { n: "1.5 LT Kola", p: "60,00 ₺", d: "Soğuk şişe Coca-Cola" },
        { n: "2 LT Kola", p: "95,00 ₺", d: "Soğuk şişe Coca-Cola" },
        { n: "2.5 LT Kola", p: "110,00 ₺", d: "En büyük boy soğuk kola" },
        { n: "Acılı Şalgam", p: "40,00 ₺", d: "Soğuk acılı şalgam suyu" },
        { n: "Acısız Şalgam", p: "40,00 ₺", d: "Soğuk acısız şalgam suyu" },
        { n: "Büyük Ayran", p: "40,00 ₺", d: "Büyük boy soğuk ayran" },
        { n: "Fuse Tea Şeftali", p: "70,00 ₺", d: "Soğuk şeftali aromalı buzlu çay" },
        { n: "Kutu Fanta", p: "70,00 ₺", d: "330 ml soğuk kutu fanta" },
        { n: "Kutu Kola", p: "70,00 ₺", d: "330 ml soğuk kutu kola" },
        { n: "Kutu Sprite", p: "70,00 ₺", d: "330 ml soğuk kutu sprite" },
        { n: "Küçük Ayran", p: "25,00 ₺", d: "Küçük boy soğuk ayran" },
        { n: "Niğde Gazozu", p: "40,00 ₺", d: "Efsane Niğde gazozu" },
        { n: "Soda", p: "30,00 ₺", d: "Sade maden suyu" },
        { n: "Su", p: "15,00 ₺", d: "500 ml pet şişe su" },
        { n: "Şişe Fanta", p: "40,00 ₺", d: "Soğuk cam şişe fanta" },
        { n: "Şişe Kola", p: "50,00 ₺", d: "Soğuk cam şişe kola" }
    ]
};



function renderCategories() {
    const nav = document.getElementById('category-list');
    if(!nav) return;
    nav.innerHTML = Object.keys(menuData).map((cat, i) => `
        <div class="cat-item ${i===0?'active':''}" onclick="loadCategory('${cat}', this)">${cat}</div>
    `).join('');
}

function loadCategory(cat, el) {
    document.querySelectorAll('.cat-item').forEach(i => i.classList.remove('active'));
    if(el) el.classList.add('active');
    
    const titleEl = document.getElementById('current-category-title');
    if(titleEl) titleEl.innerText = cat;
    
    const list = document.getElementById('product-list');
    if(!list) return;
    
    list.innerHTML = menuData[cat].map(item => {
        
        const safeName = item.n.replace(/'/g, "\\'");
        
        return `
        <div class="product-card">
            <div class="p-icon"><i class="fas fa-utensils"></i></div>
            <div class="p-content">
                <div class="p-header">
                    <span class="p-title">${item.n}</span>
                    <span class="p-price">${item.p}</span>
                </div>
                <p class="p-desc">${item.d}</p>
                <button class="add-to-cart-btn" onclick="addToCart('${safeName}', '${item.p}')">
                    <i class="fas fa-plus"></i> Ekle
                </button>
            </div>
        </div>
    `}).join('');
}

function addToCart(name, priceStr) {
    
    const cleanName = name.replace(/\\'/g, "'");
    
    const price = parseFloat(priceStr.replace('.', '').replace(',', '.').replace(' ₺', ''));
    const existing = cart.find(i => i.name === cleanName);
    if(existing) {
        existing.qty++;
    } else {
        cart.push({ name: cleanName, price: price, qty: 1 });
    }
    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const cartIcon = document.getElementById('cart-main-icon');
    const cartHint = document.getElementById('cart-info-hint'); 
    
    let total = 0;
    let count = 0;
    
    cart.forEach(item => {
        total += item.price * item.qty;
        count += item.qty;
    });

    if(cartItems) {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                <div class="cart-item-info">
                    <strong style="font-size: 0.9rem;">${item.name}</strong><br>
                    <small style="color: #ffb300;">${item.price.toFixed(2)} ₺</small>
                </div>
                <div class="qty-controls" style="display:flex; align-items:center; gap:8px;">
                    <button onclick="changeQty(${index}, -1)" style="background:#ef4444; color:white; border:none; width:24px; height:24px; border-radius:4px; cursor:pointer; display:flex; align-items:center; justify-content:center;">
                        ${item.qty === 1 ? '<i class="fas fa-trash" style="font-size:10px;"></i>' : '-'}
                    </button>
                    <span style="font-weight:bold; min-width:20px; text-align:center;">${item.qty}</span>
                    <button onclick="changeQty(${index}, 1)" style="background:#22c55e; color:white; border:none; width:24px; height:24px; border-radius:4px; cursor:pointer; display:flex; align-items:center; justify-content:center;">+</button>
                </div>
            </div>
        `).join('');
    }
    
    if(cartTotal) cartTotal.innerText = total.toLocaleString('tr-TR', { minimumFractionDigits: 2 }) + " ₺";
    if(cartCount) cartCount.innerText = count;

    if(cartHint) {
        cartHint.style.setProperty('display', count > 0 ? 'block' : 'none', 'important');
    }

    if(cartIcon && count > 0) {
        cartIcon.classList.remove('shake');
        void cartIcon.offsetWidth; 
        cartIcon.classList.add('shake');
    }
}


function changeQty(index, delta) {
    cart[index].qty += delta;
    
   
    if (cart[index].qty < 1) {
        cart.splice(index, 1);
    }
    
    updateCart(); 
}


function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    if(sidebar) {
        sidebar.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
    }
}

function sendOrder() {
    if(cart.length === 0) return alert("Sepetiniz boş!");
    
    
    let totalText = document.getElementById('cart-total')?.innerText || "0,00 ₺";
    
    let text = "*Yeni Sipariş!*\n\n";
    cart.forEach(i => {
        text += `• ${i.qty} adet ${i.name}\n`;
    });
    text += `\n*Toplam:* ${totalText}`;
    
    const phone = "902324261355"; 
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
}

window.onload = () => {

    localStorage.removeItem('cart'); 
    cart = [];                       


    renderCategories();
    const firstCat = document.querySelector('.cat-item');
    if(firstCat) loadCategory('Menüler', firstCat);
    
 
    updateCart();

    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        const cartWrapper = document.getElementById('cart-header-wrapper');
        const hamburger = document.getElementById('hamburger-main');

        if(splash) {
            splash.style.opacity = '0';
            
            setTimeout(() => {
                splash.style.display = 'none';
                
                if(cartWrapper) {
                    cartWrapper.style.setProperty('display', 'flex', 'important');
                    setTimeout(() => { cartWrapper.style.opacity = '1'; }, 50);
                }
                
                if(hamburger) {
                    hamburger.style.setProperty('display', 'block', 'important');
                    setTimeout(() => { hamburger.style.opacity = '1'; }, 50);
                }
            }, 600); 
        }
    }, 2500);
};

window.addEventListener('scroll', function() {
    if (window.scrollY > 60) {
        document.body.classList.add('compact-menu'); 
    } else {
        document.body.classList.remove('compact-menu');
    }
});

document.getElementById('toggler')?.addEventListener('change', function() {
    document.body.style.overflow = this.checked ? 'hidden' : 'auto';
});

document.getElementById('toggler')?.addEventListener('change', function() {
    const cartWrapper = document.getElementById('cart-header-wrapper');
    
    if (this.checked) {

        if (cartWrapper) {
            cartWrapper.style.opacity = '0';
            cartWrapper.style.visibility = 'hidden';

            cartWrapper.style.pointerEvents = 'none';
        }
        document.body.style.overflow = 'hidden';
    } else {

        if (cartWrapper) {
            cartWrapper.style.visibility = 'visible';
            cartWrapper.style.opacity = '1';
            cartWrapper.style.pointerEvents = 'auto';
        }
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener("DOMContentLoaded", function() {


    const categoryHeaders = document.querySelectorAll('h2');

    categoryHeaders.forEach(header => {
  
        const headerContainer = document.createElement('div');
        headerContainer.className = 'section-header';

   
        header.parentNode.insertBefore(headerContainer, header);
        headerContainer.appendChild(header);


        const logoImg = document.createElement('img');
        logoImg.src = 'image/Aksoy Meydan Büfe.png'; 
        logoImg.className = 'side-logo';
        logoImg.alt = 'Aksoy Meydan Büfe Logo';

  
        headerContainer.appendChild(logoImg);


logoImg.style.opacity = "0"; 
setTimeout(() => {
    logoImg.style.transition = "opacity 1.5s ease";
    logoImg.style.opacity = "1";
}, 2500); 
    });

    console.log("CetinWeb: Kategori logoları başarıyla yerleştirildi.");
});


function toggleAccordion(contentId, arrowId) {
    const content = document.getElementById(contentId);
    const arrow = document.getElementById(arrowId);
    

    const allContents = document.querySelectorAll('.accordion-content');
    const allArrows = document.querySelectorAll('.arrow');
    
    allContents.forEach((c, index) => {
        if (c.id !== contentId) {
            c.style.maxHeight = null;
            allArrows[index].style.transform = "rotate(0deg)";
        }
    });


    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        arrow.style.transform = "rotate(0deg)";
    } else {
        // scrollHeight ile gerçek yüksekliği hesaplayıp süzülerek açar
        content.style.maxHeight = content.scrollHeight + "px";
        arrow.style.transform = "rotate(180deg)";
    }
}

