import { auth, database } from "./firebase-config.js";

import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

import {
    ref,
    onValue,
    push,
    set,
    update,
    remove,
    get
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-database.js";

/* SAYFA ELEMANLARI */

const loginScreen = document.getElementById("login-screen");
const adminPanel = document.getElementById("admin-panel");

const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginMessage = document.getElementById("login-message");
const togglePassword = document.getElementById("toggle-password");

const logoutButton = document.getElementById("logout-button");

const categoryCount = document.getElementById("category-count");
const productCount = document.getElementById("product-count");

const productForm = document.getElementById("product-form");
const formTitle = document.getElementById("form-title");
const editingProductId = document.getElementById("editing-product-id");
const editingCategory = document.getElementById("editing-category");

const productCategory = document.getElementById("product-category");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productDescription = document.getElementById("product-description");
const productMessage = document.getElementById("product-message");

const cancelEditButton = document.getElementById("cancel-edit-button");
const productSearch = document.getElementById("product-search");
const productList = document.getElementById("product-list");

const deleteModal = document.getElementById("delete-modal");
const deleteProductName = document.getElementById("delete-product-name");
const cancelDeleteButton = document.getElementById("cancel-delete-button");
const confirmDeleteButton = document.getElementById("confirm-delete-button");

const toast = document.getElementById("toast");

/* DEĞİŞKENLER */

let menuData = {};
let categoryOrder = [];
let searchText = "";

let deleteCategoryName = "";
let deleteProductId = "";

let toastTimer;

/* GİRİŞ YAP */

loginForm.addEventListener("submit", async event => {
    event.preventDefault();

    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    loginMessage.textContent = "";
    loginMessage.className = "message";

    if (!email || !password) {
        showMessage(
            loginMessage,
            "E-posta ve şifre alanlarını doldurun.",
            "error"
        );
        return;
    }

    const loginButton = loginForm.querySelector(
        'button[type="submit"]'
    );

    loginButton.disabled = true;
    loginButton.innerHTML = `
        <i class="fas fa-circle-notch fa-spin"></i>
        Giriş yapılıyor...
    `;

    try {
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        loginForm.reset();
        showToast("Giriş başarılı.", "success");
    } catch (error) {
        console.error("Giriş hatası:", error);

        showMessage(
            loginMessage,
            getLoginError(error.code),
            "error"
        );
    } finally {
        loginButton.disabled = false;
        loginButton.innerHTML = `
            <i class="fas fa-right-to-bracket"></i>
            Giriş Yap
        `;
    }
});

/* ŞİFREYİ GÖSTER */

togglePassword.addEventListener("click", () => {
    const passwordVisible =
        loginPassword.type === "text";

    loginPassword.type = passwordVisible
        ? "password"
        : "text";

    togglePassword.innerHTML = passwordVisible
        ? '<i class="fas fa-eye"></i>'
        : '<i class="fas fa-eye-slash"></i>';
});

/* ÇIKIŞ YAP */

logoutButton.addEventListener("click", async () => {
    try {
        await signOut(auth);
        showToast("Çıkış yapıldı.", "info");
    } catch (error) {
        console.error("Çıkış hatası:", error);
        showToast("Çıkış yapılamadı.", "error");
    }
});

/* OTURUM KONTROLÜ */

onAuthStateChanged(auth, user => {
if (user) {
    loginScreen.classList.add("hidden");
    adminPanel.classList.remove("hidden");

    initializeMenuDatabase()
        .then(() => {
            listenMenu();
        })
        .catch(error => {
            console.error(
                "Menü başlangıç hatası:",
                error
            );

            showToast(
                "Mevcut ürünler hazırlanamadı.",
                "error"
            );

            listenMenu();
        });
} else {
        loginScreen.classList.remove("hidden");
        adminPanel.classList.add("hidden");

        menuData = {};
        categoryOrder = [];
    }
});


async function getInitialMenuFromScript() {
    const response = await fetch("./script.js", {
        cache: "no-store"
    });

    if (!response.ok) {
        throw new Error("script.js okunamadı.");
    }

    const scriptText = await response.text();

    const match = scriptText.match(
        /(?:export\s+)?const\s+menuData\s*=\s*(\{[\s\S]*?\});\s*\n\s*let\s+currentMenuData/
    );

    if (!match) {
        throw new Error(
            "script.js içinde başlangıç menüsü bulunamadı."
        );
    }

    return Function(
        `"use strict"; return (${match[1]});`
    )();
}

async function initializeMenuDatabase() {
    const menuRef = ref(database, "menu");
    const snapshot = await get(menuRef);

    // Firebase doluysa hiçbir şeye dokunma
    if (snapshot.exists()) {
        return;
    }

    const initialMenuData = await getInitialMenuFromScript();

    const firebaseMenu = {
        categoryOrder: [],
        categories: {}
    };

    Object.entries(initialMenuData).forEach(
        ([categoryName, products], categoryIndex) => {

            firebaseMenu.categoryOrder.push(categoryName);

            firebaseMenu.categories[categoryName] = {
                order: categoryIndex,
                productOrder: [],
                products: {}
            };

            products.forEach((product, productIndex) => {
                const productRef = push(
                    ref(
                        database,
                        `menu/categories/${categoryName}/products`
                    )
                );

                const productId = productRef.key;

                firebaseMenu
                    .categories[categoryName]
                    .productOrder
                    .push(productId);

                firebaseMenu
                    .categories[categoryName]
                    .products[productId] = {
                        name: product.n,
                        price: priceToNumber(product.p) ?? 0,
                        description: product.d || "",
                        order: productIndex,
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    };
            });
        }
    );

    await set(menuRef, firebaseMenu);

    showToast(
        "Mevcut menü Firebase'e otomatik aktarıldı.",
        "success"
    );
}

/* MENÜYÜ FIREBASE'DEN OKU */

function listenMenu() {
    const menuRef = ref(database, "menu");

    onValue(
        menuRef,
        snapshot => {
            const data = snapshot.val() || {};

            menuData = data.categories || {};
            categoryOrder = Array.isArray(data.categoryOrder)
                ? data.categoryOrder.filter(Boolean)
                : Object.keys(menuData);

            updateCategorySelect();
            updateStatistics();
            renderProducts();
        },
        error => {
            console.error("Menü okuma hatası:", error);

            productList.innerHTML = `
                <p style="color:#dc2626;">
                    Menü bilgileri yüklenemedi.
                </p>
            `;

            showToast(
                "Firebase verileri okunamadı.",
                "error"
            );
        }
    );
}

/* KATEGORİ SEÇİMİ */

function updateCategorySelect() {
    productCategory.innerHTML = `
        <option value="">Kategori seçin</option>
    `;

    categoryOrder.forEach(categoryName => {
        if (!menuData[categoryName]) return;

        const option = document.createElement("option");
        option.value = categoryName;
        option.textContent = categoryName;

        productCategory.appendChild(option);
    });
}

/* SAYAÇLAR */

function updateStatistics() {
    let totalProducts = 0;

    categoryOrder.forEach(categoryName => {
        const category = menuData[categoryName];

        if (!category?.products) return;

        totalProducts += Object.keys(
            category.products
        ).length;
    });

    categoryCount.textContent = categoryOrder.length;
    productCount.textContent = totalProducts;
}

/* MESAJLAR */

function showMessage(element, text, type) {
    element.textContent = text;
    element.className = `message ${type}`;
}

function showToast(text, type = "info") {
    clearTimeout(toastTimer);

    toast.textContent = text;
    toast.className = `toast ${type} show`;

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

function getLoginError(code) {
    const errors = {
        "auth/invalid-email":
            "E-posta adresi geçersiz.",

        "auth/invalid-credential":
            "E-posta veya şifre hatalı.",

        "auth/too-many-requests":
            "Çok fazla hatalı deneme yapıldı.",

        "auth/network-request-failed":
            "İnternet bağlantısını kontrol edin."
    };

    return errors[code] ||
        "Giriş yapılamadı. Bilgileri kontrol edin.";
}

/* FİYAT İŞLEMLERİ */

function priceToNumber(value) {
    const cleaned = String(value || "")
        .replace(/\s/g, "")
        .replace(/₺/g, "")
        .replace(/\./g, "")
        .replace(",", ".");

    const number = Number(cleaned);

    return Number.isFinite(number)
        ? number
        : null;
}

function formatPrice(value) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
        return "0,00 ₺";
    }

    return number.toLocaleString("tr-TR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) + " ₺";
}

function escapeHTML(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

/* ÜRÜNLERİ LİSTELE */

function renderProducts() {
    const blocks = [];

    categoryOrder.forEach(categoryName => {
        const category = menuData[categoryName];

        if (!category?.products) return;

const savedProductOrder = Array.isArray(category.productOrder)
    ? category.productOrder.filter(Boolean)
    : [];

const products = Object.entries(category.products)
    .map(([productId, product]) => ({
        id: productId,
        ...product
    }))
    .sort((a, b) => {
        const aIndex = savedProductOrder.indexOf(a.id);
        const bIndex = savedProductOrder.indexOf(b.id);

        if (aIndex === -1 && bIndex === -1) {
            return (a.order ?? 9999) - (b.order ?? 9999);
        }

        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;

        return aIndex - bIndex;
    })
            .filter(product => {
                if (!searchText) return true;

                const searchable = `
                    ${categoryName}
                    ${product.name || ""}
                    ${product.description || ""}
                `.toLocaleLowerCase("tr-TR");

                return searchable.includes(searchText);
            });

        if (products.length === 0) return;

        const productRows = products.map(product => `
            <div class="product-row">

                <div class="product-info">
                    <strong>${escapeHTML(product.name)}</strong>

                    ${
                        product.description
                            ? `<p>${escapeHTML(product.description)}</p>`
                            : ""
                    }
                </div>

                <div class="product-price">
                    ${escapeHTML(formatPrice(product.price))}
                </div>

<div class="product-actions">

    <button
        type="button"
        class="order-button"
        data-action="up"
        data-category="${encodeURIComponent(categoryName)}"
        data-id="${encodeURIComponent(product.id)}"
        title="Yukarı taşı"
    >
        <i class="fas fa-arrow-up"></i>
    </button>

    <button
        type="button"
        class="order-button"
        data-action="down"
        data-category="${encodeURIComponent(categoryName)}"
        data-id="${encodeURIComponent(product.id)}"
        title="Aşağı taşı"
    >
        <i class="fas fa-arrow-down"></i>
    </button>

    <button
        type="button"
        class="edit-button"
        data-action="edit"
        data-category="${encodeURIComponent(categoryName)}"
        data-id="${encodeURIComponent(product.id)}"
    >
        <i class="fas fa-pen"></i>
        Düzenle
    </button>

    <button
        type="button"
        class="delete-button"
        data-action="delete"
        data-category="${encodeURIComponent(categoryName)}"
        data-id="${encodeURIComponent(product.id)}"
    >
        <i class="fas fa-trash"></i>
        Sil
    </button>

</div>
            </div>
        `).join("");

        blocks.push(`
            <section class="category-block">

                <div class="category-title">
                    <h3>${escapeHTML(categoryName)}</h3>
                    <span>${products.length} ürün</span>
                </div>

                ${productRows}
            </section>
        `);
    });

    if (blocks.length === 0) {
        productList.innerHTML = `
            <p style="color:#64748b;">
                Ürün bulunamadı.
            </p>
        `;
        return;
    }

    productList.innerHTML = blocks.join("");
}

/* ÜRÜN ARAMA */

productSearch.addEventListener("input", event => {
    searchText = event.target.value
        .toLocaleLowerCase("tr-TR")
        .trim();

    renderProducts();
});

/* YENİ ÜRÜN EKLE / GÜNCELLE */

productForm.addEventListener("submit", async event => {
    event.preventDefault();

    productMessage.textContent = "";
    productMessage.className = "message";

    const categoryName = productCategory.value;
    const name = productName.value.trim();
    const price = priceToNumber(productPrice.value);
    const description = productDescription.value.trim();

    if (!categoryName) {
        showMessage(
            productMessage,
            "Kategori seçin.",
            "error"
        );
        return;
    }

    if (!name) {
        showMessage(
            productMessage,
            "Ürün adını yazın.",
            "error"
        );
        return;
    }

    if (price === null || price < 0) {
        showMessage(
            productMessage,
            "Geçerli bir fiyat yazın.",
            "error"
        );
        return;
    }

    const currentProductId = editingProductId.value;
    const oldCategoryName = editingCategory.value;

    const productData = {
        name,
        price,
        description,
        updatedAt: Date.now()
    };

    const saveButton = productForm.querySelector(
        'button[type="submit"]'
    );

    saveButton.disabled = true;
    saveButton.innerHTML = `
        <i class="fas fa-circle-notch fa-spin"></i>
        Kaydediliyor...
    `;

    try {
        if (currentProductId) {
            await updateProduct({
                productId: currentProductId,
                oldCategoryName,
                newCategoryName: categoryName,
                productData
            });

            showToast(
                "Ürün güncellendi.",
                "success"
            );
        } else {
            await addProduct(
                categoryName,
                productData
            );

            showToast(
                "Ürün eklendi.",
                "success"
            );
        }

        resetProductForm();

        showMessage(
            productMessage,
            currentProductId
                ? "Ürün başarıyla güncellendi."
                : "Ürün başarıyla eklendi.",
            "success"
        );
    } catch (error) {
        console.error("Ürün kaydetme hatası:", error);

        showMessage(
            productMessage,
            "Ürün kaydedilemedi.",
            "error"
        );

        showToast(
            "İşlem başarısız.",
            "error"
        );
    } finally {
        saveButton.disabled = false;
        saveButton.innerHTML = `
            <i class="fas fa-floppy-disk"></i>
            Kaydet
        `;
    }
});

/* YENİ ÜRÜN EKLE */

async function addProduct(categoryName, productData) {
    const productsRef = ref(
        database,
        `menu/categories/${categoryName}/products`
    );

    const newProductRef = push(productsRef);
    const productId = newProductRef.key;

    const category = menuData[categoryName];
    const currentOrder = Array.isArray(category?.productOrder)
        ? category.productOrder.filter(Boolean)
        : [];

    await update(ref(database), {
        [`menu/categories/${categoryName}/products/${productId}`]: {
            ...productData,
            order: currentOrder.length,
            createdAt: Date.now()
        },

        [`menu/categories/${categoryName}/productOrder`]: [
            ...currentOrder,
            productId
        ]
    });
}

/* ÜRÜN GÜNCELLE */

async function updateProduct({
    productId,
    oldCategoryName,
    newCategoryName,
    productData
}) {
    const oldProduct =
        menuData?.[oldCategoryName]?.products?.[productId] || {};

    const updatedProduct = {
        ...oldProduct,
        ...productData,
        createdAt: oldProduct.createdAt || Date.now(),
        updatedAt: Date.now()
    };

    // Kategori değişmediyse doğrudan ürünün üstüne yaz
    if (oldCategoryName === newCategoryName) {
        const productRef = ref(
            database,
            `menu/categories/${oldCategoryName}/products/${productId}`
        );

        await set(productRef, updatedProduct);
        return;
    }

    // Kategori değiştiyse eski yerden sil, yeni yere taşı
    const oldCategory = menuData[oldCategoryName];
    const newCategory = menuData[newCategoryName];

    const oldProductOrder = Array.isArray(oldCategory?.productOrder)
        ? oldCategory.productOrder.filter(id => id !== productId)
        : [];

    const newProductOrder = Array.isArray(newCategory?.productOrder)
        ? newCategory.productOrder.filter(Boolean)
        : [];

    await update(ref(database), {
        [`menu/categories/${oldCategoryName}/products/${productId}`]: null,
        [`menu/categories/${oldCategoryName}/productOrder`]: oldProductOrder,

        [`menu/categories/${newCategoryName}/products/${productId}`]:
            updatedProduct,

        [`menu/categories/${newCategoryName}/productOrder`]: [
            ...newProductOrder,
            productId
        ]
    });
}

/* DÜZENLE VE SİL BUTONLARI */

productList.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const action = button.dataset.action;

    const categoryName = decodeURIComponent(
        button.dataset.category
    );

    const productId = decodeURIComponent(
        button.dataset.id
    );

    if (action === "up") {
        moveProduct(categoryName, productId, -1);
        return;
    }

    if (action === "down") {
        moveProduct(categoryName, productId, 1);
        return;
    }

    if (action === "edit") {
        startEdit(categoryName, productId);
        return;
    }

    if (action === "delete") {
        openDeleteModal(categoryName, productId);
        return;
    }
});

