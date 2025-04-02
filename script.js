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
    const modalImg = document.getElementById('modal-img');
    const modalGalleryContainer = document.getElementById('modal-gallery');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalBrand = document.getElementById('modal-brand');
    const modalSize = document.getElementById('modal-size');
    const modalPrice = document.getElementById('modal-price');
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');

    let allProducts = []; // Guarda todos os produtos carregados do JSON
    let cart = []; // Nosso carrinho

    // --- Funções Utilitárias ---
    function formatPrice(price) {
         // Verifica se price é um número antes de formatar
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

        // Preenche o Modal
        modalTitle.textContent = product.title;
        modalDescription.textContent = product.description;
        modalBrand.textContent = product.brand;
        modalSize.textContent = product.size;
        modalPrice.textContent = formatPrice(product.price);
        modalImg.src = product.imageUrl;
        modalImg.alt = product.title;

        // Limpa galeria antiga e popula a nova (se houver)
        modalGalleryContainer.innerHTML = '';
        const galleryImages = (product.galleryImages || '').split(',').map(s => s.trim()).filter(Boolean); // Pega links, remove vazios

        // Adiciona a imagem principal como primeira miniatura
        const mainThumb = document.createElement('img');
        mainThumb.src = product.imageUrl;
        mainThumb.alt = "Principal";
        mainThumb.classList.add('active-thumb'); // Marca como ativa
        mainThumb.addEventListener('click', () => swapModalImage(product.imageUrl, mainThumb));
        modalGalleryContainer.appendChild(mainThumb);

        // Adiciona outras imagens da galeria (se existirem)
        galleryImages.forEach(imgUrl => {
            const thumb = document.createElement('img');
            thumb.src = imgUrl;
            thumb.alt = "Detalhe";
            thumb.addEventListener('click', () => swapModalImage(imgUrl, thumb));
            modalGalleryContainer.appendChild(thumb);
        });

        // Guarda o ID no botão do modal para adicionar ao carrinho
        modalAddToCartBtn.dataset.productId = product.id;

        // Exibe o Modal e o Overlay específico dele
        productModal.style.display = 'block';
        modalOverlay.style.display = 'block'; // Usa o overlay do modal
        setTimeout(() => { // Pequeno delay para a transição de opacidade funcionar
             modalOverlay.classList.add('open');
        }, 10);
         // Trava o scroll da página principal
        document.body.style.overflow = 'hidden';
    }

     function swapModalImage(newImageUrl, clickedThumb) {
        modalImg.src = newImageUrl;
         // Atualiza qual miniatura está ativa
         document.querySelectorAll('#modal-gallery img').forEach(img => img.classList.remove('active-thumb'));
         clickedThumb.classList.add('active-thumb');
    }

    function closeProductModal() {
        productModal.style.display = 'none';
        modalOverlay.classList.remove('open');
        modalOverlay.style.display = 'none'; // Esconde o overlay do modal
         // Libera o scroll da página principal
        document.body.style.overflow = '';
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
        // ... (código da mensagem do WhatsApp igual ao anterior, usando seu número) ...
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
        cartOverlay.classList.remove('open');
        // Só esconde se o modal tbm não estiver aberto
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
            productGallery.innerHTML = '<p>Ops! Nenhuma peça cadastrada ou erro ao carregar. Tente atualizar a página.</p>';
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
            const response = await fetch('products.json'); // Busca o arquivo local
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            allProducts = await response.json();
            console.log("Produtos carregados:", allProducts);
            renderProducts(); // Renderiza após carregar
        } catch (error) {
            console.error("Falha ao carregar produtos do JSON:", error);
            if (productGallery) {
                 productGallery.innerHTML = '<p>😭 Ops! Não consegui carregar as peças. Verifique o arquivo products.json e tente recarregar a página.</p>';
            }
            allProducts = []; // Garante que está vazio em caso de erro
        }
         // Atualiza a view do carrinho (caso haja dados salvos, por exemplo - não implementado aqui)
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
    // Fechar Carrinho
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart); // Fecha carrinho clicando fora

    // Fechar Modal de Produto
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeProductModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeProductModal); // Fecha modal clicando fora

    // Botão Add ao Carrinho DENTRO do Modal
    if (modalAddToCartBtn) {
        modalAddToCartBtn.addEventListener('click', () => {
            const productId = parseInt(modalAddToCartBtn.dataset.productId);
            addToCart(productId);
            closeProductModal(); // Opcional: fechar modal após adicionar
        });
    }

    // Botão Finalizar Pedido (WhatsApp)
    if (checkoutWhatsAppBtn) {
        checkoutWhatsAppBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                const whatsappUrl = generateWhatsAppMessage();
                window.open(whatsappUrl, '_blank');
                console.log("Redirecionando para WhatsApp...");
            } else {
                alert("Seu carrinho está vazio!");
            }
        });
    }

    // --- Inicialização ---
    loadProducts(); // Inicia o carregamento dos produtos do JSON

}); // Fim do DOMContentLoaded
