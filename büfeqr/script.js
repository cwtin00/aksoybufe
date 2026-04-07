const menuData = {
    "Menüler": [
        { n: "Aksoy 5'li Parti Menü", p: "1.190,00 ₺", d: "5 Adet Maxi Karışık Sandviç + 2 LT İçecek" },
        { n: "Aksoy 3 Kafadar Menü", p: "977,50 ₺", d: "3 Adet Maxi Karışık Sandviç + Patates + 1 LT İçecek" },
        { n: "Aksoy Aile Boyu Menü", p: "977,50 ₺", d: "4 Adet Maxi Karışık Sandviç + 2 LT İçecek" },
        { n: "Kanka Menü", p: "722,50 ₺", d: "2 Adet Maxi Karışık Sandviç + 2 Kişilik Patates + 1 LT İçecek" },
        { n: "Aksoy Special Menü", p: "408,00 ₺", d: "Maxi Karışık Sandviç + Patates + Kutu İçecek" },
        { n: "Dana Burger Menü", p: "408,00 ₺", d: "Dana Hamburger + Patates + Kutu İçecek" },
        { n: "Ayvalık Menü", p: "399,50 ₺", d: "Karışık Ayvalık Tostu + Patates + Ayran (20 cl)" },
        { n: "Öğrenci Dostu Menü", p: "246,50 ₺", d: "Maxi Karışık Sandviç + Ayran (20 cl)" }
    ],
    "Sandviçler": [
        { n: "Double Karışık Sandviç", p: "272,00 ₺", d: "Sosis, salam, sucuk, kaşar, turşu, soslar" },
        { n: "Maxi Karışık Sandviç", p: "233,75 ₺", d: "Dana sucuk, sosis, salam, kaşar, turşu" },
        { n: "3/4 Karışık Sandviç", p: "340,00 ₺", d: "Büyük boy ekmek arası bol malzeme" },
        { n: "Kaşarlı Patso Sandviç", p: "230,00 ₺", d: "Patates kızartması ve bol kaşar peyniri" },
        { n: "Sosisli Patso Sandviç", p: "270,00 ₺", d: "Sosis, patates, kaşar peyniri" }
    ],
    "Tostlar": [
        { n: "Aksoy Sanayi Tostu", p: "215,00 ₺", d: "Bol salçalı, sucuklu ve kaşarlı dev tost" },
        { n: "Karışık Ayvalık Tostu", p: "229,50 ₺", d: "Özel Ayvalık ekmeğine zengin malzeme" },
        { n: "Sucuklu Kaşarlı Maxi Tost", p: "150,00 ₺", d: "Kasap sucuk, kaşar, domates, sos" }
    ],
    "Izgaralar": [
        { n: "Yarım Ekmek Izgara Köfte", p: "260,00 ₺", d: "Anne köftesi, domates, yeşillik, soğan" },
        { n: "Yarım Ekmek Kaşarlı Köfte", p: "270,00 ₺", d: "Kaşarlı ızgara köfte, sebze ve soslar" },
        { n: "Yarım Ekmek Izgara Tavuk", p: "250,00 ₺", d: "Özel soslu tavuk, domates, marul, soğan" }
    ],
    "Yan Ürünler": [
        { n: "Patates Kızartması", p: "136,00 ₺", d: "Baharatlı çıtır patates" },
        { n: "Soğan Halkası (8 Adet)", p: "80,00 ₺", d: "Çıtır panelenmiş soğan halkaları" }
    ],
    "Tatlılar": [
        { n: "Maraş Usulü Cup", p: "50,00 ₺", d: "Hakiki Maraş dondurması" },
        { n: "Dondurmalı Çikolata Bar", p: "50,00 ₺", d: "Dondurma ve çikolata uyumu" }
    ],
    "İçecekler": [
        { n: "Coca-Cola (1 L.)", p: "80,00 ₺", d: "Soğuk şişe içecek" },
        { n: "Kutu İçecekler", p: "70,00 ₺", d: "330 ml kutu fanta, kola, sprite" },
        { n: "Ayran (30 cl.)", p: "40,00 ₺", d: "Büyük boy soğuk ayran" },
        { n: "Su (500 ml)", p: "15,00 ₺", d: "Erikli su" }
    ]
};

function renderCategories() {
    const nav = document.getElementById('category-list');
    nav.innerHTML = Object.keys(menuData).map((cat, i) => `
        <div class="cat-item ${i===0?'active':''}" onclick="loadCategory('${cat}', this)">${cat}</div>
    `).join('');
}

function loadCategory(cat, el) {
    document.querySelectorAll('.cat-item').forEach(i => i.classList.remove('active'));
    if(el) el.classList.add('active');
    document.getElementById('current-category-title').innerText = cat;
    
    const list = document.getElementById('product-list');
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
    loadCategory('Menüler', document.querySelector('.cat-item'));
    
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        splash.style.opacity = '0';
        setTimeout(() => splash.style.display = 'none', 600);
    }, 2500);
};


window.onload = () => {

    renderCategories();
    loadCategory('Menüler', document.querySelector('.cat-item'));


    const hamburger = document.getElementById('hamburger-main');
    hamburger.style.opacity = '0';
    hamburger.style.visibility = 'hidden';


    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        splash.style.opacity = '0';
        
        setTimeout(() => {
            splash.style.display = 'none';
            

            hamburger.style.opacity = '1';
            hamburger.style.visibility = 'visible';
        }, 600);
    }, 2500);
};


document.getElementById('toggler').addEventListener('change', function() {
    if(this.checked) {
        document.body.style.overflow = 'hidden'; 
    } else {
        document.body.style.overflow = 'auto'; 
    }
});