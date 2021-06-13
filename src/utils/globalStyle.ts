import { createGlobalStyle} from 'styled-components';

const GlobalStyles = createGlobalStyle`
    body{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Roboto";
        font-size: 100%;
    }

    h1, h2, h3, h4, h5, h6, p {
        margin: 0;
    }

    @font-face {
        font-family: "Roboto";
        src: url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
        font-style: normal;
        font-weight: 300;
        font-display: swap;
    }

    @font-face {
        font-family: "Roboto";
        src: url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
        font-style: normal;
        font-weight: 400;
        font-display: swap;
    }

    @font-face {
        font-family: "Roboto";
        src: url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
        font-style: medium;
        font-weight: 500;
        font-display: swap;
    }

    @font-face {
        font-family: "Roboto";
        src: url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');
        font-style: bold;
        font-weight: 700;
        font-display: swap;
    }

    @font-face {
        font-family: "Quicksand";
        src:  url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');
        font-style: normal;
        font-weight: 400;
        font-display: swap;
    }

    @font-face {
        font-family: "Quicksand";
        src: url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap');
        font-style: medium;
        font-weight: 500;
        font-display: swap;
    }

    @font-face {
        font-family: "Quicksand";
        src: url('https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap');
        font-style: bold;
        font-weight: 700;
        font-display: swap;
    }
`