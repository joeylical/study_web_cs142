import React from "react";

function range(...args) {
    let from = 0;
    let to;
    let step = 1;

    switch(args.length) {
        case 1:
        to = args[0];
        break;
        case 2:
        from = args[0];
        to = args[1];
        break;
        case 3:
        from = args[0];
        to = args[1];
        step = args[2];
        break;
        default:
        throw new Error('Only 1~3 arguments allowed.');
    }

    const top = Math.floor((to - from)/step);
    const f = i => i * step + from;
    return [...Array(top).keys()].map(f);
}

class Avatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
        };
        const bytes = new TextEncoder().encode(this.state.user);
        window.crypto.subtle.digest('sha-256', bytes).then((value) => {
            const s = new DataView(new Uint8Array(value).buffer).getUint32(0);
            const c = document.querySelector('#avatar');
            const ctx = c.getContext("2d");
            ctx.fillStyle= "green";
            range(32).forEach((i) => {
                const m = i % 4;
                const n = Math.floor(i / 4);
                if (s & (1<<i)) { //eslint-disable-line no-bitwise
                    const x = m*4;
                    const y = n*4;
                    ctx.fillRect(x, y, 4, 4);
                    const x1 = (7-m) * 4;
                    ctx.fillRect(x1, y, 4, 4);
                }
            });
        });
    }

    render() {
        return (
            <div className="header">
                <canvas width="32" height="32" id="avatar"></canvas>
                <label>{this.state.user}</label>
            </div>
        );
    }
}

export default Avatar;