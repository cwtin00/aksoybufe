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
        { n: "Yarım Ekmek Kaşarlı Tavuk", p: "230,00 ₺", d: "Erimiş kaşar peyniri ve ızgara tavuk" }
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
        { n: "Tam Ekmek Karışık Sandviç (Y)", p: "320,00 ₺", d: "Tam ekmek karışık alternatif" },
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
    list.innerHTML = menuData[cat].map(item => `
        <div class="product-card">
            <div class="p-icon"><i class="fas fa-utensils"></i></div>
            <div class="p-content">
                <div class="p-header">
                    <span class="p-title">${item.n}</span>
                    <span class="p-price">${item.p}</span>
                </div>
                <p class="p-desc">${item.d}</p>
            </div>
        </div>
    `).join('');
}

window.onload = () => {
    renderCategories();
    const firstCat = document.querySelector('.cat-item');
    if(firstCat) loadCategory('Menüler', firstCat);

    const hamburger = document.getElementById('hamburger-main');
    if(hamburger) {
        hamburger.style.opacity = '0';
        hamburger.style.visibility = 'hidden';
    }

    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if(splash) {
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.style.display = 'none';
                if(hamburger) {
                    hamburger.style.opacity = '1';
                    hamburger.style.visibility = 'visible';
                }
            }, 600);
        }
    }, 2500);
};

document.getElementById('toggler')?.addEventListener('change', function() {
    document.body.style.overflow = this.checked ? 'hidden' : 'auto';
});