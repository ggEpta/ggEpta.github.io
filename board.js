"use strict";

const getFig = event => game.getFigure(event);

const replaceFig = event => game.replaceFigure(event);

const figures = [
    {
        name: 'K',
        color: 'black',
        pos: 'e1'
    },
    
    {
        name: 'K',
        color: 'white',
        pos: 'e8'
    },
    
    {
        name: 'p',
        color: 'black',
        pos: 'a2'
    },
    
    {
        name: 'p',
        color: 'black',
        pos: 'b2'
    },
    {
        name: 'p',
        color: 'black',
        pos: 'c2'
    },
    {
        name: 'p',
        color: 'black',
        pos: 'd2'
    },
    {
        name: 'p',
        color: 'black',
        pos: 'e2'
    },
    {
        name: 'p',
        color: 'black',
        pos: 'f2'
    },
    {
        name: 'p',
        color: 'black',
        pos: 'g2'
    },
    {
        name: 'p',
        color: 'black',
        pos: 'h2'
    },
    
    {
        name: 'Q',
        color: 'black',
        pos: 'd1'
    },
    {
        name: 'b',
        color: 'black',
        pos: 'c1'
    },
    {
        name: 'b',
        color: 'black',
        pos: 'f1'
    },
    {
        name: 'k',
        color: 'black',
        pos: 'b1'
    },
    {
        name: 'k',
        color: 'black',
        pos: 'g1'
    },
    {
        name: 'r',
        color: 'black',
        pos: 'a1'
    },
    {
        name: 'r',
        color: 'black',
        pos: 'h1'
    },

    {
        name: 'p',
        color: 'white',
        pos: 'a7'
    },
    {
        name: 'p',
        color: 'white',
        pos: 'b7'
    },
    {
        name: 'p',
        color: 'white',
        pos: 'c7'
    },
    {
        name: 'p',
        color: 'white',
        pos: 'd7'
    },
    {
        name: 'p',
        color: 'white',
        pos: 'e7'
    },
    {
        name: 'p',
        color: 'white',
        pos: 'f7'
    },
    {
        name: 'p',
        color: 'white',
        pos: 'g7'
    },
    {
        name: 'p',
        color: 'white',
        pos: 'h7'
    },

    {
        name: 'Q',
        color: 'white',
        pos: 'd8'
    },
    {
        name: 'b',
        color: 'white',
        pos: 'c8'
    },
    {
        name: 'b',
        color: 'white',
        pos: 'f8'
    },
    {
        name: 'k',
        color: 'white',
        pos: 'b8'
    },
    {
        name: 'k',
        color: 'white',
        pos: 'g8'
    },
    {
        name: 'r',
        color: 'white',
        pos: 'a8'
    },
    {
        name: 'r',
        color: 'white',
        pos: 'h8'
    },
];

