if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    const data = {
        name: 'Каталог товаров',
        hasChildren: true,
        items: [
            {
                name: 'Мойки',
                hasChildren: true,
                items: [
                    {
                        name: 'Ulgran',
                        hasChildren: true,
                        items: [
                            { name: 'Smth', hasChildren: false, items: [] },
                            { name: 'Smth', hasChildren: false, items: [] },
                            { name: 'Vigro Mramor', hasChildren: false, items: [] }
                        ]
                    },
                    {
                        name: 'Handmade',
                        hasChildren: true,
                        items: [
                            { name: 'Smth', hasChildren: false, items: [] },
                            { name: 'Smth', hasChildren: false, items: [] },
                            { name: 'Vigro Glass', hasChildren: false, items: [] }
                        ]
                    }
                ]
            },
            {
                name: 'Фильтры',
                hasChildren: true,
                items: [
                    {
                        name: 'Ulgran',
                        hasChildren: true,
                        items: [
                            { name: 'Smth', hasChildren: false, items: [] },
                            { name: 'Smth', hasChildren: false, items: [] },
                            { name: 'Vigro Mramor', hasChildren: false, items: [] }
                        ]
                    }
                ]
            }
        ]
    };

    const items = new ListItems(document.getElementById('list-items'), data);
    items.init();

    function ListItems(el, data) {
        this.el = el;
        this.data = data;

        // Инициализация
        this.init = function () {
            this.render();
            const parents = this.el.querySelectorAll('[data-parent]');
            parents.forEach(parent => {
                const open = parent.querySelector('[data-open]');
                open.addEventListener('click', () => this.toggleItems(parent));
            });
        };

        // Рендер родительских элементов
        this.render = function () {
            this.el.insertAdjacentHTML('beforeend', this.renderParent(this.data));
        };

        // Рендеринг родительских элементов с подкатегориями
        this.renderParent = function (data) {
            let html = `
                <div class="list-item" data-parent>
                    <div class="list-item__inner">
                        <img class="list-item__arrow" src="src/assets/img/chevron-down.png" alt="chevron-down" data-open>
                        <img class="list-item__folder" src="src/assets/img/folder.png" alt="folder">
                        <span>${data.name}</span>
                    </div>
                    <div class="list-item__items">
            `;
            if (data.hasChildren && data.items.length > 0) {
                data.items.forEach(item => {
                    html += this.renderParent(item); // Рекурсивно рендерим детей
                });
            }
            html += `</div></div>`;
            return html;
        };

        // Переключение состояния (открытие/закрытие)
        this.toggleItems = function (parent) {
            parent.classList.toggle('list-item_open');
        };
    }
}