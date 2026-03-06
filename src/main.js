import "./styles/main.scss";

const navLinks = [
  { href: "/Home", label: "Главная" },
  { href: "/Catalog", label: "Каталог" },
  { href: "/About", label: "О компании" },
  { href: "/Payment", label: "Оплата и доставка" },
  { href: "/Contacts", label: "Контакты" },
];

const products = [
  {
    id: 1,
    image: "/public/images/1.png",
    title: "Стальной канат для лифта GRS 9X21F(9Х17)-IWRC 1570",
    stock: "В наличии 50 м.",
    inStock: true,
  },
  {
    id: 2,
    image: "/public/images/2.png",
    title: "Стальной канат для лифта GRS 8X19S-NFC 1570",
    stock: "В наличии 50 м.",
    inStock: true,
  },
  {
    id: 3,
    image: "/public/images/3.png",
    title: "Стальной канат для лифта GRS 8X19W-CWC 1570",
    stock: "В наличии 50 м.",
    inStock: true,
  },
  {
    id: 4,
    image: "/public/images/4.png",
    title: "Плоский тяговый ремень для лифта GRS AAA717X1 (12 кордов)",
    stock: "Под заказ",
    inStock: false,
  },
  {
    id: 5,
    image: "/public/images/5.png",
    title: "Стальной канат для лифта GRS 9X21F(9Х17)-IWRC 1570",
    stock: "В наличии 50 м.",
    inStock: true,
  },
  {
    id: 6,
    image: "/public/images/6.png",
    title: "Купить плоский тяговый ремень для лифта GRS AAA717AJ1(8 кордов)",
    stock: "В наличии 50 м.",
    inStock: true,
  },
];

const headerNavList = document.querySelector("#header-nav-list");
const catalogList = document.querySelector("#catalog-list");
const burgerMenuList = document.querySelector("#burger-menu-list");
const burgerButton = document.querySelector("#burger-button");
const burgerClose = document.querySelector("#burger-close");
const burgerMenu = document.querySelector("#burger-menu");
const mobileQuery = window.matchMedia("(max-width: 767px)");

const renderNavLinks = (links, itemClass, linkClass) =>
  links
    .map(
      (link) => `
        <li class="${itemClass}">
          <a class="${linkClass}" href="${link.href}">${link.label}</a>
        </li>
      `,
    )
    .join("");

if (headerNavList) {
  headerNavList.innerHTML = renderNavLinks(
    navLinks,
    "header__nav-item",
    "header__nav-link",
  );
}

if (burgerMenuList) {
  burgerMenuList.innerHTML = renderNavLinks(
    navLinks,
    "header__burger-menu-item",
    "header__burger-menu-link",
  );
}

const createProductCard = (product) => `
  <article class="product-card">
    <img class="product-card__image" src="${product.image}" alt="${product.title}" />
    <div class="product-card__content">
      <h2 class="product-card__title">
        ${product.title}
      </h2>
      <div class="product-card__bottom">
        <div class="product-card__info">
          <img
            class="product-card__icon"
            src="${
              product.inStock
                ? "/public/icons/completed.svg"
                : "/public/icons/uncompleted.svg"
            }"
            alt="${product.inStock ? "В наличии" : "Под заказ"}"
          />
          <p class="product-card__description">${product.stock}</p>
        </div>
        <a class="details-link product-card__link" href="/Catalog">
          Подробнее
        </a>
      </div>
    </div>
  </article>
`;

const renderCatalog = () => {
  if (!catalogList) return;

  const isMobile = mobileQuery.matches;
  const sourceProducts = isMobile
    ? products.filter((product) => product.inStock)
    : products;
  const visibleProducts = isMobile
    ? sourceProducts.slice(0, 4)
    : sourceProducts;

  const middleIndex = Math.ceil(visibleProducts.length / 2);
  const leftColumnProducts = visibleProducts.slice(0, middleIndex);
  const rightColumnProducts = visibleProducts.slice(middleIndex);

  catalogList.innerHTML = `
    <div class="catalog__column">
      ${leftColumnProducts.map(createProductCard).join("")}
    </div>
    <div class="catalog__column">
      ${rightColumnProducts.map(createProductCard).join("")}
    </div>
  `;
};

renderCatalog();

if (mobileQuery.addEventListener) {
  mobileQuery.addEventListener("change", renderCatalog);
} else if (mobileQuery.addListener) {
  mobileQuery.addListener(renderCatalog);
}

const openBurger = () => {
  if (!burgerMenu || !burgerButton) return;
  burgerMenu.classList.add("header__burger-menu--open");
  burgerMenu.setAttribute("aria-hidden", "false");
  burgerButton.setAttribute("aria-expanded", "true");
  document.body.classList.add("no-scroll");
};

const closeBurger = () => {
  if (!burgerMenu || !burgerButton) return;
  burgerMenu.classList.remove("header__burger-menu--open");
  burgerMenu.setAttribute("aria-hidden", "true");
  burgerButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("no-scroll");
};

if (burgerButton && burgerMenu) {
  burgerButton.addEventListener("click", () => {
    const isOpen = burgerMenu.classList.contains("header__burger-menu--open");
    if (isOpen) {
      closeBurger();
    } else {
      openBurger();
    }
  });
}

if (burgerClose) {
  burgerClose.addEventListener("click", () => {
    closeBurger();
  });
}

if (burgerMenuList) {
  burgerMenuList.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest("a")) {
      closeBurger();
    }
  });
}
