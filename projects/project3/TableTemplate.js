'use strict';

class TableTemplate {
    // It's ugly, but it works.
    static fillIn(id, properties, columnName) {

        const elem = document.getElementById(id);

        function apply_prop(cell) {
            let name = cell.innerHTML.replace(/{|}/g, '');
            console.log(name);
            if (name in properties) {
                cell.innerHTML = properties[name];
                console.log(name, properties[name]);
                name = properties[name];
            }
        }

        const header = elem.rows[0];
        const body = [].slice.call(elem.rows).slice(1);
        console.log(body);

        const apply_column = [];
        for (let i = 0; i < header.childElementCount;i++) {
            const cell = header.cells[i];
            let name = cell.innerHTML.replace(/{|}/g, '');
            apply_prop(cell);
            name = cell.innerHTML;
            if (columnName) {
                if (name === columnName) {
                    apply_column.push(i);
                }
            } else {
                apply_column.push(i);
            }
        }

        body.forEach (row => {
            apply_column.map(i => row.cells[i]).forEach(apply_prop);
        });


        if (elem.style.visibility === 'hidden') {
            elem.style.visibility = 'visible';
        }
    }
}