async function moveProduct(categoryName, productId, direction) {
    const category = menuData[categoryName];

    if (!category?.products) {
        showToast("Kategori bulunamadı.", "error");
        return;
    }

    let order = Array.isArray(category.productOrder)
        ? category.productOrder.filter(Boolean)
        : Object.keys(category.products).sort((firstId, secondId) => {
            const firstOrder =
                category.products[firstId]?.order ?? 9999;

            const secondOrder =
                category.products[secondId]?.order ?? 9999;

            return firstOrder - secondOrder;
        });

    order = order.filter(id => category.products[id]);

    Object.keys(category.products).forEach(id => {
        if (!order.includes(id)) {
            order.push(id);
        }
    });

    const currentIndex = order.indexOf(productId);

    if (currentIndex === -1) {
        showToast("Ürün sıralamada bulunamadı.", "error");
        return;
    }

    const newIndex = currentIndex + direction;

    if (newIndex < 0) {
        showToast("Ürün zaten en üstte.", "info");
        return;
    }

    if (newIndex >= order.length) {
        showToast("Ürün zaten en altta.", "info");
        return;
    }

    [order[currentIndex], order[newIndex]] = [
        order[newIndex],
        order[currentIndex]
    ];

    try {
        await set(
            ref(
                database,
                `menu/categories/${categoryName}/productOrder`
            ),
            order
        );

        showToast(
            direction < 0
                ? "Ürün yukarı taşındı."
                : "Ürün aşağı taşındı.",
            "success"
        );
    } catch (error) {
        console.error("Ürün sıralama hatası:", error);

        showToast(
            "Ürün sırası değiştirilemedi.",
            "error"
        );
    }
}

