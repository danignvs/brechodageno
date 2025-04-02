document.addEventListener('DOMContentLoaded', () => {
    // Elementos da Galeria e Carrinho
    const productGallery = document.getElementById('product-gallery');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPriceElement = document.getElementById('cart-total-price');
    const cartCountHeaderElement = document.getElementById('cart-count-header');
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay'); // Overlay do carrinho
    const checkoutWhatsAppBtn = document.getElementById('checkout-whatsapp-btn');

    // Elementos do Modal de Produto
    const productModal = document.getElementById('product-modal');
    const modalOverlay = document.getElementById('modal-overlay'); // Overlay do modal
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalBrand = document.getElementById('modal-brand');
    const modalSize = document.getElementById('modal-size');
    const modalPriceValue = document.getElementById('modal-price-value'); // ID ATUALIZADO
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');

    // Container do Swiper e Wrapper (precisamos deles)
    const swiperWrapper = productModal.querySelector('.swiper-wrapper');

    let allProducts = []; // Guarda todos os produtos carregados do JSON
    let cart = []; // Nosso carrinho
    let productSwiper = null; // Variável para guardar a instância do Swiper

    // --- Funções Utilitárias ---
    function formatPrice(price) {
         if (typeof price === 'number') {
            return price.toFixed(2).replace('.', ',');
         }
         return '0,00'; // Retorna um valor padrão ou lida com o erro como preferir
    }

    function findProductById(id) {
        // Certifica que o id é um número para comparação
        const numericId = parseInt(id);
        return allProducts.find(product => product.id === numericId);
    }

    // --- Funções do Modal ---
    function openProductModal(productId) {
        const product = findProductById(productId);
        if (!product) return;

        // Preenche informações básicas do Modal
        modalTitle.textContent = product.title;
        modalDescription.textContent = product.description;
        modalBrand.textContent = product.brand;
        modalSize.textContent = product.size;
        modalPriceValue.textContent = formatPrice(product.price); // Usa o ID atualizado
        modalAddToCartBtn.dataset.productId = product.id; // Guarda ID no botão

        // Limpa slides antigos do wrapper do Swiper
        swiperWrapper.innerHTML = '';

        // Cria a lista de URLs de imagem (principal + galeria)
        const imageUrls = [product.imageUrl]; // Começa com a imagem principal
        // Pega links da galeria, separa por vírgula, remove espaços e filtra strings vazias
        const galleryImages = (product.galleryImages || '')
                                .split(',')
                                .map(s => s.trim())
                                .filter(Boolean);
        imageUrls.push(...galleryImages); // Adiciona as imagens da galeria à lista principal

        // Cria os slides do Swiper dinamicamente
        imageUrls.forEach(imgUrl => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            // Adiciona o container necessário para o zoom
            slide.innerHTML = `
                <div class="swiper-zoom-container">
                    <img src="${imgUrl}" alt="${product.title} - Imagem ${imageUrls.indexOf(imgUrl) + 1}">
                </div>
            `;
            swiperWrapper.appendChild(slide);
        });

        // Exibe o Modal e o Overlay ANTES de inicializar o Swiper
        productModal.style.display = 'block';
        modalOverlay.style.display = 'block'; // Usa o overlay do modal
        setTimeout(() => { // Pequeno delay para a transição de opacidade funcionar
             modalOverlay.classList.add('open');
        }, 10);
         // Trava o scroll da página principal
        document.body.style.overflow = 'hidden';

        // Inicializa o Swiper DEPOIS que o modal está visível
        // Destrói instância anterior se existir (segurança extra)
        if (productSwiper) {
            productSwiper.destroy(true, true);
            productSwiper = null;
        }

        // Adiciona um pequeno delay para garantir que o DOM está pronto e visível
        setTimeout(() => {
            productSwiper = new Swiper('.product-swiper', {
                // Opções do Swiper
                loop: imageUrls.length > 1, // Loop só se tiver mais de 1 imagem
                grabCursor: true,

                // Zoom (requer o container .swiper-zoom-container em cada slide)
                zoom: {
                    maxRatio: 3, // Zoom máximo de 3x
                    minRatio: 1, // Zoom mínimo é 1x (tamanho normal)
                    toggle: true, // Habilita/desabilita zoom com duplo clique
                },

                // Paginação (bolinhas)
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true, // Permite clicar nas bolinhas
                },

                // Navegação (setas)
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                 // Melhora acessibilidade
                a11y: {
                    prevSlideMessage: 'Imagem anterior',
                    nextSlideMessage: 'Próxima imagem',
                    slideLabelMessage: 'Imagem {{index}} de {{slidesLength}}',
                    zoomInMessage: 'Duplo clique para ampliar',
                    zoomOutMessage: 'Duplo clique para reduzir'
                 },

                 // Recalcula o tamanho ao ser exibido (importante para modais)
                 observer: true, // Observa mudanças no container do Swiper
                 observeParents: true, // Observa mudanças nos pais do Swiper
                 observeSlideChildren: true, // Observa mudanças nos filhos dos slides (imagens carregando)

                 // Atalhos de teclado (opcional, mas bom para acessibilidade)
                 keyboard: {
                    enabled: true,
                    onlyInViewport: false, // Funciona mesmo se não estiver totalmente visível
                 },
            });
        }, 150); // Aumentei um pouco o delay para garantir renderização

    }

    function closeProductModal() {
        productModal.style.display = 'none';
        modalOverlay.classList.remove('open');
        modalOverlay.style.display = 'none'; // Esconde o overlay do modal

        // Só libera o scroll se o carrinho também não estiver aberto
        if (!cartSidebar.classList.contains('open')) {
             document.body.style.overflow = ''; // Libera scroll
        }

        // Destrói a instância do Swiper ao fechar o modal
        if (productSwiper) {
            productSwiper.destroy(true, true); // true, true limpa tudo (estilos e listeners)
            productSwiper = null; // Reseta a variável
        }
    }

    // --- Funções do Carrinho ---
    function addToCart(productId) {
        const productToAdd = findProductById(productId);
        if (productToAdd) {
            cart.push(productToAdd);
            updateCartView();
            openCart(); // Abre o carrinho ao adicionar
        } else {
            console.error("Produto não encontrado ao adicionar no carrinho:", productId);
        }
    }

    function removeFromCart(index) {
        if (index > -1 && index < cart.length) {
            cart.splice(index, 1);
            updateCartView();
        }
    }

    function updateCartView() {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio. Bora garimpar?</p>';
        } else {
            cart.forEach((item, index) => {
                 // Verifica se item.price é um número
                const itemPrice = typeof item.price === 'number' ? item.price : 0;
                totalPrice += itemPrice;

                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <img src="${item.imageUrl}" alt="${item.title}">
                    <div class="cart-item-info">
                        <strong>${item.title}</strong>
                        <span>Tam: ${item.size} / R$ ${formatPrice(itemPrice)}</span>
                    </div>
                    <button class="remove-item-btn" data-index="${index}">×</button>
                `;
                cartItemsContainer.appendChild(cartItemElement);

                 cartItemElement.querySelector('.remove-item-btn').addEventListener('click', (e) => {
                    const itemIndexToRemove = parseInt(e.target.getAttribute('data-index'));
                    removeFromCart(itemIndexToRemove);
                 });
            });
        }
        cartTotalPriceElement.textContent = formatPrice(totalPrice);
        cartCountHeaderElement.textContent = cart.length;
        checkoutWhatsAppBtn.disabled = cart.length === 0;
    }

    function generateWhatsAppMessage() {
        if (cart.length === 0) return "";
        const yourWhatsAppNumber = "551123597546"; // SEU NÚMERO AQUI
        let message = "Olá! 👋 Tenho interesse nestes achadinhos do seu brechó:\n\n";
        let totalPrice = 0;
        cart.forEach(item => {
             const itemPrice = typeof item.price === 'number' ? item.price : 0;
            message += `- ${item.title} (Tam: ${item.size}) - R$ ${formatPrice(itemPrice)}\n`;
            totalPrice += itemPrice;
        });
        message += `\n*Total: R$ ${formatPrice(totalPrice)}*`;
        message += "\n\nAguardo seu contato para combinar o pagamento e entrega! 😊";
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${yourWhatsAppNumber}?text=${encodedMessage}`;
    }

    function openCart() {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open'); // Usa o overlay do carrinho
        cartOverlay.style.display = 'block'; // Garante que está visível
         // Trava o scroll da página principal
         document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cartSidebar.classList.remove('open');
        // Só remove a classe 'open' do overlay. Não o esconde ainda.
        cartOverlay.classList.remove('open');

        // Só esconde o overlay e libera o scroll se o modal também não estiver aberto
         if (productModal.style.display !== 'block') {
             cartOverlay.style.display = 'none';
             document.body.style.overflow = ''; // Libera scroll
         }
    }

    // --- Renderização dos Produtos na Galeria ---
    function renderProducts() {
        if (!productGallery) return;
        productGallery.innerHTML = ''; // Limpa o "Carregando..."

        if (allProducts.length === 0) {
            // Mensagem será exibida pelo loadProducts em caso de erro
            return;
        }

        allProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
             // Card simplificado
            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.title}">
                <div class="product-info">
                    <p class="brand-size"><strong>Marca:</strong> ${product.brand || 'N/D'} | <strong>Tam:</strong> ${product.size || 'N/D'}</p>
                    <p class="price">R$ ${formatPrice(product.price)}</p>
                    <button class="btn-see-more" data-product-id="${product.id}">👀 Ver Mais</button>
                </div>
            `;
            productGallery.appendChild(productCard);

            // Adiciona evento ao botão "Ver Mais"
            const seeMoreButton = productCard.querySelector('.btn-see-more');
            seeMoreButton.addEventListener('click', () => {
                const productId = parseInt(seeMoreButton.getAttribute('data-product-id'));
                openProductModal(productId);
            });
        });
    }

    // --- Carregamento Inicial dos Dados ---
    async function loadProducts() {
        try {
            // Adiciona um parâmetro anti-cache à URL do JSON
            const response = await fetch(`products.json?v=${Date.now()}`);
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
            }
            // Verifica o tipo de conteúdo antes de tentar parsear como JSON
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                // Se não for JSON, loga o texto para depuração
                const textResponse = await response.text();
                console.error("Resposta recebida não é JSON:", textResponse);
                throw new TypeError("Oops, a resposta não foi JSON!");
            }

            allProducts = await response.json();
            console.log("Produtos carregados:", allProducts);
            if (!Array.isArray(allProducts)) {
                 console.error("O arquivo products.json não contém um array JSON válido.");
                 throw new Error("Formato de dados inválido no products.json");
            }
            renderProducts(); // Renderiza após carregar e validar
        } catch (error) {
            console.error("Falha ao carregar ou processar produtos do JSON:", error);
            if (productGallery) {
                 productGallery.innerHTML = `<p style="color: red; text-align: center; grid-column: 1 / -1;">😭 Ops! Não consegui carregar as peças.<br>Verifique o console (F12) para mais detalhes e o arquivo products.json.</p>`;
            }
            allProducts = []; // Garante que está vazio em caso de erro
        }
         // Atualiza a view do carrinho (caso haja dados salvos, por exemplo)
         updateCartView();
    }

    // --- Event Listeners ---

    // Abrir Carrinho
    if (openCartBtn) {
        openCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    }
    // Fechar Carrinho (Botão e Overlay)
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', () => {
        // Overlay fecha tanto o carrinho quanto o modal se estiverem abertos
        if (cartSidebar.classList.contains('open')) {
            closeCart();
        }
        if (productModal.style.display === 'block') {
             closeProductModal();
        }
    });

    // Fechar Modal de Produto (Botão específico)
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeProductModal);
    // O overlay já está sendo tratado acima para fechar ambos

    // Botão Add ao Carrinho DENTRO do Modal
    if (modalAddToCartBtn) {
        modalAddToCartBtn.addEventListener('click', () => {
            const productId = parseInt(modalAddToCartBtn.dataset.productId);
            addToCart(productId);
            // Não fecha mais o modal automaticamente
        });
    }

    // Botão Finalizar Pedido (WhatsApp)
    if (checkoutWhatsAppBtn) {
        checkoutWhatsAppBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                const whatsappUrl = generateWhatsAppMessage();
                window.open(whatsappUrl, '_blank'); // Abre em nova aba
            } else {
                alert("Seu carrinho está vazio!");
            }
        });
    }

    // --- Inicialização ---
    loadProducts(); // Inicia o carregamento dos produtos do JSON

}); // Fim do DOMContentLoaded