const figuresHtml = {
    pblack: '&#9823;',
    pwhite: '&#9817;',

    Kblack: '&#9818;',
    Kwhite: '&#9812;',

    Qwhite: '&#9813;',
    Qblack: '&#9819;',

    bwhite: '&#9815;',
    bblack: '&#9821;',

    kwhite: '&#9816;',
    kblack: '&#9822;',

    rblack: '&#9820;',
    rwhite: '&#9814;',
};

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const game = {
    phase: 'white',

    possibleStepsBlack: [],
    
    cloneStepsBlack: [],
    
    cloneStepsWhite: [],
    
    wasMoveKing: false,
    
    wasMoveRook: false,
    
    wasMoveKingWhite: false,
    
    wasMoveRookWhite: false,

    possiblePositionsBlack: {
        pawns: {},
        knights: {},
        king: {
            pos: null,
        },
        queen: {},
        rooks: {},
        bishops: {}
    },

    possiblePositionsWhite: {
        pawns: {},
        knights: {},
        king: {
            pos: null,
        },
        queen: {},
        rooks: {},
        bishops: {}
    },

    activeFigure: null,

    activeCell: null,

    activeCellPos: null,

    activeCellName: null,

    posBlFig: [],

    posWhFig: [],

    checkPhase: false,

    init() {
        this.renderBoard();
        this.renderFigures();
        this.play();
    },

    renderBoard() {
        let a = document.querySelector('#board');

        for (let i = 0; i < 10; i++) {

            let tr = document.createElement('tr');

            a.appendChild(tr);

            for (let j = 0; j < 10; j++) {

                let td = document.createElement('td');

                a.querySelector(`tr:nth-child(${i + 1})`).appendChild(td);

                // init numbers
                if (i > 0 && (j === 0 || j === 9)) {
                    const number = document.querySelector(`tr:nth-child(${i + 1})`).querySelector(`td:nth-child(${j + 1})`);
                    number.textContent = i;
                }

                // init black cells
                if (((i + 1) % 2 === 0) && ((j + 1) % 2 === 1) && j !== 0 && i !== 9) {
                    const blackCell = document
                        .querySelector(`tr:nth-child(${i + 1})`)
                        .querySelector(`td:nth-child(${j + 1})`);
                    blackCell.style.background = 'grey';
                } else if (((i + 1) % 2 === 1) && ((j + 1) % 2 === 0) && i !== 9 && i !== 0 && j !== 0 && j !== 9) {
                    const blackCell = document
                        .querySelector(`tr:nth-child(${i + 1})`)
                        .querySelector(`td:nth-child(${j + 1})`);
                    blackCell.style.background = 'grey';
                }

                // init letters
                if (j > 0 && j < 9 && i === 0 || i === 9) {
                    const letter = document
                        .querySelector(`tr:nth-child(${i + 1})`)
                        .querySelector(`td:nth-child(${j + 1})`);
                    letter.textContent = letters[j - 1];
                }

                // init cell data
                if (j !== 0 && i !== 0 && j !== 9 && i !== 9) {
                    const cellData = document
                        .querySelector(`tr:nth-child(${i + 1})`)
                        .querySelector(`td:nth-child(${j + 1})`);

                    cellData.dataset.pos = letters[j - 1] + i;
                }
            }
        }
    },

    renderFigures() {
        for (let i = 0; i < figures.length; i++) {
            let figure = figures[i].name + figures[i].color;
            let activeCell = document.querySelector(`td[data-pos='${figures[i].pos}']`);
            figures[i].color === 'black' ? this.getBlackFigures(figures[i].pos) : this.getWhiteFigures(figures[i].pos);
            activeCell.innerHTML = figuresHtml[figure];
            activeCell.dataset.color = figures[i].color;
            activeCell.dataset.figure = figures[i].name;
        }
        this.getPossibleStepsWhite();
    },

    getBlackFigures(position) {
        this.posBlFig.push(position);
    },

    getWhiteFigures(position) {
        this.posWhFig.push(position);
    },

    getPossibleStepsBlack() {
        this.possibleStepsBlack = [];
        this.possiblePositionsBlack.pawns = {};
        this.possiblePositionsBlack.rooks = {};
        this.possiblePositionsBlack.bishops = {};
        this.possiblePositionsBlack.knights = {};
        this.possiblePositionsBlack.queen = {};
        this.possiblePositionsBlack.king = {};

        for (let i = 0; i < this.posBlFig.length; i++) {
            let figure = document.querySelector(`td[data-pos='${this.posBlFig[i]}']`);
            switch (figure.dataset.figure) {
                case 'p':
                    this.getPossibleStepsPawn(figure.dataset.color, this.posBlFig[i]);
                    break;
                case 'K':
                    this.getPossibleStepsKing(figure.dataset.color, this.posBlFig[i]);
                    break;
                case 'Q':
                    this.getPossibleStepsQueen(figure.dataset.color, this.posBlFig[i]);
                    break;
                case 'b':
                    this.getPossibleStepsBishop(figure.dataset.color, this.posBlFig[i]);
                    break;
                case 'r':
                    this.getPossibleStepsRook(figure.dataset.color, this.posBlFig[i]);
                    break;
                case 'k':
                    this.getPossibleStepsKnight(figure.dataset.color, this.posBlFig[i]);
                    break;
            }
        }
    },
    
    getPossibleStepsBlackHard() {

            this.possibleStepsBlack = [];
        
            for (let i = 0; i < this.posBlFig.length; i++) {
                let figure = document.querySelector(`td[data-pos='${this.posBlFig[i]}']`);
                switch (figure.dataset.figure) {
                    case 'p':
                        this.getPossibleStepsPawnHard(figure.dataset.color, this.posBlFig[i]);
                        break;
                    case 'K':
                        this.getPossibleStepsKingHard(figure.dataset.color, this.posBlFig[i]);
                        break;
                    case 'Q':
                        this.getPossibleStepsQueenHard(figure.dataset.color, this.posBlFig[i]);
                        break;
                    case 'b':
                        this.getPossibleStepsBishopHard(figure.dataset.color, this.posBlFig[i]);
                        break;
                    case 'r':
                        this.getPossibleStepsRookHard(figure.dataset.color, this.posBlFig[i]);
                        break;
                    case 'k':
                        this.getPossibleStepsKnightHard(figure.dataset.color, this.posBlFig[i]);
                        break;
                }
            }
        
    },

    getPossibleStepsWhite() {
        this.possibleStepsWhite = [];
        this.possiblePositionsWhite.pawns = {};
        this.possiblePositionsWhite.rooks = {};
        this.possiblePositionsWhite.bishops = {};
        this.possiblePositionsWhite.knights = {};
        this.possiblePositionsWhite.queen = {};


        for (let i = 0; i < this.posWhFig.length; i++) {
            let figure = document.querySelector(`td[data-pos='${this.posWhFig[i]}']`);
            switch (figure.dataset.figure) {
                case 'p':
                    this.getPossibleStepsPawn(figure.dataset.color, this.posWhFig[i]);
                    break;
                case 'K':
                    this.getPossibleStepsKing(figure.dataset.color, this.posWhFig[i]);
                    break;
                case 'Q':
                    this.getPossibleStepsQueen(figure.dataset.color, this.posWhFig[i]);
                    break;
                case 'b':
                    this.getPossibleStepsBishop(figure.dataset.color, this.posWhFig[i]);
                    break;
                case 'r':
                    this.getPossibleStepsRook(figure.dataset.color, this.posWhFig[i]);
                    break;
                case 'k':
                    this.getPossibleStepsKnight(figure.dataset.color, this.posWhFig[i]);
                    break;
            }
        }
    },
    
    getPossibleStepsWhiteHard() {
        this.possibleStepsWhite = [];
        this.possiblePositionsWhite.pawns = {};
        this.possiblePositionsWhite.rooks = {};
        this.possiblePositionsWhite.bishops = {};
        this.possiblePositionsWhite.knights = {};
        this.possiblePositionsWhite.queen = {};

        for (let i = 0; i < this.posWhFig.length; i++) {
            let figure = document.querySelector(`td[data-pos='${this.posWhFig[i]}']`);
            switch (figure.dataset.figure) {
                case 'p':
                    this.getPossibleStepsPawnHard(figure.dataset.color, this.posWhFig[i]);
                    break;
                case 'K':
                    this.getPossibleStepsKingHard(figure.dataset.color, this.posWhFig[i]);
                    break;
                case 'Q':
                    this.getPossibleStepsQueenHard(figure.dataset.color, this.posWhFig[i]);
                    break;
                case 'b':
                    this.getPossibleStepsBishopHard(figure.dataset.color, this.posWhFig[i]);
                    break;
                case 'r':
                    this.getPossibleStepsRookHard(figure.dataset.color, this.posWhFig[i]);
                    break;
                case 'k':
                    this.getPossibleStepsKnightHard(figure.dataset.color, this.posWhFig[i]);
                    break;
            }
        }
    },

    getPossibleStepsPawn(color, pos) {
        if (color === 'black') {
            this.possiblePositionsBlack.pawns[pos] = [];
            let index = this.posBlFig.indexOf(pos);
            if (pos[1] == 2 && !this.posBlFig.includes(pos[0] + (+pos[1] + 1)) && !this.posWhFig.includes(pos[0] + (+pos[1] + 1))) {
                for (let i = 1; i < 3; i++) {
                    if (!this.posBlFig.includes(pos[0] + (+pos[1] + i)) && !this.posWhFig.includes(pos[0] + (+pos[1] + i))) { 
                        this.posBlFig.push(pos[0] + (+pos[1] + i));
                        this.posBlFig.splice(index, 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(pos[0] + (+pos[1] + i));
                            this.possiblePositionsBlack.pawns[pos].push(pos[0] + (+pos[1] + i));
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                    }
                }
            }

            if (this.posWhFig.includes(this.getRightUpFigure(pos))) {
                this.posBlFig.push(this.getRightUpFigure(pos));
                this.posBlFig.splice(index, 1);
                this.posWhFig.splice(this.posWhFig.indexOf(this.getRightUpFigure(pos)), 1);
                this.getPossibleStepsWhiteHard();
                if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) { 
                    this.possibleStepsBlack.includes(this.getRightUpFigure(pos)) ? this.possibleStepsBlack.includes(1) : this.possibleStepsBlack.push(this.getRightUpFigure(pos)), this.possiblePositionsBlack.pawns[pos].push(this.getRightUpFigure(pos));
                }

                this.posBlFig.splice(index, 0, pos);
                this.posBlFig.pop();
                this.posWhFig.push(this.getRightUpFigure(pos));
            }

            if (this.posWhFig.includes(this.getLeftUpFigure(pos))) {
                this.posBlFig.push(this.getLeftUpFigure(pos));
                this.posBlFig.splice(index, 1);
                this.posWhFig.splice(this.posWhFig.indexOf(this.getLeftUpFigure(pos)), 1);
                this.getPossibleStepsWhiteHard();
                if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                    this.possibleStepsBlack.includes(this.getLeftUpFigure(pos)) ? this.possibleStepsBlack.includes(1) : this.possibleStepsBlack.push(this.getLeftUpFigure(pos)), this.possiblePositionsBlack.pawns[pos].push(this.getLeftUpFigure(pos));
                }

                this.posBlFig.splice(index, 0, pos);
                this.posBlFig.pop();
                this.posWhFig.push(this.getLeftUpFigure(pos));
            }

            if (!this.posBlFig.includes(pos[0] + (+pos[1] + 1)) && !this.posWhFig.includes(pos[0] + (+pos[1] + 1))) {
                this.posBlFig.push(pos[0] + (+pos[1] + 1));
                this.posBlFig.splice(index, 1);
                this.getPossibleStepsWhiteHard();
                if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                    this.possibleStepsBlack.includes(pos[0] + (+pos[1] + 1)) ? this.possibleStepsBlack.includes(1) : this.possibleStepsBlack.push(pos[0] + (+pos[1] + 1)); this.possiblePositionsBlack.pawns[pos].push(pos[0] + (+pos[1] + 1));
                }

                this.posBlFig.splice(index, 0, pos);
                this.posBlFig.pop();
            }
            
            this.possibleStepsWhite = [];
        } else {
            this.possiblePositionsWhite.pawns[pos] = [];
            let index = this.posWhFig.indexOf(pos);
            if (pos[1] == 7 && !this.posBlFig.includes(pos[0] + (+pos[1] - 1)) && !this.posWhFig.includes(pos[0] + (+pos[1] - 1))) {
                for (let i = 1; i < 3; i++) {
                    if (!this.posBlFig.includes(pos[0] + (+pos[1] - i)) && !this.posWhFig.includes(pos[0] + (+pos[1] - i))) { 
                        this.posWhFig.push(pos[0] + (+pos[1] - i));
                        this.posWhFig.splice(index, 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) { 
                            this.possibleStepsWhite.push(pos[0] + (+pos[1] - i));
                            this.possiblePositionsWhite.pawns[pos].push(pos[0] + (+pos[1] - i));
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                    }
                }
            }

            if (this.posBlFig.includes(this.getRightUpFigure(pos, color))) {
                this.posWhFig.push(this.getRightUpFigure(pos, color));
                this.posWhFig.splice(index, 1);
                this.posBlFig.splice(this.posBlFig.indexOf(this.getRightUpFigure(pos, color)), 1);
                this.getPossibleStepsBlackHard();
                if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                    this.possibleStepsWhite.includes(this.getRightUpFigure(pos, color)) ? this.possibleStepsBlack.includes(1) : this.possibleStepsWhite.push(this.getRightUpFigure(pos, color)), this.possiblePositionsWhite.pawns[pos].push(this.getRightUpFigure(pos, color));
                }

                this.posWhFig.splice(index, 0, pos);
                this.posWhFig.pop();
                this.posBlFig.push(this.getRightUpFigure(pos, color));
            }

            if (this.posBlFig.includes(this.getLeftUpFigure(pos, color))) {
                this.posWhFig.push(this.getLeftUpFigure(pos, color));
                this.posWhFig.splice(index, 1);
                this.posBlFig.splice(this.posBlFig.indexOf(this.getLeftUpFigure(pos, color)), 1);
                this.getPossibleStepsBlackHard();
                if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                    this.possibleStepsWhite.includes(this.getLeftUpFigure(pos, color)) ? this.possibleStepsBlack.includes(1) : this.possibleStepsWhite.push(this.getLeftUpFigure(pos, color)), this.possiblePositionsWhite.pawns[pos].push(this.getLeftUpFigure(pos, color));
                }

                this.posWhFig.splice(index, 0, pos);
                this.posWhFig.pop();
                this.posBlFig.push(this.getLeftUpFigure(pos, color));
            }

            if (!this.posBlFig.includes(pos[0] + (+pos[1] - 1)) && !this.posWhFig.includes(pos[0] + (+pos[1] - 1))) {
                this.posWhFig.push(pos[0] + (+pos[1] - 1));
                this.posWhFig.splice(index, 1);
                this.getPossibleStepsBlackHard();
                if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                    this.possibleStepsWhite.includes(pos[0] + (+pos[1] - 1)) ? this.possibleStepsWhite.includes(1) : this.possibleStepsWhite.push(pos[0] + (+pos[1] - 1)), this.possiblePositionsWhite.pawns[pos].push(pos[0] + (+pos[1] - 1));
                }

                this.posWhFig.splice(index, 0, pos);
                this.posWhFig.pop();
            }
            
            this.possibleStepsBlack = [];
        }
    },

    getPossibleStepsPawnHard(color, pos) {
        if (color === 'black') {
            if (pos[1] == 2 && !this.posBlFig.includes(pos[0] + (+pos[1] + 1)) && !this.posWhFig.includes(pos[0] + (+pos[1] + 1))) {
                for (let i = 1; i < 3; i++) {
                    if (!this.posBlFig.includes(pos[0] + (+pos[1] + i)) && !this.posWhFig.includes(pos[0] + (+pos[1] + i))) {
                        this.possibleStepsBlack.push(pos[0] + (+pos[1] + i));
                    }
                }
            }

            if (this.posWhFig.includes(this.getLeftUpFigure(pos))) {
                this.possibleStepsBlack.includes(this.getLeftUpFigure(pos)) ? this.possibleStepsBlack.includes(1) : this.possibleStepsBlack.push(this.getLeftUpFigure(pos));
            }
            
            if (this.posWhFig.includes(this.getRightUpFigure(pos))) {
                this.possibleStepsBlack.includes(this.getRightUpFigure(pos)) ? this.possibleStepsBlack.includes(1) : this.possibleStepsBlack.push(this.getRightUpFigure(pos));
            }

            if (!this.posBlFig.includes(pos[0] + (+pos[1] + 1)) && !this.posWhFig.includes(pos[0] + (+pos[1] + 1))) {
                this.possibleStepsBlack.includes(pos[0] + (+pos[1] + 1)) ? this.possibleStepsBlack.includes(1) : this.possibleStepsBlack.push(pos[0] + (+pos[1] + 1));
            }

        } else {
            this.possiblePositionsWhite.pawns[pos] = [];
            if (pos[1] == 7 && !this.posBlFig.includes(pos[0] + (+pos[1] - 1)) && !this.posWhFig.includes(pos[0] + (+pos[1] - 1))) {
                for (let i = 1; i < 3; i++) {
                    if (!this.posBlFig.includes(pos[0] + (+pos[1] - i)) && !this.posWhFig.includes(pos[0] + (+pos[1] - i))) {
                        this.possibleStepsWhite.push(pos[0] + (+pos[1] - i));
                        this.possiblePositionsWhite.pawns[pos].push(pos[0] + (+pos[1] - i));
                    }
                }
            }

            if (this.posBlFig.includes(this.getRightUpFigure(pos, color))) {
                this.possibleStepsWhite.includes(this.getRightUpFigure(pos, color)) ? this.possibleStepsBlack.includes(1) : this.possibleStepsWhite.push(this.getRightUpFigure(pos, color));
                this.possiblePositionsWhite.pawns[pos].push(this.getRightUpFigure(pos, color));
            }

            if (this.posBlFig.includes(this.getLeftUpFigure(pos, color))) {
                this.possibleStepsWhite.includes(this.getLeftUpFigure(pos, color)) ? this.possibleStepsBlack.includes(1) : this.possibleStepsWhite.push(this.getLeftUpFigure(pos, color));
                this.possiblePositionsWhite.pawns[pos].push(this.getLeftUpFigure(pos, color));
            }

            if (!this.posBlFig.includes(pos[0] + (+pos[1] - 1)) && !this.posWhFig.includes(pos[0] + (+pos[1] - 1))) {
                this.possibleStepsWhite.includes(pos[0] + (+pos[1] - 1)) ? this.possibleStepsWhite.includes(1) : this.possibleStepsWhite.push(pos[0] + (+pos[1] - 1)); this.possiblePositionsWhite.pawns[pos].push(pos[0] + (+pos[1] - 1));
            }
        }
    },
    
    getRightUpFigure(pos, color = 'black') {
        if (pos[0] === 'h') {
            return;
        }

        if (color === 'black' && (+pos[1] + 1) !== 9) {
            return letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 1);
        } else if ((+pos[1] - 1) !== 0) {
            return letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 1);
        }
    },

    getRightDownFigure(pos, color = 'black') {
        if (pos[0] === 'h') {
            return;
        }

        if (color === 'black' && (+pos[1] - 1) !== 0) {
            return letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 1);
        } else if ((+pos[1] + 1) !== 9) {
            return letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 1);
        }
    },

    getLeftUpFigure(pos, color = 'black') {
        if (pos[0] === 'a') {
            return;
        }

        if (color === 'black' && (+pos[1] + 1) !== 9) {
            return letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 1);
        } else if ((+pos[1] - 1) !== 0) {
            return letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 1);
        }
    },

    getLeftDownFigure(pos, color = 'black') {
        if (pos[0] === 'a') {
            return;
        }

        if (color === 'black' && (+pos[1] - 1) !== 0) {
            return letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 1);
        } else if ((+pos[1] + 1) !== 9) {
            return letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 1);
        }
    },
    
    getPossibleStepsKingHard(color, pos) {
        if (color === 'black') {
            
            if (pos[0] === 'e' && !this.wasMoveKing && !this.wasMoveRook && !this.posBlFig.includes(letters[letters.indexOf(pos[0]) + 1] + pos[1])) {
                if (!this.posBlFig.includes(letters[letters.indexOf(pos[0]) + 2] + pos[1])) {
                    this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) + 2] + pos[1]);
                }
            }
            
            
            if (pos[1] !== '1' && !this.posBlFig.includes(pos[0] + (+pos[1] - 1))) {
                this.possibleStepsBlack.push(pos[0] + (+pos[1] - 1));
            }

            if (pos[1] !== '8' && !this.posBlFig.includes(pos[0] + (+pos[1] + 1))) {
                this.possibleStepsBlack.push(pos[0] + (+pos[1] + 1));
            }

            if (pos[0] !== 'a' && !this.posBlFig.includes(letters[letters.indexOf(pos[0]) - 1] + pos[1])) {
                this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) - 1] + pos[1]);
            }

            if (pos[0] !== 'h' && !this.posBlFig.includes(letters[letters.indexOf(pos[0]) + 1] + pos[1])) {
                this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) + 1] + pos[1]);
            }

            if (this.getLeftUpFigure(pos, color)) {
                if (!this.posBlFig.includes(this.getLeftUpFigure(pos, color))) {
                    this.possibleStepsBlack.push(this.getLeftUpFigure(pos, color));
                }
            }

            if (this.getLeftDownFigure(pos, color)) {
                if (!this.posBlFig.includes(this.getLeftDownFigure(pos, color))) {
                    this.possibleStepsBlack.push(this.getLeftDownFigure(pos, color));
                }
            }

            if (this.getRightUpFigure(pos, color)) {
                if (!this.posBlFig.includes(this.getRightUpFigure(pos, color))) {
                    this.possibleStepsBlack.push(this.getRightUpFigure(pos, color));
                }
            }

            if (this.getRightDownFigure(pos, color)) {
                if (!this.posBlFig.includes(this.getRightDownFigure(pos, color)) && !this.possibleStepsWhite.includes(this.getRightDownFigure(pos, color))) {
                    this.possibleStepsBlack.push(this.getRightDownFigure(pos, color));
                }
            }
        } else {
            this.possiblePositionsWhite.king[pos] = [];
            this.possiblePositionsWhite.king.pos = pos;
            if (pos[1] !== '1' && !this.posWhFig.includes(pos[0] + (+pos[1] - 1))) {
                this.possibleStepsWhite.push(pos[0] + (+pos[1] - 1));
                this.possiblePositionsWhite.king[pos].push(pos[0] + (+pos[1] - 1));
            }

            if (pos[1] !== '8' && !this.posWhFig.includes(pos[0] + (+pos[1] + 1))) {
                this.possibleStepsWhite.push(pos[0] + (+pos[1] + 1));
                this.possiblePositionsWhite.king[pos].push(pos[0] + (+pos[1] + 1));
            }

            if (pos[0] !== 'a' && !this.posWhFig.includes(letters[letters.indexOf(pos[0]) - 1] + pos[1])) {
                this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) - 1] + pos[1]);
                this.possiblePositionsWhite.king[pos].push(letters[letters.indexOf(pos[0]) - 1] + pos[1]);
            }

            if (pos[0] !== 'h' && !this.posWhFig.includes(letters[letters.indexOf(pos[0]) + 1] + pos[1])) {
                this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) + 1] + pos[1]);
                this.possiblePositionsWhite.king[pos].push(letters[letters.indexOf(pos[0]) + 1] + pos[1]);
            }

            if (this.getLeftUpFigure(pos, color)) {
                if (!this.posWhFig.includes(this.getLeftUpFigure(pos, color))) {
                    this.possibleStepsWhite.push(this.getLeftUpFigure(pos, color));
                    this.possiblePositionsWhite.king[pos].push(this.getLeftUpFigure(pos, color));
                }
            }

            if (this.getLeftDownFigure(pos, color)) {
                if (!this.posWhFig.includes(this.getLeftDownFigure(pos, color))) {
                    this.possibleStepsWhite.push(this.getLeftDownFigure(pos, color));
                    this.possiblePositionsWhite.king[pos].push(this.getLeftDownFigure(pos, color));
                }
            }

            if (this.getRightUpFigure(pos, color)) {
                if (!this.posWhFig.includes(this.getRightUpFigure(pos, color))) {
                    this.possibleStepsWhite.push(this.getRightUpFigure(pos, color));
                    this.possiblePositionsWhite.king[pos].push(this.getRightUpFigure(pos, color));
                }
            }

            if (this.getRightDownFigure(pos, color)) {
                if (!this.posWhFig.includes(this.getRightDownFigure(pos, color))) {
                    this.possibleStepsWhite.push(this.getRightDownFigure(pos, color));
                    this.possiblePositionsWhite.king[pos].push(this.getRightDownFigure(pos, color));
                }
            }
        }
    },

    getPossibleStepsKing(color, pos) {
        if (color === 'black') {
            this.possiblePositionsBlack.king[pos] = [];
            this.possiblePositionsBlack.king.pos = pos;
            let index = this.posBlFig.indexOf(pos);
            
           
            if (pos[0] === 'e' && !this.wasMoveKing && !this.wasMoveRook && !this.posBlFig.includes(letters[letters.indexOf(pos[0]) + 1] + pos[1])) {
                if (!this.posBlFig.includes(letters[letters.indexOf(pos[0]) + 2] + pos[1])) {
                    if (this.posWhFig.includes(letters[letters.indexOf(pos[0]) + 2] + pos[1])) {
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) + 2] + pos[1]);
                        this.posBlFig.splice(index, 1);
                        this.possiblePositionsBlack.king.pos = letters[letters.indexOf(pos[0]) + 2] + pos[1];
                        this.posWhFig.splice(this.posWhFig.indexOf(letters[letters.indexOf(pos[0]) + 2] + pos[1]), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) + 2] + pos[1]);
                            this.possiblePositionsBlack.king[pos].push(letters[letters.indexOf(pos[0]) + 2] + pos[1]);
                        }

                        this.posBlFig.pop();
                        this.posBlFig.splice(index, 0, pos);
                        this.possiblePositionsBlack.king.pos = pos;
                        this.posWhFig.push(letters[letters.indexOf(pos[0]) + 2] + pos[1]);
                    } else {
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) + 2] + pos[1]);
                        this.posBlFig.splice(index, 1);
                        this.possiblePositionsBlack.king.pos = letters[letters.indexOf(pos[0]) + 2] + pos[1];
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) + 2] + pos[1]);
                            this.possiblePositionsBlack.king[pos].push(letters[letters.indexOf(pos[0]) + 2] + pos[1]);
                        }

                        this.posBlFig.pop();
                        this.posBlFig.splice(index, 0, pos);
                        this.possiblePositionsBlack.king.pos = pos;
                    }
                }
            }
            
            if (pos[1] !== '1' && !this.posBlFig.includes(pos[0] + (+pos[1] - 1))) {
                if (this.posWhFig.includes(pos[0] + (+pos[1] - 1))) {
                    this.posBlFig.push(pos[0] + (+pos[1] - 1));
                    this.posBlFig.splice(index, 1);
                    this.possiblePositionsBlack.king.pos = pos[0] + (+pos[1] - 1);
                    this.posWhFig.splice(this.posWhFig.indexOf(pos[0] + (+pos[1] - 1)), 1);
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(pos[0] + (+pos[1] - 1));
                        this.possiblePositionsBlack.king[pos].push(pos[0] + (+pos[1] - 1));
                    }
                    
                    this.posBlFig.pop();
                    this.posBlFig.splice(index, 0, pos);
                    this.possiblePositionsBlack.king.pos = pos;
                    this.posWhFig.push(pos[0] + (+pos[1] - 1));
                } else {
                    this.posBlFig.push(pos[0] + (+pos[1] - 1));
                    this.posBlFig.splice(index, 1);
                    this.possiblePositionsBlack.king.pos = pos[0] + (+pos[1] - 1);
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(pos[0] + (+pos[1] - 1));
                        this.possiblePositionsBlack.king[pos].push(pos[0] + (+pos[1] - 1));
                    }
                    
                    this.posBlFig.pop();
                    this.posBlFig.splice(index, 0, pos);
                    this.possiblePositionsBlack.king.pos = pos;
                }
            }

            if (pos[1] !== '8' && !this.posBlFig.includes(pos[0] + (+pos[1] + 1))) {
                if (this.posWhFig.includes(pos[0] + (+pos[1] + 1))) {
                    this.posBlFig.push(pos[0] + (+pos[1] + 1));
                    this.posBlFig.splice(index, 1);
                    this.possiblePositionsBlack.king.pos = pos[0] + (+pos[1] + 1);
                    this.posWhFig.splice(this.posWhFig.indexOf(pos[0] + (+pos[1] + 1)), 1);
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(pos[0] + (+pos[1] + 1));
                        this.possiblePositionsBlack.king[pos].push(pos[0] + (+pos[1] + 1));
                    }
                    
                    this.posBlFig.pop();
                    this.posBlFig.splice(index, 0, pos);
                    this.possiblePositionsBlack.king.pos = pos;
                    this.posWhFig.push(pos[0] + (+pos[1] + 1));
                } else {
                    this.posBlFig.push(pos[0] + (+pos[1] + 1));
                    this.posBlFig.splice(index, 1);
                    this.possiblePositionsBlack.king.pos = pos[0] + (+pos[1] + 1);
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(pos[0] + (+pos[1] + 1));
                        this.possiblePositionsBlack.king[pos].push(pos[0] + (+pos[1] + 1));
                    }
                    
                    this.posBlFig.pop();
                    this.posBlFig.splice(index, 0, pos);
                    this.possiblePositionsBlack.king.pos = pos;
                }
            }

            if (pos[0] !== 'a' && !this.posBlFig.includes(letters[letters.indexOf(pos[0]) - 1] + pos[1])) {
                if (this.posWhFig.includes(letters[letters.indexOf(pos[0]) - 1] + pos[1])) {
                    this.posBlFig.push(letters[letters.indexOf(pos[0]) - 1] + pos[1]);
                    this.posBlFig.splice(index, 1);
                    this.possiblePositionsBlack.king.pos = letters[letters.indexOf(pos[0]) - 1] + pos[1];
                    this.posWhFig.splice(this.posWhFig.indexOf(letters[letters.indexOf(pos[0]) - 1] + pos[1]), 1);
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) - 1] + pos[1]);
                        this.possiblePositionsBlack.king[pos].push(letters[letters.indexOf(pos[0]) - 1] + pos[1]);
                    }
                    
                    this.posBlFig.pop();
                    this.posBlFig.splice(index, 0, pos);
                    this.possiblePositionsBlack.king.pos = pos;
                    this.posWhFig.push(letters[letters.indexOf(pos[0]) - 1] + pos[1]);
                } else {
                    this.posBlFig.push(letters[letters.indexOf(pos[0]) - 1] + pos[1]);
                    this.posBlFig.splice(index, 1);
                    this.possiblePositionsBlack.king.pos = letters[letters.indexOf(pos[0]) - 1] + pos[1];
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) - 1] + pos[1]);
                        this.possiblePositionsBlack.king[pos].push(letters[letters.indexOf(pos[0]) - 1] + pos[1]);
                    }
                    
                    this.posBlFig.pop();
                    this.posBlFig.splice(index, 0, pos);
                    this.possiblePositionsBlack.king.pos = pos;
                }
            }

            if (pos[0] !== 'h' && !this.posBlFig.includes(letters[letters.indexOf(pos[0]) + 1] + pos[1])) {
                if (this.posWhFig.includes(letters[letters.indexOf(pos[0]) + 1] + pos[1])) {
                    this.posBlFig.push(letters[letters.indexOf(pos[0]) + 1] + pos[1]);
                    this.posBlFig.splice(index, 1);
                    this.possiblePositionsBlack.king.pos = letters[letters.indexOf(pos[0]) + 1] + pos[1];
                    this.posWhFig.splice(this.posWhFig.indexOf(letters[letters.indexOf(pos[0]) + 1] + pos[1]), 1);
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) + 1] + pos[1]);
                        this.possiblePositionsBlack.king[pos].push(letters[letters.indexOf(pos[0]) + 1] + pos[1]);
                    }
                    
                    this.posBlFig.pop();
                    this.posBlFig.splice(index, 0, pos);
                    this.possiblePositionsBlack.king.pos = pos;
                    this.posWhFig.push(letters[letters.indexOf(pos[0]) + 1] + pos[1]);
                } else {
                    this.posBlFig.push(letters[letters.indexOf(pos[0]) + 1] + pos[1]);
                    this.posBlFig.splice(index, 1);
                    this.possiblePositionsBlack.king.pos = letters[letters.indexOf(pos[0]) + 1] + pos[1];
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) + 1] + pos[1]);
                        this.possiblePositionsBlack.king[pos].push(letters[letters.indexOf(pos[0]) + 1] + pos[1]);
                    }
                    
                    this.posBlFig.pop();
                    this.posBlFig.splice(index, 0, pos);
                    this.possiblePositionsBlack.king.pos = pos;
                }
            }

            if (this.getLeftUpFigure(pos, color)) {
                if (!this.posBlFig.includes(this.getLeftUpFigure(pos, color))) {
                    if (this.posWhFig.includes(this.getLeftUpFigure(pos, color))) {
                        this.posBlFig.push(this.getLeftUpFigure(pos, color));
                        this.posBlFig.splice(index, 1);
                        this.possiblePositionsBlack.king.pos = this.getLeftUpFigure(pos, color);
                        this.posWhFig.splice(this.posWhFig.indexOf(this.getLeftUpFigure(pos, color)), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(this.getLeftUpFigure(pos, color));
                            this.possiblePositionsBlack.king[pos].push(this.getLeftUpFigure(pos, color));
                        }

                        this.posBlFig.pop();
                        this.posBlFig.splice(index, 0, pos);
                        this.possiblePositionsBlack.king.pos = pos;
                        this.posWhFig.push(this.getLeftUpFigure(pos, color));
                    } else {
                        this.posBlFig.push(this.getLeftUpFigure(pos, color));
                        this.posBlFig.splice(index, 1);
                        this.possiblePositionsBlack.king.pos = this.getLeftUpFigure(pos, color);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(this.getLeftUpFigure(pos, color));
                            this.possiblePositionsBlack.king[pos].push(this.getLeftUpFigure(pos, color));
                        }

                        this.posBlFig.pop();
                        this.posBlFig.splice(index, 0, pos);
                        this.possiblePositionsBlack.king.pos = pos;
                    }
                }
            }

            if (this.getLeftDownFigure(pos, color)) {
                if (!this.posBlFig.includes(this.getLeftDownFigure(pos, color))) {
                    if (this.posWhFig.includes(this.getLeftDownFigure(pos, color))) {
                        this.posBlFig.push(this.getLeftDownFigure(pos, color));
                        this.posBlFig.splice(index, 1);
                        this.possiblePositionsBlack.king.pos = this.getLeftDownFigure(pos, color);
                        this.posWhFig.splice(this.posWhFig.indexOf(this.getLeftDownFigure(pos, color)), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(this.getLeftDownFigure(pos, color));
                            this.possiblePositionsBlack.king[pos].push(this.getLeftDownFigure(pos, color));
                        }

                        this.posBlFig.pop();
                        this.posBlFig.splice(index, 0, pos);
                        this.possiblePositionsBlack.king.pos = pos;
                        this.posWhFig.push(this.getLeftDownFigure(pos, color));
                    } else {
                        this.posBlFig.push(this.getLeftDownFigure(pos, color));
                        this.posBlFig.splice(index, 1);
                        this.possiblePositionsBlack.king.pos = this.getLeftDownFigure(pos, color);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(this.getLeftDownFigure(pos, color));
                            this.possiblePositionsBlack.king[pos].push(this.getLeftDownFigure(pos, color));
                        }

                        this.posBlFig.pop();
                        this.posBlFig.splice(index, 0, pos);
                        this.possiblePositionsBlack.king.pos = pos;
                    }
                }
            }

            if (this.getRightUpFigure(pos, color)) {
                if (!this.posBlFig.includes(this.getRightUpFigure(pos, color))) {
                    if (this.posWhFig.includes(this.getRightUpFigure(pos, color))) {
                        this.posBlFig.push(this.getRightUpFigure(pos, color));
                        this.posBlFig.splice(index, 1);
                        this.possiblePositionsBlack.king.pos = this.getRightUpFigure(pos, color);
                        this.posWhFig.splice(this.posWhFig.indexOf(this.getRightUpFigure(pos, color)), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(this.getRightUpFigure(pos, color));
                            this.possiblePositionsBlack.king[pos].push(this.getRightUpFigure(pos, color));
                        }

                        this.posBlFig.pop();
                        this.posBlFig.splice(index, 0, pos);
                        this.possiblePositionsBlack.king.pos = pos;
                        this.posWhFig.push(this.getRightUpFigure(pos, color));
                    } else {
                        this.posBlFig.push(this.getRightUpFigure(pos, color));
                        this.posBlFig.splice(index, 1);
                        this.possiblePositionsBlack.king.pos = this.getRightUpFigure(pos, color);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(this.getRightUpFigure(pos, color));
                            this.possiblePositionsBlack.king[pos].push(this.getRightUpFigure(pos, color));
                        }

                        this.posBlFig.pop();
                        this.posBlFig.splice(index, 0, pos);
                        this.possiblePositionsBlack.king.pos = pos;
                    }
                }
            }

            if (this.getRightDownFigure(pos, color)) {
                if (!this.posBlFig.includes(this.getRightDownFigure(pos, color))) {
                    if (this.posWhFig.includes(this.getRightDownFigure(pos, color))) {
                        this.posBlFig.push(this.getRightDownFigure(pos, color));
                        this.posBlFig.splice(index, 1);
                        this.possiblePositionsBlack.king.pos = this.getRightDownFigure(pos, color);
                        this.posWhFig.splice(this.posWhFig.indexOf(this.getRightDownFigure(pos, color)), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(this.getRightDownFigure(pos, color));
                            this.possiblePositionsBlack.king[pos].push(this.getRightDownFigure(pos, color));
                        }

                        this.posBlFig.pop();
                        this.posBlFig.splice(index, 0, pos);
                        this.possiblePositionsBlack.king.pos = pos;
                        this.posWhFig.push(this.getRightDownFigure(pos, color));
                    } else {
                        this.posBlFig.push(this.getRightDownFigure(pos, color));
                        this.posBlFig.splice(index, 1);
                        this.possiblePositionsBlack.king.pos = this.getRightDownFigure(pos, color);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(this.getRightDownFigure(pos, color));
                            this.possiblePositionsBlack.king[pos].push(this.getRightDownFigure(pos, color));
                        }

                        this.posBlFig.pop();
                        this.posBlFig.splice(index, 0, pos);
                        this.possiblePositionsBlack.king.pos = pos;
                    }
                }
            }
        } else {
            this.possiblePositionsWhite.king[pos] = [];
            this.possiblePositionsWhite.king.pos = pos;
            let index = this.posWhFig.indexOf(pos);
            
            if (pos[0] === 'e' && !this.wasMoveKingWhite && !this.wasMoveRookWhite && !this.posWhFig.includes(letters[letters.indexOf(pos[0]) + 1] + pos[1])) {
                if (!this.posWhFig.includes(letters[letters.indexOf(pos[0]) + 2] + pos[1])) {
                    if (this.posBlFig.includes(letters[letters.indexOf(pos[0]) + 2] + pos[1])) {
                        this.posWhFig.push(letters[letters.indexOf(pos[0]) + 2] + pos[1]);
                        this.posWhFig.splice(index, 1);
                        this.possiblePositionsWhite.king.pos = letters[letters.indexOf(pos[0]) + 2] + pos[1];
                        this.posBlFig.splice(this.posBlFig.indexOf(letters[letters.indexOf(pos[0]) + 2] + pos[1]), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) + 2] + pos[1]);
                            this.possiblePositionsWhite.king[pos].push(letters[letters.indexOf(pos[0]) + 2] + pos[1]);
                        }

                        this.posWhFig.pop();
                        this.posWhFig.splice(index, 0, pos);
                        this.possiblePositionsWhite.king.pos = pos;
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) + 2] + pos[1]);
                    } else {
                        this.posWhFig.push(letters[letters.indexOf(pos[0]) + 2] + pos[1]);
                        this.posWhFig.splice(index, 1);
                        this.possiblePositionsWhite.king.pos = letters[letters.indexOf(pos[0]) + 2] + pos[1];
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) + 2] + pos[1]);
                            this.possiblePositionsWhite.king[pos].push(letters[letters.indexOf(pos[0]) + 2] + pos[1]);
                        }

                        this.posWhFig.pop();
                        this.posWhFig.splice(index, 0, pos);
                        this.possiblePositionsWhite.king.pos = pos;
                    }
                }
            }
            
            if (pos[1] !== '1' && !this.posWhFig.includes(pos[0] + (+pos[1] - 1))) {
                if (this.posBlFig.includes(pos[0] + (+pos[1] - 1))) {
                    this.posWhFig.push(pos[0] + (+pos[1] - 1));
                    this.posWhFig.splice(index, 1);
                    this.possiblePositionsWhite.king.pos = pos[0] + (+pos[1] - 1);
                    this.posBlFig.splice(this.posBlFig.indexOf(pos[0] + (+pos[1] - 1)), 1);
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(pos[0] + (+pos[1] - 1));
                        this.possiblePositionsWhite.king[pos].push(pos[0] + (+pos[1] - 1));
                    }

                    this.posWhFig.pop();
                    this.posWhFig.splice(index, 0, pos);
                    this.possiblePositionsWhite.king.pos = pos;
                    this.posBlFig.push(pos[0] + (+pos[1] - 1));
                } else {
                    this.posWhFig.push(pos[0] + (+pos[1] - 1));
                    this.posWhFig.splice(index, 1);
                    this.possiblePositionsWhite.king.pos = pos[0] + (+pos[1] - 1);
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(pos[0] + (+pos[1] - 1));
                        this.possiblePositionsWhite.king[pos].push(pos[0] + (+pos[1] - 1));
                    }

                    this.posWhFig.pop();
                    this.posWhFig.splice(index, 0, pos);
                    this.possiblePositionsWhite.king.pos = pos;
                }
            }

            if (pos[1] !== '8' && !this.posWhFig.includes(pos[0] + (+pos[1] + 1))) {
                if (this.posBlFig.includes(pos[0] + (+pos[1] + 1))) {
                    this.posWhFig.push(pos[0] + (+pos[1] + 1));
                    this.posWhFig.splice(index, 1);
                    this.possiblePositionsWhite.king.pos = pos[0] + (+pos[1] + 1);
                    this.posBlFig.splice(this.posBlFig.indexOf(pos[0] + (+pos[1] + 1)), 1);
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(pos[0] + (+pos[1] + 1));
                        this.possiblePositionsWhite.king[pos].push(pos[0] + (+pos[1] + 1));
                    }

                    this.posWhFig.pop();
                    this.posWhFig.splice(index, 0, pos);
                    this.possiblePositionsWhite.king.pos = pos;
                    this.posBlFig.push(pos[0] + (+pos[1] + 1));
                } else {
                    this.posWhFig.push(pos[0] + (+pos[1] + 1));
                    this.posWhFig.splice(index, 1);
                    this.possiblePositionsWhite.king.pos = pos[0] + (+pos[1] + 1);
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(pos[0] + (+pos[1] + 1));
                        this.possiblePositionsWhite.king[pos].push(pos[0] + (+pos[1] + 1));
                    }

                    this.posWhFig.pop();
                    this.posWhFig.splice(index, 0, pos);
                    this.possiblePositionsWhite.king.pos = pos;
                }
            }

            if (pos[0] !== 'a' && !this.posWhFig.includes(letters[letters.indexOf(pos[0]) - 1] + pos[1])) {
                if (this.posBlFig.includes(letters[letters.indexOf(pos[0]) - 1] + pos[1])) {
                    this.posWhFig.push(letters[letters.indexOf(pos[0]) - 1] + pos[1]);
                    this.posWhFig.splice(index, 1);
                    this.possiblePositionsWhite.king.pos = letters[letters.indexOf(pos[0]) - 1] + pos[1];
                    this.posBlFig.splice(this.posBlFig.indexOf(letters[letters.indexOf(pos[0]) - 1] + pos[1]), 1);
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) - 1] + pos[1]);
                        this.possiblePositionsWhite.king[pos].push(letters[letters.indexOf(pos[0]) - 1] + pos[1]);
                    }

                    this.posWhFig.pop();
                    this.posWhFig.splice(index, 0, pos);
                    this.possiblePositionsWhite.king.pos = pos;
                    this.posBlFig.push(letters[letters.indexOf(pos[0]) - 1] + pos[1]);
                } else {
                    this.posWhFig.push(letters[letters.indexOf(pos[0]) - 1] + pos[1]);
                    this.posWhFig.splice(index, 1);
                    this.possiblePositionsWhite.king.pos = letters[letters.indexOf(pos[0]) - 1] + pos[1];
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) - 1] + pos[1]);
                        this.possiblePositionsWhite.king[pos].push(letters[letters.indexOf(pos[0]) - 1] + pos[1]);
                    }

                    this.posWhFig.pop();
                    this.posWhFig.splice(index, 0, pos);
                    this.possiblePositionsWhite.king.pos = pos;
                }
            }

            if (pos[0] !== 'h' && !this.posWhFig.includes(letters[letters.indexOf(pos[0]) + 1] + pos[1])) {
                if (this.posBlFig.includes(letters[letters.indexOf(pos[0]) + 1] + pos[1])) {
                    this.posWhFig.push(letters[letters.indexOf(pos[0]) + 1] + pos[1]);
                    this.posWhFig.splice(index, 1);
                    this.possiblePositionsWhite.king.pos = letters[letters.indexOf(pos[0]) + 1] + pos[1];
                    this.posBlFig.splice(this.posBlFig.indexOf(letters[letters.indexOf(pos[0]) + 1] + pos[1]), 1);
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) + 1] + pos[1]);
                        this.possiblePositionsWhite.king[pos].push(letters[letters.indexOf(pos[0]) + 1] + pos[1]);
                    }

                    this.posWhFig.pop();
                    this.posWhFig.splice(index, 0, pos);
                    this.possiblePositionsWhite.king.pos = pos;
                    this.posBlFig.push(letters[letters.indexOf(pos[0]) + 1] + pos[1]);
                } else {
                    this.posWhFig.push(letters[letters.indexOf(pos[0]) + 1] + pos[1]);
                    this.posWhFig.splice(index, 1);
                    this.possiblePositionsWhite.king.pos = letters[letters.indexOf(pos[0]) + 1] + pos[1];
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) + 1] + pos[1]);
                        this.possiblePositionsWhite.king[pos].push(letters[letters.indexOf(pos[0]) + 1] + pos[1]);
                    }

                    this.posWhFig.pop();
                    this.posWhFig.splice(index, 0, pos);
                    this.possiblePositionsWhite.king.pos = pos;
                }
            }

            if (this.getLeftUpFigure(pos, color)) {
                if (!this.posWhFig.includes(this.getLeftUpFigure(pos, color))) {
                    if (this.posBlFig.includes(this.getLeftUpFigure(pos, color))) {
                        this.posWhFig.push(this.getLeftUpFigure(pos, color));
                        this.posWhFig.splice(index, 1);
                        this.possiblePositionsWhite.king.pos = this.getLeftUpFigure(pos, color);
                        this.posBlFig.splice(this.posBlFig.indexOf(this.getLeftUpFigure(pos, color)), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(this.getLeftUpFigure(pos, color));
                            this.possiblePositionsWhite.king[pos].push(this.getLeftUpFigure(pos, color));
                        }

                        this.posWhFig.pop();
                        this.posWhFig.splice(index, 0, pos);
                        this.possiblePositionsWhite.king.pos = pos;
                        this.posBlFig.push(this.getLeftUpFigure(pos, color));
                    } else {
                        this.posWhFig.push(this.getLeftUpFigure(pos, color));
                        this.posWhFig.splice(index, 1);
                        this.possiblePositionsWhite.king.pos = this.getLeftUpFigure(pos, color);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(this.getLeftUpFigure(pos, color));
                            this.possiblePositionsWhite.king[pos].push(this.getLeftUpFigure(pos, color));
                        }

                        this.posWhFig.pop();
                        this.posWhFig.splice(index, 0, pos);
                        this.possiblePositionsWhite.king.pos = pos;
                    }
                }
            }

            if (this.getLeftDownFigure(pos, color)) {
                if (!this.posWhFig.includes(this.getLeftDownFigure(pos, color))) {
                    if (this.posBlFig.includes(this.getLeftDownFigure(pos, color))) {
                        this.posWhFig.push(this.getLeftDownFigure(pos, color));
                        this.posWhFig.splice(index, 1);
                        this.possiblePositionsWhite.king.pos = this.getLeftDownFigure(pos, color);
                        this.posBlFig.splice(this.posBlFig.indexOf(this.getLeftDownFigure(pos, color)), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(this.getLeftDownFigure(pos, color));
                            this.possiblePositionsWhite.king[pos].push(this.getLeftDownFigure(pos, color));
                        }

                        this.posWhFig.pop();
                        this.posWhFig.splice(index, 0, pos);
                        this.possiblePositionsWhite.king.pos = pos;
                        this.posBlFig.push(this.getLeftDownFigure(pos, color));
                    } else {
                        this.posWhFig.push(this.getLeftDownFigure(pos, color));
                        this.posWhFig.splice(index, 1);
                        this.possiblePositionsWhite.king.pos = this.getLeftDownFigure(pos, color);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(this.getLeftDownFigure(pos, color));
                            this.possiblePositionsWhite.king[pos].push(this.getLeftDownFigure(pos, color));
                        }

                        this.posWhFig.pop();
                        this.posWhFig.splice(index, 0, pos);
                        this.possiblePositionsWhite.king.pos = pos;
                    }
                }
            }

            if (this.getRightUpFigure(pos, color)) {
                if (!this.posWhFig.includes(this.getRightUpFigure(pos, color))) {
                    if (this.posBlFig.includes(this.getRightUpFigure(pos, color))) {
                        this.posWhFig.push(this.getRightUpFigure(pos, color));
                        this.posWhFig.splice(index, 1);
                        this.possiblePositionsWhite.king.pos = this.getRightUpFigure(pos, color);
                        this.posBlFig.splice(this.posBlFig.indexOf(this.getRightUpFigure(pos, color)), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(this.getRightUpFigure(pos, color));
                            this.possiblePositionsWhite.king[pos].push(this.getRightUpFigure(pos, color));
                        }

                        this.posWhFig.pop();
                        this.posWhFig.splice(index, 0, pos);
                        this.possiblePositionsWhite.king.pos = pos;
                        this.posBlFig.push(this.getRightUpFigure(pos, color));
                    } else {
                        this.posWhFig.push(this.getRightUpFigure(pos, color));
                        this.posWhFig.splice(index, 1);
                        this.possiblePositionsWhite.king.pos = this.getRightUpFigure(pos, color);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(this.getRightUpFigure(pos, color));
                            this.possiblePositionsWhite.king[pos].push(this.getRightUpFigure(pos, color));
                        }

                        this.posWhFig.pop();
                        this.posWhFig.splice(index, 0, pos);
                        this.possiblePositionsWhite.king.pos = pos;
                    }
                }
            }

            if (this.getRightDownFigure(pos, color)) {
                if (!this.posWhFig.includes(this.getRightDownFigure(pos, color))) {
                    if (this.posBlFig.includes(this.getRightDownFigure(pos, color))) {
                        this.posWhFig.push(this.getRightDownFigure(pos, color));
                        this.posWhFig.splice(index, 1);
                        this.possiblePositionsWhite.king.pos = this.getRightDownFigure(pos, color);
                        this.posBlFig.splice(this.posBlFig.indexOf(this.getRightDownFigure(pos, color)), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(this.getRightDownFigure(pos, color));
                            this.possiblePositionsWhite.king[pos].push(this.getRightDownFigure(pos, color));
                        }

                        this.posWhFig.pop();
                        this.posWhFig.splice(index, 0, pos);
                        this.possiblePositionsWhite.king.pos = pos;
                        this.posBlFig.push(this.getRightDownFigure(pos, color));
                    } else {
                        this.posWhFig.push(this.getRightDownFigure(pos, color));
                        this.posWhFig.splice(index, 1);
                        this.possiblePositionsWhite.king.pos = this.getRightDownFigure(pos, color);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(this.getRightDownFigure(pos, color));
                            this.possiblePositionsWhite.king[pos].push(this.getRightDownFigure(pos, color));
                        }

                        this.posWhFig.pop();
                        this.posWhFig.splice(index, 0, pos);
                        this.possiblePositionsWhite.king.pos = pos;
                    }
                }
            }
        }
    },
    
    getPossibleStepsQueenHard(color, pos) {
        if (color === 'black') {
            for (let i = +pos[1] + 1; i < 9; i++) {
                if (!this.posBlFig.includes(pos[0] + i)) {
                    if (this.posWhFig.includes(pos[0] + i)) {
                        this.possibleStepsBlack.push(pos[0] + i);
                        break;
                    }

                    this.possibleStepsBlack.push(pos[0] + i);
                } else {
                    break;
                }
            }

            for (let i = +pos[1] - 1; i > 0; i--) {
                if (!this.posBlFig.includes(pos[0] + i)) {
                    if (this.posWhFig.includes(pos[0] + i)) {
                        this.possibleStepsBlack.push(pos[0] + i);
                        break;
                    }

                    this.possibleStepsBlack.push(pos[0] + i);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) + 1; i < letters.length; i++) {
                if (!this.posBlFig.includes(letters[i] + pos[1])) {
                    if (this.posWhFig.includes(letters[i] + pos[1])) {
                        this.possibleStepsBlack.push(letters[i] + pos[1]);
                        break;
                    }

                    this.possibleStepsBlack.push(letters[i] + pos[1]);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1; i >= 0; i--) {
                if (!this.posBlFig.includes(letters[i] + pos[1])) {
                    if (this.posWhFig.includes(letters[i] + pos[1])) {
                        this.possibleStepsBlack.push(letters[i] + pos[1]);
                        break;
                    }

                    this.possibleStepsBlack.push(letters[i] + pos[1]);
                } else {
                    break;
                }
            }

            let j;
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] + 1; i < letters.length && j < 9; i++, j++) {
                if (!this.posBlFig.includes(letters[i] + j)) {
                    if (this.posWhFig.includes(letters[i] + j)) {
                        this.possibleStepsBlack.push(letters[i] + j);
                        break;
                    }

                    this.possibleStepsBlack.push(letters[i] + j);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] - 1; i >= 0 && j > 0; i--, j--) {
                if (!this.posBlFig.includes(letters[i] + j)) {
                    if (this.posWhFig.includes(letters[i] + j)) {
                        this.possibleStepsBlack.push(letters[i] + j);
                        break;
                    }

                    this.possibleStepsBlack.push(letters[i] + j);
                } else {
                    break;
                }
            }


            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] + 1; i >= 0 && j < 9; i--, j++) {
                if (!this.posBlFig.includes(letters[i] + j)) {
                    if (this.posWhFig.includes(letters[i] + j)) {
                        this.possibleStepsBlack.push(letters[i] + j);
                        break;
                    }

                    this.possibleStepsBlack.push(letters[i] + j);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] - 1; i < letters.length && j > 0; i++, j--) {
                if (!this.posBlFig.includes(letters[i] + j)) {
                    if (this.posWhFig.includes(letters[i] + j)) {
                        this.possibleStepsBlack.push(letters[i] + j);
                        break;
                    }

                    this.possibleStepsBlack.push(letters[i] + j);
                } else {
                    break;
                }
            }
        } else {
            this.possiblePositionsWhite.queen[pos] = [];
            for (let i = +pos[1] + 1; i < 9; i++) {
                if (!this.posWhFig.includes(pos[0] + i)) {
                    if (this.posBlFig.includes(pos[0] + i)) {
                        this.possibleStepsWhite.push(pos[0] + i);
                        this.possiblePositionsWhite.queen[pos].push(pos[0] + i);
                        break;
                    }

                    this.possibleStepsWhite.push(pos[0] + i);
                    this.possiblePositionsWhite.queen[pos].push(pos[0] + i);
                } else {
                    break;
                }
            }

            for (let i = +pos[1] - 1; i > 0; i--) {
                if (!this.posWhFig.includes(pos[0] + i)) {
                    if (this.posBlFig.includes(pos[0] + i)) {
                        this.possibleStepsWhite.push(pos[0] + i);
                        this.possiblePositionsWhite.queen[pos].push(pos[0] + i);
                        break;
                    }

                    this.possibleStepsWhite.push(pos[0] + i);
                    this.possiblePositionsWhite.queen[pos].push(pos[0] + i);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) + 1; i < letters.length; i++) {
                if (!this.posWhFig.includes(letters[i] + pos[1])) {
                    if (this.posBlFig.includes(letters[i] + pos[1])) {
                        this.possibleStepsWhite.push(letters[i] + pos[1]);
                        this.possiblePositionsWhite.queen[pos].push(letters[i] + pos[1]);
                        break;
                    }

                    this.possibleStepsWhite.push(letters[i] + pos[1]);
                    this.possiblePositionsWhite.queen[pos].push(letters[i] + pos[1]);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1; i >= 0; i--) {
                if (!this.posWhFig.includes(letters[i] + pos[1])) {
                    if (this.posBlFig.includes(letters[i] + pos[1])) {
                        this.possibleStepsWhite.push(letters[i] + pos[1]);
                        this.possiblePositionsWhite.queen[pos].push(letters[i] + pos[1]);
                        break;
                    }

                    this.possibleStepsWhite.push(letters[i] + pos[1]);
                    this.possiblePositionsWhite.queen[pos].push(letters[i] + pos[1]);
                } else {
                    break;
                }
            }

            let j;
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] + 1; i < letters.length && j < 9; i++, j++) {
                if (!this.posWhFig.includes(letters[i] + j)) {
                    if (this.posBlFig.includes(letters[i] + j)) {
                        this.possibleStepsWhite.push(letters[i] + j);
                        this.possiblePositionsWhite.queen[pos].push(letters[i] + j);
                        break;
                    }

                    this.possibleStepsWhite.push(letters[i] + j);
                    this.possiblePositionsWhite.queen[pos].push(letters[i] + j);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] - 1; i >= 0 && j > 0; i--, j--) {
                if (!this.posWhFig.includes(letters[i] + j)) {
                    if (this.posBlFig.includes(letters[i] + j)) {
                        this.possibleStepsWhite.push(letters[i] + j);
                        this.possiblePositionsWhite.queen[pos].push(letters[i] + j);
                        break;
                    }

                    this.possibleStepsWhite.push(letters[i] + j);
                    this.possiblePositionsWhite.queen[pos].push(letters[i] + j);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] + 1; i >= 0 && j < 9; i--, j++) {
                if (!this.posWhFig.includes(letters[i] + j)) {
                    if (this.posBlFig.includes(letters[i] + j)) {
                        this.possibleStepsWhite.push(letters[i] + j);
                        this.possiblePositionsWhite.queen[pos].push(letters[i] + j);
                        break;
                    }

                    this.possibleStepsWhite.push(letters[i] + j);
                    this.possiblePositionsWhite.queen[pos].push(letters[i] + j);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] - 1; i < letters.length && j > 0; i++, j--) {
                if (!this.posWhFig.includes(letters[i] + j)) {
                    if (this.posBlFig.includes(letters[i] + j)) {
                        this.possibleStepsWhite.push(letters[i] + j);
                        this.possiblePositionsWhite.queen[pos].push(letters[i] + j);
                        break;
                    }

                    this.possibleStepsWhite.push(letters[i] + j);
                    this.possiblePositionsWhite.queen[pos].push(letters[i] + j);
                } else {
                    break;
                }
            }
        }
    },
    
    getPossibleStepsQueen(color, pos) {
        if (color === 'black') {
            this.possiblePositionsBlack.queen[pos] = [];
            let index = this.posBlFig.indexOf(pos);
            for (let i = +pos[1] + 1; i < 9; i++) {
                if (!this.posBlFig.includes(pos[0] + i)) {
                    if (this.posWhFig.includes(pos[0] + i)) {
                        this.posBlFig.push(pos[0] + i);
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(pos[0] + i), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(pos[0] + i);
                            this.possiblePositionsBlack.queen[pos].push(pos[0] + i);
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                        this.posWhFig.push(pos[0] + i);
                        break;
                    }

                    this.posBlFig.push(pos[0] + i);
                    this.posBlFig.splice(index, 1);
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(pos[0] + i);
                        this.possiblePositionsBlack.queen[pos].push(pos[0] + i);
                    }

                    this.posBlFig.splice(index, 0, pos);
                    this.posBlFig.pop();

                } else {
                    break;
                }
            }

            for (let i = +pos[1] - 1; i > 0; i--) {
                if (!this.posBlFig.includes(pos[0] + i)) {
                    if (this.posWhFig.includes(pos[0] + i)) {
                        this.posBlFig.push(pos[0] + i);
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(pos[0] + i), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(pos[0] + i);
                            this.possiblePositionsBlack.queen[pos].push(pos[0] + i);
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                        this.posWhFig.push(pos[0] + i);
                        break;
                    }

                    this.posBlFig.push(pos[0] + i);
                    this.posBlFig.splice(index, 1);
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(pos[0] + i);
                        this.possiblePositionsBlack.queen[pos].push(pos[0] + i);
                    }

                    this.posBlFig.splice(index, 0, pos);
                    this.posBlFig.pop();
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) + 1; i < letters.length; i++) {
                if (!this.posBlFig.includes(letters[i] + pos[1])) {
                    if (this.posWhFig.includes(letters[i] + pos[1])) {
                        this.posBlFig.push(letters[i] + pos[1]);
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(letters[i] + pos[1]), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(letters[i] + pos[1]);
                            this.possiblePositionsBlack.queen[pos].push(letters[i] + pos[1]);
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                        this.posWhFig.push(letters[i] + pos[1]);
                        break;
                    }

                    this.posBlFig.push(letters[i] + pos[1]);
                    this.posBlFig.splice(index, 1);
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(letters[i] + pos[1]);
                        this.possiblePositionsBlack.queen[pos].push(letters[i] + pos[1]);
                    }

                    this.posBlFig.splice(index, 0, pos);
                    this.posBlFig.pop();
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1; i >= 0; i--) {
                if (!this.posBlFig.includes(letters[i] + pos[1])) {
                    if (this.posWhFig.includes(letters[i] + pos[1])) {
                        this.posBlFig.push(letters[i] + pos[1]);
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(letters[i] + pos[1]), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(letters[i] + pos[1]);
                            this.possiblePositionsBlack.queen[pos].push(letters[i] + pos[1]);
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                        this.posWhFig.push(letters[i] + pos[1]);
                        break;
                    }

                    this.posBlFig.push(letters[i] + pos[1]);
                    this.posBlFig.splice(index, 1);
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(letters[i] + pos[1]);
                        this.possiblePositionsBlack.queen[pos].push(letters[i] + pos[1]);
                    }

                    this.posBlFig.splice(index, 0, pos);
                    this.posBlFig.pop();
                } else {
                    break;
                }
            }

            let j;
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] + 1; i < letters.length && j < 9; i++, j++) {
                if (!this.posBlFig.includes(letters[i] + j)) {
                    if (this.posWhFig.includes(letters[i] + j)) {
                        this.posBlFig.push(letters[i] + j);
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(letters[i] + j), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(letters[i] + j);
                            this.possiblePositionsBlack.queen[pos].push(letters[i] + j);
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                        this.posWhFig.push(letters[i] + j);
                        break;
                    }

                    this.posBlFig.push(letters[i] + j);
                    this.posBlFig.splice(index, 1);
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(letters[i] + j);
                        this.possiblePositionsBlack.queen[pos].push(letters[i] + j);
                    }

                    this.posBlFig.splice(index, 0, pos);
                    this.posBlFig.pop();
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] - 1; i >= 0 && j > 0; i--, j--) {
                if (!this.posBlFig.includes(letters[i] + j)) {
                    if (this.posWhFig.includes(letters[i] + j)) {
                        this.posBlFig.push(letters[i] + j);
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(letters[i] + j), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(letters[i] + j);
                            this.possiblePositionsBlack.queen[pos].push(letters[i] + j);
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                        this.posWhFig.push(letters[i] + j);
                        break;
                    }

                    this.posBlFig.push(letters[i] + j);
                    this.posBlFig.splice(index, 1);
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(letters[i] + j);
                        this.possiblePositionsBlack.queen[pos].push(letters[i] + j);
                    }

                    this.posBlFig.splice(index, 0, pos);
                    this.posBlFig.pop();
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] + 1; i >= 0 && j < 9; i--, j++) {
                if (!this.posBlFig.includes(letters[i] + j)) {
                    if (this.posWhFig.includes(letters[i] + j)) {
                        this.posBlFig.push(letters[i] + j);
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(letters[i] + j), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(letters[i] + j);
                            this.possiblePositionsBlack.queen[pos].push(letters[i] + j);
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                        this.posWhFig.push(letters[i] + j);
                        break;
                    }

                    this.posBlFig.push(letters[i] + j);
                    this.posBlFig.splice(index, 1);
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(letters[i] + j);
                        this.possiblePositionsBlack.queen[pos].push(letters[i] + j);
                    }

                    this.posBlFig.splice(index, 0, pos);
                    this.posBlFig.pop();
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] - 1; i < letters.length && j > 0; i++, j--) {
                if (!this.posBlFig.includes(letters[i] + j)) {
                    if (this.posWhFig.includes(letters[i] + j)) {
                        this.posBlFig.push(letters[i] + j);
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(letters[i] + j), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(letters[i] + j);
                            this.possiblePositionsBlack.queen[pos].push(letters[i] + j);
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                        this.posWhFig.push(letters[i] + j);
                        break;
                    }

                    this.posBlFig.push(letters[i] + j);
                    this.posBlFig.splice(index, 1);
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(letters[i] + j);
                        this.possiblePositionsBlack.queen[pos].push(letters[i] + j);
                    }

                    this.posBlFig.splice(index, 0, pos);
                    this.posBlFig.pop();
                } else {
                    break;
                }
            }
            
            this.possibleStepsWhite = [];
        } else {
            this.possiblePositionsWhite.queen[pos] = [];
            let index = this.posWhFig.indexOf(pos);
            for (let i = +pos[1] + 1; i < 9; i++) {
                if (!this.posWhFig.includes(pos[0] + i)) {
                    if (this.posBlFig.includes(pos[0] + i)) {
                        this.posWhFig.push(pos[0] + i);
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(pos[0] + i), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(pos[0] + i);
                            this.possiblePositionsWhite.queen[pos].push(pos[0] + i);
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                        this.posBlFig.push(pos[0] + i);
                        break;
                    }

                    this.posWhFig.push(pos[0] + i);
                    this.posWhFig.splice(index, 1);
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(pos[0] + i);
                        this.possiblePositionsWhite.queen[pos].push(pos[0] + i);
                    }

                    this.posWhFig.splice(index, 0, pos);
                    this.posWhFig.pop();
                } else {
                    break;
                }
            }

            for (let i = +pos[1] - 1; i > 0; i--) {
                if (!this.posWhFig.includes(pos[0] + i)) {
                    if (this.posBlFig.includes(pos[0] + i)) {
                        this.posWhFig.push(pos[0] + i);
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(pos[0] + i), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(pos[0] + i);
                            this.possiblePositionsWhite.queen[pos].push(pos[0] + i);
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                        this.posBlFig.push(pos[0] + i);
                        break;
                    }

                    this.posWhFig.push(pos[0] + i);
                    this.posWhFig.splice(index, 1);
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(pos[0] + i);
                        this.possiblePositionsWhite.queen[pos].push(pos[0] + i);
                    }

                    this.posWhFig.splice(index, 0, pos);
                    this.posWhFig.pop();
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) + 1; i < letters.length; i++) {
                if (!this.posWhFig.includes(letters[i] + pos[1])) {
                    if (this.posBlFig.includes(letters[i] + pos[1])) {
                        this.posWhFig.push(letters[i] + pos[1]);
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(letters[i] + pos[1]), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(letters[i] + pos[1]);
                            this.possiblePositionsWhite.queen[pos].push(letters[i] + pos[1]);
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                        this.posBlFig.push(letters[i] + pos[1]);
                        break;
                    }

                    this.posWhFig.push(letters[i] + pos[1]);
                    this.posWhFig.splice(index, 1);
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(letters[i] + pos[1]);
                        this.possiblePositionsWhite.queen[pos].push(letters[i] + pos[1]);
                    }

                    this.posWhFig.splice(index, 0, pos);
                    this.posWhFig.pop();
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1; i >= 0; i--) {
                if (!this.posWhFig.includes(letters[i] + pos[1])) {
                    if (this.posBlFig.includes(letters[i] + pos[1])) {
                        this.posWhFig.push(letters[i] + pos[1]);
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(letters[i] + pos[1]), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(letters[i] + pos[1]);
                            this.possiblePositionsWhite.queen[pos].push(letters[i] + pos[1]);
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                        this.posBlFig.push(letters[i] + pos[1]);
                        break;
                    }

                    this.posWhFig.push(letters[i] + pos[1]);
                    this.posWhFig.splice(index, 1);
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(letters[i] + pos[1]);
                        this.possiblePositionsWhite.queen[pos].push(letters[i] + pos[1]);
                    }

                    this.posWhFig.splice(index, 0, pos);
                    this.posWhFig.pop();
                } else {
                    break;
                }
            }

            let j;
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] + 1; i < letters.length && j < 9; i++, j++) {
                if (!this.posWhFig.includes(letters[i] + j)) {
                    if (this.posBlFig.includes(letters[i] + j)) {
                        this.posWhFig.push(letters[i] + j);
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(letters[i] + j), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(letters[i] + j);
                            this.possiblePositionsWhite.queen[pos].push(letters[i] + j);
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                        this.posBlFig.push(letters[i] + j);
                        break;
                    }

                    this.posWhFig.push(letters[i] + j);
                    this.posWhFig.splice(index, 1);
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(letters[i] + j);
                        this.possiblePositionsWhite.queen[pos].push(letters[i] + j);
                    }

                    this.posWhFig.splice(index, 0, pos);
                    this.posWhFig.pop();
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] - 1; i >= 0 && j > 0; i--, j--) {
                if (!this.posWhFig.includes(letters[i] + j)) {
                    if (this.posBlFig.includes(letters[i] + j)) {
                        this.posWhFig.push(letters[i] + j);
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(letters[i] + j), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(letters[i] + j);
                            this.possiblePositionsWhite.queen[pos].push(letters[i] + j);
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                        this.posBlFig.push(letters[i] + j);
                        break;
                    }

                    this.posWhFig.push(letters[i] + j);
                    this.posWhFig.splice(index, 1);
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(letters[i] + j);
                        this.possiblePositionsWhite.queen[pos].push(letters[i] + j);
                    }

                    this.posWhFig.splice(index, 0, pos);
                    this.posWhFig.pop();
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] + 1; i >= 0 && j < 9; i--, j++) {
                if (!this.posWhFig.includes(letters[i] + j)) {
                    if (this.posBlFig.includes(letters[i] + j)) {
                        this.posWhFig.push(letters[i] + j);
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(letters[i] + j), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(letters[i] + j);
                            this.possiblePositionsWhite.queen[pos].push(letters[i] + j);
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                        this.posBlFig.push(letters[i] + j);
                        break;
                    }

                    this.posWhFig.push(letters[i] + j);
                    this.posWhFig.splice(index, 1);
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(letters[i] + j);
                        this.possiblePositionsWhite.queen[pos].push(letters[i] + j);
                    }

                    this.posWhFig.splice(index, 0, pos);
                    this.posWhFig.pop();
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] - 1; i < letters.length && j > 0; i++, j--) {
                if (!this.posWhFig.includes(letters[i] + j)) {
                    if (this.posBlFig.includes(letters[i] + j)) {
                        this.posWhFig.push(letters[i] + j);
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(letters[i] + j), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(letters[i] + j);
                            this.possiblePositionsWhite.queen[pos].push(letters[i] + j);
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                        this.posBlFig.push(letters[i] + j);
                        break;
                    }

                    this.posWhFig.push(letters[i] + j);
                    this.posWhFig.splice(index, 1);
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(letters[i] + j);
                        this.possiblePositionsWhite.queen[pos].push(letters[i] + j);
                    }

                    this.posWhFig.splice(index, 0, pos);
                    this.posWhFig.pop();
                } else {
                    break;
                }
            }
            
            this.possibleStepsBlack = [];
        }
    },

    getPossibleStepsKnight(color, pos) {
        if (color === 'black') {
            this.possiblePositionsBlack.knights[pos] = [];
            let index = this.posBlFig.indexOf(pos);
            if ((+pos[1] + 2) < 9) {
                if (!this.posBlFig.includes(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2)) && letters.indexOf(pos[0]) !== 7) {
                    if (this.posWhFig.includes(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2))) {
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2));
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2)), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possiblePositionsBlack.knights[pos].push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2));
                            this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2));
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                        this.posWhFig.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2));
                        
                    } else {

                        this.posBlFig.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2));
                        this.posBlFig.splice(index, 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possiblePositionsBlack.knights[pos].push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2));
                            this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2));
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                    }
                }

                if (!this.posBlFig.includes(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2)) && letters.indexOf(pos[0]) !== 0) {
                    if (this.posWhFig.includes(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2))) {
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2));
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2)), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possiblePositionsBlack.knights[pos].push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2));
                            this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2));
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                        this.posWhFig.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2));
                        
                    } else {
                        
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2));
                        this.posBlFig.splice(index, 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possiblePositionsBlack.knights[pos].push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2));
                            this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2));
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                    }
                }
            }

            if ((+pos[1] - 2) > 0) {
                if (!this.posBlFig.includes(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2)) && (letters.indexOf(pos[0]) + 1) < letters.length) {
                    if (this.posWhFig.includes(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2))) {
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2));
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2)), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possiblePositionsBlack.knights[pos].push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2));
                            this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2));
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                        this.posWhFig.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2));
                        
                    } else {
                        
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2));
                        this.posBlFig.splice(index, 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possiblePositionsBlack.knights[pos].push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2));
                            this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2));
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                    }
                }

                if (!this.posBlFig.includes(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2)) && (letters.indexOf(pos[0]) - 1) > -1) {
                    if (this.posWhFig.includes(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2))) {
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2));
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2)), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possiblePositionsBlack.knights[pos].push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2));
                            this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2));
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                        this.posWhFig.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2));
                        
                    } else {
                        
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2));
                        this.posBlFig.splice(index, 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possiblePositionsBlack.knights[pos].push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2));
                            this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2));
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                    }
                }
            }

            if (letters.indexOf(pos[0]) - 2 > -1) {
                if (!this.posBlFig.includes(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1)) && (+pos[1] - 1) > 0) {
                    if (this.posWhFig.includes(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1))) {
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1));
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1)), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possiblePositionsBlack.knights[pos].push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1));
                            this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1));
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                        this.posWhFig.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1));
                        
                    } else {
                        
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1));
                        this.posBlFig.splice(index, 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possiblePositionsBlack.knights[pos].push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1));
                            this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1));
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                    }
                }

                if (!this.posBlFig.includes(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1)) && (+pos[1] + 1) < 9) {
                    if (this.posWhFig.includes(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1))) {
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1));
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1)), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possiblePositionsBlack.knights[pos].push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1));
                            this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1));
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                        this.posWhFig.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1));
                        
                    } else {
                        
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1));
                        this.posBlFig.splice(index, 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possiblePositionsBlack.knights[pos].push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1));
                            this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1));
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                    }
                }
            }

            if (letters.indexOf(pos[0]) + 2 < letters.length) {
                if (!this.posBlFig.includes(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1)) && (+pos[1] - 1) > 0) {
                    if (this.posWhFig.includes(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1))) {
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1));
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1)), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possiblePositionsBlack.knights[pos].push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1));
                            this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1));
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                        this.posWhFig.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1));
                        
                    } else {
                        
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1));
                        this.posBlFig.splice(index, 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possiblePositionsBlack.knights[pos].push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1));
                            this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1));
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                    }
                }

                if (!this.posBlFig.includes(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1)) && (+pos[1] + 1) < 9) {
                    if (this.posWhFig.includes(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1))) {
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1));
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1)), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possiblePositionsBlack.knights[pos].push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1));
                            this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1));
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                        this.posWhFig.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1));
                        
                    } else {
                        
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1));
                        this.posBlFig.splice(index, 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possiblePositionsBlack.knights[pos].push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1));
                            this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1));
                        }

                        this.posBlFig.splice(index, 0, pos);
                        this.posBlFig.pop();
                    }
                }
            }
            
            this.possibleStepsWhite = [];
        } else {
            this.possiblePositionsWhite.knights[pos] = [];
            let index = this.posWhFig.indexOf(pos);
            if ((+pos[1] + 2) < 9) {
                if (!this.posWhFig.includes(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2)) && letters.indexOf(pos[0]) !== 7) {
                    if (this.posBlFig.includes(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2))) {
                        this.posWhFig.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2));
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2)), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2));
                            this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2));
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2));
                        
                    } else {

                        this.posWhFig.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2));
                        this.posWhFig.splice(index, 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2));
                            this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2));
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                    }
                }

                if (!this.posWhFig.includes(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2)) && letters.indexOf(pos[0]) !== 0) {
                    if (this.posBlFig.includes(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2))) {
                        this.posWhFig.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2));
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2)), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2));
                            this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2));
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2));
                        
                    } else {

                        this.posWhFig.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2));
                        this.posWhFig.splice(index, 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2));
                            this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2));
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                    }
                }
            }

            if ((+pos[1] - 2) > 0) {
                if (!this.posWhFig.includes(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2)) && (letters.indexOf(pos[0]) + 1) < letters.length) {
                    if (this.posBlFig.includes(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2))) {
                        this.posWhFig.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2));
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2)), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2));
                            this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2));
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2));
                        
                    } else {

                        this.posWhFig.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2));
                        this.posWhFig.splice(index, 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2));
                            this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2));
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                    }
                }

                if (!this.posWhFig.includes(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2)) && (letters.indexOf(pos[0]) - 1) > -1) {
                    if (this.posBlFig.includes(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2))) {
                        this.posWhFig.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2));
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2)), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2));
                            this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2));
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2));
                        
                    } else {

                        this.posWhFig.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2));
                        this.posWhFig.splice(index, 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2));
                            this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2));
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                    }
                }
            }

            if (letters.indexOf(pos[0]) - 2 > -1) {
                if (!this.posWhFig.includes(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1)) && (+pos[1] - 1) > 0) {
                    if (this.posBlFig.includes(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1))) {
                        this.posWhFig.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1));
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1)), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1));
                            this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1));
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1));
                        
                    } else {

                        this.posWhFig.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1));
                        this.posWhFig.splice(index, 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1));
                            this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1));
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                    }
                }

                if (!this.posWhFig.includes(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1)) && (+pos[1] + 1) < 9) {
                    if (this.posBlFig.includes(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1))) {
                        this.posWhFig.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1));
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1)), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1));
                            this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1));
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1));
                        
                    } else {

                        this.posWhFig.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1));
                        this.posWhFig.splice(index, 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1));
                            this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1));
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                    }
                }
            }

            if (letters.indexOf(pos[0]) + 2 < letters.length) {
                if (!this.posWhFig.includes(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1)) && (+pos[1] - 1) > 0) {
                    if (this.posBlFig.includes(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1))) {
                        this.posWhFig.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1));
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1)), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1));
                            this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1));
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1));
                        
                    } else {

                        this.posWhFig.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1));
                        this.posWhFig.splice(index, 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1));
                            this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1));
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                    }
                }

                if (!this.posWhFig.includes(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1)) && (+pos[1] + 1) < 9) {
                    if (this.posBlFig.includes(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1))) {
                        this.posWhFig.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1));
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1)), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1));
                            this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1));
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                        this.posBlFig.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1));
                        
                    } else {

                        this.posWhFig.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1));
                        this.posWhFig.splice(index, 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1));
                            this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1));
                        }

                        this.posWhFig.splice(index, 0, pos);
                        this.posWhFig.pop();
                    }
                }
            }
            
            this.possibleStepsBlack = [];
        }
    },
    
    getPossibleStepsKnightHard(color, pos) {
        if (color === 'black') {
            if ((+pos[1] + 2) < 9) {
                if (!this.posBlFig.includes(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2))) {
                    this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2));
                }

                if (!this.posBlFig.includes(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2))) {
                    this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2));
                }
            }

            if ((+pos[1] - 2) > 0) {
                if (!this.posBlFig.includes(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2)) && (letters.indexOf(pos[0]) + 1) < letters.length) {
                    this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2));
                }

                if (!this.posBlFig.includes(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2)) && (letters.indexOf(pos[0]) - 1) > -1) {
                    this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2));
                }
            }

            if (letters.indexOf(pos[0]) - 2 > -1) {
                if (!this.posBlFig.includes(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1)) && (+pos[1] - 1) > 0) {
                    this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1));
                }

                if (!this.posBlFig.includes(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1)) && (+pos[1] + 1) < 9) {
                    this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1));
                }
            }

            if (letters.indexOf(pos[0]) + 2 < letters.length) {
                if (!this.posBlFig.includes(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1)) && (+pos[1] - 1) > 0) {
                    this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1));
                }

                if (!this.posBlFig.includes(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1)) && (+pos[1] + 1) < 9) {
                    this.possibleStepsBlack.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1));
                }
            }
        } else {
            this.possiblePositionsWhite.knights[pos] = [];
            if ((+pos[1] + 2) < 9) {
                if (!this.posWhFig.includes(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2))) {
                    this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2));
                    this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] + 2));
                }

                if (!this.posWhFig.includes(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2))) {
                    this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2));
                    this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] + 2));
                }
            }

            if ((+pos[1] - 2) > 0) {
                if (!this.posWhFig.includes(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2)) && (letters.indexOf(pos[0]) + 1) < letters.length) {
                    this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2));
                    this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) + 1] + (+pos[1] - 2));
                }

                if (!this.posWhFig.includes(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2)) && (letters.indexOf(pos[0]) - 1) > -1) {
                    this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2));
                    this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) - 1] + (+pos[1] - 2));
                }
            }

            if (letters.indexOf(pos[0]) - 2 > -1) {
                if (!this.posWhFig.includes(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1)) && (+pos[1] - 1) > 0) {
                    this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1));
                    this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] - 1));
                }

                if (!this.posWhFig.includes(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1)) && (+pos[1] + 1) < 9) {
                    this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1));
                    this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) - 2] + (+pos[1] + 1));
                }
            }

            if (letters.indexOf(pos[0]) + 2 < letters.length) {
                if (!this.posWhFig.includes(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1)) && (+pos[1] - 1) > 0) {
                    this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1));
                    this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] - 1));
                }

                if (!this.posWhFig.includes(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1)) && (+pos[1] + 1) < 9) {
                    this.possiblePositionsWhite.knights[pos].push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1));
                    this.possibleStepsWhite.push(letters[letters.indexOf(pos[0]) + 2] + (+pos[1] + 1));
                }
            }
        }
    },

    getPossibleStepsBishopHard(color, pos) {
        if (color === 'black') {
            let j;
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] + 1; i < letters.length && j < 9; i++, j++) {
                if (!this.posBlFig.includes(letters[i] + j)) {
                    if (this.posWhFig.includes(letters[i] + j)) {
                        this.possibleStepsBlack.push(letters[i] + j);
                        break;
                    }

                    this.possibleStepsBlack.push(letters[i] + j);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] - 1; i >= 0 && j > 0; i--, j--) {
                if (!this.posBlFig.includes(letters[i] + j)) {
                    if (this.posWhFig.includes(letters[i] + j)) {
                        this.possibleStepsBlack.push(letters[i] + j);
                        break;
                    }

                    this.possibleStepsBlack.push(letters[i] + j);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] + 1; i >= 0 && j < 9; i--, j++) {
                if (!this.posBlFig.includes(letters[i] + j)) {
                    if (this.posWhFig.includes(letters[i] + j)) {
                        this.possibleStepsBlack.push(letters[i] + j);
                        break;
                    }

                    this.possibleStepsBlack.push(letters[i] + j);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] - 1; i < letters.length && j > 0; i++, j--) {
                if (!this.posBlFig.includes(letters[i] + j)) {
                    if (this.posWhFig.includes(letters[i] + j)) {
                        this.possibleStepsBlack.push(letters[i] + j);
                        break;
                    }

                    this.possibleStepsBlack.push(letters[i] + j);
                } else {
                    break;
                }
            }
        } else {
            let j;
            this.possiblePositionsWhite.bishops[pos] = [];
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] + 1; i < letters.length && j < 9; i++, j++) {
                if (!this.posWhFig.includes(letters[i] + j)) {
                    if (this.posBlFig.includes(letters[i] + j)) {
                        this.possibleStepsWhite.push(letters[i] + j);
                        this.possiblePositionsWhite.bishops[pos].push(letters[i] + j);
                        break;
                    }

                    this.possibleStepsWhite.push(letters[i] + j);
                    this.possiblePositionsWhite.bishops[pos].push(letters[i] + j);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] - 1; i >= 0 && j > 0; i--, j--) {
                if (!this.posWhFig.includes(letters[i] + j)) {
                    if (this.posBlFig.includes(letters[i] + j)) {
                        this.possibleStepsWhite.push(letters[i] + j);
                        this.possiblePositionsWhite.bishops[pos].push(letters[i] + j);
                        break;
                    }

                    this.possibleStepsWhite.push(letters[i] + j);
                    this.possiblePositionsWhite.bishops[pos].push(letters[i] + j);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] + 1; i >= 0 && j < 9; i--, j++) {
                if (!this.posWhFig.includes(letters[i] + j)) {
                    if (this.posBlFig.includes(letters[i] + j)) {
                        this.possibleStepsWhite.push(letters[i] + j);
                        this.possiblePositionsWhite.bishops[pos].push(letters[i] + j);
                        break;
                    }

                    this.possibleStepsWhite.push(letters[i] + j);
                    this.possiblePositionsWhite.bishops[pos].push(letters[i] + j);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] - 1; i < letters.length && j > 0; i++, j--) {
                if (!this.posWhFig.includes(letters[i] + j)) {
                    if (this.posBlFig.includes(letters[i] + j)) {
                        this.possibleStepsWhite.push(letters[i] + j);
                        this.possiblePositionsWhite.bishops[pos].push(letters[i] + j);
                        break;
                    }

                    this.possibleStepsWhite.push(letters[i] + j);
                    this.possiblePositionsWhite.bishops[pos].push(letters[i] + j);
                } else {
                    break;
                }
            }
        }
    },
    
    getPossibleStepsBishop(color, pos) {
        if (color === 'black') {
            let j;
            this.possiblePositionsBlack.bishops[pos] = [];
            let index = this.posBlFig.indexOf(pos);
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] + 1; i < letters.length && j < 9; i++, j++) {
                if (!this.posBlFig.includes(letters[i] + j)) {
                    if (this.posWhFig.includes(letters[i] + j)) {
                        this.posBlFig.push(letters[i] + j);
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(letters[i] + j), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(letters[i] + j);
                            this.possiblePositionsBlack.bishops[pos].push(letters[i] + j);
                        }
                        
                        this.posBlFig.pop();
                        this.posBlFig.splice(index, 0, pos);
                        this.posWhFig.push(letters[i] + j);
                        break;
                    }
                    
                    this.posBlFig.push(letters[i] + j);
                    this.posBlFig.splice(index, 1);
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(letters[i] + j);
                        this.possiblePositionsBlack.bishops[pos].push(letters[i] + j);
                    }
                    
                    this.posBlFig.pop();
                    this.posBlFig.splice(index, 0, pos);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] - 1; i >= 0 && j > 0; i--, j--) {
                if (!this.posBlFig.includes(letters[i] + j)) {
                    if (this.posWhFig.includes(letters[i] + j)) {
                        this.posBlFig.push(letters[i] + j);
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(letters[i] + j), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(letters[i] + j);
                            this.possiblePositionsBlack.bishops[pos].push(letters[i] + j);
                        }
                        
                        this.posBlFig.pop();
                        this.posBlFig.splice(index, 0, pos);
                        this.posWhFig.push(letters[i] + j);
                        break;
                    }
                    
                    this.posBlFig.push(letters[i] + j);
                    this.posBlFig.splice(index, 1);
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(letters[i] + j);
                        this.possiblePositionsBlack.bishops[pos].push(letters[i] + j);
                    }
                    
                    this.posBlFig.pop();
                    this.posBlFig.splice(index, 0, pos);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] + 1; i >= 0 && j < 9; i--, j++) {
                if (!this.posBlFig.includes(letters[i] + j)) {
                    if (this.posWhFig.includes(letters[i] + j)) {
                        this.posBlFig.push(letters[i] + j);
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(letters[i] + j), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(letters[i] + j);
                            this.possiblePositionsBlack.bishops[pos].push(letters[i] + j);
                        }
                        
                        this.posBlFig.pop();
                        this.posBlFig.splice(index, 0, pos);
                        this.posWhFig.push(letters[i] + j);
                        break;
                    }
                    
                    this.posBlFig.push(letters[i] + j);
                    this.posBlFig.splice(index, 1);
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(letters[i] + j);
                        this.possiblePositionsBlack.bishops[pos].push(letters[i] + j);
                    }
                    
                    this.posBlFig.pop();
                    this.posBlFig.splice(index, 0, pos);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] - 1; i < letters.length && j > 0; i++, j--) {
                if (!this.posBlFig.includes(letters[i] + j)) {
                    if (this.posWhFig.includes(letters[i] + j)) {
                        this.posBlFig.push(letters[i] + j);
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(letters[i] + j), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(letters[i] + j);
                            this.possiblePositionsBlack.bishops[pos].push(letters[i] + j);
                        }
                        
                        this.posBlFig.pop();
                        this.posBlFig.splice(index, 0, pos);
                        this.posWhFig.push(letters[i] + j);
                        break;
                    }
                    
                    this.posBlFig.push(letters[i] + j);
                    this.posBlFig.splice(index, 1);
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(letters[i] + j);
                        this.possiblePositionsBlack.bishops[pos].push(letters[i] + j);
                    }
                    
                    this.posBlFig.pop();
                    this.posBlFig.splice(index, 0, pos);
                } else {
                    break;
                }
            }
        } else {
            let j;
            this.possiblePositionsWhite.bishops[pos] = [];
            let index = this.posWhFig.indexOf(pos);
            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] + 1; i < letters.length && j < 9; i++, j++) {
                if (!this.posWhFig.includes(letters[i] + j)) {
                    if (this.posWhFig.includes(letters[i] + j)) {
                        this.posWhFig.push(letters[i] + j);
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(letters[i] + j), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(letters[i] + j);
                            this.possiblePositionsWhite.bishops[pos].push(letters[i] + j);
                        }
                        
                        this.posWhFig.pop();
                        this.posWhFig.splice(index, 0, pos);
                        this.posBlFig.push(letters[i] + j);
                        break;
                    }
                    
                    this.posWhFig.push(letters[i] + j);
                    this.posWhFig.splice(index, 1);
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(letters[i] + j);
                        this.possiblePositionsWhite.bishops[pos].push(letters[i] + j);
                    }
                    
                    this.posWhFig.pop();
                    this.posWhFig.splice(index, 0, pos);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] - 1; i >= 0 && j > 0; i--, j--) {
                if (!this.posWhFig.includes(letters[i] + j)) {
                    if (this.posBlFig.includes(letters[i] + j)) {
                         this.posWhFig.push(letters[i] + j);
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(letters[i] + j), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(letters[i] + j);
                            this.possiblePositionsWhite.bishops[pos].push(letters[i] + j);
                        }
                        
                        this.posWhFig.pop();
                        this.posWhFig.splice(index, 0, pos);
                        this.posBlFig.push(letters[i] + j);
                        break;
                    }
                    
                    this.posWhFig.push(letters[i] + j);
                    this.posWhFig.splice(index, 1);
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(letters[i] + j);
                        this.possiblePositionsWhite.bishops[pos].push(letters[i] + j);
                    }
                    
                    this.posWhFig.pop();
                    this.posWhFig.splice(index, 0, pos);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1, j = +pos[1] + 1; i >= 0 && j < 9; i--, j++) {
                if (!this.posWhFig.includes(letters[i] + j)) {
                    if (this.posBlFig.includes(letters[i] + j)) {
                        this.posWhFig.push(letters[i] + j);
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(letters[i] + j), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(letters[i] + j);
                            this.possiblePositionsWhite.bishops[pos].push(letters[i] + j);
                        }
                        
                        this.posWhFig.pop();
                        this.posWhFig.splice(index, 0, pos);
                        this.posBlFig.push(letters[i] + j);
                        break;
                    }
                    
                    this.posWhFig.push(letters[i] + j);
                    this.posWhFig.splice(index, 1);
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(letters[i] + j);
                        this.possiblePositionsWhite.bishops[pos].push(letters[i] + j);
                    }
                    
                    this.posWhFig.pop();
                    this.posWhFig.splice(index, 0, pos);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) + 1, j = +pos[1] - 1; i < letters.length && j > 0; i++, j--) {
                if (!this.posWhFig.includes(letters[i] + j)) {
                    if (this.posBlFig.includes(letters[i] + j)) {
                         this.posWhFig.push(letters[i] + j);
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(letters[i] + j), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(letters[i] + j);
                            this.possiblePositionsWhite.bishops[pos].push(letters[i] + j);
                        }
                        
                        this.posWhFig.pop();
                        this.posWhFig.splice(index, 0, pos);
                        this.posBlFig.push(letters[i] + j);
                        break;
                    }
                    
                    this.posWhFig.push(letters[i] + j);
                    this.posWhFig.splice(index, 1);
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(letters[i] + j);
                        this.possiblePositionsWhite.bishops[pos].push(letters[i] + j);
                    }
                    
                    this.posWhFig.pop();
                    this.posWhFig.splice(index, 0, pos);
                } else {
                    break;
                }
            }
        }
    },

    getPossibleStepsRookHard(color, pos) {
        if (color === 'black') {
            for (let i = +pos[1] + 1; i < 9; i++) {
                if (!this.posBlFig.includes(pos[0] + i)) {
                    if (this.posWhFig.includes(pos[0] + i)) {
                        this.possibleStepsBlack.push(pos[0] + i);
                        break;
                    }

                    this.possibleStepsBlack.push(pos[0] + i);
                } else {
                    break;
                }
            }

            for (let i = +pos[1] - 1; i > 0; i--) {
                if (!this.posBlFig.includes(pos[0] + i)) {
                    if (this.posWhFig.includes(pos[0] + i)) {
                        this.possibleStepsBlack.push(pos[0] + i);
                        break;
                    }

                    this.possibleStepsBlack.push(pos[0] + i);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) + 1; i < letters.length; i++) {
                if (!this.posBlFig.includes(letters[i] + pos[1])) {
                    if (this.posWhFig.includes(letters[i] + pos[1])) {
                        this.possibleStepsBlack.push(letters[i] + pos[1]);
                        break;
                    }

                    this.possibleStepsBlack.push(letters[i] + pos[1]);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1; i >= 0; i--) {
                if (!this.posBlFig.includes(letters[i] + pos[1])) {
                    if (this.posWhFig.includes(letters[i] + pos[1])) {
                        this.possibleStepsBlack.push(letters[i] + pos[1]);
                        break;
                    }

                    this.possibleStepsBlack.push(letters[i] + pos[1]);
                } else {
                    break;
                }
            }
        } else {
            this.possiblePositionsWhite.rooks[pos] = [];
            for (let i = +pos[1] + 1; i < 9; i++) {
                if (!this.posWhFig.includes(pos[0] + i)) {
                    if (this.posBlFig.includes(pos[0] + i)) {
                        this.possibleStepsWhite.push(pos[0] + i);
                        this.possiblePositionsWhite.rooks[pos].push(pos[0] + i);
                        break;
                    }

                    this.possibleStepsWhite.push(pos[0] + i);
                    this.possiblePositionsWhite.rooks[pos].push(pos[0] + i);
                } else {
                    break;
                }
            }

            for (let i = +pos[1] - 1; i > 0; i--) {
                if (!this.posWhFig.includes(pos[0] + i)) {
                    if (this.posBlFig.includes(pos[0] + i)) {
                        this.possibleStepsWhite.push(pos[0] + i);
                        this.possiblePositionsWhite.rooks[pos].push(pos[0] + i);
                        break;
                    }

                    this.possibleStepsWhite.push(pos[0] + i);
                    this.possiblePositionsWhite.rooks[pos].push(pos[0] + i);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) + 1; i < letters.length; i++) {
                if (!this.posWhFig.includes(letters[i] + pos[1])) {
                    if (this.posBlFig.includes(letters[i] + pos[1])) {
                        this.possibleStepsWhite.push(letters[i] + pos[1]);
                        this.possiblePositionsWhite.rooks[pos].push(letters[i] + pos[1]);
                        break;
                    }

                    this.possibleStepsWhite.push(letters[i] + pos[1]);
                    this.possiblePositionsWhite.rooks[pos].push(letters[i] + pos[1]);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1; i >= 0; i--) {
                if (!this.posWhFig.includes(letters[i] + pos[1])) {
                    if (this.posBlFig.includes(letters[i] + pos[1])) {
                        this.possibleStepsWhite.push(letters[i] + pos[1]);
                        this.possiblePositionsWhite.rooks[pos].push(letters[i] + pos[1]);
                        break;
                    }

                    this.possibleStepsWhite.push(letters[i] + pos[1]);
                    this.possiblePositionsWhite.rooks[pos].push(letters[i] + pos[1]);
                } else {
                    break;
                }
            }
        }
    },
    
    getPossibleStepsRook(color, pos) {
        if (color === 'black') {
            this.possiblePositionsBlack.rooks[pos] = [];
            let index = this.posBlFig.indexOf(pos);
            for (let i = +pos[1] + 1; i < 9; i++) {
                if (!this.posBlFig.includes(pos[0] + i)) {
                    if (this.posWhFig.includes(pos[0] + i)) {
                        this.posBlFig.push(pos[0] + i);
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(pos[0] + i), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(pos[0] + i);
                            this.possiblePositionsBlack.rooks[pos].push(pos[0] + i);
                        }
                        
                        this.posBlFig.pop();
                        this.posBlFig.splice(index, 0, pos);
                        this.posWhFig.push(pos[0] + i);
                        break;
                    }
                    
                    this.posBlFig.push(pos[0] + i);
                    this.posBlFig.splice(index, 1);
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(pos[0] + i);
                        this.possiblePositionsBlack.rooks[pos].push(pos[0] + i);
                    }
                    
                    this.posBlFig.pop();
                    this.posBlFig.splice(index, 0, pos);
                } else {
                    break;
                }
            }

            for (let i = +pos[1] - 1; i > 0; i--) {
                if (!this.posBlFig.includes(pos[0] + i)) {
                    if (this.posWhFig.includes(pos[0] + i)) {
                        this.posBlFig.push(pos[0] + i);
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(pos[0] + i), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(pos[0] + i);
                            this.possiblePositionsBlack.rooks[pos].push(pos[0] + i);
                        }
                        
                        this.posBlFig.pop();
                        this.posBlFig.splice(index, 0, pos);
                        this.posWhFig.push(pos[0] + i);
                        break;
                    }
                    
                    this.posBlFig.push(pos[0] + i);
                    this.posBlFig.splice(index, 1);
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(pos[0] + i);
                        this.possiblePositionsBlack.rooks[pos].push(pos[0] + i);
                    }
                    
                    this.posBlFig.pop();
                    this.posBlFig.splice(index, 0, pos);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) + 1; i < letters.length; i++) {
                if (!this.posBlFig.includes(letters[i] + pos[1])) {
                    if (this.posWhFig.includes(letters[i] + pos[1])) {
                        this.posBlFig.push(letters[i] + pos[1]);
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(letters[i] + pos[1]), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(letters[i] + pos[1]);
                            this.possiblePositionsBlack.rooks[pos].push(letters[i] + pos[1]);
                        }
                        
                        this.posBlFig.pop();
                        this.posBlFig.splice(index, 0, pos);
                        this.posWhFig.push(letters[i] + pos[1]);
                        break;
                    }
                    
                    this.posBlFig.push(letters[i] + pos[1]);
                    this.posBlFig.splice(index, 1);
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(letters[i] + pos[1]);
                        this.possiblePositionsBlack.rooks[pos].push(letters[i] + pos[1]);
                    }
                    
                    this.posBlFig.pop();
                    this.posBlFig.splice(index, 0, pos);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1; i >= 0; i--) {
                if (!this.posBlFig.includes(letters[i] + pos[1])) {
                    if (this.posWhFig.includes(letters[i] + pos[1])) {
                        this.posBlFig.push(letters[i] + pos[1]);
                        this.posBlFig.splice(index, 1);
                        this.posWhFig.splice(this.posWhFig.indexOf(letters[i] + pos[1]), 1);
                        this.getPossibleStepsWhiteHard();
                        if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                            this.possibleStepsBlack.push(letters[i] + pos[1]);
                            this.possiblePositionsBlack.rooks[pos].push(letters[i] + pos[1]);
                        }
                        
                        this.posBlFig.pop();
                        this.posBlFig.splice(index, 0, pos);
                        this.posWhFig.push(letters[i] + pos[1]);
                        break;
                    }
                    
                    this.posBlFig.push(letters[i] + pos[1]);
                    this.posBlFig.splice(index, 1);
                    this.getPossibleStepsWhiteHard();
                    if (!this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
                        this.possibleStepsBlack.push(letters[i] + pos[1]);
                        this.possiblePositionsBlack.rooks[pos].push(letters[i] + pos[1]);
                    }
                    
                    this.posBlFig.pop();
                    this.posBlFig.splice(index, 0, pos);
                } else {
                    break;
                }
            }
        } else {
            this.possiblePositionsWhite.rooks[pos] = [];
            let index = this.posWhFig.indexOf(pos);
            for (let i = +pos[1] + 1; i < 9; i++) {
                if (!this.posWhFig.includes(pos[0] + i)) {
                    if (this.posBlFig.includes(pos[0] + i)) {
                        this.posWhFig.push(pos[0] + i);
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(pos[0] + i), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(pos[0] + i);
                            this.possiblePositionsWhite.rooks[pos].push(pos[0] + i);
                        }
                        
                        this.posWhFig.pop();
                        this.posWhFig.splice(index, 0, pos);
                        this.posBlFig.push(pos[0] + i);
                        break;
                    }
                    
                    this.posWhFig.push(pos[0] + i);
                    this.posWhFig.splice(index, 1);
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(pos[0] + i);
                        this.possiblePositionsWhite.rooks[pos].push(pos[0] + i);
                    }
                    
                    this.posWhFig.pop();
                    this.posWhFig.splice(index, 0, pos);
                } else {
                    break;
                }
            }

            for (let i = +pos[1] - 1; i > 0; i--) {
                if (!this.posWhFig.includes(pos[0] + i)) {
                    if (this.posBlFig.includes(pos[0] + i)) {
                        this.posWhFig.push(pos[0] + i);
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(pos[0] + i), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(pos[0] + i);
                            this.possiblePositionsWhite.rooks[pos].push(pos[0] + i);
                        }
                        
                        this.posWhFig.pop();
                        this.posWhFig.splice(index, 0, pos);
                        this.posBlFig.push(pos[0] + i);
                        break;
                    }
                    
                    this.posWhFig.push(pos[0] + i);
                    this.posWhFig.splice(index, 1);
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(pos[0] + i);
                        this.possiblePositionsWhite.rooks[pos].push(pos[0] + i);
                    }
                    
                    this.posWhFig.pop();
                    this.posWhFig.splice(index, 0, pos);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) + 1; i < letters.length; i++) {
                if (!this.posWhFig.includes(letters[i] + pos[1])) {
                    if (this.posBlFig.includes(letters[i] + pos[1])) {
                        this.posWhFig.push(letters[i] + pos[1]);
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(letters[i] + pos[1]), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(letters[i] + pos[1]);
                            this.possiblePositionsWhite.rooks[pos].push(letters[i] + pos[1]);
                        }
                        
                        this.posWhFig.pop();
                        this.posWhFig.splice(index, 0, pos);
                        this.posBlFig.push(letters[i] + pos[1]);
                        break;
                    }
                    
                    this.posWhFig.push(letters[i] + pos[1]);
                    this.posWhFig.splice(index, 1);
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(letters[i] + pos[1]);
                        this.possiblePositionsWhite.rooks[pos].push(letters[i] + pos[1]);
                    }
                    
                    this.posWhFig.pop();
                    this.posWhFig.splice(index, 0, pos);
                } else {
                    break;
                }
            }

            for (let i = letters.indexOf(pos[0]) - 1; i >= 0; i--) {
                if (!this.posWhFig.includes(letters[i] + pos[1])) {
                    if (this.posBlFig.includes(letters[i] + pos[1])) {
                        this.posWhFig.push(letters[i] + pos[1]);
                        this.posWhFig.splice(index, 1);
                        this.posBlFig.splice(this.posBlFig.indexOf(letters[i] + pos[1]), 1);
                        this.getPossibleStepsBlackHard();
                        if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                            this.possibleStepsWhite.push(letters[i] + pos[1]);
                            this.possiblePositionsWhite.rooks[pos].push(letters[i] + pos[1]);
                        }
                        
                        this.posWhFig.pop();
                        this.posWhFig.splice(index, 0, pos);
                        this.posBlFig.push(letters[i] + pos[1]);
                        break;
                    }
                    
                    this.posWhFig.push(letters[i] + pos[1]);
                    this.posWhFig.splice(index, 1);
                    this.getPossibleStepsBlackHard();
                    if (!this.possibleStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
                        this.possibleStepsWhite.push(letters[i] + pos[1]);
                        this.possiblePositionsWhite.rooks[pos].push(letters[i] + pos[1]);
                    }
                    
                    this.posWhFig.pop();
                    this.posWhFig.splice(index, 0, pos);
                } else {
                    break;
                }
            }
        }
    },

    play() {
        document.addEventListener('click', getFig);
    },

    getFigure(event) {
        let activeCell = event.target;
        let activeCellPos = activeCell.dataset.pos;
        let tagName = activeCell.tagName;
        let color = activeCell.dataset.color;
        let figure = activeCell.dataset.figure;

        if (tagName !== 'TD' || !activeCellPos || !activeCell.textContent || color !== this.phase) {
            return;
        }

        activeCell.classList.add('active-td');

        this.activeFigure = activeCell.textContent;

        this.activeCell = activeCell;

        this.activeCellPos = activeCellPos;

        this.activeCellName = figure;
        
        switch(figure) {
            case 'p':
                this.drawPossibleSteps('pawns', activeCellPos, color);
                break;
            case 'r':
                this.drawPossibleSteps('rooks', activeCellPos, color);
                break;
            case 'k':
                this.drawPossibleSteps('knights', activeCellPos, color);
                break;
            case 'b':
                this.drawPossibleSteps('bishops', activeCellPos, color);
                break;
            case 'K':
                this.drawPossibleSteps('king', activeCellPos, color);
                break;
            case 'Q':
                this.drawPossibleSteps('queen', activeCellPos, color);
                break;
        }

        document.addEventListener('click', replaceFig);

        document.removeEventListener('click', getFig);
    },
    
    drawPossibleSteps(figure, pos = '', color) {
        if (color === 'black') {
            for (let i = 0; i < this.possiblePositionsBlack[figure][pos].length; i++) {
                document.querySelector(`td[data-pos='${this.possiblePositionsBlack[figure][pos][i]}']`).classList.add('possibleStep');
            }
        } else {
            for (let i = 0; i < this.possiblePositionsWhite[figure][pos].length; i++) {
                document.querySelector(`td[data-pos='${this.possiblePositionsWhite[figure][pos][i]}']`).classList.add('possibleStep');
            }
        }
    },

    replaceFigure(event) {
        let target = event.target;
        let tagName = target.tagName;
        let pos = target.dataset.pos;
        if (target == this.activeCell) {
            this.activeCell.classList.remove('active-td');
            document.removeEventListener('click', replaceFig);
            while (document.querySelector('.possibleStep')) {
                document.querySelector('.possibleStep').classList.remove('possibleStep');
            }
            this.play();
            return;
        }

        target.textContent = this.activeFigure;

        document.removeEventListener('click', replaceFig);

        if (!(pos === this.activeCellPos)) {
            this.activeCell.textContent = '';
        }

        this.setColor(event);

        let color = target.dataset.color;
        
        while (document.querySelector('.possibleStep')) {
            document.querySelector('.possibleStep').classList.remove('possibleStep');
        }

        this.removePreviousPosition(color);

        this.writeNewPosition(color, pos);

        this.removeProperties();

        this.setFigureName(event);
        
        this.didFigureEat(target);
        
        if (this.isPawnOnEdge(pos, color)) {

        } else {
            this.getPossibleStepsBlack();

            this.cloneStepsBlack = this.possibleStepsBlack;

            this.getPossibleStepsWhite();

            console.log(this.possibleStepsWhite);

            console.log(this.cloneStepsBlack);

            console.log(this.possiblePositionsBlack);

            console.log(this.possiblePositionsWhite);

            this.isCheck();

            this.isMate();
        }
    },
    
    isPawnOnEdge(pos, color) {
        if (color === 'white' && this.activeCellName === 'p' && pos[1] == 1) {
            this.getNewFigure(color, pos);
            return true;
        } else if (this.activeCellName === 'p' && pos[1] == 8) {
            this.getNewFigure(color, pos);
            return true;
        } else {
            return false;
        }
    },
    
    getNewFigure(color, pos) {
        if (color === 'black') {
            document.querySelector(`td[data-pos="${pos}"]`).style.position = 'absolute';
            
            let div = document.createElement('div');
            
            div.classList.add('possibleFigureMenu');
            
            div.innerHTML = `<div onclick="game.writeNewFigure('Q', '&#9819', '${pos}')" class="possibleFigureMenuList" data-figure="Q" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">&#9819;</div> <div onclick="game.writeNewFigure('r', '&#9820', '${pos}')" class="possibleFigureMenuList">&#9820;</div> <div onclick="game.writeNewFigure('b', '&#9821', '${pos}')" class="possibleFigureMenuList">&#9821;</div> <div onclick="game.writeNewFigure('k', '&#9822', '${pos}')" class="possibleFigureMenuList" style="border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; border-bottom: 1px solid;">&#9822;</div>`
            
            document.querySelector(`td[data-pos="${pos}"]`).appendChild(div);
        } else {
            document.querySelector(`td[data-pos="${pos}"]`).style.position = 'absolute';
            
            let div = document.createElement('div');
            
            div.classList.add('possibleFigureMenu');
            
            div.innerHTML = `<div onclick="game.writeNewFigure('Q', '&#9813', '${pos}')" class="possibleFigureMenuList" data-figure="Q" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">&#9813;</div> <div onclick="game.writeNewFigure('r', '&#9814', '${pos}')" class="possibleFigureMenuList">&#9814;</div> <div onclick="game.writeNewFigure('b', '&#9815', '${pos}')" class="possibleFigureMenuList">&#9815;</div> <div onclick="game.writeNewFigure('k', '&#9816', '${pos}')" class="possibleFigureMenuList" style="border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; border-bottom: 1px solid;">&#9816;</div>`
            
            document.querySelector(`td[data-pos="${pos}"]`).appendChild(div);
        }
    },
    
    writeNewFigure(figure, figureCode, pos) {
        document.querySelector('.possibleFigureMenu').remove();
        
        document.querySelector(`td[data-pos="${pos}"]`).style.removeProperty('position');
        document.querySelector(`td[data-pos="${pos}"]`).dataset.figure = figure;
        document.querySelector(`td[data-pos="${pos}"]`).innerHTML = figureCode;
        this.calculateMoves();
    },
    
    calculateMoves() {
        this.getPossibleStepsBlack();

        this.cloneStepsBlack = this.possibleStepsBlack;

        this.getPossibleStepsWhite();

        console.log(this.possibleStepsWhite);

        console.log(this.cloneStepsBlack);

        console.log(this.possiblePositionsBlack);

        console.log(this.possiblePositionsWhite);

        this.isCheck();

        this.isMate();
    },
    
    didFigureEat(target) {
        if (target.dataset.color === 'black') {
            if (this.posWhFig.includes(target.dataset.pos)) {
                this.posWhFig.splice(this.posWhFig.indexOf(target.dataset.pos), 1);
            }
        } else {
            if (this.posBlFig.includes(target.dataset.pos)) {
                this.posBlFig.splice(this.posBlFig.indexOf(target.dataset.pos), 1);
            }
        }
    },
    
    isCheck() {
        if (this.possibleStepsWhite.includes(this.possiblePositionsBlack.king.pos)) {
            alert('Шах чёрным');
        }
        
        if (this.cloneStepsBlack.includes(this.possiblePositionsWhite.king.pos)) {
            alert('Шах белым');
        }
    },

    isMate() {
        if (this.phase === 'black' && this.possibleStepsWhite.length === 0) {
            alert('Мат');
            return;
        }
        
        if (this.phase === 'white' && this.cloneStepsBlack.length === 0) {
            alert('Мат');
            return;
        } else {
            this.togglePhase();
            this.play();
        }
    },

    togglePhase() {
        this.phase = this.phase === 'white' ? 'black' : 'white';
    },

    setFigureName(event) {
        event.target.dataset.figure = this.activeCellName;
    },

    setColor(event) {
        event.target.dataset.color = this.phase;
    },

    removeProperties() {
        this.activeCell.classList.remove('active-td');
        this.activeCell.removeAttribute('data-color');
        this.activeCell.removeAttribute('data-figure');
    },

    removePreviousPosition(color) {
        if (color === 'black') {
            for (let i = 0; i < this.posBlFig.length; i++) {
                if (this.posBlFig[i] === this.activeCellPos) {
                    this.posBlFig.splice(i, 1);
                }
            }
        } else {
            for (let i = 0; i < this.posWhFig.length; i++) {
                if (this.posWhFig[i] === this.activeCellPos) {
                    this.posWhFig.splice(i, 1);

                }
            }
        }
    },

    writeNewPosition(color, pos) {
        if (color === 'black') {
            if (this.activeCellName === 'K' && pos === 'g1') {
                document.querySelector('td[data-pos="f1"]').textContent = document.querySelector('td[data-pos="h1"]').textContent;
                document.querySelector('td[data-pos="f1"]').dataset.color = 'black';
                document.querySelector('td[data-pos="f1"]').dataset.figure = 'r';
                document.querySelector('td[data-pos="h1"]').textContent = '';
                this.posBlFig.splice(this.posBlFig.indexOf('h1'), 1);
                this.posBlFig.push('f1');
                this.posBlFig.unshift(pos);
            } else if (this.activeCellName === 'K') {
                this.posBlFig.unshift(pos);
                this.wasMoveKing = true;
            } else if (this.activeCellName === 'r', this.activeCellPos === 'h1') {
                this.wasMoveRook = true;
                this.posBlFig.push(pos);
            } else {
                this.posBlFig.push(pos);
            }
        } else {
            if (this.activeCellName === 'K' && pos === 'g8') {
                document.querySelector('td[data-pos="f8"]').textContent = document.querySelector('td[data-pos="h8"]').textContent;
                document.querySelector('td[data-pos="f8"]').dataset.color = 'white';
                document.querySelector('td[data-pos="f8"]').dataset.figure = 'r';
                document.querySelector('td[data-pos="h8"]').textContent = '';
                this.posWhFig.splice(this.posWhFig.indexOf('h8'), 1);
                this.posWhFig.push('f8');
                this.posWhFig.unshift(pos);
            } else if (this.activeCellName === 'K') {
                this.posWhFig.unshift(pos);
                this.wasMoveKingWhite = true;
            } else if (this.activeCellName === 'r', this.activeCellPos === 'h1') {
                this.wasMoveRookWhite = true;
                this.posWhFig.push(pos);
            } else {
                this.posWhFig.push(pos);
            }
        }
    },
};

game.init();