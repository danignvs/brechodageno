document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('.product-grid');
    const cartButton = document.getElementById('cart-button');
    const cartPopup = document.getElementById('cart-popup');
    const closeCartPopup = document.getElementById('close-cart-popup');
    const cartItemsList = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout-button');
    const cartCountSpan = document.getElementById('cart-count');

    const productPopup = document.getElementById('product-popup');
    const closeProductPopup = document.getElementById('close-product-popup');
    const productNameDisplay = document.getElementById('product-name');
    const productBrandDisplay = document.getElementById('product-brand');
    const productSizeDisplay = document.getElementById('product-size');
    const productPriceDisplay = document.getElementById('product-price');
    const productDescriptionDisplay = document.getElementById('product-description');
    const carouselInner = document.querySelector('.carousel-inner');
    const prevSlideButton = document.getElementById('prev-slide');
    const nextSlideButton = document.getElementById('next-slide');
    const addToCartPopupButton = document.getElementById('add-to-cart-popup');

    const marcaFilter = document.getElementById('marca');
    const filters = document.querySelectorAll('.filters select');
    const filtersContainer = document.querySelector('.filters-container');
    const filterToggleButton = document.getElementById('filter-toggle-button');
    const closeFiltersButton = document.getElementById('close-filters-button');

    let products = [
        {
            id: 1,
            nome: 'mil corações',
            tamanho: 'M',
            marca: 'shein',
            preco: 30,
            imagens: [
                'https://photos.enjoei.com.br/vestido-de-coracoes-fresquinho-114180364/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvNDEyYjE1MDQwMmJiMTViY2U2NTRlYTA5NTRmZWI4M2EuanBn',
                'https://photos.enjoei.com.br/vestido-de-coracoes-fresquinho-114180364/800x800/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvMWIwYmZmN2UxNGE2YjM2NDRhNDk4NGE0ZDQyMDhkYmEuanBn',
                'https://photos.enjoei.com.br/vestido-de-coracoes-fresquinho-114180364/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvZWQ2NTMzOGFmZDJmMjdhOWIyMTgwMjc4MDBmZGQzYTYuanBn',
                'https://photos.enjoei.com.br/vestido-de-coracoes-fresquinho-114180364/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvZjU0N2JlNmRkZmU1YWRmOWI0OGIwMDI1MGEyYmI0OTguanBn',
                'https://photos.enjoei.com.br/vestido-de-coracoes-fresquinho-114180364/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvOTg1MzUzNjkxZjhlNDc1MWFjODQ1ZDFhOTNjMzY0ZDguanBn',
            ],
            descricaoLonga: 'vestido estampado super fofo, com corações por toda parte! tamanho g na etiqueta, mas veste como um m do brasil. saia forrada, bolsos laterais e um caimento incrível.\n84cm comprimento\n59cm quadril\n49cm cintura\n54cm busto'
        },
        {
            id: 2,
            nome: 'all star rosé',
            tamanho: '38',
            marca: 'all star',
            preco: 80,
            imagens: [
                'https://photos.enjoei.com.br/all-star-converse-rose-114571291/800x800/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvYzRlNjYwYzQyOGI3YzQzMTEwNjU2NDg0NmEzN2MxMDguanBn',
                'https://photos.enjoei.com.br/all-star-converse-rose-114571291/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvM2Y5YzE0NjE3YWViYzU2OTY5NWU0ZTc3MWZiYzM5OTguanBn',
                'https://photos.enjoei.com.br/all-star-converse-rose-114571291/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvYTFmMzdhMjg1MDM0NjdhMGE1MzUzZGM4ZDY5MTI5OWYuanBn',
            ],
            descricaoLonga: 'a cor da delicadeza! super confortável e lindo!'
        },
        {
            id: 3,
            nome: 'ousadia rosa',
            tamanho: '36',
            marca: 'calvin klein',
            preco: 30,
            imagens: [
                'https://photos.enjoei.com.br/ousadia-rosa-114551973/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvYzI5OGJhMjNlY2MxZjZhMWRiZjNhYTM2NGYzN2E3NmMuanBn',
                'https://photos.enjoei.com.br/ousadia-rosa-114551973/828xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvM2RlM2EzYjQ4NmVlMWYxYTYwZGE2MzM3Y2RlYjk5MjcuanBn',
                'https://photos.enjoei.com.br/ousadia-rosa-114551973/828xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvMDYyMzdjMDY5MGQ0NDY2ZTQ4Y2Q2MjMzMmU3MjAxYWIuanBn',
                'https://photos.enjoei.com.br/ousadia-rosa-114551973/828xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvNmJlMDg0Y2I3ZmY5ZjljODZkZWViZjliY2FmYmVkNDIuanBn',
            ],
            descricaoLonga: `alerta de achado!
            calça rosa calvin klein jeans, com a barra desfiada e alguns detalhes destroyed, perfeita pra montar looks despojados e cheios de personalidade. corre pra não perder!

36cm cintura
43cm quadril
107cm comprimento`
        },
        {
            id: 4,
            nome: 'básico soltinho',
            tamanho: 'G',
            marca: 'RTOP',
            preco: 30,
            imagens: [
                'https://photos.enjoei.com.br/basico-soltinho-119121360/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvMmE0OWQ1YjdhNzZlMmYyMzhhYzZmM2Q2YTRmZTkxY2QuanBn',
                'https://photos.enjoei.com.br/basico-soltinho-119121360/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvOGVlNmI3ZmUxNzA0OWJmNWU3MzIzMzM2MWRkZTNlN2UuanBn',
                'https://photos.enjoei.com.br/basico-soltinho-119121360/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvZjU3OTEyZjE3MDhiNjk2OWM5MzUzZmVmMjZlZjliM2YuanBn',
            ],
            descricaoLonga: `vestido preto de viscose daqueles que toda mulher precisa ter!
lavado, porém nunca usado.. novinho!

51cm busto
58cm cintura
63cm quadril
83cm comprimento`
        },
        {
            id: 5,
            nome: 'vestido de viscose',
            tamanho: 'M',
            marca: 'lecimar',
            preco: 25,
            imagens: [
                'https://photos.enjoei.com.br/vestido-laranja-com-detalhe-de-nozinho-115194845/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvNTAxOGMwNzNmOTUwZWFlMTVjODM2MWRmMGM5ODQwMzQuanBn',
                'https://photos.enjoei.com.br/vestido-laranja-com-detalhe-de-nozinho-115194845/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvMzIwMGFkMGYzOWE1ZmY5MTAwZmFjMWVlYjVjOGY2YzIuanBn',
                'https://photos.enjoei.com.br/vestido-laranja-com-detalhe-de-nozinho-115194845/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvZDg4ZDhlZTJhYjc5NWRmY2Y3ZjlmYTEwODQwNzI1MzEuanBn',
                'https://photos.enjoei.com.br/vestido-laranja-com-detalhe-de-nozinho-115194845/828xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvYzAxZWUyOWYxODlhN2Q1YzQ4MjA1NTE3OTQ5ZTcwZTQuanBn',
                ],
            descricaoLonga: `vestido laranja, super fresh e estiloso! com detalhe de nózinho na frente e caimento leve. perfeito para arrasar no dia a dia!

            100cm comprimento
            37cm cintura
            52cm busto
            57cm quadril`
        },
        {
            id: 6,
            nome: 'rosé fofo',
            tamanho: 'M',
            marca: 'Hering',
            preco: 30,
            imagens: [
                'https://photos.enjoei.com.br/vestido-rose-fofo-114239220/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvNjY1YzNlNDg2YjViMTkzMjQwYWNjMmQ3OTdlYTA3MGIuanBn',
                'https://photos.enjoei.com.br/vestido-rose-fofo-114239220/828xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvOTJhNzNmNGE5YmI3ZDk0ZGVhMDdhNGM5YjhmNzhjZmQuanBn',
                'https://photos.enjoei.com.br/vestido-rose-fofo-114239220/828xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvNzIzZWU4NzQ5ZTFkOTY5MTA2OTFhY2M4YzhkOTI2Y2QuanBn',
                'https://photos.enjoei.com.br/vestido-rose-fofo-114239220/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvYzllNWE5OTVlNzMyM2JmZDE3YjAyMzI2MTVmODk2YjcuanBn',
            ],
            descricaoLonga: `uma graça! básico com estilo.
    
    90cm comprimento
    54cm busto
    55cm cintura
    56cm quadril`
        },
        {
            id: 7,
            nome: 'capitão américa',
            tamanho: '8',
            marca: 'fantasia',
            preco: 35,
            imagens: [
                'https://photos.enjoei.com.br/vingadores-thor-homem-de-ferro-e-capitao-america-115204583/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvYzVhZmQ3MWNkZGE2YjA0Y2E4ZTUzNmRjY2FmMDFkOTkuanBn'
            ],
            descricaoLonga: `fantasia do capitão américa com enchimento (tecido com bolinhas)
    
    99cm comprimento
    36cm peito
    34cm cintura
    37cm quadril
    55cm ombro ao cavalo`
        },
        {
            id: 8,
            nome: 'homem de ferro',
            tamanho: '8',
            marca: 'fantasia',
            preco: 25,
            imagens: [
                'https://photos.enjoei.com.br/vingadores-thor-homem-de-ferro-e-capitao-america-115204583/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvN2I0N2M4MGU2ODEyMWNhY2FkMWJiMmYxZDI3Yzk2OWUuanBn'
            ],
            descricaoLonga: `108cm comprimento
            36cm peito
            32cm cintura
            34cm quadril
            56cm ombro ao cavalo`
        },
        {
            id: 9,
            nome: 'thor',
            tamanho: '8',
            marca: 'fantasia',
            preco: 25,
            imagens: [
                'https://photos.enjoei.com.br/vingadores-thor-homem-de-ferro-e-capitao-america-115204583/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvODg2YWQ3MmNlMGQ1MTQ4ZjRiNGQ3YzU3NGYyNjBhOGUuanBn',
                'https://photos.enjoei.com.br/vingadores-thor-homem-de-ferro-e-capitao-america-115204583/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvNzVhMmRmZWM0YWIxY2NjN2U4Njc2ZjMxNWVjYzAxMDQuanpn'
            ],
            descricaoLonga: `(furinho na perna)
            99cm comprimento
            37cm peito
            34cm cintura e quadril
            56cm ombro ao cavalo`
        },
        {
            id: 10,
            nome: 'camisete modeladora',
            tamanho: 'm',
            marca: 'delrio',
            preco: 35,
            imagens: [
                'https://photos.enjoei.com.br/camisete-modeladora-delrio-nova-115422269/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvOGZjN2MwZGNiNWRlMTE0YzEyYjViMjNjOTMxNDQwYWIuanBn',
                'https://photos.enjoei.com.br/camisete-modeladora-delrio-nova-115422269/828xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvNGNkMzI1YTUyMTI4NjAxM2EyMjVmODc3ZWExYjJhNWQuanBn',
                'https://photos.enjoei.com.br/camisete-modeladora-delrio-nova-115422269/828xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvNTI0NDk1MjA4ZDhjMGM5YTQ0OWEyNTdmMTMxMjA2NTUuanBn'
            ],
            descricaoLonga: `preta em poliamida turbinada com elastano! aquele abraço que modela e te deixa super confortável. look perfeito e bem-estar garantidos. nunca usada!
    
            28cm de largura sem esticar
            + ou - 35cm esticando, com conforto`
        },
        {
            id: 11,
            nome: 'camisa homem-aranha',
            tamanho: '8',
            marca: 'spiderman',
            preco: 30,
            imagens: [
                'https://photos.enjoei.com.br/camisa-spiderman-114232912/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvMGExYzM0OWQ4OTBmZTlhZDdmMGRjYjgyMzI5ZjcyMjAuanBn',
                'https://photos.enjoei.com.br/camisa-spiderman-114232912/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvZGU5YTQ2ZDJiMjc5OGE2YWFiM2JkNDFlM2IxYjE3ZWMuanBn',
                'https://photos.enjoei.com.br/camisa-spiderman-114232912/828xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvZDMyZDJlNmI4NjFkYWVjYWYzZjhkY2YzNmI5YTEyYTIuanBn'
            ],
            descricaoLonga: `camisa casual xadrez com gorro do homem-aranha, super estilosa!
            pouco usada, estado de nova.
            
            37cm largura
            50cm comprimento
            43cm manga`
        },
        {
            id: 12,
            nome: 'kit óculos 3D',
            tamanho: 'adulto',
            marca: 'LG',
            preco: 30,
            imagens: [
                'https://photos.enjoei.com.br/7-oculos-3d-115196377/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvZTAyMjRlYWQxZDdkOTJiZGYzYjFiOWU1MzdjZWE5MDEuanBn',
                'https://photos.enjoei.com.br/7-oculos-3d-115196377/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvYjJkMzdhYjk1OTFjNmE5MGUwNDE3ZDQwNGM1MWFlODYuanBn'
            ],
            descricaoLonga: `**atenção: só funcionam com tv 3d**
            são 5 do cinemark (que também funcionam com tv 3d) e 2 da lg , todos usados, mas em ótimo estado.`
        },
        {
            id: 13,
            nome: 'fofura em viscose',
            tamanho: 'm',
            marca: 'mercatto',
            preco: 40,
            imagens: [
                'https://photos.enjoei.com.br/fofura-em-viscose-o-vestido-mais-lindo-do-verao-115424712/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvYTE1ZjA2YmY0YTk1YzlkZTZlMDNhODEwZjIwNzg0MGUuanBn',
                'https://photos.enjoei.com.br/fofura-em-viscose-o-vestido-mais-lindo-do-verao-115424712/828xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvZGRjZGRmNWNhYjQ0ZDg3Zjg2ZTQzMDg2OTVhYTY5NGIuanBn',
                'https://photos.enjoei.com.br/fofura-em-viscose-o-vestido-mais-lindo-do-verao-115424712/828xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvYTgxYWRmNGU4NjcxMDZmZWJjYTMxY2YyYzBhYzdjMDUuanBn'
            ],
            descricaoLonga: `viscose + estampa de passarinho: a combinação perfeita pro verão! leveza, frescor e conforto pra você voar por aí com muito estilo.
    
            85cm de comprimento sem contar a alça, que é ajustável
            45cm de busto
            45cm de cintura com cordão de ajuste
            55cm de quadril`
        },
        {
            id: 14,
            nome: 'pink tudo!',
            tamanho: 'p',
            marca: 'Hering',
            preco: 40,
            imagens: [
                'https://photos.enjoei.com.br/camisa-de-viscose-rosa-114303798/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvZGYwZDVjOGM0NzYwMzhhY2RkODliM2Q2ZjM0MThjNmUuanBn',
                'https://photos.enjoei.com.br/camisa-de-viscose-rosa-114303798/828xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvNjAzNzBiOWRjM2RkY2VlMGEyYWI5MGJhNjZlYzMxZjMuanBn',
                'https://photos.enjoei.com.br/camisa-de-viscose-rosa-114303798/828xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvNmVmMmU2NjYxZjQyM2EwOGIxODdjZmQ3ODY5OTQ1NWIuanBn'
            ],
            descricaoLonga: `camisa de viscose rosa vibrante, perfeita para dar um up no visual! manga longa com detalhe pra dobrar e tecido leve. tem botões e um bolsinho frontal, um charme!
    
            58cm comprimento
            50cm busto
            57cm manga`
        },
        {
            id: 15,
            nome: 'barquinhos',
            tamanho: 'p',
            marca: 'Hering',
            preco: 30,
            imagens: [
                'https://photos.enjoei.com.br/camisa-de-viscose-sem-manga-114304284/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvMDIxMjcwNGYyM2ZkNDI1N2E0NWE3YjcwMDJiOTRmZGYuanBn',
                'https://photos.enjoei.com.br/camisa-de-viscose-sem-manga-114304284/828xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvMDU3MGUzZWE0ZTU5MGEwMzFiOTBhMDU2MWM3YTJiYjEuanBn',
                'https://photos.enjoei.com.br/camisa-de-viscose-sem-manga-114304284/828xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvODJmZjA5ZTAyOTQ0ODZhNGUzZTk0MTNjODNhYWM3NjMuanBn',
                'https://photos.enjoei.com.br/camisa-de-viscose-sem-manga-114304284/828xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvYTBhNDQzOTgwMGViYmJlYWI3NGRlMGNhZDc0MGE0MTcuanBn'
            ],
            descricaoLonga: `camisa sem manga azul marinho com estampa de barquinhos, super fofa! tem botões e um bolsinho, perfeita pra um look estiloso e fresquinho. tecido levinho, ideal para o dia a dia.
    
            60cm comprimento
            47cm busto `
        },
        {
            id: 16,
            nome: 'puma básico',
            tamanho: '38',
            marca: 'puma',
            preco: 60,
            imagens: [
                'https://photos.enjoei.com.br/tenis-com-cadarco-114240220/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvOWQ4MDA5OWI4NDlkOWVkNWYyMTA3ZmM5OWY3NzM0ZTYuanBn',
                'https://photos.enjoei.com.br/tenis-com-cadarco-114240220/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvYWZkMzYzOTI2YzllOThkMjg0MWU5MzU3ODM3ZDViYWMuanBn',
                'https://photos.enjoei.com.br/tenis-com-cadarco-114240220/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvNjAzMGQzNzYyMDU0OTA1OGJkYTdiMjk1ZmJlODlkMzkuanBn',
                'https://photos.enjoei.com.br/tenis-com-cadarco-114240220/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvZWJkY2Q3N2YxNTNhOTE4MjBkOTI2ODhiMTBhZmRjYTkuanBn'
            ],
            descricaoLonga: `com algumas marcas de tempo, mas a sola e parte interna inteirinhas!
            25cm de palmilha`
        },
        {
            id: 17,
            nome: 'renda-se a este azul',
            tamanho: 'm',
            marca: 'Hering',
            preco: 40,
            imagens: [
                'https://photos.enjoei.com.br/vestido-de-renda-azul-114224019/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvYTUyN2I4ZGUxYjBkMzQ1NzQ5ZmUwY2Y2ZDIyMzg3NDMuanBn',
                'https://photos.enjoei.com.br/vestido-de-renda-azul-114224019/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvNWM1MTZiYmRjMDgwZDNlNTkzYjI2NmQ3NWZhMWMyZTIuanBn',
                'https://photos.enjoei.com.br/vestido-de-renda-azul-114224019/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvOGFmMWFiOTAyZGE5MmMxYzk2MTE1MjViYWIyOGQyMDYuanBn',
                'https://photos.enjoei.com.br/vestido-de-renda-azul-114224019/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvNjk2OGZhODE1NDUxOWEwNjBiY2I5NGVlOThjMDJhMTAuanBn',
                'https://photos.enjoei.com.br/vestido-de-renda-azul-114224019/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84NzExMTMvYmIxN2FhNjNhNmE2Yzg5NmI0MmY2Yzk4MjBkNjdjZTkuanBn'
            ],
            descricaoLonga: `delicadeza e lindeza demais num vestido só! usado uma vez, em estado de novo.
    
            35cm cintura (sem esticar)
            45cm busto
            87cm comprimento`
        },
        
    ];

    let cart = {};
    let currentSlideIndex = 0;

    function renderProducts(productList) {
        productGrid.innerHTML = '';
        productList.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.imagens[0]}" alt="${product.nome}">
                <h3>${product.nome}</h3>
                <p class="product-details">
                    <span class="marca">${product.marca}</span>&nbsp;&nbsp;|&nbsp;&nbsp; 
                    <span class="tamanho">${product.tamanho}</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <span class="preco">${product.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                </p>
            `;
            productCard.addEventListener('click', () => openProductPopup(product.id));
            productGrid.appendChild(productCard);
        });
    }

    function populateMarcaFilter(productList) {
        const marcas = [...new Set(productList.map(product => product.marca))];
        marcas.forEach(marca => {
            const option = document.createElement('option');
            option.value = marca;
            option.textContent = marca;
            marcaFilter.appendChild(option);
        });
    }

    function filterProducts() {
        const tamanho = document.getElementById('tamanho').value;
        const marca = document.getElementById('marca').value;
        const cor = document.getElementById('cor').value;
        const genero = document.getElementById('genero').value;
        const categoria = document.getElementById('categoria').value;

        const filteredProducts = products.filter(product => {
            return (tamanho === '' || product.tamanho === tamanho) &&
                (marca === '' || product.marca === marca) &&
                (cor === '' || product.cor === cor) &&
                (genero === '' || product.genero === genero) &&
                (categoria === '' || product.categoria === categoria);
        });
        renderProducts(filteredProducts);
    }

    filters.forEach(filter => {
        filter.addEventListener('change', filterProducts);
    });

    function openProductPopup(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            productNameDisplay.textContent = product.nome;
            productBrandDisplay.textContent = product.marca;
            productSizeDisplay.textContent = `Tamanho: ${product.tamanho}`;
            productPriceDisplay.textContent = product.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
            productDescriptionDisplay.textContent = product.descricaoLonga;
    
            carouselInner.innerHTML = '';
            product.imagens.forEach((image) => {
                const slide = document.createElement('div');
                slide.classList.add('carousel-slide');
                slide.innerHTML = `<img src="${image}" alt="${product.nome}">`;
                carouselInner.appendChild(slide);
            });
    
            currentSlideIndex = 0;
            updateCarousel();
    
            enableZoomButtonOnCarousel(); // Ativa o botão de zoom nas imagens do carrossel
    
            addToCartPopupButton.dataset.id = product.id;
            productPopup.style.display = 'block';
        }
    }

    function updateCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${(currentSlideIndex) *-100}%)`;
        });
    }

    prevSlideButton.addEventListener('click', () => {
        const totalSlides = document.querySelectorAll('.carousel-slide').length;
        currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });

    nextSlideButton.addEventListener('click', () => {
        const totalSlides = document.querySelectorAll('.carousel-slide').length;
        currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
        updateCarousel();
    });

    function enableZoomButtonOnCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
    
        slides.forEach(slide => {
            // Adiciona o botão de zoom no canto superior direito
            const zoomButton = document.createElement('button');
            zoomButton.classList.add('zoom-button');
            zoomButton.innerHTML = 'ampliar';
            slide.appendChild(zoomButton);
    
            // Evento de clique no botão de zoom
            zoomButton.addEventListener('click', () => {
                const imageSrc = slide.querySelector('img').src;
                openZoomPopup(imageSrc);
            });
        });
    }
    
    function openZoomPopup(imageSrc) {
        const zoomPopup = document.getElementById('zoom-popup');
        const zoomedImage = document.getElementById('zoomed-image');
    
        zoomedImage.src = imageSrc; // Define a imagem ampliada
        zoomPopup.style.display = 'flex'; // Exibe o popup
    }
    
    function closeZoomPopup() {
        const zoomPopup = document.getElementById('zoom-popup');
        zoomPopup.style.display = 'none'; // Oculta o popup
    }
    
    // Adiciona o evento de fechar o popup de zoom
    document.getElementById('close-zoom-popup').addEventListener('click', closeZoomPopup);

    function closePopup(popup) {
        popup.style.display = 'none';
        currentSlideIndex = 0;
    }

    closeProductPopup.addEventListener('click', () => closePopup(productPopup));
    window.addEventListener('click', (event) => {
        if (event.target === productPopup) {
            closePopup(productPopup);
        }
        if (event.target === cartPopup) {
            closePopup(cartPopup);
        }
    });

    addToCartPopupButton.addEventListener('click', (event) => {
        const productId = parseInt(event.target.dataset.id);
        addToCart(productId);
        closePopup(productPopup);
    });

    function addToCart(productId) {
        if (!cart[productId]) {
            const selectedProduct = products.find(product => product.id === productId);
            cart[productId] = selectedProduct;
            renderCart();
            updateCartCount();
        } else {
            alert('Este item já foi adicionado ao carrinho.');
        }
    }

    function renderCart() {
        cartItemsList.innerHTML = '';
        let total = 0;

        for (const productId in cart) {
            const product = cart[productId];
            total += product.preco;
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${product.imagens[0]}" alt="${product.nome}" class="cart-item-image">
                <div class="cart-item-info">
                    ${product.nome}
                    <span class="cart-item-price">${product.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                </div>
                <button class="cart-item-remove" data-id="${product.id}">X</button>
            `;
            cartItemsList.appendChild(listItem);
        }

        const totalItem = document.createElement('li');
        totalItem.classList.add('cart-total');
        totalItem.innerHTML = `
            total:&nbsp;
            <span>${total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
        `;
        cartItemsList.appendChild(totalItem);

        const removeButtons = document.querySelectorAll('.cart-item-remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productIdToRemove = parseInt(event.target.dataset.id);
                delete cart[productIdToRemove];
                renderCart();
                updateCartCount();
            });
        });

        if (Object.keys(cart).length > 0) {
            checkoutButton.disabled = false;
        } else {
            checkoutButton.disabled = true;
        }
    }

    function updateCartCount() {
        cartCountSpan.textContent = Object.keys(cart).length;
    }

    cartButton.addEventListener('click', () => {
        renderCart();
        cartPopup.style.display = 'block';
    });

    checkoutButton.addEventListener('click', () => {
        if (Object.keys(cart).length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        let message = 'Olá, gostaria de finalizar a compra com os seguintes itens:\n\n';
        let total = 0;

        for (const productId in cart) {
            const product = cart[productId];
            message += `- ${product.nome} (R$ ${product.preco.toFixed(2)})\n`;
            total += product.preco;
        }

        message += `\nTotal: R$ ${total.toFixed(2)}\n\n`;
        message += 'Por favor, envie os detalhes para finalizar a compra.';

        const whatsappNumber = '551123597546';
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });

    closeCartPopup.addEventListener('click', () => closePopup(cartPopup));

    filterToggleButton.addEventListener('click', () => {
        filtersContainer.style.display = 'block';
    });

    closeFiltersButton.addEventListener('click', () => {
        filtersContainer.style.display = 'none';
    });

    renderProducts(products);
    populateMarcaFilter(products);
    updateCartCount();
});