/* DÜZENLEMEYİ BAŞLAT */

function startEdit(categoryName, productId) {
    const product =
        menuData?.[categoryName]?.products?.[productId];

    if (!product) {
        showToast(
            "Ürün bulunamadı.",
            "error"
        );
        return;
    }

    editingProductId.value = productId;
    editingCategory.value = categoryName;

    productCategory.value = categoryName;
    productName.value = product.name || "";
    productPrice.value = Number(product.price)
        .toLocaleString("tr-TR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    productDescription.value =
        product.description || "";

    formTitle.textContent = "Ürünü Düzenle";
    cancelEditButton.classList.remove("hidden");

    productForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

/* FORMU TEMİZLE */

function resetProductForm() {
    productForm.reset();

    editingProductId.value = "";
    editingCategory.value = "";

    formTitle.textContent = "Yeni Ürün Ekle";
    cancelEditButton.classList.add("hidden");
}

cancelEditButton.addEventListener("click", () => {
    resetProductForm();
});

/* SİLME PENCERESİNİ AÇ */

function openDeleteModal(categoryName, productId) {
    const product =
        menuData?.[categoryName]?.products?.[productId];

    if (!product) {
        showToast(
            "Ürün bulunamadı.",
            "error"
        );
        return;
    }

    deleteCategoryName = categoryName;
    deleteProductId = productId;

    deleteProductName.textContent =
        product.name || "Bu ürün";

    deleteModal.classList.remove("hidden");
}

/* SİLME PENCERESİNİ KAPAT */

function closeDeleteModal() {
    deleteCategoryName = "";
    deleteProductId = "";

    deleteModal.classList.add("hidden");
}

cancelDeleteButton.addEventListener(
    "click",
    closeDeleteModal
);

deleteModal.addEventListener("click", event => {
    if (event.target === deleteModal) {
        closeDeleteModal();
    }
});

/* ÜRÜNÜ SİL */

confirmDeleteButton.addEventListener(
    "click",
    async () => {
        if (
            !deleteCategoryName ||
            !deleteProductId
        ) {
            closeDeleteModal();
            return;
        }

        confirmDeleteButton.disabled = true;
        confirmDeleteButton.textContent = "Siliniyor...";

        try {
            const productRef = ref(
                database,
                `menu/categories/${deleteCategoryName}/products/${deleteProductId}`
            );

            await remove(productRef);

            showToast(
                "Ürün silindi.",
                "success"
            );

            if (
                editingProductId.value ===
                deleteProductId
            ) {
                resetProductForm();
            }

            closeDeleteModal();
        } catch (error) {
            console.error("Silme hatası:", error);

            showToast(
                "Ürün silinemedi.",
                "error"
            );
        } finally {
            confirmDeleteButton.disabled = false;
            confirmDeleteButton.textContent = "Sil";
        }
    }
);