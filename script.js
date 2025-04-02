document.addEventListener('DOMContentLoaded', () => {
    const productGallery = document.getElementById('product-gallery');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPriceElement = document.getElementById('cart-total-price');
    const cartCountHeaderElement = document.getElementById('cart-count-header');
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const checkoutWhatsAppBtn = document.getElementById('checkout-whatsapp-btn');

    // ============== SEUS PRODUTOS AQUI ==============
    // Edite esta lista com suas peças.
    // Use links de imagens que funcionem online (Google Drive, Imgur, etc.)
    // Certifique-se que os links das imagens sejam diretos para a imagem (terminem com .jpg, .png, etc.)
    // ou que permitam incorporação direta.
    const products = [
        {
            id: 1,
            title: "Jaqueta Jeans Vintage",
            description: "Aquela jaqueta coringa que vai com tudo! Perfeito estado.",
            size: "M",
            brand: "Levi's (inspired)",
            price: 89.90,
            imageUrl: "https://via.placeholder.com/300x300/EAC9C1/A34A41?text=Jaqueta+Jeans" // SUBSTITUA PELO LINK REAL
        },
        {
            id: 2,
            title: "Vestido Floral Leve",
            description: "Soltinho e super fresco pra arrasar no verão. Pouco uso.",
            size: "P",
            brand: "Renner",
            price: 55.00,
            imageUrl: "https://via.placeholder.com/300x300/84A98C/FFF?text=Vestido+Floral" // SUBSTITUA PELO LINK REAL
        },
        {
            id: 3,
            title: "Calça Pantalona Bege",
            description: "Elegante e confortável, tecido molinho. Ideal pro trabalho ou rolê.",
            size: "40",
            brand: "C&A",
            price: 65.50,
            imageUrl: "https://via.placeholder.com/300x300/E85A4F/FFF?text=Calca+Bege" // SUBSTITUA PELO LINK REAL
        },
        {
            id: 4,
            title: "Blusinha Cropped Canelada",
            description: "Basiquinha preta que não pode faltar! Fica linda com cintura alta.",
            size: "M",
            brand: "Sem Marca",
            price: 25.00,
            imageUrl: "https://via.placeholder.com/300x300/555/FFF?text=Blusa+Preta" // SUBSTITUA PELO LINK REAL
        }
        // Adicione mais produtos aqui seguindo o mesmo formato
        // { id: 5, title: "Nome", description: "Descrição", size: "Tamanho", brand: "Marca", price: Valor, imageUrl: "Link da foto" },
    ];
    // ================================================

    let cart = []; // Nosso carrinho começa vazio

    // --- Funções do Carrinho ---

    function findProductById(id) {
        return products.find(product => product.id === id);
    }

    function formatPrice(price) {
        return price.toFixed(2).replace('.', ',');
    }

    function addToCart(productId) {
        const productToAdd = findProductById(productId);
        if (productToAdd) {
            // Simplesmente adiciona, mesmo se repetido (facilita a lógica inicial)
            cart.push(productToAdd);
            console.log('Adicionado ao carrinho:', productToAdd);
            updateCartView();
            // Abre o carrinho automaticamente ao adicionar um item
            openCart();
        } else {
            console.error("Produto não encontrado:", productId);
        }
    }

    function removeFromCart(index) {
        if (index > -1 && index < cart.length) {
            cart.splice(index, 1); // Remove o item pelo índice
            updateCartView();
        }
    }

    function updateCartView() {
        // Limpa o conteúdo atual do carrinho na tela
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio. Bora garimpar?</p>';
        } else {
            cart.forEach((item, index) => {
                totalPrice += item.price;
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <img src="${item.imageUrl}" alt="${item.title}">
                    <div class="cart-item-info">
                        <strong>${item.title}</strong>
                        <span>Tam: ${item.size} / R$ ${formatPrice(item.price)}</span>
                    </div>
                    <button class="remove-item-btn" data-index="${index}">×</button>
                `;
                cartItemsContainer.appendChild(cartItemElement);

                // Adiciona evento ao botão de remover específico deste item
                 cartItemElement.querySelector('.remove-item-btn').addEventListener('click', (e) => {
                    const itemIndexToRemove = parseInt(e.target.getAttribute('data-index'));
                    removeFromCart(itemIndexToRemove);
                 });
            });
        }

        // Atualiza o preço total e a contagem no header
        cartTotalPriceElement.textContent = formatPrice(totalPrice);
        cartCountHeaderElement.textContent = cart.length;

        // Habilita/Desabilita botão do WhatsApp se o carrinho estiver vazio
        checkoutWhatsAppBtn.disabled = cart.length === 0;
    }

    function generateWhatsAppMessage() {
        if (cart.length === 0) return ""; // Não gerar mensagem se carrinho vazio

        // Substitua pelo seu número de WhatsApp aqui (com código do país e DDD, sem + ou espaços)
        const yourWhatsAppNumber = "551123597546";

        let message = "Olá! 👋 Tenho interesse nestes achadinhos do seu brechó:\n\n";
        let totalPrice = 0;

        cart.forEach(item => {
            message += `- ${item.title} (Tam: ${item.size}) - R$ ${formatPrice(item.price)}\n`;
            totalPrice += item.price;
        });

        message += `\n*Total: R$ ${formatPrice(totalPrice)}*`;
        message += "\n\nAguardo seu contato para combinar o pagamento e entrega! 😊";

        // Codifica a mensagem para URL
        const encodedMessage = encodeURIComponent(message);

        return `https://wa.me/${yourWhatsAppNumber}?text=${encodedMessage}`;
    }

    // --- Funções da Interface ---

    function renderProducts() {
        // Só executa se estivermos na página da galeria
        if (!productGallery) return;

        productGallery.innerHTML = ''; // Limpa o "Carregando..."

        if (products.length === 0) {
            productGallery.innerHTML = '<p>Ops! Nenhuma peça cadastrada ainda. Volte em breve!</p>';
            return;
        }

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.title}">
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <p><strong>Marca:</strong> ${product.brand} | <strong>Tamanho:</strong> ${product.size}</p>
                    <p class="price">R$ ${formatPrice(product.price)}</p>
                    <button class="btn-add-cart" data-product-id="${product.id}">Quero essa!</button>
                </div>
            `;
            productGallery.appendChild(productCard);

            // Adiciona o evento de clique ao botão "Quero essa!"
            const addButton = productCard.querySelector('.btn-add-cart');
            addButton.addEventListener('click', () => {
                const productId = parseInt(addButton.getAttribute('data-product-id'));
                addToCart(productId);
            });
        });
    }

    function openCart() {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open');
    }

    function closeCart() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
    }

    // --- Event Listeners ---

    // Abrir carrinho
    if (openCartBtn) {
        openCartBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Previne que o link '#' suba a página
            openCart();
        });
    }

    // Fechar carrinho
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart); // Fecha clicando fora
    }

    // Botão Finalizar Pedido (WhatsApp)
    if (checkoutWhatsAppBtn) {
        checkoutWhatsAppBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                const whatsappUrl = generateWhatsAppMessage();
                if(whatsappUrl.includes("551123597546")) {
                     alert("Opa! Parece que você esqueceu de colocar seu número de WhatsApp no arquivo script.js. Edite o arquivo e tente de novo! 😉");
                     return;
                }
                // Abre em uma nova aba
                window.open(whatsappUrl, '_blank');
                console.log("Redirecionando para WhatsApp...");
                // Opcional: Limpar carrinho após enviar
                // cart = [];
                // updateCartView();
                // closeCart();
            } else {
                alert("Seu carrinho está vazio!");
            }
        });
    }


    // --- Inicialização ---
    renderProducts(); // Desenha os produtos na galeria (se a div existir)
    updateCartView(); // Atualiza a contagem inicial no header e no carrinho

}); // Fim do DOMContentLoaded
