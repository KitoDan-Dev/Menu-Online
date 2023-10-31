$(document).ready(function () {
    menu.events.init();
})

let menu = {};

let MY_CART = []; 

menu.events = {
    init: () => {
        menu.methods.getMenuItens();
    }
}

menu.methods = {
    getMenuItens: (category = 'burgers', seemore = false) => {

        let filter = MENU[category];

        if (!seemore) {
            $("#menuItens").html('')
            $("#btnSeeMore").removeClass('hidden');
        }

        $.each(filter, (i, e) => {

            let temp = menu.template.item.replace(/\${img}/g, e.img)
                .replace(/\${name}/g, e.name)
                .replace(/\${price}/g, e.price.toFixed(2))
                .replace(/\${id}/g, e.id)

            if (seemore && i >= 8 && i < 12) {
                $("#menuItens").append(temp)
            }

            if (!seemore && i < 8) {
                $("#menuItens").append(temp)
            }

        })


        $(".container-menu a").removeClass('active');
        $("#menu-" + category).addClass('active');
    },

    seeMore: () => {
        //AQUI FUNCIONOU SEM O .ATTR E O .SPLIT
        let active = $(".countainer-menu a.active").attr('id').split('menu-')[1];
        menu.methods.getMenuItens(active, true);

        $("#btnSeeMore").addClass('hidden');
    },

    decreaseQuantity: (id) => {

        let currentQtt = parseInt($("#qtt-" + id).text());

        if (currentQtt > 0) {
            $("#qtt-" + id).text(currentQtt - 1)
        }
    },

    increaseQuantity: (id) => {

        let currentQtt = parseInt($("#qtt-" + id).text());
        $("#qtt-" + id).text(currentQtt + 1)


    },

    addCart: (id) => {

        let currentQtt = parseInt($("#qtt-" + id).text());

        if(currentQtt > 0) {

            //AQUI NÃO FUNCIONOU DE FORMA ALGUMA.
            let category = $(".countainer-menu a.active").attr('id').split('menu-')[1];

            let filter = MENU[category];

            let item = $.grep(filter, (e, i) => { return e.id == id })

            if (item.length > 0) {

                item[0].qtt = currentQtt;
                MY_CART.push(item[0])
            }
        }

    }
}

menu.template = {

    item: `
        <div class= "col-3 mb-4">
            <div class="card card-item" id="\${id}">
                <div class="img-product">
                    <img
                        src="\${img}" />
                </div>
                <p class="title-product text-center mt-4">
                    <b>\${name}</b>
                </p>
                <p class="price-product text-center">
                    <b>$ \${price}</b>
                </p>
                <div class="add-cart">
                    <span class="btn-minus" onClick="menu.methods.decreaseQuantity('\${id}')"><i class="fas fa-minus"></i></span>
                    <span class="add-number-itens" id="qtt-\${id}">0</span>
                    <span class="btn-plus" onClick="menu.methods.increaseQuantity('\${id}')"><i class="fas fa-plus"></i></span>
                    <span class="btn btn-add" onClick="menu.methods.addCart('\${id}')"><i class="fa fa-shopping-bag"></i></span>
                </div>
            </div>
        </div>
    `

}